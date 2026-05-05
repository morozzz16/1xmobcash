'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfitCalculator({ t, langKey }: { t: any, langKey: string }) {

  const [players, setPlayers] = useState<number>(50);
  const [deposit, setDeposit] = useState<number>(100);

  // Формула расчета прибыли (35% RevShare)
  const revShare = 0.35;
  const profit = Math.round(players * deposit * revShare);

  const c = t.calculator || {};

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Фоновое свечение (Неон) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">

        <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            {c.title || "Calculate Your Profit"}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {c.subtitle || "See how much you can earn with our high RevShare rates."}
          </p>
        </div>

        {/* Главная карточка калькулятора */}
       
            <div 
            data-aos="fade-up" 
            data-aos-delay="200"
            className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-purple-900/20 relative overflow-hidden"
            >
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Левая часть: Слайдеры */}
            <div className="space-y-10">
              {/* Слайдер 1: Игроки */}
              <div className="relative">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-slate-300 font-bold tracking-wide">{c.players || "Active Players"}</label>
                  <span className="text-3xl font-black text-white">{players}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10"
                  value={players}
                  onChange={(e) => setPlayers(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Слайдер 2: Депозит */}
              <div className="relative">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-slate-300 font-bold tracking-wide">{c.deposit || "Average Deposit"}</label>
                  <span className="text-3xl font-black text-white">${deposit}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            {/* Правая часть: Результат (Сумма) */}
            <div className="flex flex-col items-center justify-center p-8 bg-[#04060b]/50 border border-white/5 rounded-3xl text-center shadow-inner">
              <p className="text-slate-400 font-medium mb-3 uppercase tracking-wider text-sm">
                {c.result || "Estimated Profit"}
              </p>
              
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-500 mb-6 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                ${new Intl.NumberFormat('en-US').format(profit)}
              </div>
              
              <p className="text-xs text-slate-500 mb-8 italic">
                {c.disclaimer || "*Based on an average 35% RevShare"}
              </p>
              
                <button 
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('registration-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = `/${langKey}/#registration-form`;
                  }
                }}
                className="w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transform hover:-translate-y-1"
              >
                {t.blogPage?.ctaBtn || "Start Earning Now"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}