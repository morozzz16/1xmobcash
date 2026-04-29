import React from 'react';
import type { Metadata } from 'next';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// === 1. ГЕНЕРАЦИЯ SEO МЕТАДАННЫХ (БЕЗОПАСНАЯ ВЕРСИЯ) ===
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const langKey = (params.lang as keyof typeof dictionaries) || 'en';
  const seoData = dictionaries[langKey]?.blogPage || dictionaries['en']?.blogPage;
  const baseUrl = 'https://1xmobcash.net';

  return {
    title: seoData?.seoTitle || "1xMobCash Blog",
    description: seoData?.seoDesc || "Stay updated with the latest news.",
    openGraph: {
      title: seoData?.seoTitle || "1xMobCash Blog",
      description: seoData?.seoDesc || "Stay updated with the latest news.",
      url: `${baseUrl}/${params.lang}/blog`,
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/blog`,
    }
  };
}

const defaultBlogPage = {
  badge: "News & Insights",
  title: "1xMobCash ",
  titleHighlight: "Blog",
  subtitle: "Stay updated with the latest news, updates, and strategies for 1xBet agents and affiliate partners.",
  emptyState: "New articles are coming soon. Stay tuned!",
  btnBack: "Back to Home"
};

export default function BlogPage({ params }: { params: { lang: string } }) {
  const langKey = (params.lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];
  
  const pageT = t?.blogPage || dictionaries['en']?.blogPage || defaultBlogPage;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow">
        <section className="relative w-full pt-20 pb-24 lg:pt-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              {pageT.badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8 max-w-4xl mx-auto">
              {pageT.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{pageT.titleHighlight}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-16">
              {pageT.subtitle}
            </p>
            
            <div className="max-w-3xl mx-auto bg-[#0f172a]/50 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <div className="text-6xl mb-6">✍️</div>
              <h3 className="text-2xl font-bold text-white mb-4">{pageT.emptyState}</h3>
              <Link href={`/${langKey}`} className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-bold transition-colors">
                ← {pageT.btnBack}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}