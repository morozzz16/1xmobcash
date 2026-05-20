import React from 'react';
import Link from 'next/link';

export default function MyManagerCTA({ t, langKey }: { t: any; langKey: string }) {
  const m = t?.myManager || {};

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b14]">
      <div className="absolute top-1/2 right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-[#0f172a]/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Левая колонка: Текстовый контент */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 relative flex items-center justify-center">
                  <span className="absolute inset-0 bg-blue-400 rounded-full opacity-75 animate-ping"></span>
                </span>
                {m.badge || "100% Secure"}
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {m.title || "Direct Connection with Your Manager"}
              </h2>

              <p className="text-slate-400 leading-relaxed text-sm lg:text-base max-w-2xl">
                {m.subtitle || "Protect your business. No Telegram or WhatsApp scammers. Communicate safely through our exclusive, encrypted MyManager app."}
              </p>

              <div className="pt-2">
                <Link
                  href={`/${langKey}/mymanager`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all duration-300 group/btn"
                >
                  <span>{m.ctaButton || "Discover MyManager"}</span>
                  <svg 
                    className="w-4 h-4 text-white transform group-hover/btn:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Правая колонка: Графика интерфейса */}
            <div className="lg:col-span-5 relative w-full h-[340px] flex items-center justify-center select-none">
              <div className="w-full max-w-[360px] bg-[#1e293b]/40 border border-white/10 rounded-2xl p-4 shadow-2xl relative backdrop-blur-md transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
                      M
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold tracking-wide">{m.chatTitle || "Personal Manager"}</div>
                      <div className="text-blue-400 text-[10px] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        {m.chatStatus || "Encrypted Connection"}
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-500 bg-blue-500/10 p-1.5 rounded-xl border border-blue-500/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
                    </svg>
                  </div>
                </div>
                <div className="space-y-3 opacity-80 text-[11px]">
                  <div className="bg-[#0f172a]/80 border border-white/5 p-2.5 rounded-2xl rounded-tl-none max-w-[85%] text-slate-300">
                    {m.chatMsg1 || "Hello! Here is your secure workspace. Your traffic data and financial reports are fully protected here."}
                  </div>
                  <div className="bg-blue-600 text-white p-2.5 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-right font-medium shadow-md shadow-blue-600/10">
                    {m.chatMsg2 || "Excellent, thank you! It feels much safer than staying on Telegram."}
                  </div>
                </div>
              </div>

              {/* Виджеты */}
              <div className="absolute top-6 -right-2 md:-right-6 bg-[#0f172a]/90 border border-red-500/30 rounded-2xl p-3.5 shadow-2xl max-w-[200px] transform rotate-3 group-hover:rotate-1 transition-transform duration-500 backdrop-blur-md">
                <div className="flex items-start gap-2.5">
                  <div className="text-red-500 bg-red-500/10 p-1.5 rounded-lg border border-red-500/20 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-[11px] font-bold mb-0.5">{m.widget1Title || "Third-Party Apps"}</div>
                    <div className="text-red-400 text-[10px] font-medium leading-tight">{m.widget1Desc || "Telegram/WhatsApp phishing threats blocked."}</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 -left-2 md:-left-6 bg-[#0f172a]/90 border border-blue-500/30 rounded-2xl p-3.5 shadow-2xl max-w-[180px] transform -rotate-6 group-hover:-rotate-3 transition-transform duration-500 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className="text-blue-500 bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-[11px] font-bold">{m.widget2Title || "1xBet Verification"}</div>
                    <div className="text-blue-400 text-[9px] font-black uppercase tracking-wider mt-0.5">{m.widget2Desc || "100% Authentic"}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}