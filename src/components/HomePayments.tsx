import React from 'react';

export default function HomePayments({ t }: { t: any }) {
  if (!t.homeNew) return null;

  const payments = [
    {
      name: 'USDT (TRC20)',
      hoverClass: 'group-hover:border-emerald-500/50 group-hover:text-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 8h-2.5v6h-2v-6H8.5V8h7v2z" />
        </svg>
      )
    },
    {
      name: 'Bitcoin',
      hoverClass: 'group-hover:border-orange-500/50 group-hover:text-orange-400 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 10h-2V8h2c1.1 0 2-.9 2-2s-.9-2-2-2H9v2H7v2h2v10H7v2h2v-2h2v2h2v-2c1.66 0 3-1.34 3-3 0-1.25-.76-2.35-1.85-2.78C16.66 12.87 17 11.98 17 11c0-1.66-1.34-3-3-3zm-2 2h-2v-2h2c.55 0 1 .45 1 1s-.45 1-1 1zm1 6h-3v-2h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      )
    },
    {
      name: 'Ethereum',
      hoverClass: 'group-hover:border-indigo-400/50 group-hover:text-indigo-300 group-hover:shadow-[0_0_30px_rgba(129,140,248,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.996 2L4.085 15.228l7.911 4.673 7.918-4.673L11.996 2zm0 17.518l-6.195-3.658L11.996 5.5l6.195 10.36-6.195 3.658z" />
        </svg>
      )
    },
    {
      name: 'Visa / Mastercard',
      hoverClass: 'group-hover:border-blue-500/50 group-hover:text-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
        </svg>
      )
    },
    {
      name: 'Skrill',
      hoverClass: 'group-hover:border-purple-600/50 group-hover:text-purple-400 group-hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-6.5h7v-2h-7v2zm0-5h7v-2h-7v2z" />
        </svg>
      )
    },
    {
      name: 'Neteller',
      hoverClass: 'group-hover:border-green-500/50 group-hover:text-green-400 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6h16v12H4V6zm2 2v8h12V8H6zm3 2h6v4H9v-4z" />
        </svg>
      )
    },
    {
      name: 'M-Pesa / Mobile Money',
      hoverClass: 'group-hover:border-rose-500/50 group-hover:text-rose-400 group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-5 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      )
    },
    {
      name: 'Bank Transfer',
      hoverClass: 'group-hover:border-slate-300/50 group-hover:text-slate-100 group-hover:shadow-[0_0_30px_rgba(248,250,252,0.15)]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9h22L12 3zm-7 9h2v7H5v-7zm6 0h2v7h-2v-7zm6 0h2v7h-2v-7zM2 22h20v-2H2v2z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-24 bg-[#070b14] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Заголовок */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            {t.homeNew.payBadge}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t.homeNew.payTitle}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.homeNew.paySubtitle}
          </p>
        </div>
        
        {/* Сетка платежек */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-5xl mx-auto">
        {payments.map((pay, i) => (
          <div 
            key={i} 
            data-aos="fade-up" 
            data-aos-delay={i * 50}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#0f172a]/60 backdrop-blur-md border border-white/5 text-slate-300 font-semibold cursor-default transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${pay.hoverClass}`}
            >
              <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                {pay.icon}
              </div>
              <span className="tracking-wide">{pay.name}</span>
            </div>
          ))}
          
          {/* Плашка "И еще 190+" */}
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-white/5 text-slate-400 font-bold border-dashed cursor-default">
             {t.homeNew.payMore}
          </div>
        </div>

      </div>
    </section>
  );
}