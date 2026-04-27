'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ langKey, t }: { langKey: string, t: any }) {
  const router = useRouter();

  return (
    <header className="bg-[#070b14]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Логотип */}
        <div 
          className="text-white font-black text-2xl tracking-tighter cursor-pointer" 
          onClick={() => router.push(`/${langKey}`)}
        >
          1X<span className="text-blue-500">MOBCASH</span>
        </div>
        
        {/* Навигация */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
          <a href={`/${langKey}/agent`} className="hover:text-white transition-colors">{t.nav.agents}</a>
          <a href={`/${langKey}/partner`} className="hover:text-white transition-colors">{t.nav.partners}</a>
          <a href={`/${langKey}/blog`} className="hover:text-white transition-colors">{t.nav.blog}</a>
        </nav>

        {/* Переключатель языков */}
        <select 
          value={langKey} 
          onChange={(e) => router.push(`/${e.target.value}`)} 
          className="bg-[#1e293b] text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer hover:bg-white/10 transition-colors"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="ar">العربية</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
    </header>
  );
}