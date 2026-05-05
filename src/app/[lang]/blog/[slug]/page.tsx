import React from 'react';
import type { Metadata } from 'next';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';


export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  

  const article = dictionaries[langKey]?.articles?.[slug as keyof typeof dictionaries['en']['articles']];
  const baseUrl = 'https://1xmobcash.net';

  if (!article) {
    return { title: 'Article Not Found | 1xMobCash' };
  }

  return {
    title: article.meta.title,
    description: article.meta.desc,
    keywords: article.meta.keywords,
    openGraph: {
      title: article.meta.title,
      description: article.meta.desc,
      url: `${baseUrl}/${lang}/blog/${slug}`,
      images: [
        {
          url: article.meta.ogImage,
          width: 1200,
          height: 630,
          alt: article.meta.title,
        },
      ],
      type: 'article',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/blog/${slug}`,
    }
  };
}


export default async function BlogPostPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];
  const baseUrl = 'https://1xmobcash.net';
  

  const article = t.articles?.[slug as keyof typeof t.articles];


  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b14] text-white selection:bg-purple-600">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-slate-400 mb-8">Article not found or moved.</p>
        <Link href={`/${langKey}/blog`} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all">
          {t.blogPage?.btnBack || "Back to Blog"}
        </Link>
      </div>
    );
  }

  // === ГЕНЕРАЦИЯ МИКРОРАЗМЕТКИ SCHEMA.ORG ===
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${lang}/blog/${slug}`
    },
    "headline": article.header.title,
    "description": article.meta.desc,
    "image": article.meta.ogImage,
    "author": {
      "@type": "Organization",
      "name": "1xMobCash",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "1xMobCash",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`
      }
    },
    "datePublished": article.header.date 
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow">
        
        {/* Внедряем JSON-LD скрипт для Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Шапка статьи */}
        <section className="relative w-full pt-24 pb-12 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <Link href={`/${langKey}/blog`} className="text-purple-400 font-bold hover:text-purple-300 transition-colors mb-8 inline-flex items-center gap-2 uppercase tracking-wider text-sm">
              <span aria-hidden="true">←</span> {t.blogPage?.btnBack || "Back to Blog"}
            </Link>
            
            <div className="flex items-center gap-3 text-sm text-slate-400 font-bold uppercase tracking-wider mb-6">
              <span className="text-purple-400">{article.header.tag}</span>
              <span>•</span>
              <span>{article.header.date}</span>
              <span>•</span>
              <span>{article.header.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-8">
              {article.header.title}
            </h1>
          </div>
        </section>

        {/* Тело статьи */}
        <section className="py-16">
          <article className="container max-w-4xl mx-auto px-4 sm:px-6 prose prose-lg prose-invert prose-purple">
            
            {/* === ГЛАВНАЯ КАРТИНКА СТАТЬИ === */}
            <div className="mb-12 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src={article.meta.ogImage} 
                alt={article.header.title} 
                className="w-full h-auto max-h-[450px] object-cover hover:scale-105 transition-transform duration-700 m-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed mb-10 font-medium">
              {article.content.intro}
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">{article.content.h2_1}</h2>
            <p className="text-slate-400 mb-6">{article.content.p_1}</p>
            <ul className="space-y-3 mb-10 bg-[#0f172a]/50 p-8 rounded-3xl border border-white/5">
              {article.content.list_1.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold mt-1">✓</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">{article.content.h2_2}</h2>
            <p className="text-slate-400 mb-6">{article.content.p_2}</p>
            <ul className="space-y-3 mb-10 bg-[#0f172a]/50 p-8 rounded-3xl border border-white/5">
              {article.content.list_2.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold mt-1">✓</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">{article.content.h2_3}</h2>
            <p className="text-slate-400 mb-10">{article.content.p_3}</p>

            {/* Заключение и CTA */}
            <div className="bg-gradient-to-br from-purple-900/40 to-[#0f172a] p-8 rounded-3xl border border-purple-500/20 mt-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-lg text-white font-medium m-0 max-w-xl">
                {article.content.conclusion}
              </p>
              <Link href={`/${langKey}/?role=partner#registration-form`} className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-black py-4 px-8 rounded-xl transition-all whitespace-nowrap shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                {t.blogPage?.ctaBtn || "Start Earning Now"}
              </Link>
            </div>
          </article>
        </section>
      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}