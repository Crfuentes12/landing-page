// src/components/home/FAQ.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Code2, 
  Shield, 
  Rocket, 
  MessageSquare 
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: 'all', labelKey: 'faq.categories.all', icon: <Code2 className="h-4 w-4" /> },
  { id: 'expertise', labelKey: 'faq.categories.expertise', icon: <Shield className="h-4 w-4" /> },
  { id: 'process', labelKey: 'faq.categories.process', icon: <Rocket className="h-4 w-4" /> },
  { id: 'support', labelKey: 'faq.categories.support', icon: <MessageSquare className="h-4 w-4" /> }
];

const faqs = [
  {
    id: '1',
    questionKey: 'faq.questions.industries',
    answerKey: 'faq.answers.industries',
    category: 'expertise',
    icon: <Code2 className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '2',
    questionKey: 'faq.questions.technical',
    answerKey: 'faq.answers.technical',
    category: 'expertise',
    icon: <Shield className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '3',
    questionKey: 'faq.questions.feedback',
    answerKey: 'faq.answers.feedback',
    category: 'process',
    icon: <MessageSquare className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '4',
    questionKey: 'faq.questions.fulldev',
    answerKey: 'faq.answers.fulldev',
    category: 'process',
    icon: <Rocket className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '5',
    questionKey: 'faq.questions.support',
    answerKey: 'faq.answers.support',
    category: 'support',
    icon: <Shield className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '6',
    questionKey: 'faq.questions.confidentiality',
    answerKey: 'faq.answers.confidentiality',
    category: 'process',
    icon: <Shield className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '7',
    questionKey: 'faq.questions.pricing',
    answerKey: 'faq.answers.pricing',
    category: 'process',
    icon: <Code2 className="h-5 w-5 text-[#4285F4]" />
  },
  {
    id: '8',
    questionKey: 'faq.questions.fundraising',
    answerKey: 'faq.answers.fundraising',
    category: 'support',
    icon: <Rocket className="h-5 w-5 text-[#4285F4]" />
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      t(faq.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(faq.answerKey).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFAQClick = useCallback((id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  }, [openIndex]);

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-accent/10" />
      
      {/* Animated Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[#4285F4]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(66, 133, 244, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              {t('faq.title')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.description')}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative transform transition-all duration-500 hover:scale-[1.02]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('faq.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-card/50 
                focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50 transition-all duration-300
                hover:bg-card/70"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 
                  ${selectedCategory === category.id
                    ? 'bg-[#4285F4] text-white shadow-lg scale-105'
                    : 'bg-card hover:bg-card/80 hover:scale-105'
                  }`}
              >
                {category.icon}
                {t(category.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-muted-foreground py-12 bg-card/50 rounded-xl backdrop-blur-sm"
            >
              <p className="text-lg">{t('faq.no.results')}</p>
              <p className="text-sm mt-2">{t('faq.try.again')}</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 
                      transform hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-[#4285F4]/10"
                    onClick={() => handleFAQClick(faq.id)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">{faq.icon}</div>
                          <div>
                            <h3 className="text-lg font-semibold">{t(faq.questionKey)}</h3>
                            <AnimatePresence mode="wait">
                              {openIndex === faq.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 text-muted-foreground"
                                >
                                  <div className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: t(faq.answerKey) }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div className="transform transition-transform duration-300">
                          {openIndex === faq.id ? (
                            <ChevronUp className="h-5 w-5 text-[#4285F4]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t('faq.more.questions')}{' '}
            <a 
              href="#contact" 
              className="text-[#4285F4] hover:underline font-medium transition-colors duration-300"
            >
              {t('faq.contact.support')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;