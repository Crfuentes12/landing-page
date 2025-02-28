//landing-page/src/providers/language-provider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    "hero.title.fast": "Fast. Smart.",
    "hero.title.mvp": "Your MVP Done Right.",
    "hero.description": "Launch your Software MVP in 6 weeks and save 30% of development costs.",
    "hero.button.estimate": "Get Your Price Estimation",
    "hero.button.contact": "Contact Us",
    "hero.stats.mvps": "MVPs builded",
    "hero.stats.experience": "Years of Experience",
    "hero.stats.clients": "happy clients",
    "hero.stats.team": "Team size",
    
    // Why We Do This Section
    "why.title": "Why We Do This",
    "why.subtitle": "We believe every bold idea deserves a chance.",
    "why.paragraph1": "Too many visionary founders struggle to bring their ideas to life, because they face <span className=\"font-semibold text-foreground\"> barriers that shouldn't exist</span>. High costs due to unnecessary features and bad advice kill great concepts before they even reach the market.",
    "why.paragraph2": "We've seen it happen too many times. We know the frustration of having a groundbreaking idea but being held back by unnecessary complexity. <span className=\"font-semibold text-foreground\"> That's why we're here—to break down these barriers.</span>",
    
    // Roadmap Section
    "roadmap.title": "How We Make It Happen",
    "roadmap.subtitle": "Our structured approach to turn your vision into reality.",
    "roadmap.features.title": "Roadmap to your MVP",
    
    // Roadmap Features
    "roadmap.feature1.title": "Vision First Approach",
    "roadmap.feature1.description": "We understand that every great product starts with a visionary idea. Our focus is on preserving your vision while making it market-ready.",
    
    "roadmap.feature2.title": "Efficient Development",
    "roadmap.feature2.description": "No unnecessary complexity. We build exactly what you need to validate your idea and enter the market confidently.",
    
    "roadmap.feature3.title": "Future-Proof Foundation",
    "roadmap.feature3.description": "While we focus on MVP essentials, we ensure your foundation is solid and scalable for future growth.",
    
    // Roadmap Steps
    "roadmap.step1.title": "Idea Analysis",
    "roadmap.step1.description": "1. We dive into your vision to understand your needs and analyze your market.",
    "roadmap.step1.feature1.title": "Industry Insights",
    "roadmap.step1.feature1.description": "Looking at market trends and industry dynamics to build the best MVP for you",
    "roadmap.step1.feature2.title": "User Needs Assessment",
    "roadmap.step1.feature2.description": "Deep dive into your potential users' needs and pain points",
    "roadmap.step1.feature3.title": "Competitive Analysis",
    "roadmap.step1.feature3.description": "Understanding your market position and competitive advantages",
    "roadmap.step1.feature4.title": "Opportunity Validation",
    "roadmap.step1.feature4.description": "Validating your idea's market fit and potential",
    
    "roadmap.step2.title": "Smart Consultancy",
    "roadmap.step2.description": "2. We trim the excess and focus on what truly matters for your MVP success",
    "roadmap.step2.feature1.title": "Feature Analysis",
    "roadmap.step2.feature1.description": "Identifying and prioritizing essential MVP features",
    "roadmap.step2.feature2.title": "Tech Architecture",
    "roadmap.step2.feature2.description": "Designing the optimal technical foundation for your MVP",
    "roadmap.step2.feature3.title": "Resource Planning",
    "roadmap.step2.feature3.description": "Strategic allocation of resources for maximum efficiency",
    "roadmap.step2.feature4.title": "Risk Mitigation",
    "roadmap.step2.feature4.description": "Identifying and addressing potential challenges early",
    
    "roadmap.step3.title": "Scoping & Roadmap",
    "roadmap.step3.description": "3. We define clear project limits, timeline and key deliverables to ensure efficient development.",
    "roadmap.step3.feature1.title": "Timeline Definition",
    "roadmap.step3.feature1.description": "Creating a clear, achievable development schedule",
    "roadmap.step3.feature2.title": "Milestone Planning",
    "roadmap.step3.feature2.description": "Setting specific, measurable project milestones",
    "roadmap.step3.feature3.title": "Project Scope",
    "roadmap.step3.feature3.description": "Giving you clear expectations",
    "roadmap.step3.feature4.title": "Deliverable Mapping",
    "roadmap.step3.feature4.description": "Defining clear, actionable project deliverables",
    
    "roadmap.step4.title": "Development",
    "roadmap.step4.description": "4. We provide you with a transparent progress, including close collaboration and regular updates. You are always in control!",
    "roadmap.step4.feature1.title": "Agile Process",
    "roadmap.step4.feature1.description": "Flexible, iterative development approach",
    "roadmap.step4.feature2.title": "Quality Focus",
    "roadmap.step4.feature2.description": "Rigorous testing and quality assurance",
    "roadmap.step4.feature3.title": "Progress Monitoring",
    "roadmap.step4.feature3.description": "Regular updates and progress tracking",
    "roadmap.step4.feature4.title": "Collaborative Development",
    "roadmap.step4.feature4.description": "Close partnership throughout the build process",
    
    "roadmap.step5.title": "Launch & Support",
    "roadmap.step5.description": "5. We deliver your MVP, ready to hit the market. If needed, we provide you with ongoing support and guidance",
    "roadmap.step5.feature1.title": "Launch Strategy",
    "roadmap.step5.feature1.description": "Comprehensive deployment and launch planning",
    "roadmap.step5.feature2.title": "User Feedback",
    "roadmap.step5.feature2.description": "Implementing feedback collection systems",
    "roadmap.step5.feature3.title": "Performance Optimization",
    "roadmap.step5.feature3.description": "Ensuring optimal MVP performance",
    "roadmap.step5.feature4.title": "Ongoing Support",
    "roadmap.step5.feature4.description": "Continued guidance and technical support",
    
    // Pricing Section
    "pricing.title": "Get Your Project Estimate",
    "pricing.description": "Our AI assistant helps assess your project scope to provide you with a competitive pricing estimation. With our smart planning approach, we can significantly reduce costs while maintaining quality.",
    "pricing.estimation": "Your Estimation is",
    "pricing.placeholder.input": "Type your message...",
    "pricing.placeholder.locked": "Chat is locked. Press reset to start over.",
    
    // BannerCTA Section
    "banner.title": "We're not just MVP-developers",
    "banner.description": "We're problem-solvers, business thinkers and startup insiders. We believe in creating real value. If you have the vision, we have the roadmap to make it real!",
    "banner.button": "Get Started Today",
    
    // CTA Section
    "cta.title": "Ready to Build the Next Big Thing? Let's Talk!",
    "cta.description": "Start now. The <span class=\"font-semibold text-foreground\">right MVP</span> at the <span class=\"font-semibold text-foreground\">right price</span>—nothing more, nothing less. We're just a <span class=\"font-semibold text-foreground\">tap away</span>.",
    "cta.email": "Email",
    "cta.linkedin": "LinkedIn",
    "cta.form.email": "Email",
    "cta.form.email.placeholder": "you@example.com",
    "cta.form.message": "Message",
    "cta.form.message.placeholder": "Tell us about your project...",
    "cta.form.button.sending": "Sending...",
    "cta.form.button.send": "Get MVP Estimate",
    "cta.success.title": "Thanks for reaching out!",
    "cta.success.message": "We'll get back to you at {email} within 24 hours with a detailed estimate.",
    
    // Form validation messages
    "cta.validation.required": "This field is required",
    "cta.validation.email": "Please enter a valid email address",
    "cta.validation.minLength": "Message must be at least 10 characters",
    "cta.validation.maxLength": "Message is too long (maximum 5000 characters)",
    
    // AboutUs Section
    "about.title": "Who We Are",
    "about.description": "We combine deep technical expertise with startup experience to transform your vision into reality. Our focus is on building MVPs that matter.",
    "about.robin.name": "Robin",
    "about.robin.title": "Startup & Innovation Lead",
    "about.robin.mission": "Transforming complex ideas into focused, market-ready MVPs",
    "about.robin.achievement": "10+ Successful MVPs launched",
    "about.robin.skill1": "MVP Strategy",
    "about.robin.skill2": "IT Product Development",
    "about.robin.skill3": "Market Analysis",
    "about.robin.skill4": "Growth Hacking",
    "about.robin.skill5": "Team Leadership",
    "about.chris.name": "Chris",
    "about.chris.title": "Tech Architecture & AI Lead",
    "about.chris.mission": "Building scalable foundations for tomorrow's innovations",
    "about.chris.achievement": "12+ Years of Tech Experience",
    "about.chris.skill1": "System Architecture",
    "about.chris.skill2": "AI Development",
    "about.chris.skill3": "MVP Engineering",
    "about.chris.skill4": "Cloud Infrastructure",
    "about.chris.skill5": "Tech Leadership",
    "about.mission.title": "MISSION",
    
    // ComparisonMatrix Section
    "comparison.title": "Choose Your Perfect Fit",
    "comparison.description": "Compare approaches and find the best solution for your MVP development needs.",
    "comparison.hover": "Hover over any icon for a deeper explanation",
    "comparison.criteria": "Criteria",
    "comparison.our.service": "Our MVP Service",
    "comparison.traditional": "Traditional Agency",
    "comparison.nocode": "No-Code Tools",
    "comparison.strategic.title": "Strategic Planning",
    "comparison.strategic.our": "Comprehensive strategic planning with focus on key business objectives",
    "comparison.strategic.traditional": "Standard project planning approach",
    "comparison.strategic.nocode": "Basic planning capabilities",
    "comparison.cost.title": "Cost Efficiency",
    "comparison.cost.our": "Optimized pricing structure with maximum value delivery",
    "comparison.cost.traditional": "Traditional pricing models with overhead",
    "comparison.cost.nocode": "Subscription-based pricing with limitations",
    "comparison.agility.title": "Development Agility",
    "comparison.agility.our": "Rapid, flexible development with continuous adaptation",
    "comparison.agility.traditional": "Structured but slower development process",
    "comparison.agility.nocode": "Limited development capabilities",
    "comparison.expertise.title": "Technical Expertise",
    "comparison.expertise.our": "Cutting-edge technical solutions with AI integration",
    "comparison.expertise.traditional": "Strong technical capabilities but higher costs",
    "comparison.expertise.nocode": "Restricted to platform capabilities",
    "comparison.scalability.title": "Scalability",
    "comparison.scalability.our": "Built for growth with future-proof architecture",
    "comparison.scalability.traditional": "Complex and costly scaling process",
    "comparison.scalability.nocode": "Platform limitations affect scalability",
    
    // Our Services Section
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive solutions for your digital journey",
    "services.idea.title": "Idea Analysis",
    "services.idea.description": "We dive into your vision to understand your needs and validate your market opportunity",
    "services.consultancy.title": "Smart Consultancy",
    "services.consultancy.description": "We trim the excess and focus on what truly matters for your MVP success",
    "services.scoping.title": "Scoping & Roadmap",
    "services.scoping.description": "Clear project limits, timeline and key deliverables to ensure efficient development",
    "services.development.title": "Development",
    "services.development.description": "Transparent progress with close collaboration and regular updates",
    "services.launch.title": "Launch & Support",
    "services.launch.description": "Your MVP, ready to hit the market with ongoing support and guidance",
    "services.ai.title": "AI Integration",
    "services.ai.description": "Enhance your MVP with cutting-edge AI capabilities and smart automations",
    
    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "FAQ",
    "faq.description": "Find answers to common questions about our MVP development process and services. Can't find what you're looking for? Reach out to our team.",
    "faq.search.placeholder": "Search questions...",
    "faq.no.results": "No questions found matching your criteria",
    "faq.try.again": "Try adjusting your search or filter",
    "faq.more.questions": "Still have questions?",
    "faq.contact.support": "Contact our support team",

    // Categories
    "faq.categories.all": "All Questions",
    "faq.categories.expertise": "Expertise",
    "faq.categories.process": "Process",
    "faq.categories.support": "Support",

    // Questions
    "faq.questions.industries": "What industries or types of startups do you specialize in?",
    "faq.questions.technical": "Do I need to have technical knowledge to work with you?",
    "faq.questions.feedback": "How do you handle feedback and changes during development?",
    "faq.questions.fulldev": "If I want to turn my MVP into a full product, can you handle the full development cycle?",
    "faq.questions.support": "Do you provide post-launch support or maintenance?",
    "faq.questions.confidentiality": "Can I trust that you won't steal my idea?",
    "faq.questions.pricing": "Do you offer payment plans or flexible pricing?",
    "faq.questions.fundraising": "Can you help with fundraising or pitching to investors?",
    
    // Answers
    "faq.answers.industries": "We focus on <strong>software MVPs</strong>, particularly for SaaS, AI-driven applications, digital platforms and automation tools. If your startup involves software, AI, or web-based solutions, we're here to help you build a lean, high-impact MVP that gets you to market fast.",
    "faq.answers.technical": "Not at all! <strong>We handle all the technical details</strong> while keeping you informed in a way that's easy to understand. We ensure you can make the right decisions about your MVP <strong>without needing to be a technical expert.</strong> Our goal is to empower you without overwhelming you.",
    "faq.answers.feedback": "Before development begins, we work closely with you to define the <strong>essential MVP scope</strong>—ensuring it includes everything you need and nothing you don't. If you decide you need changes or additional features during the process, it's entirely possible, though <strong>additional costs may apply</strong>. We maintain flexibility to adapt while keeping your goals in focus.",
    "faq.answers.fulldev": "Absolutely! If your MVP proves successful, we can continue working with you to scale it into a <strong>fully developed product</strong>—adding new features, integrations, and optimizations to support your growth.",
    "faq.answers.support": "Yes, we do! We offer <strong>ongoing support, maintenance and consulting packages</strong> to keep your software and your project running smoothly after launch. These services are optional and available at an additional cost, ensuring your product remains stable and ready for growth.",
    "faq.answers.confidentiality": "Absolutely. <strong>Your idea remains 100% yours</strong>. We take confidentiality very seriously and are happy to sign an <strong>NDA (Non-Disclosure Agreement)</strong> or any other legal document to protect your intellectual property. We're here to build your vision—not take it.",
    "faq.answers.pricing": "Yes! We understand that startups have different financial situations, so we offer <strong>flexible pricing models and payment plans</strong> on a case-by-case basis. Whether you need to spread payments over time or work within a tight budget, we're open to finding a solution that suits you.",
    "faq.answers.fundraising": "While <strong>it's not our core service,</strong> we have valuable experience with <strong>accelerators, investor pitches and startup funding.</strong> We can provide guidance, insights, and help you craft a compelling pitch, but our primary focus remains on building your MVP.",
    
    // Chat Sequences
    "chat.sarah.name": "Sarah Chen",
    "chat.sarah.message": "Can you build a mobile-first SaaS platform?",
    "chat.sarah.response": "We specialize in modern SaaS development. Here's our proven approach to building scalable platforms:",
    "chat.sarah.timeline.design.title": "Design Sprint",
    "chat.sarah.timeline.design.desc": "UX research & modern UI design",
    "chat.sarah.timeline.dev.title": "Rapid Development",
    "chat.sarah.timeline.dev.desc": "Progressive web app build",
    "chat.sarah.timeline.launch.title": "Launch",
    "chat.sarah.timeline.launch.desc": "3-week MVP deployment",
    
    "chat.marcus.name": "Marcus Thompson",
    "chat.marcus.message": "Looking to build an AI-powered B2B SaaS for startups",
    "chat.marcus.response": "Perfect timing! We'll create a cutting-edge AI platform tailored for startups. Here's what we deliver:",
    "chat.marcus.features.ai.title": "AI Core Integration",
    "chat.marcus.features.ai.desc": "Custom LLM implementation & API management",
    "chat.marcus.features.startup.title": "Startup-Ready Features",
    "chat.marcus.features.startup.desc": "Multi-tenant architecture & scalable infrastructure",
    "chat.marcus.features.analytics.title": "Analytics Dashboard",
    "chat.marcus.features.analytics.desc": "Real-time metrics & AI insights",
    
    "chat.elena.name": "Elena Rodriguez",
    "chat.elena.message": "Need a premium e-commerce platform, not the usual Shopify template",
    "chat.elena.response": "We'll create a distinctive e-commerce experience that sets you apart. Here's our custom approach:",
    "chat.elena.features.shopping.title": "Custom Shopping Experience",
    "chat.elena.features.shopping.desc": "Unique UI/UX with AR product previews",
    "chat.elena.features.analytics.title": "Advanced Analytics",
    "chat.elena.features.analytics.desc": "AI-powered customer insights & recommendations",
    "chat.elena.features.integration.title": "Seamless Integration",
    "chat.elena.features.integration.desc": "Custom payment & inventory systems",
    
    "chat.james.name": "James Wilson",
    "chat.james.message": "I want to build a habit tracking app with social features",
    "chat.james.response": "We'll create an engaging habit tracking platform that keeps users motivated. Here's our development roadmap:",
    "chat.james.timeline.ux.title": "User Experience Design",
    "chat.james.timeline.ux.desc": "Gamified tracking & social interactions",
    "chat.james.timeline.features.title": "Core Features",
    "chat.james.timeline.features.desc": "Habit streaks, challenges & social graph",
    "chat.james.timeline.analytics.title": "Analytics & Insights",
    "chat.james.timeline.analytics.desc": "Progress visualization & AI recommendations",
    
    "chat.lisa.name": "Lisa Chang",
    "chat.lisa.message": "Need AI consultancy for our value proposition",
    "chat.lisa.response": "We'll help you leverage AI to create compelling value for your customers. Our consultation process includes:",
    "chat.lisa.features.analysis.title": "AI Opportunity Analysis",
    "chat.lisa.features.analysis.desc": "Market research & competitive positioning",
    "chat.lisa.features.strategy.title": "Strategy Workshop",
    "chat.lisa.features.strategy.desc": "AI integration roadmap & ROI projection",
    "chat.lisa.features.implementation.title": "Implementation Guide",
    "chat.lisa.features.implementation.desc": "Technical requirements & resource planning",
    
    "chat.david.name": "David Park",
    "chat.david.message": "Looking to build an AI note-taking app with voice recording",
    "chat.david.response": "We'll create a powerful AI-enhanced note-taking platform. Here's what we'll deliver:",
    "chat.david.features.voice.title": "Voice Recognition",
    "chat.david.features.voice.desc": "Real-time transcription & semantic search",
    "chat.david.features.ai.title": "AI Processing",
    "chat.david.features.ai.desc": "Auto-summarization & topic extraction",
    "chat.david.features.organization.title": "Smart Organization",
    "chat.david.features.organization.desc": "AI-powered tagging & categorization",
    
    "chat.rachel.name": "Rachel Martinez",
    "chat.rachel.message": "Can you help create a fast content generation platform for our marketing team?",
    "chat.rachel.response": "We'll build an AI-powered content acceleration platform tailored to your brand. Here's our solution:",
    "chat.rachel.timeline.engine.title": "AI Engine Setup",
    "chat.rachel.timeline.engine.desc": "Custom LLM training & brand voice integration",
    "chat.rachel.timeline.workflow.title": "Content Workflow",
    "chat.rachel.timeline.workflow.desc": "Templates, scheduling & approval system",
    "chat.rachel.timeline.analytics.title": "Analytics Suite",
    "chat.rachel.timeline.analytics.desc": "Performance tracking & content optimization",
    
    // Navigation and common elements
    "nav.about": "About",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.mission": "Our Mission",
    "nav.faq": "FAQ",
    "language": "Language",
    "theme": "Theme"
  },
  es: {
    // Hero Section
    "hero.title.fast": "Rápido. Inteligente.",
    "hero.title.mvp": "Tu MVP Bien Hecho.",
    "hero.description": "Lanza tu MVP de Software en 6 semanas y ahorra un 30% en costos de desarrollo.",
    "hero.button.estimate": "Obtén tu Estimación de Precio",
    "hero.button.contact": "Contáctanos",
    "hero.stats.mvps": "MVPs construidos",
    "hero.stats.experience": "Años de Experiencia",
    "hero.stats.clients": "clientes satisfechos",
    "hero.stats.team": "Tamaño del equipo",
    
    // Why We Do This Section
    "why.title": "Por Qué Hacemos Esto",
    "why.subtitle": "Creemos que cada idea audaz merece una oportunidad.",
    "why.paragraph1": "Demasiados fundadores visionarios luchan por dar vida a sus ideas porque enfrentan <span className=\"font-semibold text-foreground\"> barreras que no deberían existir</span>. Los altos costos debido a características innecesarias y malos consejos matan grandes conceptos antes de que lleguen al mercado.",
    "why.paragraph2": "Lo hemos visto suceder demasiadas veces. Conocemos la frustración de tener una idea revolucionaria pero ser limitados por complejidades innecesarias. <span className=\"font-semibold text-foreground\"> Por eso estamos aquí: para derribar estas barreras.</span>",
    
    // Roadmap Section
    "roadmap.title": "Cómo Lo Hacemos Realidad",
    "roadmap.subtitle": "Nuestro enfoque estructurado para convertir tu visión en realidad.",
    "roadmap.features.title": "Hoja de Ruta hacia tu MVP",
    
    // Roadmap Features
    "roadmap.feature1.title": "Enfoque Primero en la Visión",
    "roadmap.feature1.description": "Entendemos que todo gran producto comienza con una idea visionaria. Nuestro enfoque está en preservar tu visión mientras la hacemos lista para el mercado.",
    
    "roadmap.feature2.title": "Desarrollo Eficiente",
    "roadmap.feature2.description": "Sin complejidad innecesaria. Construimos exactamente lo que necesitas para validar tu idea y entrar al mercado con confianza.",
    
    "roadmap.feature3.title": "Base Preparada para el Futuro",
    "roadmap.feature3.description": "Mientras nos concentramos en lo esencial del MVP, nos aseguramos de que tu base sea sólida y escalable para el crecimiento futuro.",
    
    // Roadmap Steps
    "roadmap.step1.title": "Análisis de Ideas",
    "roadmap.step1.description": "1. Profundizamos en tu visión para entender tus necesidades y analizar tu mercado.",
    "roadmap.step1.feature1.title": "Perspectivas de la Industria",
    "roadmap.step1.feature1.description": "Analizando tendencias del mercado y dinámicas de la industria para construir el mejor MVP para ti",
    "roadmap.step1.feature2.title": "Evaluación de Necesidades del Usuario",
    "roadmap.step1.feature2.description": "Profundizando en las necesidades y puntos débiles de tus potenciales usuarios",
    "roadmap.step1.feature3.title": "Análisis Competitivo",
    "roadmap.step1.feature3.description": "Comprendiendo tu posición en el mercado y ventajas competitivas",
    "roadmap.step1.feature4.title": "Validación de Oportunidades",
    "roadmap.step1.feature4.description": "Validando el ajuste de mercado y el potencial de tu idea",
    
    "roadmap.step2.title": "Consultoría Inteligente",
    "roadmap.step2.description": "2. Eliminamos lo superfluo y nos enfocamos en lo que realmente importa para el éxito de tu MVP",
    "roadmap.step2.feature1.title": "Análisis de Características",
    "roadmap.step2.feature1.description": "Identificando y priorizando características esenciales del MVP",
    "roadmap.step2.feature2.title": "Arquitectura Tecnológica",
    "roadmap.step2.feature2.description": "Diseñando la base técnica óptima para tu MVP",
    "roadmap.step2.feature3.title": "Planificación de Recursos",
    "roadmap.step2.feature3.description": "Asignación estratégica de recursos para máxima eficiencia",
    "roadmap.step2.feature4.title": "Mitigación de Riesgos",
    "roadmap.step2.feature4.description": "Identificando y abordando posibles desafíos tempranamente",
    
    "roadmap.step3.title": "Delimitación y Hoja de Ruta",
    "roadmap.step3.description": "3. Definimos límites claros del proyecto, cronograma y entregables clave para asegurar un desarrollo eficiente.",
    "roadmap.step3.feature1.title": "Definición de Cronograma",
    "roadmap.step3.feature1.description": "Creando un calendario de desarrollo claro y alcanzable",
    "roadmap.step3.feature2.title": "Planificación de Hitos",
    "roadmap.step3.feature2.description": "Estableciendo hitos de proyecto específicos y medibles",
    "roadmap.step3.feature3.title": "Alcance del Proyecto",
    "roadmap.step3.feature3.description": "Dándote expectativas claras",
    "roadmap.step3.feature4.title": "Mapeo de Entregables",
    "roadmap.step3.feature4.description": "Definiendo entregables de proyecto claros y accionables",
    
    "roadmap.step4.title": "Desarrollo",
    "roadmap.step4.description": "4. Te proporcionamos un progreso transparente, incluyendo colaboración cercana y actualizaciones regulares. ¡Siempre tienes el control!",
    "roadmap.step4.feature1.title": "Proceso Ágil",
    "roadmap.step4.feature1.description": "Enfoque de desarrollo flexible e iterativo",
    "roadmap.step4.feature2.title": "Enfoque en Calidad",
    "roadmap.step4.feature2.description": "Pruebas rigurosas y garantía de calidad",
    "roadmap.step4.feature3.title": "Monitoreo de Progreso",
    "roadmap.step4.feature3.description": "Actualizaciones regulares y seguimiento del progreso",
    "roadmap.step4.feature4.title": "Desarrollo Colaborativo",
    "roadmap.step4.feature4.description": "Asociación cercana durante todo el proceso de construcción",
    
    "roadmap.step5.title": "Lanzamiento y Soporte",
    "roadmap.step5.description": "5. Entregamos tu MVP, listo para salir al mercado. Si es necesario, te proporcionamos soporte y orientación continuos",
    "roadmap.step5.feature1.title": "Estrategia de Lanzamiento",
    "roadmap.step5.feature1.description": "Planificación integral de despliegue y lanzamiento",
    "roadmap.step5.feature2.title": "Retroalimentación de Usuario",
    "roadmap.step5.feature2.description": "Implementación de sistemas de recopilación de comentarios",
    "roadmap.step5.feature3.title": "Optimización de Rendimiento",
    "roadmap.step5.feature3.description": "Asegurando un rendimiento óptimo del MVP",
    "roadmap.step5.feature4.title": "Soporte Continuo",
    "roadmap.step5.feature4.description": "Orientación continua y soporte técnico",
    
    // Pricing Section
    "pricing.title": "Obtén la Estimación de tu Proyecto",
    "pricing.description": "Nuestro asistente de IA ayuda a evaluar el alcance de tu proyecto para proporcionarte una estimación de precios competitiva. Con nuestro enfoque de planificación inteligente, podemos reducir significativamente los costos mientras mantenemos la calidad.",
    "pricing.estimation": "Tu Estimación es",
    "pricing.placeholder.input": "Escribe tu mensaje...",
    "pricing.placeholder.locked": "Chat bloqueado. Presiona reiniciar para comenzar de nuevo.",
    
    // BannerCTA Section
    "banner.title": "No somos solo desarrolladores de MVP",
    "banner.description": "Somos solucionadores de problemas, pensadores de negocios y expertos en startups. Creemos en crear valor real. Si tienes la visión, ¡nosotros tenemos la hoja de ruta para hacerla realidad!",
    "banner.button": "Comienza Hoy",
    
    // CTA Section
    "cta.title": "¿Listo para Construir el Próximo Gran Proyecto? ¡Hablemos!",
    "cta.description": "Comienza ahora. El <span class=\"font-semibold text-foreground\">MVP adecuado</span> al <span class=\"font-semibold text-foreground\">precio justo</span>—ni más, ni menos. Estamos a solo <span class=\"font-semibold text-foreground\">un clic de distancia</span>.",
    "cta.email": "Correo",
    "cta.linkedin": "LinkedIn",
    "cta.form.email": "Correo Electrónico",
    "cta.form.email.placeholder": "tu@ejemplo.com",
    "cta.form.message": "Mensaje",
    "cta.form.message.placeholder": "Cuéntanos sobre tu proyecto...",
    "cta.form.button.sending": "Enviando...",
    "cta.form.button.send": "Obtener Estimación de MVP",
    "cta.success.title": "¡Gracias por contactarnos!",
    "cta.success.message": "Nos pondremos en contacto contigo en {email} dentro de 24 horas con una estimación detallada.",
    
    // Form validation messages
    "cta.validation.required": "Este campo es obligatorio",
    "cta.validation.email": "Por favor, introduce una dirección de correo electrónico válida",
    "cta.validation.minLength": "El mensaje debe tener al menos 10 caracteres",
    "cta.validation.maxLength": "El mensaje es demasiado largo (máximo 5000 caracteres)",
    
    // AboutUs Section
    "about.title": "Quiénes Somos",
    "about.description": "Combinamos experiencia técnica profunda con experiencia en startups para transformar tu visión en realidad. Nuestro enfoque está en construir MVPs que importan.",
    "about.robin.name": "Robin",
    "about.robin.title": "Líder de Startups e Innovación",
    "about.robin.mission": "Transformando ideas complejas en MVPs enfocados y listos para el mercado",
    "about.robin.achievement": "10+ MVPs exitosos lanzados",
    "about.robin.skill1": "Estrategia MVP",
    "about.robin.skill2": "Desarrollo de Productos IT",
    "about.robin.skill3": "Análisis de Mercado",
    "about.robin.skill4": "Growth Hacking",
    "about.robin.skill5": "Liderazgo de Equipo",
    "about.chris.name": "Chris",
    "about.chris.title": "Líder de Arquitectura Técnica e IA",
    "about.chris.mission": "Construyendo bases escalables para las innovaciones del mañana",
    "about.chris.achievement": "12+ Años de Experiencia Técnica",
    "about.chris.skill1": "Arquitectura de Sistemas",
    "about.chris.skill2": "Desarrollo de IA",
    "about.chris.skill3": "Ingeniería MVP",
    "about.chris.skill4": "Infraestructura Cloud",
    "about.chris.skill5": "Liderazgo Técnico",
    "about.mission.title": "MISIÓN",
    
    // ComparisonMatrix Section
    "comparison.title": "Elige tu Opción Perfecta",
    "comparison.description": "Compara enfoques y encuentra la mejor solución para tus necesidades de desarrollo MVP.",
    "comparison.hover": "Pasa el cursor sobre cualquier icono para una explicación más detallada",
    "comparison.criteria": "Criterios",
    "comparison.our.service": "Nuestro Servicio MVP",
    "comparison.traditional": "Agencia Tradicional",
    "comparison.nocode": "Herramientas No-Code",
    "comparison.strategic.title": "Planificación Estratégica",
    "comparison.strategic.our": "Planificación estratégica integral con enfoque en objetivos clave de negocio",
    "comparison.strategic.traditional": "Enfoque estándar de planificación de proyectos",
    "comparison.strategic.nocode": "Capacidades básicas de planificación",
    "comparison.cost.title": "Eficiencia de Costos",
    "comparison.cost.our": "Estructura de precios optimizada con máxima entrega de valor",
    "comparison.cost.traditional": "Modelos de precios tradicionales con gastos generales",
    "comparison.cost.nocode": "Precios basados en suscripción con limitaciones",
    "comparison.agility.title": "Agilidad de Desarrollo",
    "comparison.agility.our": "Desarrollo rápido y flexible con adaptación continua",
    "comparison.agility.traditional": "Proceso de desarrollo estructurado pero más lento",
    "comparison.agility.nocode": "Capacidades de desarrollo limitadas",
    "comparison.expertise.title": "Experiencia Técnica",
    "comparison.expertise.our": "Soluciones técnicas de vanguardia con integración de IA",
    "comparison.expertise.traditional": "Fuertes capacidades técnicas pero costos más altos",
    "comparison.expertise.nocode": "Restringido a las capacidades de la plataforma",
    "comparison.scalability.title": "Escalabilidad",
    "comparison.scalability.our": "Construido para el crecimiento con arquitectura a prueba de futuro",
    "comparison.scalability.traditional": "Proceso de escalado complejo y costoso",
    "comparison.scalability.nocode": "Las limitaciones de la plataforma afectan la escalabilidad",
    
    // Our Services Section
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Soluciones integrales para tu viaje digital",
    "services.idea.title": "Análisis de Ideas",
    "services.idea.description": "Profundizamos en tu visión para entender tus necesidades y validar tu oportunidad de mercado",
    "services.consultancy.title": "Consultoría Inteligente",
    "services.consultancy.description": "Eliminamos lo innecesario y nos enfocamos en lo que realmente importa para el éxito de tu MVP",
    "services.scoping.title": "Alcance y Planificación",
    "services.scoping.description": "Límites claros del proyecto, cronograma y entregables clave para un desarrollo eficiente",
    "services.development.title": "Desarrollo",
    "services.development.description": "Progreso transparente con colaboración cercana y actualizaciones regulares",
    "services.launch.title": "Lanzamiento y Soporte",
    "services.launch.description": "Tu MVP, listo para el mercado con soporte y orientación continua",
    "services.ai.title": "Integración de IA",
    "services.ai.description": "Mejora tu MVP con capacidades de IA de última generación y automatizaciones inteligentes",
    
    // FAQ Section
    "faq.title": "Preguntas Frecuentes",
    "faq.subtitle": "FAQ",
    "faq.description": "Encuentra respuestas a preguntas comunes sobre nuestro proceso de desarrollo MVP y servicios. ¿No encuentras lo que buscas? Contacta a nuestro equipo.",
    "faq.search.placeholder": "Buscar preguntas...",
    "faq.no.results": "No se encontraron preguntas que coincidan con tu búsqueda",
    "faq.try.again": "Intenta ajustar tu búsqueda o filtros",
    "faq.more.questions": "¿Aún tienes preguntas?",
    "faq.contact.support": "Contacta a nuestro equipo de soporte",

    // Categories
    "faq.categories.all": "Todas las Preguntas",
    "faq.categories.expertise": "Experiencia",
    "faq.categories.process": "Proceso",
    "faq.categories.support": "Soporte",

    // Questions
    "faq.questions.industries": "¿En qué industrias o tipos de startups se especializan?",
    "faq.questions.technical": "¿Necesito tener conocimientos técnicos para trabajar con ustedes?",
    "faq.questions.feedback": "¿Cómo manejan los cambios y el feedback durante el desarrollo?",
    "faq.questions.fulldev": "Si quiero convertir mi MVP en un producto completo, ¿pueden manejar el ciclo completo de desarrollo?",
    "faq.questions.support": "¿Proporcionan soporte o mantenimiento post-lanzamiento?",
    "faq.questions.confidentiality": "¿Puedo confiar en que no robarán mi idea?",
    "faq.questions.pricing": "¿Ofrecen planes de pago o precios flexibles?",
    "faq.questions.fundraising": "¿Pueden ayudar con la recaudación de fondos o presentaciones a inversores?",

    // Answers
    "faq.answers.industries": "Nos especializamos en <strong>MVPs de software</strong>, particularmente para SaaS, aplicaciones basadas en IA, plataformas digitales y herramientas de automatización. Si tu startup involucra software, IA o soluciones web, estamos aquí para ayudarte a construir un MVP eficiente y de alto impacto que te lleve rápidamente al mercado.",
    "faq.answers.technical": "¡Para nada! <strong>Nosotros manejamos todos los detalles técnicos</strong> mientras te mantenemos informado de manera fácil de entender. Te aseguramos que podrás tomar las decisiones correctas sobre tu MVP <strong>sin necesitar ser un experto técnico.</strong> Nuestro objetivo es empoderarte sin abrumarte.",
    "faq.answers.feedback": "Antes de comenzar el desarrollo, trabajamos contigo para definir el <strong>alcance esencial del MVP</strong>—asegurando que incluya todo lo que necesitas y nada que no necesites. Si decides que necesitas cambios o características adicionales durante el proceso, es totalmente posible, aunque <strong>pueden aplicar costos adicionales</strong>. Mantenemos la flexibilidad para adaptarnos mientras mantenemos tus objetivos en foco.",
    "faq.answers.fulldev": "¡Absolutamente! Si tu MVP tiene éxito, podemos continuar trabajando contigo para escalarlo a un <strong>producto completamente desarrollado</strong>—agregando nuevas características, integraciones y optimizaciones para apoyar tu crecimiento.",
    "faq.answers.support": "¡Sí! Ofrecemos <strong>paquetes de soporte continuo, mantenimiento y consultoría</strong> para mantener tu software y tu proyecto funcionando sin problemas después del lanzamiento. Estos servicios son opcionales y están disponibles por un costo adicional, asegurando que tu producto permanezca estable y listo para crecer.",
    "faq.answers.confidentiality": "Absolutamente. <strong>Tu idea sigue siendo 100% tuya</strong>. Nos tomamos la confidencialidad muy en serio y estamos dispuestos a firmar un <strong>NDA (Acuerdo de Confidencialidad)</strong> o cualquier otro documento legal para proteger tu propiedad intelectual. Estamos aquí para construir tu visión, no para tomarla.",
    "faq.answers.pricing": "¡Sí! Entendemos que las startups tienen diferentes situaciones financieras, por lo que ofrecemos <strong>modelos de precios flexibles y planes de pago</strong> caso por caso. Ya sea que necesites distribuir los pagos en el tiempo o trabajar con un presupuesto ajustado, estamos abiertos a encontrar una solución que te convenga.",
    "faq.answers.fundraising": "Si bien <strong>no es nuestro servicio principal,</strong> tenemos valiosa experiencia con <strong>aceleradoras, presentaciones a inversores y financiamiento de startups.</strong> Podemos brindarte orientación, perspectivas y ayudarte a crear una presentación convincente, pero nuestro enfoque principal sigue siendo la construcción de tu MVP.",
    
    // Chat Sequences
    "chat.sarah.name": "Sarah Chen",
    "chat.sarah.message": "¿Pueden construir una plataforma SaaS mobile-first?",
    "chat.sarah.response": "Nos especializamos en desarrollo moderno de SaaS. Aquí está nuestro enfoque probado para construir plataformas escalables:",
    "chat.sarah.timeline.design.title": "Sprint de Diseño",
    "chat.sarah.timeline.design.desc": "Investigación UX y diseño UI moderno",
    "chat.sarah.timeline.dev.title": "Desarrollo Rápido",
    "chat.sarah.timeline.dev.desc": "Construcción de aplicación web progresiva",
    "chat.sarah.timeline.launch.title": "Lanzamiento",
    "chat.sarah.timeline.launch.desc": "Despliegue de MVP en 3 semanas",
    
    "chat.marcus.name": "Marcus Thompson",
    "chat.marcus.message": "Busco construir un SaaS B2B impulsado por IA para startups",
    "chat.marcus.response": "¡Momento perfecto! Crearemos una plataforma de IA de vanguardia adaptada para startups. Esto es lo que ofrecemos:",
    "chat.marcus.features.ai.title": "Integración de IA Core",
    "chat.marcus.features.ai.desc": "Implementación LLM personalizada y gestión de API",
    "chat.marcus.features.startup.title": "Funciones Listas para Startups",
    "chat.marcus.features.startup.desc": "Arquitectura multi-tenant e infraestructura escalable",
    "chat.marcus.features.analytics.title": "Panel de Análisis",
    "chat.marcus.features.analytics.desc": "Métricas en tiempo real y análisis de IA",
    
    "chat.elena.name": "Elena Rodriguez",
    "chat.elena.message": "Necesito una plataforma de comercio electrónico premium, no la típica plantilla de Shopify",
    "chat.elena.response": "Crearemos una experiencia de comercio electrónico distintiva que te diferencie. Aquí está nuestro enfoque personalizado:",
    "chat.elena.features.shopping.title": "Experiencia de Compra Personalizada",
    "chat.elena.features.shopping.desc": "UI/UX única con vista previa de productos en RA",
    "chat.elena.features.analytics.title": "Análisis Avanzado",
    "chat.elena.features.analytics.desc": "Insights de clientes e IA con recomendaciones",
    "chat.elena.features.integration.title": "Integración Perfecta",
    "chat.elena.features.integration.desc": "Sistemas de pago e inventario personalizados",
    
    "chat.james.name": "James Wilson",
    "chat.james.message": "Quiero construir una app de seguimiento de hábitos con funciones sociales",
    "chat.james.response": "Crearemos una plataforma de seguimiento de hábitos atractiva que mantenga a los usuarios motivados. Aquí está nuestra hoja de ruta de desarrollo:",
    "chat.james.timeline.ux.title": "Diseño de Experiencia de Usuario",
    "chat.james.timeline.ux.desc": "Seguimiento gamificado e interacciones sociales",
    "chat.james.timeline.features.title": "Funciones Principales",
    "chat.james.timeline.features.desc": "Rachas de hábitos, desafíos y gráfico social",
    "chat.james.timeline.analytics.title": "Análisis y Estadísticas",
    "chat.james.timeline.analytics.desc": "Visualización de progreso y recomendaciones IA",
    
    "chat.lisa.name": "Lisa Chang",
    "chat.lisa.message": "Necesito consultoría de IA para nuestra propuesta de valor",
    "chat.lisa.response": "Te ayudaremos a aprovechar la IA para crear valor convincente para tus clientes. Nuestro proceso de consulta incluye:",
    "chat.lisa.features.analysis.title": "Análisis de Oportunidades de IA",
    "chat.lisa.features.analysis.desc": "Investigación de mercado y posicionamiento competitivo",
    "chat.lisa.features.strategy.title": "Taller de Estrategia",
    "chat.lisa.features.strategy.desc": "Hoja de ruta de integración de IA y proyección de ROI",
    "chat.lisa.features.implementation.title": "Guía de Implementación",
    "chat.lisa.features.implementation.desc": "Requisitos técnicos y planificación de recursos",
    
    "chat.david.name": "David Park",
    "chat.david.message": "Busco construir una aplicación de notas con IA y grabación de voz",
    "chat.david.response": "Crearemos una potente plataforma de toma de notas mejorada con IA. Esto es lo que ofreceremos:",
    "chat.david.features.voice.title": "Reconocimiento de Voz",
    "chat.david.features.voice.desc": "Transcripción en tiempo real y búsqueda semántica",
    "chat.david.features.ai.title": "Procesamiento IA",
    "chat.david.features.ai.desc": "Auto-resumen y extracción de temas",
    "chat.david.features.organization.title": "Organización Inteligente",
    "chat.david.features.organization.desc": "Etiquetado y categorización impulsados por IA",
    
    "chat.rachel.name": "Rachel Martinez",
    "chat.rachel.message": "¿Pueden ayudar a crear una plataforma rápida de generación de contenido para nuestro equipo de marketing?",
    "chat.rachel.response": "Construiremos una plataforma de aceleración de contenido impulsada por IA adaptada a tu marca. Aquí está nuestra solución:",
    "chat.rachel.timeline.engine.title": "Configuración del Motor IA",
    "chat.rachel.timeline.engine.desc": "Entrenamiento LLM personalizado e integración de voz de marca",
    "chat.rachel.timeline.workflow.title": "Flujo de Trabajo de Contenido",
    "chat.rachel.timeline.workflow.desc": "Plantillas, programación y sistema de aprobación",
    "chat.rachel.timeline.analytics.title": "Suite de Análisis",
    "chat.rachel.timeline.analytics.desc": "Seguimiento de rendimiento y optimización de contenido",
    
    // Navigation and common elements
    "nav.about": "Acerca de",
    "nav.services": "Servicios",
    "nav.pricing": "Precios",
    "nav.contact": "Contacto",
    "nav.mission": "Nuestra Misión",
    "nav.faq": "Preguntas Frecuentes",
    "language": "Idioma",
    "theme": "Tema"
  },
  de: {
    // Hero Section
    "hero.title.fast": "Schnell. Smart.",
    "hero.title.mvp": "Dein MVP, perfekt umgesetzt.",
    "hero.description": "Erhalte Dein Software-MVP in 6 Wochen und spare 30% Entwicklungskosten.",
    "hero.button.estimate": "Preisschätzung erhalten",
    "hero.button.contact": "Kontaktiere uns",
    "hero.stats.mvps": "MVPs entwickelt",
    "hero.stats.experience": "Jahre Erfahrung",
    "hero.stats.clients": "zufriedene Kunden",
    "hero.stats.team": "Teamgröße",
    
    // Why We Do This Section
    "why.title": "Warum wir das machen?",
    "why.subtitle": "Wir glauben, dass jede mutige Idee eine Chance verdient.",
    "why.paragraph1": "Oft scheitern visionäre Gründer daran, ihre Ideen in die Tat umzusetzen - nicht weil sie schlecht sind, sondern weil unnötige Hürden im Weg stehen. Hohe Kosten für ein MVP mit überflüssigen Features und falsche Beratung lassen großartige Konzepte untergehen, bevor sie überhaupt den Markt erreichen.",
    "why.paragraph2": "Wir haben das schon zu häufig erlebt. Wir wissen, wie frustrierend es ist, eine bahnbrechende Idee zu haben und an unnötiger Komplexität zu scheitern. <span className=\"font-semibold text-foreground\">Genau deshalb sind wir hier - um diese Barrieren aus dem Weg zu räumen.</span>",
    
    // Roadmap Section
    "roadmap.title": "Wie Wir Es Umsetzen",
    "roadmap.subtitle": "Unsere strukturierte Methode, um Deine Vision in die Realität umzusetzen.",
    "roadmap.features.title": "Die Roadmap zu Deinem MVP",
    
    // Roadmap Features
    "roadmap.feature1.title": "\"Vision-First\" Ansatz",
    "roadmap.feature1.description": "Wir verstehen, dass jedes großartige Produkt mit einer visionären Idee beginnt. Unser Fokus liegt darauf, Deine Vision zu bewahren und gleichzeitig marktreif zu machen.",
    
    "roadmap.feature2.title": "Effiziente Entwicklung",
    "roadmap.feature2.description": "Keine unnötige Komplexität. Wir bauen genau das, was Du brauchst, um Deine Idee zu validieren und selbstbewusst im Markt zu testen.",
    
    "roadmap.feature3.title": "Skalierbarkeit inklusive",
    "roadmap.feature3.description": "Wir fokussieren uns auf das Wesentliche des MVPs und stellen gleichzeitig sicher, dass dieses Fundament solide und skalierbar für zukünftiges Wachstum ist.",
    
    // Roadmap Steps
    "roadmap.step1.title": "Ideenanalyse",
    "roadmap.step1.description": "1. Wir tauchen in Deine Vision ein, um deine Bedürfnisse zu verstehen und den Markt zu analysieren den Markt.",
    "roadmap.step1.feature1.title": "Markteinblicke",
    "roadmap.step1.feature1.description": "Analyse aktueller Trends und Branchenbewegungen, um Dein MVP optimal zu positionieren.",
    "roadmap.step1.feature2.title": "Nutzerfokus",
    "roadmap.step1.feature2.description": "Verständnis für die Wünsche, Bedürfnisse und Pain-Points Deiner Zielgruppe.",
    "roadmap.step1.feature3.title": "Wettbewerbsvorteil",
    "roadmap.step1.feature3.description": "Konkurrenzanalyse zur Identifikation einzigartiger Differenzierungsmerkmale.",
    "roadmap.step1.feature4.title": "Erfolgsvalidierung",
    "roadmap.step1.feature4.description": "Prüfung des Marktpotenzials und der langfristigen Tragfähigkeit Deiner Idee.",
    
    "roadmap.step2.title": "MVP-Optimierung",
    "roadmap.step2.description": "2. Wir schärfen Dein Konzept und setzen klare Prioritäten für eine smarte und (kosten-)effiziente Umsetzung.",
    "roadmap.step2.feature1.title": "Kernfunktionen definieren",
    "roadmap.step2.feature1.description": "Identifikation der essenziellen Features für ein leistungsfähiges MVP.",
    "roadmap.step2.feature2.title": "Technologiebasis",
    "roadmap.step2.feature2.description": "Auswahl der optimalen Architektur für Skalierbarkeit und Performance.",
    "roadmap.step2.feature3.title": "Effiziente Ressourcenplanung",
    "roadmap.step2.feature3.description": "Gezielte Zuweisung von Budget und Zeit für maximale Wirkung.",
    "roadmap.step2.feature4.title": "Risikominimierung",
    "roadmap.step2.feature4.description": "Frühzeitiges Identifizieren und Umgehen potenzieller Stolpersteine.",
    
    "roadmap.step3.title": "Roadmap-Planung",
    "roadmap.step3.description": "3. Wir definieren den Scope, setzen klare Meilensteine und gestalten eine realistische Roadmap.",
    "roadmap.step3.feature1.title": "Detaillierte Roadmap",
    "roadmap.step3.feature1.description": "Erstellung einer präzisen, praxisnahen Roadmap für die Entwicklung des MVPs.",
    "roadmap.step3.feature2.title": "Meilensteinstrategie",
    "roadmap.step3.feature2.description": "Messbare Etappenziele für maximale Transparenz und Kontrolle.",
    "roadmap.step3.feature3.title": "Klare Projektgrenzen",
    "roadmap.step3.feature3.description": "Präzise Definition des Projektumfangs für klare Erwartungen.",
    "roadmap.step3.feature4.title": "Ergebnisorientierte Planung",
    "roadmap.step3.feature4.description": "Strukturierte Definition aller wesentlichen Deliverables.",
    
    "roadmap.step4.title": "Agile Entwicklung",
    "roadmap.step4.description": "4. Transparenz, Zusammenarbeit und kontinuierliche Updates - Du behältst jederzeit die Kontrolle!",
    "roadmap.step4.feature1.title": "Iterativer Entwicklungsprozess",
    "roadmap.step4.feature1.description": "Flexibles, agiles Vorgehen für schnelle Anpassungen.",
    "roadmap.step4.feature2.title": "Qualitätssicherung",
    "roadmap.step4.feature2.description": "Kontinuierliche Tests für höchste Zuverlässigkeit und Stabilität.",
    "roadmap.step4.feature3.title": "Echtzeit-Updates",
    "roadmap.step4.feature3.description": "Regelmäßige Updates und Fortschrittsberichte für volle Transparenz.",
    "roadmap.step4.feature4.title": "Enge Zusammenarbeit",
    "roadmap.step4.feature4.description": "Partnerschaftliches Arbeiten für Dein maßgeschneidertes MVP.",
    
    "roadmap.step5.title": "Launch & Support",
    "roadmap.step5.description": "5. Dein MVP ist marktreif! Wir begleiten den Start und bieten langfristige Unterstützung.",
    "roadmap.step5.feature1.title": "Markteintrittsstrategie",
    "roadmap.step5.feature1.description": "Durchdachte Rollout-Planung für maximale Wirkung.",
    "roadmap.step5.feature2.title": "User-Feedback integrieren",
    "roadmap.step5.feature2.description": "Smarte Mechanismen zur kontinuierlichen Optimierung.",
    "roadmap.step5.feature3.title": "Performance-Boost",
    "roadmap.step5.feature3.description": "Laufende Optimierung für Skalierbarkeit und Effizienz.",
    "roadmap.step5.feature4.title": "Langfristiger Support",
    "roadmap.step5.feature4.description": "Zuverlässige technische und strategische Begleitung.",

    
    // Pricing Section
    "pricing.title": "Erhalte eine personalisierte Preiseinschätzung",
    "pricing.description": "Unser KI-Assistent hilft bei der Bewertung Deines Projektumfangs, um Dir eine wettbewerbsfähige Preisschätzung zu bieten. Mit unserem intelligenten Planungsansatz können wir die Kosten erheblich senken und gleichzeitig die Qualität beibehalten.",
    "pricing.estimation": "Deine Preisschätzung ist",
    "pricing.placeholder.input": "Nachricht eingeben...",
    "pricing.placeholder.locked": "Chat ist gesperrt. Drücke Reset, um neu zu beginnen.",
    
    // BannerCTA Section
    "banner.title": "Wir sind nicht nur MVP-Entwickler",
    "banner.description": "Wir sind Problemlöser, Zukunftsdenker und Startup-Insider. Wir glauben an die Schaffung von echtem Mehrwert. Wenn Du die Vision hast, haben wir den Fahrplan, um sie zu verwirklichen!",
    "banner.button": "Jetzt starten",
    
    // CTA Section
    "cta.title": "Bereit, das nächste große Ding zu launchen? Lass uns reden!",
    "cta.description": "Starte jetzt. Der <span class=\"font-semibold text-foreground\">richtige MVP</span> zum <span class=\"font-semibold text-foreground\">richtigen Preis</span> — nicht mehr, nicht weniger. Wir sind nur <span class=\"font-semibold text-foreground\">einen Klick entfernt</span>.",
    "cta.email": "E-Mail",
    "cta.linkedin": "LinkedIn",
    "cta.form.email": "E-Mail",
    "cta.form.email.placeholder": "mail@beispiel.de",
    "cta.form.message": "Nachricht",
    "cta.form.message.placeholder": "Erzähle uns von Deinem Projekt...",
    "cta.form.button.sending": "Wird gesendet...",
    "cta.form.button.send": "MVP-Schätzung erhalten",
    "cta.success.title": "Vielen Dank für Deine Anfrage!",
    "cta.success.message": "Wir werden uns innerhalb von 24 Stunden mit einer detaillierten Schätzung bei Dir unter {email} melden.",
    
    // Form validation messages
    "cta.validation.required": "Dieses Feld ist erforderlich",
    "cta.validation.email": "Bitte gib eine gültige E-Mail-Adresse ein",
    "cta.validation.minLength": "Die Nachricht muss mindestens 10 Zeichen lang sein",
    "cta.validation.maxLength": "Die Nachricht ist zu lang (maximal 5000 Zeichen)",
    
    // AboutUs Section
    "about.title": "Wer Wir Sind",
    "about.description": "Wir kombinieren tiefgreifende technische Expertise mit Startup-Erfahrung, um Deine Vision in die Realität umzusetzen. Wir fokussieren uns auf MVPs, die Impact haben.",
    "about.robin.name": "Robin",
    "about.robin.title": "Startup- & Innovation-Lead",
    "about.robin.mission": "Komplexe Ideen in fokussierte, marktreife MVPs umwandeln",
    "about.robin.achievement": "10+ erfolgreiche MVPs gelauncht",
    "about.robin.skill1": "MVP-Strategie",
    "about.robin.skill2": "IT-Produkt-entwicklung",
    "about.robin.skill3": "Marktanalyse",
    "about.robin.skill4": "Growth Hacking",
    "about.robin.skill5": "Teamführung",
    "about.chris.name": "Chris",
    "about.chris.title": "Technische Architektur & KI-Experte",
    "about.chris.mission": "Skalierbare Grundlagen für die Innovationen von morgen aufbauen",
    "about.chris.achievement": "12+ Jahre IT-Erfahrung",
    "about.chris.skill1": "System-architektur",
    "about.chris.skill2": "KI-Entwicklung",
    "about.chris.skill3": "MVP-Engineering",
    "about.chris.skill4": "Cloud-Infrastruktur",
    "about.chris.skill5": "Technische Führung",
    "about.mission.title": "MISSION",
    
    // ComparisonMatrix Section
    "comparison.title": "Finde Deine perfekte Lösung",
    "comparison.description": "Vergleiche die Ansätze und finde die beste Lösung für Dein MVP-Bedarf.",
    "comparison.hover": "Bewege den Mauszeiger über die Symbole für eine ausführlichere Erklärung",
    "comparison.criteria": "Kriterien",
    "comparison.our.service": "Unser MVP-Service",
    "comparison.traditional": "Traditionelle Agentur",
    "comparison.nocode": "No-Code-Tools",
    "comparison.strategic.title": "Strategische Planung",
    "comparison.strategic.our": "Umfassende strategische Planung mit Fokus auf wichtige Geschäftsziele",
    "comparison.strategic.traditional": "Standardmäßiger Projektplanungsansatz",
    "comparison.strategic.nocode": "Grundlegende Planungsfähigkeiten",
    "comparison.cost.title": "Kosteneffizienz",
    "comparison.cost.our": "Optimierte Preisstruktur mit maximaler Wertschöpfung",
    "comparison.cost.traditional": "Traditionelle Preismodelle mit Overhead",
    "comparison.cost.nocode": "Abonnementbasierte Preise mit Einschränkungen",
    "comparison.agility.title": "Entwicklungsagilität",
    "comparison.agility.our": "Schnelle, flexible Entwicklung mit kontinuierlicher Anpassung",
    "comparison.agility.traditional": "Strukturierter, aber langsamerer Entwicklungsprozess",
    "comparison.agility.nocode": "Begrenzte Entwicklungsmöglichkeiten",
    "comparison.expertise.title": "Technische Expertise",
    "comparison.expertise.our": "Hochmoderne technische Lösungen mit KI-Integration",
    "comparison.expertise.traditional": "Starke technische Fähigkeiten, aber höhere Kosten",
    "comparison.expertise.nocode": "Auf Plattformfunktionen beschränkt",
    "comparison.scalability.title": "Skalierbarkeit",
    "comparison.scalability.our": "Für Wachstum mit zukunftssicherer Architektur gebaut",
    "comparison.scalability.traditional": "Komplexer und kostspieliger Skalierungsprozess",
    "comparison.scalability.nocode": "Plattformbeschränkungen beeinträchtigen die Skalierbarkeit",
    
    // Our Services Section
    "services.title": "Unsere Dienstleistungen",
    "services.subtitle": "Umfassende Lösungen für Ihre digitale Reise",
    "services.idea.title": "Ideenanalyse",
    "services.idea.description": "Wir tauchen in Ihre Vision ein, um Ihre Bedürfnisse zu verstehen und Ihre Marktchance zu validieren",
    "services.consultancy.title": "Intelligente Beratung",
    "services.consultancy.description": "Wir kürzen das Überflüssige und konzentrieren uns auf das, was für den Erfolg Ihres MVP wirklich wichtig ist",
    "services.scoping.title": "Umfang & Fahrplan",
    "services.scoping.description": "Klare Projektgrenzen, Zeitplan und wichtige Lieferables für eine effiziente Entwicklung",
    "services.development.title": "Entwicklung",
    "services.development.description": "Transparenter Fortschritt mit enger Zusammenarbeit und regelmäßigen Updates",
    "services.launch.title": "Start & Support",
    "services.launch.description": "Ihr MVP, bereit für den Markt mit laufender Unterstützung und Beratung",
    "services.ai.title": "KI-Integration",
    "services.ai.description": "Erweitern Sie Ihren MVP mit modernsten KI-Funktionen und intelligenten Automatisierungen",
    
    // FAQ Section
    "faq.title": "Häufig gestellte Fragen",
    "faq.subtitle": "FAQ",
    "faq.description": "Finde die Antworten auf häufig gestellte Fragen zu unserem MVP-Development-Prozess und unseren Dienstleistungen. Du findest nicht, wonach Du suchst? Kontaktiere unser Team.",
    "faq.search.placeholder": "Fragen durchsuchen...",
    "faq.no.results": "Keine Fragen gefunden, die Deinen Kriterien entsprechen",
    "faq.try.again": "Versuche, Deine Suche oder Filter anzupassen",
    "faq.more.questions": "Hast Du noch Fragen?",
    "faq.contact.support": "Kontaktiere unser Support-Team",

    // Categories
    "faq.categories.all": "Alle Fragen",
    "faq.categories.expertise": "Expertise",
    "faq.categories.process": "Prozess",
    "faq.categories.support": "Support",

    // Questions
    "faq.questions.industries": "Auf welche Branchen oder Arten von Startups seid Ihr spezialisiert?",
    "faq.questions.technical": "Muss ich technisches Wissen haben, um mit Euch zusammenzuarbeiten?",
    "faq.questions.feedback": "Wie geht Ihr mit Feedback und Änderungen während der Entwicklung um?",
    "faq.questions.fulldev": "Wenn ich mein MVP zu einem vollständigen Produkt machen möchte, könnt Ihr das auch übernehmen?",
    "faq.questions.support": "Bietet Ihr auch Support und Wartung nach dem Launch an?",
    "faq.questions.confidentiality": "Kann ich darauf vertrauen, dass Ihr meine Idee nicht stehlt?",
    "faq.questions.pricing": "Bietet Ihr Zahlungspläne oder flexible Preisgestaltungen an?",
    "faq.questions.fundraising": "Könnt Ihr bei Investments oder bei Pitch-Präsentationen für Investoren helfen?",

    // Answers
    "faq.answers.industries": "Wir konzentrieren uns auf <strong>Software-MVPs</strong>, insbesondere SaaS, KI-gestützte Anwendungen, digitale Plattformen und Automatisierungstools. Wenn Dein Startup Software, KI oder webbasierte Lösungen umfasst, sind wir die Richtigen. Wir helfen Dir beim Aufbau eines schlanken, wirkungsvollen MVPs, das Deine Idee schnell auf den Markt bringt.",
    "faq.answers.technical": "Überhaupt nicht! <strong>Wir kümmern uns um alle technischen Details</strong> und halten Dich auf einfach verständliche Weise auf dem Laufenden. Wir stellen sicher, dass Du die richtigen Entscheidungen für Dein MVP treffen kannst, <strong>ohne ein IT-Profi sein zu müssen.</strong> Wir geben dir die Power, ohne dich zu überfordern.",
    "faq.answers.feedback": "Bevor die eigentliche Entwicklung beginnt, arbeiten wir eng mit Dir zusammen, um den <strong>wesentlichen MVP-Umfang zu definieren</strong> – und stellen sicher, dass er genau das enthält, was Du brauchst. Wenn Du während des Prozesses Änderungen oder zusätzliche Funktionen benötigst, ist das durchaus möglich, dabei können dann aber <strong>zusätzliche Kosten anfallen</strong>. Wir bleiben flexibel, aber behalten Deine Ziele immer im Auge.",
    "faq.answers.fulldev": "Absolut! Wenn sich Deine Idee als erfolgreich erweist, können wir jederzeit weiter mit Dir zusammenarbeiten. Wir können Dein MVP zu einem <strong>vollständig entwickelten Produkt</strong> skalieren - mit neuen Funktionen, Integrationen und Optimierungen zur Unterstützung Deines Wachstums.",
    "faq.answers.support": "Ja, das tun wir! Wir bieten <strong>laufende Support-, Wartungs- und Beratungspakete</strong> an, um Deine Software und Dein Projekt nach dem Start reibungslos laufen zu lassen. Das Ganze ist natürlich optional. Auf diese Weise kannst du sicherzustellen, dass Deine Software bereit für weiteres Wachstum bleibt.",
    "faq.answers.confidentiality": "Absolut. <strong>Deine Idee bleibt zu 100% Deine</strong>. Wir nehmen Vertraulichkeit sehr ernst und unterzeichnen gerne eine <strong>NDA (Geheimhaltungsvereinbarung)</strong> zum Schutz Deines geistigen Eigentums. Wir sind hier, um Deine Vision in die Realität umzusetzen – nicht, um sie zu übernehmen.",
    "faq.answers.pricing": "Ja! Wir verstehen, dass die finanzielle Situation kurz nach der Gründung eines Unternehmens herausfordernd sein kann, daher bieten wir <strong>flexible Preismodelle und Zahlungspläne</strong> an. Ob Du Zahlungen über einen Zeitraum verteilen oder mit einem engen Budget arbeiten musst, wir sind offen dafür, eine Lösung zu finden, die zu Dir passt.",
    "faq.answers.fundraising": "Obwohl <strong>es nicht unser Kerngeschäft ist,</strong> haben wir langjährige Erfahrung mit <strong>Accelerators, Investorenpräsentationen und Startup-Finanzierung.</strong> Wir können Dir Anleitungen und Einblicke geben und Dir helfen, eine überzeugende Präsentation zu erstellen. Aber unser Hauptfokus bleibt die Entwicklung deines MVPs.",
    
    // Chat Sequences
    "chat.sarah.name": "Sarah Haselmann",
    "chat.sarah.message": "Könnt Ihr eine Mobile-First-SaaS-Plattform entwickeln?",
    "chat.sarah.response": "Wir sind auf moderne SaaS-Entwicklung spezialisiert. Hier ist unser bewährter Ansatz zum Aufbau skalierbarer Plattformen:",
    "chat.sarah.timeline.design.title": "Design Sprint",
    "chat.sarah.timeline.design.desc": "UX-Forschung & modernes UI-Design",
    "chat.sarah.timeline.dev.title": "Schnelle Entwicklung",
    "chat.sarah.timeline.dev.desc": "Progressive Web-App-Entwicklung",
    "chat.sarah.timeline.launch.title": "Start",
    "chat.sarah.timeline.launch.desc": "MVP-Bereitstellung in 3 Wochen",
    
    "chat.marcus.name": "Markus Karff",
    "chat.marcus.message": "Ich möchte ein KI-gestütztes B2B-SaaS für Startups entwickeln",
    "chat.marcus.response": "Perfektes Timing! Wir erstellen eine hochmoderne KI-Plattform für Startups. Hier ist, was wir liefern:",
    "chat.marcus.features.ai.title": "KI-Kernintegration",
    "chat.marcus.features.ai.desc": "Benutzerdefinierte LLM-Implementierung & API-Management",
    "chat.marcus.features.startup.title": "Individuelle Startup Funktionen",
    "chat.marcus.features.startup.desc": "Multi-Tenant-Architektur & skalierbare Infrastruktur",
    "chat.marcus.features.analytics.title": "Analytics Dashboard",
    "chat.marcus.features.analytics.desc": "Echtzeit-Metriken & KI-Einblicke",
    
    "chat.elena.name": "Elena Rodriguez",
    "chat.elena.message": "Ich brauche eine Premium-E-Commerce-Plattform, keine gewöhnliche Shopify-Vorlage",
    "chat.elena.response": "Wir erstellen ein einzigartiges E-Commerce-Erlebnis, das Dich von der Konkurrenz abhebt. Hier ist unser maßgeschneiderter Ansatz:",
    "chat.elena.features.shopping.title": "Individuelles Einkaufserlebnis",
    "chat.elena.features.shopping.desc": "Einzigartige UI/UX mit AR-Produktvorschauen",
    "chat.elena.features.analytics.title": "Erweiterte Analysen",
    "chat.elena.features.analytics.desc": "KI-gestützte Kundeneinblicke & Empfehlungen",
    "chat.elena.features.integration.title": "Nahtlose Integration",
    "chat.elena.features.integration.desc": "Benutzerdefinierte Zahlungs- & Lagersysteme",
    
    "chat.james.name": "Jan Wilson",
    "chat.james.message": "Ich möchte eine Gewohnheits-Tracking-App mit sozialen Funktionen entwickeln",
    "chat.james.response": "Wir erstellen eine ansprechende Gewohnheits-Tracking-Plattform, die Benutzer motiviert hält. Hier ist unsere Entwicklungs-Roadmap:",
    "chat.james.timeline.ux.title": "Benutzererfahrungsdesign",
    "chat.james.timeline.ux.desc": "Spielerisches Tracking & soziale Interaktionen",
    "chat.james.timeline.features.title": "Kernfunktionen",
    "chat.james.timeline.features.desc": "Gewohnheitsserien, Herausforderungen & soziales Netzwerk",
    "chat.james.timeline.analytics.title": "Analysen & Einblicke",
    "chat.james.timeline.analytics.desc": "Fortschrittsvisualisierung & KI-Empfehlungen",
    
    "chat.lisa.name": "Lisa Hanuver",
    "chat.lisa.message": "Brauche KI-Beratung für unser Wertversprechen",
    "chat.lisa.response": "Wir helfen Dir, KI zu nutzen, um überzeugenden Mehrwert für Ihre Kunden zu schaffen. Unser Beratungsprozess umfasst:",
    "chat.lisa.features.analysis.title": "KI-Chancenanalyse",
    "chat.lisa.features.analysis.desc": "Marktforschung & Wettbewerbspositionierung",
    "chat.lisa.features.strategy.title": "Strategie-Workshop",
    "chat.lisa.features.strategy.desc": "KI-Integrationsfahrplan & ROI-Projektion",
    "chat.lisa.features.implementation.title": "Implementierungsleitfaden",
    "chat.lisa.features.implementation.desc": "Technische Anforderungen & Ressourcenplanung",
    
    "chat.david.name": "David Parker",
    "chat.david.message": "Ich möchte eine KI-Notiz-App mit Sprachaufzeichnung entwickeln",
    "chat.david.response": "Wir erstellen eine leistungsstarke KI-erweiterte Notizplattform. Hier ist, was wir liefern werden:",
    "chat.david.features.voice.title": "Spracherkennung",
    "chat.david.features.voice.desc": "Echtzeit-Transkription & semantische Suche",
    "chat.david.features.ai.title": "KI-Verarbeitung",
    "chat.david.features.ai.desc": "Auto-Zusammenfassung & Themenextraktion",
    "chat.david.features.organization.title": "Intelligente Organisation",
    "chat.david.features.organization.desc": "KI-gestütztes Tagging & Kategorisierung",
    
    "chat.rachel.name": "Rachel Konre",
    "chat.rachel.message": "Können Sie eine schnelle Content-Generierungsplattform für unser Marketing-Team erstellen?",
    "chat.rachel.response": "Wir erstellen eine KI-gestützte Content-Beschleunigungsplattform, die auf Deine Marke zugeschnitten ist. Hier ist unsere Lösung:",
    "chat.rachel.timeline.engine.title": "KI-Engine-Setup",
    "chat.rachel.timeline.engine.desc": "Benutzerdefiniertes LLM-Training & Markenstimmenintegration",
    "chat.rachel.timeline.workflow.title": "Content-Workflow",
    "chat.rachel.timeline.workflow.desc": "Vorlagen, Planung & Genehmigungssystem",
    "chat.rachel.timeline.analytics.title": "Analyse-Suite",
    "chat.rachel.timeline.analytics.desc": "Leistungsverfolgung & Content-Optimierung",
    
    // Navigation and common elements
    "nav.about": "Über uns",
    "nav.services": "Dienstleistungen",
    "nav.pricing": "Preise",
    "nav.contact": "Kontakt",
    "nav.mission": "Unsere Mission",
    "nav.faq": "Häufige Fragen",
    "language": "Sprache",
    "theme": "Design"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Set Spanish as the default language
  const [language, setLanguage] = useState<Language>('es');

  // Use useEffect to ensure it persists across sessions
  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es' || savedLanguage === 'de')) {
      setLanguage(savedLanguage as Language);
    } else {
      // Set Spanish as default and save it
      localStorage.setItem('preferredLanguage', 'es');
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}