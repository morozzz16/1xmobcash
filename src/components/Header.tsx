'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Убрали useRouter, он больше не нужен
import Link from 'next/link';

export default function Header({ langKey, t }: { langKey: string, t: any }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Умная функция смены языка
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale; 
    return segments.join('/');
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-[80] h-16 flex items-center transition-colors duration-300 ${isMobileMenuOpen ? 'bg-[#070b14]' : 'bg-[#070b14]/90 backdrop-blur-md border-b border-white/10'}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        
        {/* Логотип */}
        <Link 
          href={`/${langKey}`}
          className="text-white font-black text-2xl tracking-tighter cursor-pointer relative z-[100]" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          1X<span className="text-blue-500">MOBCASH</span>
        </Link>
        
        {/* Десктопная навигация */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-400 items-center">
          <Link href={`/${langKey}/agent`} className="hover:text-white transition-colors">{t.nav.agents}</Link>
          <Link href={`/${langKey}/partner`} className="hover:text-white transition-colors">{t.nav.partners}</Link>
          <Link href={`/${langKey}/blog`} className="hover:text-white transition-colors">{t.nav.blog}</Link>
          
          {/* Десктопный переключатель языка */}
          <select 
            value={langKey} 
            onChange={(e) => {
              window.location.href = redirectedPathName(e.target.value);
            }} 
            className="bg-[#1e293b] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer hover:bg-white/10 transition-colors ml-4"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            <option value="ar">AR</option>
            <option value="hi">HI</option>
          </select>
        </nav>

        {/* Мобильная кнопка */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-[100] focus:outline-none"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

      </div>

      {/* Мобильное меню */}
      <div 
        className={`fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-[#070b14] z-[90] flex flex-col pt-8 px-6 transition-all duration-300 md:hidden overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}
      >
        <nav className="flex flex-col gap-6 text-2xl font-black text-slate-300">
          <Link href={`/${langKey}/agent`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all">{t.nav.agents}</Link>
          <Link href={`/${langKey}/partner`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all">{t.nav.partners}</Link>
          <Link href={`/${langKey}/blog`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all">{t.nav.blog}</Link>
        </nav>

        <div className="mt-12 pt-6 border-t border-white/10 pb-12">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Language</label>
          <div className="grid grid-cols-3 gap-3">
            {['en', 'fr', 'es', 'ar', 'hi'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  window.location.href = redirectedPathName(lang);
                }}
                className={`py-3 rounded-xl text-sm font-bold uppercase border transition-all ${langKey === lang ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-[#1e293b]/50 border-white/5 text-slate-400 hover:bg-white/5'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}