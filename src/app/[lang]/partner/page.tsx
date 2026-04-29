import React from 'react';
import type { Metadata } from 'next';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const langKey = (params.lang as keyof typeof dictionaries) || 'en';
  const seoData = dictionaries[langKey]?.partnerPage || dictionaries['en']?.partnerPage;
  const baseUrl = 'https://1xmobcash.net';

  return {
    title: seoData?.seoTitle || "1xBet Affiliate Partner | Up to 40% RevShare",
    description: seoData?.seoDesc || "Monetize your traffic with the 1xBet affiliate program. Get a lifetime revenue share, weekly payouts, and real-time stats.",
    openGraph: {
      title: seoData?.seoTitle || "1xBet Affiliate Partner",
      description: seoData?.seoDesc || "Monetize your traffic with the 1xBet affiliate program.",
      url: `${baseUrl}/${params.lang}/partner`,
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/partner`,
    }
  };
}

// Резервный объект стал огромным, чтобы покрыть все новые блоки
const defaultPartnerPage = {
  badge: "Official Affiliate Program",
  title: "Monetize Your Traffic with ",
  titleHighlight: "1xBet Partners",
  subtitle: "Turn your audience into a stable income stream. Promote a top-tier global betting brand on your website, social media, or Telegram channel and earn up to 40% lifetime commission.",
  btnApply: "Become a Partner",
  btnLearn: "Explore Benefits",
  stat1Value: "100,000+", stat1Label: "Active Partners",
  stat2Value: "69+", stat2Label: "Supported Languages",
  stat3Value: "200+", stat3Label: "Payment Methods",
  stat4Value: "Up to 40%", stat4Label: "Revenue Share",
  benefitsTitle: "Why Choose 1xPartners?",
  benefitsSubtitle: "We provide the best conditions on the market to maximize your affiliate marketing profit.",
  ben1Title: "High RevShare & CPA", ben1Desc: "Start with a high base rate and earn up to 40% lifetime revenue share, or request custom CPA deals.",
  ben2Title: "Weekly Automated Payouts", ben2Desc: "Your earnings are automatically transferred every Tuesday to your preferred payment method.",
  ben3Title: "Real-Time Statistics", ben3Desc: "Track your clicks, registrations, FTDs, and commissions in real-time through an advanced dashboard.",
  ben4Title: "Vast Promo Library", ben4Desc: "Access thousands of high-converting, ready-to-use banners, landing pages, and promo codes.",
  ben5Title: "Personal Account Manager", ben5Desc: "Get a dedicated expert who will help you analyze your traffic and optimize campaigns.",
  ben6Title: "High Player Retention", ben6Desc: "1xBet offers massive slots and constant bonuses, ensuring players stay and generate profit for years.",
  stepsTitle: "How to Start Earning?",
  stepsSubtitle: "Four simple steps to launch your first profitable campaign.",
  step1Title: "Register", step1Desc: "Fill out the application form on 1xMobCash. Approval takes less than 24 hours.",
  step2Title: "Get Promo Materials", step2Desc: "Log in to your dashboard, generate your unique link, and choose marketing materials.",
  step3Title: "Drive Traffic", step3Desc: "Place links on your website, YouTube, Telegram, or run targeted ads to attract players.",
  step4Title: "Get Paid", step4Desc: "Receive your well-deserved commissions every week directly to your wallet.",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Everything you need to know about the affiliate program.",
  faq1Q: "Do I have to pay to join the affiliate program?", faq1A: "No, joining the 1xBet affiliate program is absolutely free.",
  faq2Q: "How often are the statistics updated?", faq2A: "Affiliate statistics are updated in real-time.",
  faq3Q: "What is the minimum payout amount?", faq3A: "The minimum withdrawal amount is $30.",
  faq4Q: "Can I promote on Telegram or WhatsApp?", faq4A: "Yes! Social media and messengers are excellent traffic sources.",
  ctaTitle: "Ready to scale your affiliate business?",
  ctaSubtitle: "Join 100,000+ successful partners worldwide today.",
  ctaBtn: "Register Now"
};

export default function PartnerPage({ params }: { params: { lang: string } }) {
  const langKey = (params.lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];
  const pageT = t?.partnerPage || dictionaries['en']?.partnerPage || defaultPartnerPage;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full pt-24 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {pageT.badge}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-8 max-w-5xl mx-auto">
              {pageT.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{pageT.titleHighlight}</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-12">
              {pageT.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href={`/${langKey}/?role=partner#registration-form`} className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black py-4 px-10 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all transform hover:scale-[1.02] active:scale-100 uppercase tracking-widest text-sm text-center">                {pageT.btnApply}
              </Link>
              <a href="#benefits" className="w-full sm:w-auto bg-[#1e293b]/80 hover:bg-[#1e293b] border border-white/10 text-white font-bold py-4 px-10 rounded-2xl transition-all uppercase tracking-widest text-sm text-center">
                {pageT.btnLearn}
              </a>
            </div>
          </div>
        </section>

        {/* 2. STATS BAR (Social Proof) */}
        <section className="py-12 border-y border-white/5 bg-[#0a0f1c]/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{pageT.stat1Value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">{pageT.stat1Label}</div>
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
                <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">{pageT.stat4Value}</div>
                <div className="text-sm text-emerald-500/80 uppercase tracking-wider font-bold">{pageT.stat4Label}</div>
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
              {/* Ben 1 */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">📈</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben1Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben1Desc}</p>
              </div>
              {/* Ben 2 */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">💸</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben2Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben2Desc}</p>
              </div>
              {/* Ben 3 */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben3Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben3Desc}</p>
              </div>
              {/* Ben 4 */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">🎨</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben4Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben4Desc}</p>
              </div>
              {/* Ben 5 */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">🤝</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben5Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben5Desc}</p>
              </div>
              {/* Ben 6 */}
              <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-6">🔥</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.ben6Title}</h3>
                <p className="text-slate-400 leading-relaxed">{pageT.ben6Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS (Steps) */}
        <section className="py-24 bg-[#070b14] border-t border-white/5 relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{pageT.stepsTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">{pageT.stepsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line for Desktop */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0"></div>

              {/* Step 1 */}
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(16,185,129,0.15)]">📝</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step1Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step1Desc}</p>
              </div>
              {/* Step 2 */}
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(16,185,129,0.15)]">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step2Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step2Desc}</p>
              </div>
              {/* Step 3 */}
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(16,185,129,0.15)]">🚀</div>
                <h3 className="text-xl font-bold text-white mb-3">{pageT.step3Title}</h3>
                <p className="text-slate-400 text-sm">{pageT.step3Desc}</p>
              </div>
              {/* Step 4 */}
              <div className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f172a] rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-3xl mb-6 z-10 relative shadow-[0_0_20px_rgba(16,185,129,0.15)]">💰</div>
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
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-emerald-400">Q:</span> {pageT.faq1Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq1A}</p>
              </div>
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-emerald-400">Q:</span> {pageT.faq2Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq2A}</p>
              </div>
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-emerald-400">Q:</span> {pageT.faq3Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq3A}</p>
              </div>
              <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3"><span className="text-emerald-400">Q:</span> {pageT.faq4Q}</h4>
                <p className="text-slate-400 pl-8">{pageT.faq4A}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/20"></div>
          <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] p-12 rounded-[3rem] border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{pageT.ctaTitle}</h2>
            <p className="text-xl text-slate-400 mb-10">{pageT.ctaSubtitle}</p>
            <Link href={`/${langKey}/?role=partner#registration-form`} className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black py-4 px-10 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all transform hover:scale-[1.02] active:scale-100 uppercase tracking-widest text-sm text-center">              {pageT.ctaBtn}
            </Link>
          </div>
        </section>

      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}