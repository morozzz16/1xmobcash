import React from 'react';
import Link from 'next/link';

export default function Footer({ langKey, t }: { langKey: string, t: any }) {
  const f = t.footer || {};

  return (
    <footer className="bg-[#04060b] border-t border-white/5 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Верхняя часть подвала */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* Логотип и описание */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-white font-black text-3xl tracking-tighter">
              1X<span className="text-blue-500">MOBCASH</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {f.description}
            </p>
          </div>

          {/* Быстрые ссылки */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              {f.legalTitle || "Legal & Info"}
            </h4>
            <ul className="space-y-3">
              {/* НОВАЯ КНОПКА: MyManager (Футер) */}
              <li>
                <a 
                  href="https://my-manager.1xjobs.com/install" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
                  </svg>
                  {t.nav?.myManager || "MyManager App"}
                  <span className="text-[9px] uppercase bg-blue-600 text-white px-1.5 py-0.5 rounded-sm">
                    {t.nav?.secure || "Secure"}
                  </span>
                </a>
              </li>
              <li>
                <Link href={`/${langKey}/terms`} className="text-slate-400 hover:text-white transition-colors text-sm">
                  {f.links?.terms || "Terms & Conditions"}
                </Link>
              </li>
              <li>
                <Link href={`/${langKey}/privacy`} className="text-slate-400 hover:text-white transition-colors text-sm">
                  {f.links?.privacy || "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href={`/${langKey}/cookies`} className="text-slate-400 hover:text-white transition-colors text-sm">
                  {f.links?.cookies || "Cookie Policy"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты & Поддержка */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              {f.supportTitle || "Support"}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@1xmobcash.net" className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2">
                  <span>✉</span> support@1xmobcash.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="w-full h-px bg-white/5 mb-8"></div>

        {/* Нижняя часть (Копирайт и 18+) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs sm:text-sm text-center md:text-left">
            {f.rights}
          </p>
          
          {/* Значок 18+ и предупреждение */}
          <div className="flex items-center gap-3 bg-[#0f172a]/50 border border-white/5 px-4 py-2 rounded-full">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center font-black text-red-500 text-xs shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              18+
            </div>
            <p className="text-slate-400 text-xs font-medium">
              {f.warning}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}