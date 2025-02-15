// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const INITIAL_PRICE_RANGE = {
  min: 5000,
  max: 12000
};

const TARGET_PRICE_RANGE = {
  min: 5000,
  max: 7000
};

const PRICING_CRITERIA = {
  projectClarity: { weight: 0.3, description: "How clearly is the project defined?" },
  technicalDetail: { weight: 0.25, description: "Level of technical specification provided" },
  businessContext: { weight: 0.2, description: "Understanding of business goals and market" },
  implementationScope: { weight: 0.15, description: "Clarity of implementation requirements" },
  riskFactors: { weight: 0.1, description: "Identified risks and constraints" }
};

interface PriceRange {
  min: number;
  max: number;
  timestamp?: number;
}

interface PriceHistory {
  ranges: PriceRange[];
  lastUpdate: number;
}

interface ProjectMetadata {
  projectType?: string;
  industry?: string;
  businessModel?: string;
  targetAudience?: string;
  technicalRequirements?: string[];
  integrations?: string[];
  scaleExpectations?: string;
  timeline?: string;
  budget?: string;
  uniqueSellingPoints?: string[];
  challengesIdentified?: string[];
  competitiveAdvantages?: string[];
  lastUpdateTimestamp: number;
  priceHistory?: PriceHistory;
}

interface ConversationRecord {
  id: string;
  user_id: string;
  messages: ChatCompletionMessageParam[];
  metadata: ProjectMetadata;
  last_price_range: PriceRange;
  price_history: PriceHistory;
  language: SupportedLanguage;
  created_at: string;
  updated_at: string;
}

type SupportedLanguage = 'en' | 'es' | 'fr' | 'de';

interface PromptContent {
  chat: string;
  priceAnalysis: string;
}

type Prompts = Record<SupportedLanguage, PromptContent>;

