"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/providers/language-provider';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (langCode: 'en' | 'es' | 'de') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-selector fixed top-4 right-4 z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-md px-3 py-2 shadow-md border border-gray-200 dark:border-gray-700"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul 
            className="py-1" 
            role="listbox"
            aria-label={t('language')}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  language === lang.code
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleLanguageSelect(lang.code as 'en' | 'es' | 'de')}
                role="option"
                aria-selected={language === lang.code}
              >
                {lang.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}