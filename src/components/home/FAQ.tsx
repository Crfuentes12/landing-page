// src/components/home/FAQ.tsx
"use client";

import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useDebounce } from "@/hooks/use-debounce";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  label: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital services including web development, mobile app development, SEO optimization, digital marketing, cloud solutions, and analytics consulting. Each service is customized to meet your specific business needs.",
    category: "services"
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
    category: "project"
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development methodology with regular client touchpoints. Our process includes discovery, planning, design, development, testing, and deployment phases. We maintain transparent communication throughout the project lifecycle.",
    category: "process"
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer various support and maintenance packages. These include regular updates, security patches, performance monitoring, and technical support. We can customize a support plan based on your needs.",
    category: "support"
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, and various cloud platforms like AWS and Azure. We choose the best technology stack based on your project requirements.",
    category: "technology"
  },
  {
    question: "How do you handle project pricing?",
    answer: "We offer both fixed-price and time-and-materials pricing models. After understanding your requirements, we provide detailed proposals with transparent pricing. We can also work with your budget to find the best solution.",
    category: "pricing"
  }
];

const categories: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'services', label: 'Services' },
  { id: 'project', label: 'Project Management' },
  { id: 'process', label: 'Process' },
  { id: 'support', label: 'Support' },
  { id: 'technology', label: 'Technology' },
  { id: 'pricing', label: 'Pricing' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({
    ref: sectionRef,
    options: { threshold: 0.1 }
  });

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = debouncedSearch === '' || 
      faq.question.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 bg-accent/10"
    >
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We&apos;re here to help. If you don&apos;t see your question here, 
            feel free to reach out to our support team.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent hover:bg-accent/80'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No questions found matching your criteria
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:shadow-md transition-all duration-300 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className={`mt-4 text-muted-foreground overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions? {' '}
            <a href="#contact" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;