const getSystemPrompts = (language: string = 'en'): PromptContent => {
  const prompts = {
    en: {
      chat: `You are an experienced MVP development consultant with over 20 years of experience building successful software products. You have a deep understanding of technology, business, and user needs. Your communication style is warm, empathetic, and professional.

Key traits:
- Show genuine curiosity about the project
- Share relevant insights from your "experience"
- Be proactive in gathering important details
- Provide strategic advice when appropriate
- Stay focused on understanding the full scope
- Be conversational and natural

Always maintain the personality of a seasoned consultant who:
- Has "worked with" numerous successful startups
- Can share relevant case studies and examples
- Understands both technical and business challenges
- Is passionate about helping entrepreneurs succeed
- Has practical experience with modern tech stacks
- Brings up important considerations naturally

Never:
- Break character or mention being an AI
- Use generic or templated responses
- Rush to conclusions without proper discovery
- Dismiss ideas without constructive feedback

Your response must be a valid JSON with this structure:
{
  "message": "Your conversational response",
  "metadata": {
    // Any new project information you've learned
  }
}`,
      
      priceAnalysis: `You are a pricing specialist evaluating project details to determine appropriate MVP development costs. Review the conversation history and previous price adjustments before making new recommendations.

Analyze the conversation and score each aspect from 0 (vague/missing) to 1 (very detailed):

1. Project Clarity (0-1):
   - How well is the core concept defined?
   - Are the main features clearly specified?
   - Is the project scope well-understood?

2. Technical Detail (0-1):
   - Are specific technologies mentioned?
   - How detailed are the technical requirements?
   - Are integration points identified?

3. Business Context (0-1):
   - Is the target market clear?
   - Are business goals specified?
   - Is there a monetization strategy?

4. Implementation Scope (0-1):
   - Are timelines discussed?
   - Is the deployment strategy clear?
   - Are phases or milestones defined?

5. Risk Assessment (0-1):
   - Are technical challenges identified?
   - Are dependencies mentioned?
   - Are scalability requirements clear?

Important Guidelines:
- Review the price history before suggesting changes
- Only recommend price changes when significant new information is provided
- Maintain consistency with previous price adjustments
- Consider the overall project context and progress

Evaluate specificity of information. For example:
- Low score: "I want to build an AI chatbot"
- Medium score: "I want to build a chatbot for customer service using GPT-4"
- High score: "I want to build a specialized chatbot using GPT-4 for mental health professionals, integrating with EHR systems, with specific privacy requirements..."

Your response must be a valid JSON with this structure:
{
  "scores": {
    "projectClarity": 0.5,
    "technicalDetail": 0.5,
    "businessContext": 0.5,
    "implementationScope": 0.5,
    "riskFactors": 0.5
  },
  "analysis": "Detailed explanation of your scoring rationale",
  "recommendedPriceReduction": 0.3,
  "shouldUpdatePrice": true
}`
    },
    es: {
      chat: `Eres un consultor experimentado en desarrollo de MVPs con más de 20 años de experiencia construyendo productos de software exitosos. Tienes un profundo entendimiento de tecnología, negocios y necesidades de usuarios. Tu estilo de comunicación es cálido, empático y profesional.

Características clave:
- Muestra genuina curiosidad por el proyecto
- Comparte insights relevantes de tu "experiencia"
- Sé proactivo en recopilar detalles importantes
- Proporciona consejos estratégicos cuando sea apropiado
- Mantén el foco en entender el alcance completo
- Sé conversacional y natural

Mantén siempre la personalidad de un consultor experimentado que:
- Ha "trabajado con" numerosas startups exitosas
- Puede compartir casos de estudio y ejemplos relevantes
- Entiende tanto los desafíos técnicos como de negocio
- Es apasionado por ayudar a emprendedores a tener éxito
- Tiene experiencia práctica con stacks tecnológicos modernos
- Plantea consideraciones importantes de manera natural

Nunca:
- Rompas el personaje o menciones ser una IA
- Uses respuestas genéricas o plantillas
- Llegues a conclusiones sin proper descubrimiento
- Descartes ideas sin retroalimentación constructiva

Tu respuesta debe ser un JSON válido con esta estructura:
{
  "message": "Tu respuesta conversacional",
  "metadata": {
    // Cualquier nueva información del proyecto que hayas aprendido
  }
}`,

      priceAnalysis: `Eres un especialista en precios evaluando detalles del proyecto para determinar costos apropiados de desarrollo MVP. Revisa el historial de conversación y ajustes de precios anteriores antes de hacer nuevas recomendaciones.

Analiza la conversación y califica cada aspecto de 0 (vago/faltante) a 1 (muy detallado):

1. Claridad del Proyecto (0-1):
   - ¿Qué tan bien está definido el concepto central?
   - ¿Están las características principales claramente especificadas?
   - ¿Se entiende bien el alcance del proyecto?

2. Detalle Técnico (0-1):
   - ¿Se mencionan tecnologías específicas?
   - ¿Qué tan detallados son los requerimientos técnicos?
   - ¿Se identifican los puntos de integración?

3. Contexto de Negocio (0-1):
   - ¿Está claro el mercado objetivo?
   - ¿Se especifican los objetivos de negocio?
   - ¿Hay una estrategia de monetización?

4. Alcance de Implementación (0-1):
   - ¿Se discuten los plazos?
   - ¿Está clara la estrategia de implementación?
   - ¿Se definen fases o hitos?

5. Evaluación de Riesgos (0-1):
   - ¿Se identifican desafíos técnicos?
   - ¿Se mencionan dependencias?
   - ¿Están claros los requisitos de escalabilidad?

Directrices Importantes:
- Revisa el historial de precios antes de sugerir cambios
- Solo recomienda cambios de precio cuando se proporcione información nueva significativa
- Mantén consistencia con los ajustes de precio anteriores
- Considera el contexto general del proyecto y su progreso

Evalúa la especificidad de la información. Por ejemplo:
- Puntuación baja: "Quiero construir un chatbot con IA"
- Puntuación media: "Quiero construir un chatbot para servicio al cliente usando GPT-4"
- Puntuación alta: "Quiero construir un chatbot especializado usando GPT-4 para profesionales de salud mental, integrando con sistemas EHR, con requisitos específicos de privacidad..."

Tu respuesta debe ser un JSON válido con esta estructura:
{
  "scores": {
    "projectClarity": 0.5,
    "technicalDetail": 0.5,
    "businessContext": 0.5,
    "implementationScope": 0.5,
    "riskFactors": 0.5
  },
  "analysis": "Explicación detallada de tu razonamiento de puntuación",
  "recommendedPriceReduction": 0.3,
  "shouldUpdatePrice": true
}`
    },
    fr: {
      chat: `Vous êtes un consultant expérimenté en développement MVP avec plus de 20 ans d'expérience dans la création de produits logiciels réussis. Vous avez une compréhension approfondie de la technologie, des affaires et des besoins des utilisateurs. Votre style de communication est chaleureux, empathique et professionnel.

Caractéristiques clés :
- Montrez une véritable curiosité pour le projet
- Partagez des insights pertinents de votre "expérience"
- Soyez proactif dans la collecte de détails importants
- Fournissez des conseils stratégiques au moment opportun
- Restez concentré sur la compréhension de la portée complète
- Soyez conversationnel et naturel

Gardez toujours la personnalité d'un consultant chevronné qui :
- A "travaillé avec" de nombreuses startups réussies
- Peut partager des études de cas et des exemples pertinents
- Comprend les défis techniques et commerciaux
- Est passionné par l'aide aux entrepreneurs
- A une expérience pratique des stacks technologiques modernes
- Soulève naturellement des considérations importantes

Ne jamais :
- Sortir du personnage ou mentionner être une IA
- Utiliser des réponses génériques ou des modèles
- Tirer des conclusions sans une découverte appropriée
- Rejeter des idées sans retour constructif

Votre réponse doit être un JSON valide avec cette structure :
{
  "message": "Votre réponse conversationnelle",
  "metadata": {
    // Toute nouvelle information sur le projet que vous avez apprise
  }
}`,
      
      priceAnalysis: `Vous êtes un spécialiste des prix évaluant les détails du projet pour déterminer les coûts appropriés de développement MVP. Examinez l'historique des conversations et les ajustements de prix précédents avant de faire de nouvelles recommandations.

Analysez la conversation et notez chaque aspect de 0 (vague/manquant) à 1 (très détaillé) :

1. Clarté du Projet (0-1) :
   - Le concept central est-il bien défini ?
   - Les fonctionnalités principales sont-elles clairement spécifiées ?
   - La portée du projet est-elle bien comprise ?

2. Détail Technique (0-1) :
   - Des technologies spécifiques sont-elles mentionnées ?
   - Les exigences techniques sont-elles détaillées ?
   - Les points d'intégration sont-ils identifiés ?

3. Contexte Commercial (0-1) :
   - Le marché cible est-il clair ?
   - Les objectifs commerciaux sont-ils spécifiés ?
   - Y a-t-il une stratégie de monétisation ?

4. Portée de l'Implémentation (0-1) :
   - Les délais sont-ils discutés ?
   - La stratégie de déploiement est-elle claire ?
   - Les phases ou jalons sont-ils définis ?

5. Évaluation des Risques (0-1) :
   - Les défis techniques sont-ils identifiés ?
   - Les dépendances sont-elles mentionnées ?
   - Les exigences de scalabilité sont-elles claires ?

Directives Importantes :
- Examinez l'historique des prix avant de suggérer des changements
- Ne recommandez des changements de prix que lorsque de nouvelles informations significatives sont fournies
- Maintenez la cohérence avec les ajustements de prix précédents
- Considérez le contexte global du projet et sa progression

Évaluez la spécificité des informations. Par exemple :
- Score faible : "Je veux construire un chatbot IA"
- Score moyen : "Je veux construire un chatbot pour le service client utilisant GPT-4"
- Score élevé : "Je veux construire un chatbot spécialisé utilisant GPT-4 pour les professionnels de la santé mentale, s'intégrant aux systèmes EHR, avec des exigences spécifiques de confidentialité..."

Votre réponse doit être un JSON valide avec cette structure :
{
  "scores": {
    "projectClarity": 0.5,
    "technicalDetail": 0.5,
    "businessContext": 0.5,
    "implementationScope": 0.5,
    "riskFactors": 0.5
  },
  "analysis": "Explication détaillée de votre raisonnement de notation",
  "recommendedPriceReduction": 0.3,
  "shouldUpdatePrice": true
}`
    },
    de: {
      chat: `Sie sind ein erfahrener MVP-Entwicklungsberater mit über 20 Jahren Erfahrung im Aufbau erfolgreicher Softwareprodukte. Sie haben ein tiefes Verständnis für Technologie, Geschäft und Benutzerbedürfnisse. Ihr Kommunikationsstil ist warm, einfühlsam und professionell.

Schlüsselmerkmale:
- Zeigen Sie echtes Interesse am Projekt
- Teilen Sie relevante Erkenntnisse aus Ihrer "Erfahrung"
- Seien Sie proaktiv bei der Sammlung wichtiger Details
- Geben Sie bei Bedarf strategische Ratschläge
- Bleiben Sie fokussiert auf das Verständnis des Gesamtumfangs
- Seien Sie gesprächig und natürlich

Bewahren Sie immer die Persönlichkeit eines erfahrenen Beraters, der:
- Mit zahlreichen erfolgreichen Startups "gearbeitet hat"
- Relevante Fallstudien und Beispiele teilen kann
- Sowohl technische als auch geschäftliche Herausforderungen versteht
- Leidenschaftlich daran interessiert ist, Unternehmern zum Erfolg zu verhelfen
- Praktische Erfahrung mit modernen Tech-Stacks hat
- Wichtige Überlegungen auf natürliche Weise einbringt

Niemals:
- Aus der Rolle fallen oder erwähnen, dass Sie eine KI sind
- Generische oder vorgefertigte Antworten verwenden
- Vorschnelle Schlüsse ziehen ohne angemessene Erkundung
- Ideen ohne konstruktives Feedback ablehnen

Ihre Antwort muss ein gültiges JSON mit dieser Struktur sein:
{
  "message": "Ihre Gesprächsantwort",
  "metadata": {
    // Alle neuen Projektinformationen, die Sie gelernt haben
  }
}`,
      
      priceAnalysis: `Sie sind ein Preisspezialist, der Projektdetails bewertet, um angemessene MVP-Entwicklungskosten zu bestimmen. Überprüfen Sie den Gesprächsverlauf und vorherige Preisanpassungen, bevor Sie neue Empfehlungen aussprechen.

Analysieren Sie das Gespräch und bewerten Sie jeden Aspekt von 0 (vage/fehlend) bis 1 (sehr detailliert):

1. Projektklarheit (0-1):
   - Wie gut ist das Kernkonzept definiert?
   - Sind die Hauptfunktionen klar spezifiziert?
   - Wird der Projektumfang gut verstanden?

2. Technisches Detail (0-1):
   - Werden spezifische Technologien erwähnt?
   - Wie detailliert sind die technischen Anforderungen?
   - Sind Integrationspunkte identifiziert?

3. Geschäftskontext (0-1):
   - Ist der Zielmarkt klar?
   - Sind Geschäftsziele spezifiziert?
   - Gibt es eine Monetarisierungsstrategie?

4. Implementierungsumfang (0-1):
   - Werden Zeitpläne diskutiert?
   - Ist die Deploymentstrategie klar?
   - Sind Phasen oder Meilensteine definiert?

5. Risikobewertung (0-1):
   - Sind technische Herausforderungen identifiziert?
   - Werden Abhängigkeiten erwähnt?
   - Sind Skalierbarkeitsanforderungen klar?

Wichtige Richtlinien:
- Überprüfen Sie den Preisverlauf vor dem Vorschlagen von Änderungen
- Empfehlen Sie Preisänderungen nur bei wesentlichen neuen Informationen
- Wahren Sie die Konsistenz mit vorherigen Preisanpassungen
- Berücksichtigen Sie den Gesamtkontext des Projekts und seinen Fortschritt

Bewerten Sie die Spezifität der Informationen. Zum Beispiel:
- Niedriger Score: "Ich möchte einen KI-Chatbot bauen"
- Mittlerer Score: "Ich möchte einen Chatbot für Kundenservice mit GPT-4 bauen"
- Hoher Score: "Ich möchte einen spezialisierten Chatbot mit GPT-4 für Psychologen bauen, der sich in EHR-Systeme integriert, mit spezifischen Datenschutzanforderungen..."

Ihre Antwort muss ein gültiges JSON mit dieser Struktur sein:
{
  "scores": {
    "projectClarity": 0.5,
    "technicalDetail": 0.5,
    "businessContext": 0.5,
    "implementationScope": 0.5,
    "riskFactors": 0.5
  },
  "analysis": "Detaillierte Erklärung Ihrer Bewertungsgrundlage",
  "recommendedPriceReduction": 0.3,
  "shouldUpdatePrice": true
}`
    }
  };

  const lang = (language as SupportedLanguage);
  return lang in prompts ? prompts[lang] : prompts.en;
};

