//landing-page/src/components/home/FAQ.tsx
"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital services including web development, mobile app development, SEO optimization, digital marketing, cloud solutions, and analytics consulting. Each service is customized to meet your specific business needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development methodology with regular client touchpoints. Our process includes discovery, planning, design, development, testing, and deployment phases. We maintain transparent communication throughout the project lifecycle."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer various support and maintenance packages. These include regular updates, security patches, performance monitoring, and technical support. We can customize a support plan based on your needs."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, and various cloud platforms like AWS and Azure. We choose the best technology stack based on your project requirements."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We offer both fixed-price and time-and-materials pricing models. After understanding your requirements, we provide detailed proposals with transparent pricing. We can also work with your budget to find the best solution."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-accent/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help. If you don't see your question here, 
            feel free to reach out to our support team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
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
                {openIndex === index && (
                  <p className="mt-4 text-muted-foreground">
                    {faq.answer}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions? <a href="#contact" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;