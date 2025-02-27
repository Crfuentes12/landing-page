// providers/modal-provider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';

// Modal context type
type ModalContextType = {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

// Create context with default values
const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

// Hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = (newContent: ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Small delay before clearing content to allow animation to complete
    setTimeout(() => setContent(null), 300);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-lg">
          <button 
            onClick={closeModal}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <div className="p-1">{content}</div>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};