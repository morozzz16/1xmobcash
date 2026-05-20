import React from 'react';
import type { Metadata } from "next";
import { dictionaries } from '@/lib/dictionaries';
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 
import ZoomImage from "@/components/ZoomImage"; 

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = 'https://1xmobcash.net';
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return {
    title: t.myManagerPage?.metaTitle || "MyManager | Secure 1xBet Partner Workspace",
    description: t.myManagerPage?.metaDescription || "Exclusive and secure app for direct communication with 1xBet managers.",
    alternates: { canonical: `${baseUrl}/${lang}/mymanager` },
  };
}

export default async function MyManagerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];
  
  const p = t.myManagerPage || {};

  const renderTextWithLinks = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => 
      urlRegex.test(part) ? (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 decoration-blue-500/40 transition-colors break-all"
        >
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header t={t} langKey={langKey} />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {p.heroBadge || "Enterprise Security Standard"}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              My<span className="text-blue-500">Manager</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-4xl mx-auto mb-10">
              {p.heroSubtitle}
            </p>

            <a href="https://my-manager.1xjobs.com/login" target="_blank" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-[0_10px_40px_rgba(37,99,235,0.3)] hover:scale-[1.03]">
               {p.mainCta || "ACCESS SECURE APP"}
            </a>
          </div>
        </section>

        {/* УТП: БЕЗОПАСНОСТЬ */}
        <section className="py-20 bg-white/[0.02] border-y border-white/5">
          <div className="container max-w-6xl mx-auto px-4">

            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Левая колонка: Текст */}
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight">
                   {p.securityTitle}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  {p.securityDesc}
                </p>
                
                <div className="space-y-4">
                  {[p.check1, p.check2, p.check3].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white font-bold">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 shrink-0">✓</div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Правая колонка: Карточка с иконкой */}
              <div className="relative h-full">
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
                {/* Карточка занимает всю высоту (h-full) и центрирует контент */}
                <div className="relative h-full bg-[#0f172a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col justify-center items-center text-center">
                   
                   {/* Блок с иконкой приложения MyManager */}
                   <div className="relative mb-8 group">
                     {/* Свечение позади иконки */}
                     <div className="absolute inset-0 bg-blue-500/40 blur-[40px] rounded-full group-hover:bg-blue-500/60 transition-colors duration-500"></div>
                     <img 
                       src="/images/mymanager/pwa-192x192.png" 
                       alt="MyManager App Icon" 
                       className="w-28 h-28 md:w-32 md:h-32 relative z-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 transform group-hover:scale-105 transition-transform duration-500 object-cover"
                     />
                   </div>

                   <div className="text-3xl font-black text-white mb-3">{p.verifiedBadge || "100% Verified"}</div>
                   <p className="text-slate-400 text-base font-medium max-w-sm">{p.verifiedSub || "Exclusive workspace for 1xBet partners."}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ОСТАЛЬНЫЕ ПРЕИМУЩЕСТВА */}
        <section className="py-24">
          <div className="container max-w-6xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">
               {p.featuresTitle}
            </h2>
          </div>
          <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
             {[
               { icon: "💬", t: p.f2t, d: p.f2d },
               { icon: "📢", t: p.f3t, d: p.f3d },
               { icon: "🎁", t: p.f4t, d: p.f4d }
             ].map((feat, i) => (
               <div key={i} className="bg-[#0f172a]/60 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all group">
                 <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{feat.icon}</div>
                 <h3 className="text-xl font-black text-white mb-3">{feat.t}</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">{feat.d}</p>
               </div>
             ))}
          </div>
        </section>

        {/* КАК ЗАРЕГИСТРИРОВАТЬСЯ */}
        <section className="py-24 bg-[#0b1221]">
          <div className="container max-w-6xl mx-auto px-4 mb-20 text-center">
            <h2 className="text-3xl lg:text-6xl font-black text-white mb-6 tracking-tight">
               {p.stepsMainTitle || "How to Register in MyManager?"}
            </h2>
          </div>

          <div className="container max-w-6xl mx-auto px-4 space-y-32">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="grid lg:grid-cols-2 gap-12 items-center group">
                <div className={`${step % 2 === 0 ? 'lg:order-2' : ''}`}>
                  <div className="text-blue-500 font-black text-7xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">0{step}</div>
                  <p className="text-slate-300 text-xl leading-relaxed font-medium">
                    {renderTextWithLinks(p[`step${step}Desc`])}
                  </p>
                </div>
                
                <div className="relative aspect-[1900/940] w-full bg-[#070b14] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <ZoomImage 
                    src={`/images/mymanager/step${step}.jpg`} 
                    alt={`MyManager Registration Step ${step}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO-БЛОК */}
        <section className="py-16 bg-[#04060b] border-t border-white/5">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-500 mb-4">
              {p.seoTitle || "Official MyManager App for 1xBet Agents and Partners"}
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
              <p>
                {p.seoText1 || "In the rapidly growing iGaming industry, protecting your affiliate and agent networks is paramount. MyManager is the official, secure workspace designed exclusively for 1xBet partners and mobile cashiers. By completely eliminating the risks associated with third-party messengers like Telegram and WhatsApp, our application ensures that your business communications, financial data, and promotional tools remain 100% protected against phishing and unauthorized access."}
              </p>
              <p>
                {p.seoText2 || "Whether you are expanding your mobile cashier network or managing high-volume affiliate traffic, direct access to a verified 1xBet manager provides a critical competitive advantage. Enjoy real-time support for payouts, exclusive promo codes, and instant operational updates in a closed, encrypted ecosystem. Join the professional network of agents today and secure your digital business infrastructure with the ultimate anti-scam solution."}
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer t={t} langKey={langKey} />
    </div>
  );
}