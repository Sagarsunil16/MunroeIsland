'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  q: string;
  a: string;
}

export function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
          className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
            activeIndex === idx 
              ? 'border-primary/40 shadow-[0_4px_25px_rgba(0,122,138,0.12)] bg-white' 
              : 'border-outline-variant/40 hover:border-primary/30 bg-white/80'
          }`}
        >
          <button 
            id={`faq-btn-${idx}`}
            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            aria-expanded={activeIndex === idx}
            aria-controls={`faq-content-${idx}`}
            className="w-full text-left p-5 sm:p-6 flex justify-between items-center focus:outline-none group"
          >
            <div className="flex items-center gap-3 sm:gap-4 pr-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${
                activeIndex === idx 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(0,122,138,0.35)]' 
                  : 'bg-primary/10 text-primary group-hover:bg-primary/20'
              }`}>
                {activeIndex === idx ? '!' : '?'}
              </span>
              <h3 className="text-base sm:text-lg font-headline font-bold text-on-surface transition-colors group-hover:text-primary">
                {faq.q}
              </h3>
            </div>
            <motion.div 
              animate={{ rotate: activeIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-primary text-sm" aria-hidden="true">
                expand_more
              </span>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {activeIndex === idx && (
              <motion.div
                id={`faq-content-${idx}`}
                role="region"
                aria-labelledby={`faq-btn-${idx}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-5 sm:px-6 pb-6 pt-0">
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed pl-11 sm:pl-12 border-l-2 border-primary/30 ml-4">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
