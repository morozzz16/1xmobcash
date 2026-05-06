'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { COUNTRIES } from '@/lib/dictionaries';

// 1. Внутренний компонент с формой
function HeroFormContent({ t }: { t: any }) {

  const [role, setRole] = useState('agent'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [notification, setNotification] = useState<{type: 'success' | 'error', text: string} | null>(null);


  const regions = Array.from(new Set(COUNTRIES.map(c => c.region)));

  const searchParams = useSearchParams();

  useEffect(() => {
    const roleFromUrl = searchParams.get('role');
    if (roleFromUrl === 'partner' || roleFromUrl === 'agent') {
      setRole(roleFromUrl);
    }
  }, [searchParams]);

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
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const tgValue = (data.telegram as string || '').trim();
    const waValue = (data.whatsapp as string || '').trim();

    if (!tgValue && !waValue) {
      setNotification({ type: 'error', text: 'Please provide at least one messenger contact (Telegram or WhatsApp).' });
      setIsSubmitting(false);
      return;
    }

    // Если выбрано "Other", кода страны нет, склеиваем аккуратно
    data.full_phone = selectedCountry.code ? `${selectedCountry.code} ${data.phone}` : data.phone as string;
    data.country = selectedCountry.name;
    data.role = role; // Отправляем выбранную роль в гугл таблицу

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbw2pcCmoqkcgKcOwDsEF3eL8P4QFd5bZ6k6Xsw_YSdPwS8MA_ckfLgOctUmysGaJyyA_g/exec';

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });
      
      setIsSubmitting(false);
      setNotification({ type: 'success', text: 'Success! We will contact you soon.' });
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setNotification(null), 5000);
      
    } catch (error) {
      console.error('Fetch error:', error);
      setIsSubmitting(false);
      setNotification({ type: 'error', text: 'Network error. Please try again.' });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <section id="registration-form" className="relative w-full bg-[#070b14] overflow-hidden selection:bg-blue-900 selection:text-blue-100">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Контент слева: Текст, Выбор Роли */}
        <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="space-y-6 relative z-10">
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed lg:max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Быстрый выбор роли */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-xl">
              {/* Кнопка Agent */}
              <button 
                onClick={() => setRole('agent')}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                  role === 'agent' 
                  ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.2)]' 
                  : 'bg-[#0f172a]/40 border-white/5 hover:border-blue-500/30'
                }`}
              >
                <div className="relative z-10">
                  <div className="text-blue-400 font-black uppercase tracking-widest text-[10px] mb-2">{t.hero.roleAgent}</div>
                  <div className="text-white font-bold text-lg">{t.form.agent}</div>
                </div>
                <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
              </button>

              <button 
                onClick={() => setRole('partner')}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                  role === 'partner' 
                  ? 'bg-purple-600/20 border-purple-500/50 shadow-[0_0_30px_rgba(147,51,234,0.2)]' 
                  : 'bg-[#0f172a]/40 border-white/5 hover:border-purple-500/30'
                }`}
              >
                <div className="relative z-10">
                  <div className="text-purple-400 font-black uppercase tracking-widest text-[10px] mb-2">{t.hero.rolePartner}</div>
                  <div className="text-white font-bold text-lg">{t.form.partner}</div>
                </div>
                <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
              </button>
            </div>
          </div>
  
          <div className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] aspect-square mt-8 lg:mt-4 mx-auto lg:mx-0 animate-float">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/30 rounded-full blur-[100px] opacity-60"></div>
            
          {/* Смартфон */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] bg-[#0b1120] rounded-[3rem] border-[6px] border-[#1e293b] shadow-[0_0_60px_rgba(37,99,235,0.3)] rotate-[-12deg] flex flex-col p-2.5 sm:p-3 overflow-hidden backdrop-blur-xl">
              <div className="flex-grow w-full bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 rounded-3xl p-2.5 sm:p-3 flex flex-col gap-2 sm:gap-2.5 border border-white/5 relative overflow-hidden shadow-inner">
                {/* Блик на стекле */}
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-blue-400/10 to-transparent rounded-t-3xl pointer-events-none"></div>
                
                {/* Шапка 1xBET */}
                <div className="w-full h-8 flex items-center justify-between px-1 relative z-10">
                  <div className="flex items-center gap-0.5">
                     <div className="bg-[#1e3a8a] text-white font-black text-[12px] sm:text-[14px] px-1.5 py-0.5 rounded-sm leading-none tracking-tighter shadow-[0_0_12px_rgba(30,58,138,0.8)] border border-blue-400/20">1xBet</div>
                     <span className="text-white font-black text-[14px] sm:text-[16px] tracking-tight leading-none drop-shadow-md">PARTNERS</span>
                  </div>

{/*          
                  <div className="flex flex-col gap-[3px] opacity-70">
                     <div className="w-4 h-[2px] bg-slate-300 rounded-full"></div>
                     <div className="w-4 h-[2px] bg-slate-300 rounded-full"></div>
                     <div className="w-4 h-[2px] bg-slate-300 rounded-full"></div>
                  </div>     
  */}                
                </div>

                {/* Блок Баланса (Переделан в фирменные синие тона) */}
                <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-2.5 sm:p-3 border border-blue-500/20 relative overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-10 flex-shrink-0">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full"></div>
                  
                  <div className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_5px_#60a5fa]"></div>
                    Available for withdrawal
                  </div>
                  
                  <div className="flex items-end gap-1 mb-1.5">
                    <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] tracking-tighter">
                      $14,250<span className="text-blue-400/80 text-base sm:text-lg">.00</span>
                    </div>
                  </div>
                  
                  {/* Кнопка вывода (создает желание нажать) */}
                  <div className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[9px] sm:text-[10px] font-black py-1.5 mt-1 rounded-lg flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(37,99,235,0.15)]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    WITHDRAW
                  </div>
                </div>

                {/* НОВЫЙ БЛОК: Привлекательная статистика */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 relative z-10 flex-shrink-0">
                  <div className="bg-[#0f172a]/60 border border-white/5 rounded-lg p-1.5 sm:p-2 flex flex-col justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute -right-2 -top-2 w-8 h-8 bg-purple-500/20 blur-xl rounded-full"></div>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase mb-0.5">RevShare</span>
                    <span className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Up to 40%</span>
                  </div>
                  <div className="bg-[#0f172a]/60 border border-white/5 rounded-lg p-1.5 sm:p-2 flex flex-col justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute -right-2 -top-2 w-8 h-8 bg-cyan-500/20 blur-xl rounded-full"></div>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase mb-0.5">New FTDs</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs sm:text-sm font-black text-white">128</span>
                      <span className="text-[8px] text-cyan-400 font-bold bg-cyan-400/10 px-1 rounded">↑ 12%</span>
                    </div>
                  </div>
                </div>

                {/* График и иконки */}
                <div className="flex-grow w-full flex flex-col justify-end gap-1.5 sm:gap-2 relative z-10 pb-0.5">
                  <div className="flex gap-2 mb-0.5 px-1 justify-center sm:justify-start">
                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1e293b] border border-blue-500/20 flex items-center justify-center text-xs sm:text-sm shadow-inner">⚽️</div>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1e293b] border border-blue-500/20 flex items-center justify-center text-xs sm:text-sm shadow-inner">🎾</div>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1e293b] border border-blue-500/20 flex items-center justify-center text-xs sm:text-sm shadow-inner">🎰</div>
                  </div>
                  
                  {/* Обновленный график в фирменных цветах */}
                  <div className="h-14 sm:h-16 w-full bg-gradient-to-t from-blue-900/30 to-transparent rounded-xl border-t border-blue-500/20 flex items-end p-1.5 relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500/30"></div>
                     <div className="flex gap-1.5 w-full items-end h-full relative z-10">
                        <div className="flex-1 bg-blue-600/40 h-[35%] rounded-t-sm animate-pulse [animation-delay:0.1s]"></div>
                        <div className="flex-1 bg-blue-500/50 h-[65%] rounded-t-sm animate-pulse [animation-delay:0.3s]"></div>
                        <div className="flex-1 bg-blue-400/60 h-[50%] rounded-t-sm animate-pulse [animation-delay:0.5s]"></div>
                        <div className="flex-1 bg-cyan-500/70 h-[90%] rounded-t-sm animate-pulse [animation-delay:0.7s]"></div>
                        <div className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-300 h-[100%] rounded-t-sm shadow-[0_0_12px_rgba(34,211,238,0.5)] animate-pulse [animation-delay:0.9s] relative">
                           <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_#fff]"></div>
                        </div>
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
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto relative">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-1 relative z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Вкладки выбора ролей */}
            <div className="flex bg-[#050810] p-1.5 m-2 mb-6 rounded-2xl border border-white/10 shadow-inner">
              <button 
                type="button" 
                onClick={() => setRole('agent')} 
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-black rounded-xl transition-all duration-300 ${role === 'agent' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/50 scale-[1.02]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {role === 'agent' && (
                  <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-fade-in-up">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                )}
                {t.form.agent}
              </button>
              
              <button 
                type="button" 
                onClick={() => setRole('partner')} 
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-black rounded-xl transition-all duration-300 ${role === 'partner' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/50 scale-[1.02]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {role === 'partner' && (
                  <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-fade-in-up">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                )}
                {t.form.partner}
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 sm:p-7 pt-2 space-y-4">
              <input name="name" type="text" placeholder={t.form.name} required className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 transition-all" />
              <input name="email" type="email" placeholder={t.form.email} required className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 transition-all" />
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase px-1 tracking-wider">{t.form.country}</label>
                
                {/* Группировка по регионам */}
                <div className="relative" ref={dropdownRef}>
                  <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-[#1e293b] transition-all focus:border-blue-500">
                    <div className="flex items-center gap-3">
                      <img src={selectedCountry.flag} alt="" className="w-6 h-4 object-cover rounded-sm shadow-sm opacity-90" />
                      <span className="font-semibold text-white">{selectedCountry.name}</span>
                    </div>
                    <span className="text-slate-400 text-xs">▼</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-20 top-full mt-2 left-0 w-full bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl max-h-64 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
                      
                    {/* Отрисовка по группам (регионам) */}
                      {regions.map(region => (
                        <div key={region} className="mb-2 last:mb-0 relative">
                          {/* Заголовок региона (Прижат к краям и верху) */}
                          <div className="-mx-2 px-4 py-2.5 text-[10px] font-black text-blue-400 uppercase tracking-widest sticky -top-2 bg-[#1e293b] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)] z-10 mb-1 border-b border-white/5">
                            {region}
                          </div>
                          
                          {/* Страны внутри региона */}
                          {COUNTRIES.filter(c => c.region === region).map((c) => (
                            <div 
                              key={c.iso} 
                              onClick={() => { setSelectedCountry(c); setIsDropdownOpen(false); }} 
                              className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                            >
                              <img src={c.flag} alt="" className="w-6 h-4 object-cover rounded-sm opacity-90" />
                              <span className="text-sm font-medium text-slate-200">{c.name}</span>
                              {c.code && <span className="text-xs font-bold text-slate-500 ml-auto">{c.code}</span>}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-stretch gap-2 h-[58px]">
                {/* Скрываем блок с кодом, если выбрано "Other" */}
                {selectedCountry.code && (
                  <div className="bg-[#1e293b] border border-white/10 rounded-2xl px-4 flex items-center justify-center font-bold text-slate-300 min-w-[80px]">
                    {selectedCountry.code}
                  </div>
                )}
                <input name="phone" type="tel" placeholder={t.form.phone} required className="flex-1 p-4 bg-[#1e293b]/50 border border-white/10 rounded-2xl outline-none text-white placeholder-slate-400 focus:border-blue-500 transition-all" />
              </div>

              <div className="space-y-3 pt-2">
                <div className="relative flex items-center bg-[#1e293b]/50 border border-white/10 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-all">
                  <div className="bg-[#2AABEE]/20 text-[#2AABEE] px-4 py-4 flex items-center justify-center gap-2 border-r border-white/5 font-semibold text-sm w-[140px] shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.31-.346-.11l-6.4 4.02-2.76-.89c-.6-.188-.61-.593.125-.89l10.816-4.17c.5-.188.945.105.808.89z"/></svg>
                    Telegram
                  </div>
                  <div className="text-slate-400 pl-3 font-bold">@</div>
                  <input name="telegram" type="text" placeholder="username" className="w-full py-4 pr-4 bg-transparent outline-none text-white placeholder-slate-500" />
                </div>

                <div className="relative flex items-center bg-[#1e293b]/50 border border-white/10 rounded-2xl overflow-hidden focus-within:border-emerald-500 transition-all">
                  <div className="bg-[#25D366]/20 text-[#25D366] px-4 py-4 flex items-center justify-center gap-2 border-r border-white/5 font-semibold text-sm w-[140px] shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </div>
                  <div className="text-slate-400 pl-3 font-bold">+</div>
                  <input name="whatsapp" type="text" placeholder="1234567890" className="w-full py-4 pr-4 bg-transparent outline-none text-white placeholder-slate-500" />
                </div>
              </div>

              <button disabled={isSubmitting} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-900 font-black py-5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all transform hover:scale-[1.02] active:scale-100 uppercase tracking-widest text-sm mt-4 disabled:opacity-70 disabled:scale-100">
                {isSubmitting ? t.form.processing : t.form.button}
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Уведомление */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-[100] animate-fade-in-up">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-4 ${
            notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100' : 'bg-red-500/10 border-red-500/30 text-red-100'
          }`}>
            <p className="font-semibold">{notification.text}</p>
          </div>
        </div>
      )}
    </section>
  );
}


export default function HeroForm({ t }: { t: any }) {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#070b14] animate-pulse"></div>}>
      <HeroFormContent t={t} />
    </Suspense>
  );
}