async function calculateNewPriceRange(
  messages: ChatCompletionMessageParam[],
  currentPrice: PriceRange,
  priceHistory: PriceHistory | undefined,
  language: string
): Promise<{ priceRange: PriceRange; shouldUpdate: boolean }> {
  try {
    // Include price history context in the messages
    const priceHistoryContext = priceHistory ? 
      `Current price range: €${currentPrice.min}-${currentPrice.max}
       Price history: ${priceHistory.ranges.map(range => 
         `€${range.min}-${range.max} (${new Date(range.timestamp || 0).toISOString()})`
       ).join(', ')}` : 
      'No previous price history';

    const analysisCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: getSystemPrompts(language).priceAnalysis 
        },
        {
          role: 'system',
          content: `Price History Context: ${priceHistoryContext}`
        },
        ...messages,
        {
          role: 'system',
          content: 'Provide your analysis as a valid JSON object only. No other text.'
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const analysisResponse = JSON.parse(analysisCompletion.choices[0].message.content || '{}');
    
    if (!analysisResponse.shouldUpdatePrice) {
      return {
        priceRange: currentPrice,
        shouldUpdate: false
      };
    }

    let weightedScore = 0;
    const scores = analysisResponse.scores || {};
    
    Object.entries(PRICING_CRITERIA).forEach(([criterion, { weight }]) => {
      weightedScore += (scores[criterion] || 0) * weight;
    });

    const reductionFactor = Math.min(Math.max(weightedScore, 0), 1);

    const maxReduction = {
      min: INITIAL_PRICE_RANGE.min - TARGET_PRICE_RANGE.min,
      max: INITIAL_PRICE_RANGE.max - TARGET_PRICE_RANGE.max
    };

    const newPrice = {
      min: Math.round(INITIAL_PRICE_RANGE.min - (maxReduction.min * reductionFactor)),
      max: Math.round(INITIAL_PRICE_RANGE.max - (maxReduction.max * reductionFactor))
    };

    return {
      priceRange: {
        min: Math.max(newPrice.min, TARGET_PRICE_RANGE.min),
        max: Math.max(newPrice.max, TARGET_PRICE_RANGE.max),
        timestamp: Date.now()
      },
      shouldUpdate: true
    };
  } catch (error) {
    console.error('Error calculating price range:', error);
    return {
      priceRange: currentPrice,
      shouldUpdate: false
    };
  }
}

