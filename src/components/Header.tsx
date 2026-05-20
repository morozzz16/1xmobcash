'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header({ langKey, t }: { langKey: string, t: any }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-semibold text-slate-400 items-center">

          <Link href={`/${langKey}/agent`} className="hover:text-white transition-colors">
            {t.nav?.agents || "Agents"}
          </Link>
            
          <Link href={`/${langKey}/partner`} className="hover:text-white transition-colors">
            {t.nav?.partners || "Partners"}
          </Link>
            
          <Link href={`/${langKey}/promo`} className="hover:text-white transition-colors">
            {t.promo?.promoLink || "Promo"}
          </Link>
            
          <Link href={`/${langKey}/blog`} className="hover:text-white transition-colors">
            {t.nav?.blog || "Blog"}
          </Link>

          {/* КНОПКА MyManager (Десктоп) */}
          <a 
            href="https://my-manager.1xjobs.com/install" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 ml-2 bg-gradient-to-r from-blue-600/20 to-blue-500/10 hover:from-blue-600/40 hover:to-blue-500/20 border border-blue-500/30 rounded-full transition-all group"
          >
            <svg className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
            </svg>
            <span className="font-bold text-white tracking-wide text-xs whitespace-nowrap">
              {t.nav?.myManager || "MyManager App"}
            </span>
            <span className="text-[9px] uppercase font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-full relative flex items-center justify-center shrink-0">
              <span className="absolute inset-0 bg-blue-500 rounded-full opacity-50 animate-ping"></span>
              <span className="relative z-10">{t.nav?.secure || "100% SECURE"}</span>
            </span>
          </a>
          
          {/* Десктопный переключатель языка */}
          <select 
            value={langKey} 
            onChange={(e) => {
              window.location.href = redirectedPathName(e.target.value);
            }} 
            className="bg-[#1e293b] text-white border border-white/10 rounded-lg px-2 py-1 text-xs outline-none cursor-pointer hover:bg-blue-500/10 transition-colors focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="en" className="bg-[#0f172a] text-white font-semibold py-1">EN</option>
            <option value="fr" className="bg-[#0f172a] text-white font-semibold py-1">FR</option>
            <option value="es" className="bg-[#0f172a] text-white font-semibold py-1">ES</option>
            <option value="ar" className="bg-[#0f172a] text-white font-semibold py-1">AR</option>
            <option value="hi" className="bg-[#0f172a] text-white font-semibold py-1">HI</option>
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
          
          {/* ИСПРАВЛЕННАЯ КНОПКА: MyManager (Мобильная) */}
          <a 
            href="https://my-manager.1xjobs.com/login" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={toggleMenu} 
            className="flex items-center flex-wrap gap-2 w-fit text-blue-400 hover:text-blue-300 hover:translate-x-2 transition-all bg-blue-600/10 px-4 py-3 rounded-xl border border-blue-500/20"
          >
             <svg className="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
            </svg>
            <span className="text-xl whitespace-nowrap">{t.nav?.myManager || "MyManager App"}</span>
            <span className="text-[10px] leading-none uppercase font-black bg-blue-600 text-white px-2 py-1 rounded-full whitespace-nowrap shrink-0">
              {t.nav?.secure || "100% SECURE"}
            </span>
          </a>

          <Link href={`/${langKey}/agent`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all mt-2">{t.nav?.agents || "Agents"}</Link>
          <Link href={`/${langKey}/partner`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all">{t.nav?.partners || "Partners"}</Link>
          <Link href={`/${langKey}/promo`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all">{t.promo?.promoLink || "Promo"}</Link>
          <Link href={`/${langKey}/blog`} onClick={toggleMenu} className="hover:text-white hover:translate-x-2 transition-all">{t.nav?.blog || "Blog"}</Link>
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