// src/components/home/FAQ.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: '1',
    questionKey: 'faq.questions.industries',
    answerKey: 'faq.answers.industries',
  },
  {
    id: '2',
    questionKey: 'faq.questions.technical',
    answerKey: 'faq.answers.technical',
  },
  {
    id: '3',
    questionKey: 'faq.questions.feedback',
    answerKey: 'faq.answers.feedback',
  },
  {
    id: '4',
    questionKey: 'faq.questions.fulldev',
    answerKey: 'faq.answers.fulldev',
  },
  {
    id: '5',
    questionKey: 'faq.questions.support',
    answerKey: 'faq.answers.support',
  },
  {
    id: '6',
    questionKey: 'faq.questions.confidentiality',
    answerKey: 'faq.answers.confidentiality',
  },
  {
    id: '7',
    questionKey: 'faq.questions.pricing',
    answerKey: 'faq.answers.pricing',
  },
  {
    id: '8',
    questionKey: 'faq.questions.fundraising',
    answerKey: 'faq.answers.fundraising',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const { t } = useLanguage();

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
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#2B63D9]">
              {t('faq.title')}
            </span>
          </h2>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {faqs.map((faq, index) => (
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