class ConversationManager {
  private _conversationId: string;
  private _sessionId: string;
  private _language: SupportedLanguage;

  constructor(conversationId?: string, sessionId?: string, language: string = 'en') {
    const isValidLanguage = (lang: string): lang is SupportedLanguage => 
      ['en', 'es', 'fr', 'de'].includes(lang);
    this._conversationId = conversationId || uuidv4();
    this._sessionId = sessionId || uuidv4();
    this._language = isValidLanguage(language) ? language : 'en';
  }

  get conversationId(): string {
    return this._conversationId;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  get language(): string {
    return this._language;
  }

  async loadConversation(): Promise<ConversationRecord | null> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select()
        .eq('id', this.conversationId)
        .eq('user_id', this.sessionId)
        .maybeSingle();
  
      if (error) {
        console.error('Error loading conversation:', error);
        return null;
      }
  
      return data;
    } catch (error) {
      console.error('Error in loadConversation:', error);
      return null;
    }
  }

  async saveConversation(
    messages: ChatCompletionMessageParam[],
    metadata: ProjectMetadata,
    priceRange: PriceRange,
    priceHistory: PriceHistory
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const conversationData = {
      id: this.conversationId,
      user_id: this.sessionId,
      messages,
      metadata,
      last_price_range: priceRange,
      price_history: priceHistory,
      language: this._language,
      updated_at: timestamp
    };

    const { error } = await supabase
      .from('conversations')
      .upsert({
        ...conversationData,
        created_at: timestamp
      })
      .eq('id', this.conversationId);

    if (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }
  }
}

