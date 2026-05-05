import React from 'react';
import type { Metadata } from 'next';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const seoData = dictionaries[langKey]?.agentPage || dictionaries['en']?.agentPage;
  const baseUrl = 'https://1xmobcash.net';

  return {
    title: seoData?.seoTitle || "Open a 1xBet Betting Shop | MobCash Agent",
    description: seoData?.seoDesc || "Become a local 1xBet cashier. Zero franchise fees, 100% risk-free.",
    openGraph: {
      title: seoData?.seoTitle || "Open a 1xBet Betting Shop | MobCash Agent",
      description: seoData?.seoDesc || "Become a local 1xBet cashier. Zero franchise fees, 100% risk-free.",
      url: `${baseUrl}/${lang}/agent`,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/agent`,
    }
  };
}

const defaultAgentPage = {
  badge: "Official Franchise & MobCash",
  title: "Open Your Own ",
  titleHighlight: "Betting Cashier",
  subtitle: "Start a highly profitable business with zero risks. Process deposits and withdrawals for 1xBet players in your area using our free software and earn up to 5% commission on every transaction.",
  btnApply: "Apply as Agent",
  btnLearn: "Why Choose Us",
  stat1Value: "$0", stat1Label: "Franchise Fee",
  stat2Value: "100%", stat2Label: "Risk-Free",
  stat3Value: "48h", stat3Label: "Quick Launch",
  stat4Value: "Up to 5%", stat4Label: "Commission",
  benefitsTitle: "Why Become a 1xBet Agent?",
  benefitsSubtitle: "We provide everything you need to start making money, whether you own a shop or work as a mobile cashier.",
  ben1Title: "Zero Financial Risks", ben1Desc: "You don't risk your own money. 1xBet covers all player winnings.",
  ben2Title: "Free Premium Software", ben2Desc: "Get full access to the official MobCash application absolutely free.",
  ben3Title: "No Franchise Fees", ben3Desc: "Unlike traditional franchises, we don't charge any entry fees or royalties.",
  ben4Title: "Free Expert Training", ben4Desc: "We provide comprehensive training for you and your staff.",
  ben5Title: "Marketing Support", ben5Desc: "Receive branded promotional materials and banners.",
  ben6Title: "24/7 Priority Support", ben6Desc: "Your dedicated personal manager is always available to help.",
  stepsTitle: "Launch in 4 Simple Steps",
  stepsSubtitle: "Start your business in less than 48 hours.",
  step1Title: "Submit Application", step1Desc: "Fill out the short form on our site. Our manager will contact you.",
  step2Title: "Get Approved & Trained", step2Desc: "Sign the agreement and pass a quick, free training session.",
  step3Title: "Fund Your Account", step3Desc: "Top up your agent working balance.",
  step4Title: "Start Earning", step4Desc: "Process local transactions and instantly receive commissions.",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Clear answers to help you make the right decision.",
  faq1Q: "Do I need to rent a physical shop?", faq1A: "Not necessarily! You can work as a 'Mobile Cashier' via your smartphone.",
  faq2Q: "Who pays the players when they win big?", faq2A: "1xBet pays all winnings! You bear zero risk.",
  faq3Q: "Do I have to buy expensive equipment?", faq3A: "No. Our software works perfectly on any standard PC or smartphone.",
  faq4Q: "How do I get my commission?", faq4A: "Your commission is automatically credited to your agent account.",
  ctaTitle: "Ready to launch your financial hub?",
  ctaSubtitle: "Join thousands of successful 1xBet agents worldwide.",
  ctaBtn: "Start Your Business"
};

export default async function AgentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];
  const pageT = t?.agentPage || dictionaries['en']?.agentPage || defaultAgentPage;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full pt-24 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {pageT.badge}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-8 max-w-5xl mx-auto">
              {pageT.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{pageT.titleHighlight}</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-12">
              {pageT.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href={`/${langKey}/?role=agent#registration-form`} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black py-4 px-10 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all transform hover:scale-[1.02] active:scale-100 uppercase tracking-widest text-sm text-center">
                {pageT.btnApply}
              </Link>
              <a href="#benefits" className="w-full sm:w-auto bg-[#1e293b]/80 hover:bg-[#1e293b] border border-white/10 text-white font-bold py-4 px-10 rounded-2xl transition-all uppercase tracking-widest text-sm text-center">
                {pageT.btnLearn}
              </a>
            </div>
          </div>
        </section>

        {/* 2. STATS BAR */}
        <section className="py-12 border-y border-white/5 bg-[#0a0f1c]/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
              <div>
                <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">{pageT.stat1Value}</div>
                <div className="text-sm text-blue-500/80 uppercase tracking-wider font-bold">{pageT.stat1Label}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{pageT.stat2Value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{pageT.stat2Label}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{pageT.stat3Value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{pageT.stat3Label}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{pageT.stat4Value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{pageT.stat4Label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BENEFITS GRID */}
        <section id="benefits" className="py-24 bg-[#0a0f1c]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{pageT.benefitsTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">{pageT.benefitsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">🛡️</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben1Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben1Desc}</p>
              </div>
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">💻</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben2Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben2Desc}</p>
              </div>
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">🆓</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben3Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben3Desc}</p>
              </div>
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">🎓</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben4Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben4Desc}</p>
              </div>
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">📣</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben5Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben5Desc}</p>
              </div>
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">📞</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben6Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben6Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="py-24 bg-[#070b14] border-t border-white/5 relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{pageT.stepsTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">{pageT.stepsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0"></div>

              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-blue-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(37,99,235,0.15)]">📝</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step1Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step1Desc}</p>
              </div>
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-blue-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(37,99,235,0.15)]">🤝</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step2Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step2Desc}</p>
              </div>
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-blue-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(37,99,235,0.15)]">💳</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step3Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step3Desc}</p>
              </div>
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-blue-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(37,99,235,0.15)]">💰</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step4Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION */}
        <section className="py-24 bg-[#0a0f1c] border-t border-white/5">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{pageT.faqTitle}</h2>
              <p className="text-slate-400 text-lg">{pageT.faqSubtitle}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-blue-400">Q:</span> {pageT.faq1Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq1A}</p>
              </div>
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-blue-400">Q:</span> {pageT.faq2Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq2A}</p>
              </div>
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-blue-400">Q:</span> {pageT.faq3Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq3A}</p>
              </div>
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-blue-400">Q:</span> {pageT.faq4Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq4A}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] p-12 rounded-[3rem] border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{pageT.ctaTitle}</h2>
            <p className="text-xl text-slate-400 mb-10">{pageT.ctaSubtitle}</p>
            <Link href={`/${langKey}/?role=agent#registration-form`} className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-lg uppercase tracking-widest">
              {pageT.ctaBtn}
            </Link>
          </div>
        </section>

      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}