'use client';

import React, { useState, useEffect, useRef } from 'react';
import { COUNTRIES } from '@/lib/dictionaries';

// ИЗМЕНЕНО: Форма теперь принимает role и setRole из пропсов
export default function HeroForm({ t, role, setRole }: { t: any, role: string, setRole: (val: string) => void }) {
  
  // УДАЛЕНО: const [role, setRole] = useState('agent');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.country_code) {
          const found = COUNTRIES.find(c => c.iso === data.country_code);
          if (found) setSelectedCountry(found);
        }
      }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // ... (код handleSubmit остается тем же)
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    data.full_phone = `${selectedCountry.code} ${data.phone}`;
    data.country = selectedCountry.name;
    data.role = role;

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/ТВОЙ_КЛЮЧ/exec';

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Success! We will contact you soon.');
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration-form" className="relative w-full bg-[#070b14] overflow-hidden selection:bg-blue-900 selection:text-blue-100">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          
          <div className="space-y-6 relative z-10">
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed lg:max-w-xl">
              {t.hero.subtitle}
            </p>
          </div>

          {/* ГРАФИЧЕСКИЙ ЭЛЕМЕНТ: Неоновая 3D Композиция с Брендингом 1xBet и Доходом */}
          <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] aspect-square mt-8 lg:mt-4 mx-auto lg:mx-0 animate-float">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/30 rounded-full blur-[100px] opacity-60"></div>

            {/* Смартфон */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] bg-[#0f172a] rounded-[3rem] border-[6px] border-white/10 shadow-[0_0_60px_rgba(37,99,235,0.25)] rotate-[-12deg] flex flex-col p-3 overflow-hidden backdrop-blur-md">
              
              <div className="flex-grow w-full bg-[#1e293b]/70 rounded-3xl p-2.5 sm:p-3 flex flex-col gap-2 border border-white/5 relative overflow-hidden">
                
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl pointer-events-none"></div>

                {/* HEADER: Фирменный логотип 1xBet */}
                <div className="w-full h-8 flex items-center justify-between px-1 relative z-10">
                  <div className="flex items-center gap-0.5">
                     <div className="bg-[#2563eb] text-white font-black text-[12px] sm:text-[14px] px-1.5 py-0.5 rounded-sm leading-none tracking-tighter shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                       1x
                     </div>
                     <span className="text-white font-black text-[14px] sm:text-[16px] tracking-tight leading-none drop-shadow-md">
                       BET
                     </span>
                  </div>
                  <div className="flex flex-col gap-[3px] opacity-70">
                     <div className="w-4 h-[2px] bg-white rounded-full"></div>
                     <div className="w-4 h-[2px] bg-white rounded-full"></div>
                     <div className="w-4 h-[2px] bg-white rounded-full"></div>
                  </div>
                </div>

                {/* НОВЫЙ БЛОК: Баланс и Депозиты */}
                <div className="bg-[#0f172a]/80 rounded-xl p-2 sm:p-3 border border-white/5 relative overflow-hidden shadow-inner mt-1 z-10">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full"></div>
                  
                  <div className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    Partner Income
                  </div>
                  
                  <div className="flex items-end gap-1">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] tracking-tighter">
                      $14,250<span className="text-emerald-500/60 text-base sm:text-lg">.00</span>
                    </div>
                  </div>
                  
                  {/* Бегущие плюсы депозитов */}
                  <div className="flex gap-1 sm:gap-1.5 mt-2">
                    <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded animate-pulse [animation-duration:2s]">+$150</div>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded animate-pulse [animation-duration:3s] [animation-delay:0.5s]">+$45</div>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded animate-pulse [animation-duration:2.5s] [animation-delay:1s]">+$320</div>
                  </div>
                </div>

                {/* Контент приложения (Спорт и Графики) */}
                <div className="flex-grow w-full flex flex-col justify-end gap-2 relative z-10 pb-1">
                  
                  <div className="flex gap-2 mb-1 px-1 justify-center sm:justify-start">
                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs sm:text-sm shadow-inner">⚽️</div>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs sm:text-sm shadow-inner">🎾</div>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs sm:text-sm shadow-inner">🎰</div>
                  </div>
                  
                  {/* График выплат */}
                  <div className="h-16 sm:h-20 w-full bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl border-t border-blue-400/30 flex items-end p-1.5">
                     <div className="flex gap-1 w-full items-end h-[90%]">
                        <div className="flex-1 bg-blue-500/50 h-[35%] rounded-t-sm animate-pulse [animation-delay:0.1s]"></div>
                        <div className="flex-1 bg-blue-500/50 h-[65%] rounded-t-sm animate-pulse [animation-delay:0.3s]"></div>
                        <div className="flex-1 bg-blue-500/50 h-[50%] rounded-t-sm animate-pulse [animation-delay:0.5s]"></div>
                        <div className="flex-1 bg-blue-500/50 h-[90%] rounded-t-sm animate-pulse [animation-delay:0.7s]"></div>
                        <div className="flex-1 bg-emerald-500/60 h-[100%] rounded-t-sm shadow-[0_0_10px_#10b981] animate-pulse [animation-delay:0.9s]"></div>
                     </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Золотая монета 1 */}
            <div className="absolute top-[12%] right-[2%] w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-[0_0_30px_rgba(202,138,4,0.4)] flex items-center justify-center border-2 border-yellow-200/50 animate-bounce [animation-duration:4s]">
              <span className="text-2xl sm:text-3xl font-black text-yellow-900/80 drop-shadow-sm">$</span>
            </div>
            
            {/* Фишка казино 1 */}
            <div className="absolute bottom-[18%] left-[-3%] w-14 h-14 sm:w-16 sm:h-16 bg-[#0f172a] rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center border-4 border-dashed border-blue-500/60 rotate-[15deg] animate-bounce [animation-duration:5s]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center font-black text-xl text-blue-300">50</div>
            </div>

            {/* Золотая монета 2 */}
            <div className="absolute bottom-[28%] right-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full shadow-[0_0_20px_rgba(202,138,4,0.3)] flex items-center justify-center border-2 border-yellow-200/50 rotate-[-10deg]">
              <span className="text-xl font-black text-yellow-900/80 drop-shadow-sm">$</span>
            </div>

             {/* Фишка казино 2 */}
            <div className="absolute top-[18%] left-[5%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0f172a] rounded-full shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center border-4 border-dashed border-red-500/40 rotate-[-20deg] animate-pulse">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center font-black text-lg text-red-200">25</div>
            </div>

            <div className="absolute top-[8%] left-[18%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] animate-pulse"></div>
          </div>

        </div>

        {/* Форма */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-1 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="flex bg-[#1e293b]/50 p-1.5 m-2 rounded-2xl border border-white/5">
              <button type="button" onClick={() => setRole('agent')} className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all ${role === 'agent' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {t.form.agent}
              </button>
              <button type="button" onClick={() => setRole('partner')} className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all ${role === 'partner' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {t.form.partner}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4">
              <input name="name" type="text" placeholder={t.form.name} required className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 focus:bg-[#1e293b] transition-all" />
              <input name="email" type="email" placeholder={t.form.email} required className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 focus:bg-[#1e293b] transition-all" />
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase px-1 tracking-wider">{t.form.country}</label>
                <div className="relative" ref={dropdownRef}>
                  <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-[#1e293b] transition-all focus:border-blue-500">
                    <div className="flex items-center gap-3">
                      <img src={selectedCountry.flag} alt="" className="w-6 h-4 object-cover rounded-sm shadow-sm opacity-90" />
                      <span className="font-semibold text-white">{selectedCountry.name}</span>
                    </div>
                    <span className="text-slate-400 text-xs">▼</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-20 top-full mt-2 left-0 w-full bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl max-h-64 overflow-y-auto p-2">
                      {COUNTRIES.map((c) => (
                        <div key={c.iso} onClick={() => { setSelectedCountry(c); setIsDropdownOpen(false); }} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                          <img src={c.flag} alt="" className="w-6 h-4 object-cover rounded-sm opacity-90" />
                          <span className="text-sm font-medium text-slate-200">{c.name}</span>
                          <span className="text-xs font-bold text-slate-400 ml-auto">{c.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-stretch gap-2 h-[58px]">
                <div className="bg-[#1e293b] border border-white/10 rounded-2xl px-4 flex items-center justify-center font-bold text-slate-300 min-w-[80px]">{selectedCountry.code}</div>
                <input name="phone" type="tel" placeholder={t.form.phone} required className="flex-1 p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 focus:bg-[#1e293b] transition-all" />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex gap-6 px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="messengerType" value="telegram" defaultChecked className="accent-blue-500 w-4 h-4" /> 
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Telegram</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="messengerType" value="whatsapp" className="accent-blue-500 w-4 h-4" /> 
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">WhatsApp</span>
                  </label>
                </div>
                <input name="messengerHandle" type="text" placeholder={t.form.messenger} required className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 focus:bg-[#1e293b] transition-all" />
              </div>
              <button disabled={isSubmitting} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-900 font-black py-5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all transform hover:scale-[1.02] active:scale-100 uppercase tracking-widest text-sm mt-4">
                {isSubmitting ? t.form.processing : t.form.button}
              </button>
              <div className="min-h-[32px] flex items-center justify-center pt-2">
                <p className="text-[12px] text-center text-slate-500 font-medium">
                  {role === 'agent' ? t.form.agentHint : t.form.partnerHint}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}