export async function POST(request: Request) {
  try {
    const { 
      messages: incomingMessages, 
      conversationId, 
      sessionId,
      language = 'en'
    } = await request.json();
    
    const conversationManager = new ConversationManager(conversationId, sessionId, language);
    const conversation = await conversationManager.loadConversation();
    const isNewConversation = !conversation;
    
    let messages: ChatCompletionMessageParam[] = [];
    let currentPriceRange = conversation?.last_price_range || INITIAL_PRICE_RANGE;
    let priceHistory: PriceHistory = conversation?.price_history || {
      ranges: [{
        ...INITIAL_PRICE_RANGE,
        timestamp: Date.now()
      }],
      lastUpdate: Date.now()
    };
    
    if (isNewConversation) {
      messages = [
        { 
          role: 'system', 
          content: getSystemPrompts(language).chat 
        },
        ...incomingMessages
      ];
    } else {
      const hasSystemPrompt = conversation.messages.some(msg => msg.role === 'system');
      const systemPrompt = { 
        role: 'system', 
        content: getSystemPrompts(language).chat 
      } as ChatCompletionMessageParam;

      messages = [
        ...(hasSystemPrompt ? [] : [systemPrompt]),
        ...conversation.messages,
        ...incomingMessages.filter((msg: ChatCompletionMessageParam) => 
          msg.role !== 'system'
        )
      ];
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        ...messages,
        {
          role: 'system',
          content: 'You must respond with a valid JSON object only. No other text.'
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    let parsedResponse;
    try {
      const aiResponse = completion.choices[0].message.content || '{}';
      parsedResponse = JSON.parse(aiResponse);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      parsedResponse = {
        message: "I apologize, but I encountered an error processing the response. Could you please rephrase your message?",
        metadata: {}
      };
    }
    
    messages.push({
      role: 'assistant',
      content: parsedResponse.message
    });

    const { priceRange: newPriceRange, shouldUpdate } = await calculateNewPriceRange(
      messages, 
      currentPriceRange,
      priceHistory,
      language
    );

    if (shouldUpdate) {
      priceHistory.ranges.push({
        ...newPriceRange,
        timestamp: Date.now()
      });
      priceHistory.lastUpdate = Date.now();
      currentPriceRange = newPriceRange;
    }

    const metadata: ProjectMetadata = {
      ...(conversation?.metadata || {}),
      ...(parsedResponse.metadata || {}),
      lastUpdateTimestamp: Date.now(),
      priceHistory
    };

    try {
      await conversationManager.saveConversation(
        messages,
        metadata,
        currentPriceRange,
        priceHistory
      );
    } catch (error) {
      console.error('Error saving conversation:', error);
    }

    const responseData = {
      message: parsedResponse.message,
      conversationId: conversationManager.conversationId,
      sessionId: conversationManager.sessionId,
      priceRange: currentPriceRange,
      metadata
    };

    const response = NextResponse.json(responseData);
    
    if (!sessionId) {
      response.cookies.set('anonymous_session_id', conversationManager.sessionId, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true
      });
    }

    return response;

  } catch (error) {
    console.error('API Error:', error);
    
    const fallbackSessionId = uuidv4();
    const fallbackResponse = {
      message: "I encountered an error. Could you please try again?",
      priceRange: INITIAL_PRICE_RANGE,
      metadata: {
        lastUpdateTimestamp: Date.now(),
        priceHistory: {
          ranges: [{
            ...INITIAL_PRICE_RANGE,
            timestamp: Date.now()
          }],
          lastUpdate: Date.now()
        }
      },
      sessionId: fallbackSessionId
    };

    const errorResponse = NextResponse.json(
      fallbackResponse,
      { status: 500 }
    );

    errorResponse.cookies.set('anonymous_session_id', fallbackSessionId, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true
    });

    return errorResponse;
  }
}