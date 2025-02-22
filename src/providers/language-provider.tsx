// src/providers/language-provider.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es' | 'fr';

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
    "hero.description": "From vision to reality, we build MVPs that matter. Fast development, smart solutions, business-first approach.",
    "hero.button.estimate": "Get your MVP estimate now",
    "hero.button.learnMore": "Learn More",
    "hero.stats.mvps": "MVPs Built",
    "hero.stats.experience": "Years Experience",
    "hero.stats.clients": "Happy Clients",
    "hero.stats.team": "Team Size",
    "hero.chat.placeholder": "Share your business idea...",
    // Header
    "nav.about": "About",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "language": "Language",
    "theme": "Theme",
    // Chat Sequences
    "chat.header": "MVP Chat",
    "chat.sarah.name": "Sarah Chen",
    "chat.sarah.message": "I have an idea for a healthcare scheduling app. How quickly can we validate it?",
    "chat.sarah.response": "We can help you validate your healthcare app idea rapidly. Here's our proven approach:",
    "chat.sarah.timeline.discovery.title": "Discovery Week",
    "chat.sarah.timeline.discovery.desc": "Market research and user needs analysis",
    "chat.sarah.timeline.mvp.title": "MVP Development",
    "chat.sarah.timeline.mvp.desc": "Core scheduling features implementation",
    "chat.sarah.timeline.launch.title": "Launch & Test",
    "chat.sarah.timeline.launch.desc": "Beta testing with real healthcare providers",

    "chat.alex.name": "Alex Rodriguez",
    "chat.alex.message": "Looking to build an AI-powered fitness tracking platform. What's your timeline?",
    "chat.alex.response": "We specialize in rapid AI integration. Here's how we'll bring your fitness platform to life:",
    "chat.alex.features.ai.title": "AI Integration",
    "chat.alex.features.ai.desc": "Custom machine learning models for fitness tracking",
    "chat.alex.features.dev.title": "Rapid Development",
    "chat.alex.features.dev.desc": "6-week timeline to working prototype",
    "chat.alex.features.arch.title": "Scalable Architecture",
    "chat.alex.features.arch.desc": "Built to handle growing user base",

    "chat.michael.name": "Michael Kim",
    "chat.michael.message": "Need to build a marketplace for sustainable products. How do you ensure quality?",
    "chat.michael.response": "We focus on what matters most for your eco-marketplace. Here's how we compare:",
    "chat.comparison.traditional": "Traditional Approach",
    "chat.comparison.our": "Our Approach",
    "chat.michael.comp.trad.1": "Lengthy 12-Month Development",
    "chat.michael.comp.trad.2": "Complex Feature Overload",
    "chat.michael.comp.trad.3": "Fixed Architecture",
    "chat.michael.comp.trad.4": "High Initial Cost",
    "chat.michael.comp.our.1": "4-6 Week MVP Timeline",
    "chat.michael.comp.our.2": "Core Features First",
    "chat.michael.comp.our.3": "Flexible & Scalable",
    "chat.michael.comp.our.4": "Cost-Effective Start",
    // Our Services
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
    // Roadmap Section
    "roadmap.title": "How We Make It Happen",
    "roadmap.description": "A clear path from vision to reality, focusing only on what truly matters.",
    "roadmap.nav.previous": "Previous Step",
    "roadmap.nav.next": "Next Step",
    
    // Step 1
    "roadmap.step1.title": "Idea Analysis & Smart Consultancy",
    "roadmap.step1.description": "We dive deep into your vision and trim the excess to focus on what truly matters.",
    "roadmap.step1.detail1": "Understanding your business vision",
    "roadmap.step1.detail2": "Identifying core features",
    "roadmap.step1.detail3": "Market analysis",
    "roadmap.step1.detail4": "Technical feasibility assessment",

    // Step 2
    "roadmap.step2.title": "Development & Collaboration",
    "roadmap.step2.description": "Weekly meetings ensure transparent progress and close collaboration throughout the build.",
    "roadmap.step2.detail1": "Clear project scope",
    "roadmap.step2.detail2": "Defined timeline",
    "roadmap.step2.detail3": "Key deliverables",
    "roadmap.step2.detail4": "Weekly progress updates",

    // Step 3
    "roadmap.step3.title": "Launch & Beyond",
    "roadmap.step3.description": "Your MVP hits the market with our continued support for scaling success.",
    "roadmap.step3.detail1": "Pre-launch testing",
    "roadmap.step3.detail2": "Market deployment",
    "roadmap.step3.detail3": "Performance monitoring",
    "roadmap.step3.detail4": "Growth support options",
    
    // About us
    "about.title": "Who We Are",
    "about.subtitle": "We're Chris & Robin, two entrepreneurs, developers, and startup builders. We've been exactly where you are right now, facing overpriced agencies, overcomplicated solutions and unnecessary roadblocks.",
    "about.footer.title": "We're not just MVP-developers.",
    "about.footer.description": "We're problem-solvers, business thinkers and startup insiders. We believe in creating real value. If you have the vision, we have the roadmap to make it real!",
    
    // Stats
    "about.stats.mvps": "successful MVPs built",
    "about.stats.experience": "years of experience",
    "about.stats.expertise": "startup accelerator expertise",
    
    // Founders
    "about.founders.robin.name": "Robin",
    "about.founders.robin.title": "Startup & Innovation Enthusiast",
    "about.founders.robin.mission": "Simplifying complex ideas into MVPs that just serve their purpose",
    "about.founders.robin.skill.business": "Business Strategy",
    "about.founders.robin.skill.innovation": "Innovation",
    "about.founders.robin.skill.product": "Product Development",
    "about.founders.robin.skill.market": "Market Analysis",
    
    "about.founders.chris.name": "Chris",
    "about.founders.chris.title": "Developer & AI Master",
    "about.founders.chris.mission": "Using AI to make MVPs faster, smarter, and more cost-effective",
    "about.founders.chris.skill.ai": "AI Development",
    "about.founders.chris.skill.architecture": "Tech Architecture",
    "about.founders.chris.skill.systems": "Scalable Systems",
    "about.founders.chris.skill.mvp": "MVP Development",

    "about.skills.title": "SKILL STATS",

    //CTA
    "cta.title": "Ready to Build Your MVP?",
    "cta.subtitle": "Let's turn your vision into a working product. Schedule a free consultation to discuss your MVP project and get an estimate within 24 hours.",
    "cta.contact.email": "hello@mvpbuilders.dev",
    "cta.contact.phone": "+1 (234) 567-890",
    
    // Form Labels
    "cta.form.firstName": "First Name",
    "cta.form.lastName": "Last Name",
    "cta.form.email": "Email",
    "cta.form.message": "Message",
    
    // Placeholders
    "cta.form.firstName.placeholder": "John",
    "cta.form.lastName.placeholder": "Doe",
    "cta.form.email.placeholder": "john@startup.com",
    "cta.form.message.placeholder": "Tell us about your startup idea and MVP requirements...",
    
    // Buttons & Status
    "cta.form.button.sending": "Sending...",
    "cta.form.button.send": "Get MVP Estimate",
    
    // Success Modal
    "cta.success.title": "Thanks for Reaching Out!",
    "cta.success.message": "Our MVP experts will analyze your requirements and get back to you at {email} within 24 hours with a detailed estimate.",
    
    // Validation Messages
    "cta.validation.required": "This field is required",
    "cta.validation.email": "Please enter a valid email address",
    "cta.validation.minLength": "Must be at least {min} characters",
    "cta.validation.maxLength": "Must be at most {max} characters"
  },
  es: {
    "hero.title.fast": "Rápido. Inteligente.",
    "hero.title.mvp": "Tu MVP Bien Hecho.",
    "hero.description": "De la visión a la realidad, construimos MVPs que importan. Desarrollo rápido, soluciones inteligentes, enfoque empresarial.",
    "hero.button.estimate": "Obtén tu estimación de MVP",
    "hero.button.learnMore": "Más Información",
    "hero.stats.mvps": "MVPs Construidos",
    "hero.stats.experience": "Años de Experiencia",
    "hero.stats.clients": "Clientes Satisfechos",
    "hero.stats.team": "Tamaño del Equipo",
    "hero.chat.placeholder": "Comparte tu idea de negocio...",
    "nav.about": "Acerca de",
    "nav.services": "Servicios",
    "nav.pricing": "Precios",
    "nav.contact": "Contacto",
    "language": "Idioma",
    "theme": "Tema",
     // Chat Sequences
    "chat.header": "MVP Chat",
    "chat.sarah.name": "Sarah Chen",
    "chat.sarah.message": "Tengo una idea para una app de programación de citas médicas. ¿Qué tan rápido podemos validarla?",
    "chat.sarah.response": "Podemos ayudarte a validar tu idea de app médica rápidamente. Aquí está nuestro enfoque probado:",
    "chat.sarah.timeline.discovery.title": "Semana de Descubrimiento",
    "chat.sarah.timeline.discovery.desc": "Investigación de mercado y análisis de necesidades",
    "chat.sarah.timeline.mvp.title": "Desarrollo MVP",
    "chat.sarah.timeline.mvp.desc": "Implementación de funciones principales",
    "chat.sarah.timeline.launch.title": "Lanzamiento y Prueba",
    "chat.sarah.timeline.launch.desc": "Pruebas beta con proveedores de salud reales",

    "chat.alex.name": "Alex Rodriguez",
    "chat.alex.message": "Quiero construir una plataforma de fitness con IA. ¿Cuál es el cronograma?",
    "chat.alex.response": "Nos especializamos en integración rápida de IA. Así daremos vida a tu plataforma fitness:",
    "chat.alex.features.ai.title": "Integración de IA",
    "chat.alex.features.ai.desc": "Modelos personalizados de machine learning para fitness",
    "chat.alex.features.dev.title": "Desarrollo Rápido",
    "chat.alex.features.dev.desc": "Prototipo funcional en 6 semanas",
    "chat.alex.features.arch.title": "Arquitectura Escalable",
    "chat.alex.features.arch.desc": "Diseñada para crecer con tu base de usuarios",

    "chat.michael.name": "Michael Kim",
    "chat.michael.message": "Necesito crear un marketplace de productos sostenibles. ¿Cómo aseguran la calidad?",
    "chat.michael.response": "Nos enfocamos en lo más importante para tu eco-marketplace. Así nos comparamos:",
    "chat.comparison.traditional": "Enfoque Tradicional",
    "chat.comparison.our": "Nuestro Enfoque",
    "chat.michael.comp.trad.1": "Desarrollo de 12 Meses",
    "chat.michael.comp.trad.2": "Sobrecarga de Funciones",
    "chat.michael.comp.trad.3": "Arquitectura Fija",
    "chat.michael.comp.trad.4": "Alto Costo Inicial",
    "chat.michael.comp.our.1": "MVP en 4-6 Semanas",
    "chat.michael.comp.our.2": "Funciones Principales Primero",
    "chat.michael.comp.our.3": "Flexible y Escalable",
    "chat.michael.comp.our.4": "Inicio Económico",
     //Nuestros Servicios
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
    // Roadmap Section
    "roadmap.title": "Cómo Lo Hacemos Realidad",
    "roadmap.description": "Un camino claro de la visión a la realidad, enfocándonos solo en lo que realmente importa.",
    "roadmap.nav.previous": "Paso Anterior",
    "roadmap.nav.next": "Siguiente Paso",
    
    // Step 1
    "roadmap.step1.title": "Análisis de Ideas y Consultoría Inteligente",
    "roadmap.step1.description": "Profundizamos en tu visión y eliminamos lo innecesario para enfocarnos en lo que realmente importa.",
    "roadmap.step1.detail1": "Comprensión de tu visión empresarial",
    "roadmap.step1.detail2": "Identificación de características principales",
    "roadmap.step1.detail3": "Análisis de mercado",
    "roadmap.step1.detail4": "Evaluación de viabilidad técnica",

    // Step 2
    "roadmap.step2.title": "Desarrollo y Colaboración",
    "roadmap.step2.description": "Reuniones semanales aseguran un progreso transparente y una colaboración cercana durante todo el desarrollo.",
    "roadmap.step2.detail1": "Alcance claro del proyecto",
    "roadmap.step2.detail2": "Cronograma definido",
    "roadmap.step2.detail3": "Entregables clave",
    "roadmap.step2.detail4": "Actualizaciones semanales de progreso",

    // Step 3
    "roadmap.step3.title": "Lanzamiento y Más Allá",
    "roadmap.step3.description": "Tu MVP llega al mercado con nuestro apoyo continuo para escalar el éxito.",
    "roadmap.step3.detail1": "Pruebas previas al lanzamiento",
    "roadmap.step3.detail2": "Despliegue en el mercado",
    "roadmap.step3.detail3": "Monitoreo de rendimiento",
    "roadmap.step3.detail4": "Opciones de soporte para el crecimiento",

     // About us
    "about.title": "Quiénes Somos",
    "about.subtitle": "Somos Chris y Robin, dos emprendedores, desarrolladores y constructores de startups. Hemos estado exactamente donde tú estás ahora, enfrentando agencias costosas, soluciones excesivamente complicadas y obstáculos innecesarios.",
    "about.footer.title": "No somos solo desarrolladores de MVPs.",
    "about.footer.description": "Somos solucionadores de problemas, pensadores de negocios y expertos en startups. Creemos en crear valor real. Si tienes la visión, ¡nosotros tenemos la hoja de ruta para hacerla realidad!",
    
    // Stats
    "about.stats.mvps": "MVPs exitosos construidos",
    "about.stats.experience": "años de experiencia",
    "about.stats.expertise": "experiencia en aceleradoras",
    
    // Founders
    "about.founders.robin.name": "Robin",
    "about.founders.robin.title": "Entusiasta de Startups e Innovación",
    "about.founders.robin.mission": "Simplificando ideas complejas en MVPs que cumplen su propósito",
    "about.founders.robin.skill.business": "Estrategia de Negocio",
    "about.founders.robin.skill.innovation": "Innovación",
    "about.founders.robin.skill.product": "Desarrollo de Producto",
    "about.founders.robin.skill.market": "Análisis de Mercado",
    
    "about.founders.chris.name": "Chris",
    "about.founders.chris.title": "Desarrollador y Experto en IA",
    "about.founders.chris.mission": "Usando IA para hacer MVPs más rápidos, inteligentes y rentables",
    "about.founders.chris.skill.ai": "Desarrollo de IA",
    "about.founders.chris.skill.architecture": "Arquitectura Técnica",
    "about.founders.chris.skill.systems": "Sistemas Escalables",
    "about.founders.chris.skill.mvp": "Desarrollo MVP",

    "about.skills.title": "ESTADÍSTICAS DE HABILIDADES",

    //CTA
    "cta.title": "¿Listo para Construir tu MVP?",
    "cta.subtitle": "Convirtamos tu visión en un producto funcional. Programa una consulta gratuita para discutir tu proyecto MVP y obtén una estimación en 24 horas.",
    "cta.contact.email": "hola@mvpbuilders.dev",
    "cta.contact.phone": "+1 (234) 567-890",
    
    // Form Labels
    "cta.form.firstName": "Nombre",
    "cta.form.lastName": "Apellido",
    "cta.form.email": "Correo Electrónico",
    "cta.form.message": "Mensaje",
    
    // Placeholders
    "cta.form.firstName.placeholder": "Juan",
    "cta.form.lastName.placeholder": "Pérez",
    "cta.form.email.placeholder": "juan@startup.com",
    "cta.form.message.placeholder": "Cuéntanos sobre tu idea de startup y los requisitos de tu MVP...",
    
    // Buttons & Status
    "cta.form.button.sending": "Enviando...",
    "cta.form.button.send": "Obtener Estimación de MVP",
    
    // Success Modal
    "cta.success.title": "¡Gracias por Contactarnos!",
    "cta.success.message": "Nuestros expertos en MVP analizarán tus requisitos y te contactarán en {email} dentro de 24 horas con una estimación detallada.",
    
    // Validation Messages
    "cta.validation.required": "Este campo es requerido",
    "cta.validation.email": "Por favor ingresa un correo electrónico válido",
    "cta.validation.minLength": "Debe tener al menos {min} caracteres",
    "cta.validation.maxLength": "Debe tener como máximo {max} caracteres"
  },
  fr: {
    "hero.title.fast": "Rapide. Intelligent.",
    "hero.title.mvp": "Votre MVP Fait Correctement.",
    "hero.description": "De la vision à la réalité, nous construisons des MVPs qui comptent. Développement rapide, solutions intelligentes, approche business.",
    "hero.button.estimate": "Obtenez votre estimation MVP",
    "hero.button.learnMore": "En Savoir Plus",
    "hero.stats.mvps": "MVPs Construits",
    "hero.stats.experience": "Années d'Expérience",
    "hero.stats.clients": "Clients Satisfaits",
    "hero.stats.team": "Taille de l'Équipe",
    "hero.chat.placeholder": "Partagez votre idée business...",
    "nav.about": "À Propos",
    "nav.services": "Services",
    "nav.pricing": "Prix",
    "nav.contact": "Contact",
    "language": "Langue",
    "theme": "Thème",
     // Chat Sequences
    "chat.sarah.name": "Sarah Chen",
    "chat.header": "MVP Chat",
    "chat.sarah.message": "J'ai une idée pour une app de planification médicale. À quelle vitesse pouvons-nous la valider ?",
    "chat.sarah.response": "Nous pouvons vous aider à valider rapidement votre idée d'app médicale. Voici notre approche éprouvée :",
    "chat.sarah.timeline.discovery.title": "Semaine de Découverte",
    "chat.sarah.timeline.discovery.desc": "Étude de marché et analyse des besoins",
    "chat.sarah.timeline.mvp.title": "Développement MVP",
    "chat.sarah.timeline.mvp.desc": "Implémentation des fonctionnalités principales",
    "chat.sarah.timeline.launch.title": "Lancement et Test",
    "chat.sarah.timeline.launch.desc": "Tests bêta avec de vrais professionnels de santé",

    "chat.alex.name": "Alex Rodriguez",
    "chat.alex.message": "Je souhaite créer une plateforme fitness avec IA. Quel est le calendrier ?",
    "chat.alex.response": "Nous sommes spécialisés dans l'intégration rapide d'IA. Voici comment nous donnerons vie à votre plateforme :",
    "chat.alex.features.ai.title": "Intégration IA",
    "chat.alex.features.ai.desc": "Modèles de machine learning personnalisés",
    "chat.alex.features.dev.title": "Développement Rapide",
    "chat.alex.features.dev.desc": "Prototype fonctionnel en 6 semaines",
    "chat.alex.features.arch.title": "Architecture Évolutive",
    "chat.alex.features.arch.desc": "Conçue pour évoluer avec vos utilisateurs",

    "chat.michael.name": "Michael Kim",
    "chat.michael.message": "Je dois créer une marketplace de produits durables. Comment assurez-vous la qualité ?",
    "chat.michael.response": "Nous nous concentrons sur l'essentiel pour votre éco-marketplace. Voici notre comparaison :",
    "chat.comparison.traditional": "Approche Traditionnelle",
    "chat.comparison.our": "Notre Approche",
    "chat.michael.comp.trad.1": "Développement de 12 Mois",
    "chat.michael.comp.trad.2": "Surcharge de Fonctionnalités",
    "chat.michael.comp.trad.3": "Architecture Fixe",
    "chat.michael.comp.trad.4": "Coût Initial Élevé",
    "chat.michael.comp.our.1": "MVP en 4-6 Semaines",
    "chat.michael.comp.our.2": "Fonctionnalités Essentielles",
    "chat.michael.comp.our.3": "Flexible et Évolutif",
    "chat.michael.comp.our.4": "Démarrage Économique",

    // Our services
    "services.title": "Nos Services",
    "services.subtitle": "Solutions complètes pour votre parcours numérique",
    "services.idea.title": "Analyse d'Idées",
    "services.idea.description": "Nous approfondissons votre vision pour comprendre vos besoins et valider votre opportunité de marché",
    "services.consultancy.title": "Conseil Intelligent",
    "services.consultancy.description": "Nous éliminons le superflu et nous concentrons sur l'essentiel pour le succès de votre MVP",
    "services.scoping.title": "Cadrage et Feuille de Route",
    "services.scoping.description": "Limites claires du projet, calendrier et livrables clés pour un développement efficace",
    "services.development.title": "Développement",
    "services.development.description": "Progression transparente avec collaboration étroite et mises à jour régulières",
    "services.launch.title": "Lancement et Support",
    "services.launch.description": "Votre MVP, prêt pour le marché avec support et conseils continus",
    "services.ai.title": "Intégration IA",
    "services.ai.description": "Améliorez votre MVP avec des capacités d'IA de pointe et des automatisations intelligentes",
    
    // FAQ Section
    "faq.title": "Questions Fréquentes",
    "faq.subtitle": "FAQ",
    "faq.description": "Trouvez des réponses aux questions courantes sur notre processus de développement MVP et nos services. Vous ne trouvez pas ce que vous cherchez ? Contactez notre équipe.",
    "faq.search.placeholder": "Rechercher des questions...",
    "faq.no.results": "Aucune question ne correspond à vos critères",
    "faq.try.again": "Essayez d'ajuster votre recherche ou vos filtres",
    "faq.more.questions": "Encore des questions ?",
    "faq.contact.support": "Contactez notre équipe de support",
    // Categories
    "faq.categories.all": "Toutes les Questions",
    "faq.categories.expertise": "Expertise",
    "faq.categories.process": "Processus",
    "faq.categories.support": "Support",
    // Questions
    "faq.questions.industries": "Dans quelles industries ou types de startups êtes-vous spécialisés ?",
    "faq.questions.technical": "Ai-je besoin de connaissances techniques pour travailler avec vous ?",
    "faq.questions.feedback": "Comment gérez-vous les retours et les changements pendant le développement ?",
    "faq.questions.fulldev": "Si je veux transformer mon MVP en produit complet, pouvez-vous gérer le cycle complet de développement ?",
    "faq.questions.support": "Fournissez-vous un support ou une maintenance après le lancement ?",
    "faq.questions.confidentiality": "Puis-je avoir confiance que vous ne volerez pas mon idée ?",
    "faq.questions.pricing": "Proposez-vous des plans de paiement ou des prix flexibles ?",
    "faq.questions.fundraising": "Pouvez-vous aider avec la levée de fonds ou les présentations aux investisseurs ?",
    // Answers
    "faq.answers.industries": "Nous nous concentrons sur les <strong>MVPs logiciels</strong>, particulièrement pour les SaaS, les applications basées sur l'IA, les plateformes digitales et les outils d'automatisation. Si votre startup implique des logiciels, de l'IA ou des solutions web, nous sommes là pour vous aider à construire un MVP efficace et impactant qui vous permet d'accéder rapidement au marché.",
    "faq.answers.technical": "Pas du tout ! <strong>Nous gérons tous les aspects techniques</strong> tout en vous tenant informé de manière simple à comprendre. Nous nous assurons que vous puissiez prendre les bonnes décisions concernant votre MVP <strong>sans avoir besoin d'être un expert technique.</strong> Notre objectif est de vous donner les moyens d'agir sans vous submerger.",
    "faq.answers.feedback": "Avant de commencer le développement, nous travaillons étroitement avec vous pour définir la <strong>portée essentielle du MVP</strong>—en nous assurant qu'il inclut tout ce dont vous avez besoin et rien de superflu. Si vous décidez que vous avez besoin de changements ou de fonctionnalités supplémentaires pendant le processus, c'est tout à fait possible, bien que <strong>des coûts supplémentaires puissent s'appliquer</strong>. Nous maintenons la flexibilité pour nous adapter tout en gardant vos objectifs en vue.",
    "faq.answers.fulldev": "Absolument ! Si votre MVP réussit, nous pouvons continuer à travailler avec vous pour le faire évoluer vers un <strong>produit complètement développé</strong>—en ajoutant de nouvelles fonctionnalités, des intégrations et des optimisations pour soutenir votre croissance. Nous sommes avec vous à chaque étape, du MVP au leader du marché.",
    "faq.answers.support": "Oui ! Nous proposons des <strong>packages de support continu, de maintenance et de conseil</strong> pour maintenir votre logiciel et votre projet en bon état après le lancement. Ces services sont optionnels et disponibles moyennant un coût supplémentaire, garantissant que votre produit reste stable et prêt pour la croissance.",
    "faq.answers.confidentiality": "Absolument. <strong>Votre idée reste 100% la vôtre</strong>. Nous prenons la confidentialité très au sérieux et sommes heureux de signer un <strong>NDA (Accord de Non-Divulgation)</strong> ou tout autre document légal pour protéger votre propriété intellectuelle. Nous sommes là pour construire votre vision, pas pour la prendre.",
    "faq.answers.pricing": "Oui ! Nous comprenons que les startups ont des situations financières différentes, donc nous proposons des <strong>modèles de prix flexibles et des plans de paiement</strong> au cas par cas. Que vous ayez besoin d'échelonner les paiements dans le temps ou de travailler avec un budget serré, nous sommes ouverts à trouver une solution qui vous convient.",
    "faq.answers.fundraising": "Bien que ce ne soit <strong>pas notre service principal,</strong> nous avons une précieuse expérience avec les <strong>accélérateurs, les présentations aux investisseurs et le financement des startups.</strong> Nous pouvons fournir des conseils, des insights et vous aider à créer un pitch convaincant, mais notre focus principal reste la construction de votre MVP.",
     // Roadmap Section
    "roadmap.title": "Comment Nous le Réalisons",
    "roadmap.description": "Un chemin clair de la vision à la réalité, en se concentrant uniquement sur ce qui compte vraiment.",
    "roadmap.nav.previous": "Étape Précédente",
    "roadmap.nav.next": "Étape Suivante",
    
    // Step 1
    "roadmap.step1.title": "Analyse d'Idées et Conseil Intelligent",
    "roadmap.step1.description": "Nous approfondissons votre vision et éliminons le superflu pour nous concentrer sur l'essentiel.",
    "roadmap.step1.detail1": "Compréhension de votre vision d'entreprise",
    "roadmap.step1.detail2": "Identification des fonctionnalités essentielles",
    "roadmap.step1.detail3": "Analyse de marché",
    "roadmap.step1.detail4": "Évaluation de la faisabilité technique",

    // Step 2
    "roadmap.step2.title": "Développement et Collaboration",
    "roadmap.step2.description": "Des réunions hebdomadaires assurent un progrès transparent et une collaboration étroite tout au long du développement.",
    "roadmap.step2.detail1": "Périmètre clair du projet",
    "roadmap.step2.detail2": "Calendrier défini",
    "roadmap.step2.detail3": "Livrables clés",
    "roadmap.step2.detail4": "Mises à jour hebdomadaires",

    // Step 3
    "roadmap.step3.title": "Lancement et Au-delà",
    "roadmap.step3.description": "Votre MVP arrive sur le marché avec notre support continu pour un succès croissant.",
    "roadmap.step3.detail1": "Tests pré-lancement",
    "roadmap.step3.detail2": "Déploiement sur le marché",
    "roadmap.step3.detail3": "Suivi des performances",
    "roadmap.step3.detail4": "Options de support pour la croissance",

    // About us
    "about.title": "Qui Sommes-Nous",
    "about.subtitle": "Nous sommes Chris et Robin, deux entrepreneurs, développeurs et constructeurs de startups. Nous avons été exactement là où vous êtes maintenant, face à des agences trop chères, des solutions trop compliquées et des obstacles inutiles.",
    "about.footer.title": "Nous ne sommes pas que des développeurs de MVP.",
    "about.footer.description": "Nous sommes des solutionneurs de problèmes, des penseurs business et des initiés des startups. Nous croyons en la création de valeur réelle. Si vous avez la vision, nous avons la feuille de route pour la concrétiser !",
    
    // Stats
    "about.stats.mvps": "MVPs réussis construits",
    "about.stats.experience": "années d'expérience",
    "about.stats.expertise": "expertise en accélérateur",
    
    // Founders
    "about.founders.robin.name": "Robin",
    "about.founders.robin.title": "Passionné de Startups et d'Innovation",
    "about.founders.robin.mission": "Simplifier les idées complexes en MVPs qui servent leur but",
    "about.founders.robin.skill.business": "Stratégie Business",
    "about.founders.robin.skill.innovation": "Innovation",
    "about.founders.robin.skill.product": "Développement Produit",
    "about.founders.robin.skill.market": "Analyse de Marché",
    
    "about.founders.chris.name": "Chris",
    "about.founders.chris.title": "Développeur et Expert en IA",
    "about.founders.chris.mission": "Utiliser l'IA pour rendre les MVPs plus rapides, plus intelligents et plus rentables",
    "about.founders.chris.skill.ai": "Développement IA",
    "about.founders.chris.skill.architecture": "Architecture Technique",
    "about.founders.chris.skill.systems": "Systèmes Évolutifs",
    "about.founders.chris.skill.mvp": "Développement MVP",

    "about.skills.title": "STATISTIQUES DE COMPÉTENCES",

    //CTA
    "cta.title": "Prêt à Construire Votre MVP ?",
    "cta.subtitle": "Transformons votre vision en produit fonctionnel. Planifiez une consultation gratuite pour discuter de votre projet MVP et obtenez une estimation sous 24 heures.",
    "cta.contact.email": "bonjour@mvpbuilders.dev",
    "cta.contact.phone": "+1 (234) 567-890",
    
    // Form Labels
    "cta.form.firstName": "Prénom",
    "cta.form.lastName": "Nom",
    "cta.form.email": "Email",
    "cta.form.message": "Message",
    
    // Placeholders
    "cta.form.firstName.placeholder": "Jean",
    "cta.form.lastName.placeholder": "Dupont",
    "cta.form.email.placeholder": "jean@startup.com",
    "cta.form.message.placeholder": "Parlez-nous de votre idée de startup et des besoins de votre MVP...",
    
    // Buttons & Status
    "cta.form.button.sending": "Envoi en cours...",
    "cta.form.button.send": "Obtenir une Estimation MVP",
    
    // Success Modal
    "cta.success.title": "Merci de Nous Avoir Contacté !",
    "cta.success.message": "Nos experts MVP analyseront vos besoins et vous contacteront à {email} sous 24 heures avec une estimation détaillée.",
    
    // Validation Messages
    "cta.validation.required": "Ce champ est obligatoire",
    "cta.validation.email": "Veuillez entrer une adresse email valide",
    "cta.validation.minLength": "Doit contenir au moins {min} caractères",
    "cta.validation.maxLength": "Doit contenir au maximum {max} caractères"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

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
