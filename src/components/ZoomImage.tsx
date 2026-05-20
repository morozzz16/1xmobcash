'use client';

import React, { useState } from 'react';

export default function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <div 
        className="relative w-full h-full cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        

        <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-[#0f172a]/80 p-4 rounded-full text-white backdrop-blur-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>


      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#04060b]/95 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >

          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          

          <img 
            src={src} 
            alt={alt} 
            className="max-w-full max-h-full rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.2)] object-contain"
            onClick={(e) => e.stopPropagation()} // Чтобы клик по самой картинке не закрывал попап
          />
        </div>
      )}
    </>
  );
}