import React from 'react';
import Link from 'next/link';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {

  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  const articles = t.articles || {};
  const articleEntries = Object.entries(articles);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow">
        
        {/* === HERO-ШАПКА  === */}
        <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[400px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[300px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-[-10%] w-[40%] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            {/* Бейджик */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              {t.blogPage?.badge || "Latest Updates & Guides"}
            </div>
            
            {/* Заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
              {t.blogPage?.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">{t.blogPage?.titleHighlight}</span>
            </h1>
            
            {/* Подзаголовок */}
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t.blogPage?.subtitle || "Insights, guides, and practical strategies to maximize your iGaming profits."}
            </p>
            
          </div>
        </section>

        {/* Сетка со статьями */}
        <section className="py-24 relative z-10 bg-[#070b14]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articleEntries.map(([slug, article]: [string, any]) => {

                if (!article || !article.meta || !article.header) return null;

                return (
                  <Link href={`/${langKey}/blog/${slug}`} key={slug} className="group flex flex-col h-full">
                    
                    {/* Обложка */}
                    <div className="h-56 bg-[#0f172a] rounded-t-3xl border-t border-x border-white/5 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${article.meta.ogImage})` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-80"></div>
                    </div>
                    
                    {/* Текст карточки */}
                    <div className="bg-[#0a0f1c] p-8 rounded-b-3xl border border-white/5 group-hover:border-purple-500/30 transition-all flex-grow flex flex-col shadow-xl shadow-black/50 relative z-10 -mt-2">
                      
                      {/* Теги */}
                      <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase mb-4 tracking-wider">
                        <span>{article.header.tag}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">{article.header.readTime}</span>
                      </div>
                      
                      {/* Заголовок */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors leading-snug">
                        {article.header.title}
                      </h3>
                      
                      {/* Описание */}
                      <p className="text-slate-400 text-sm line-clamp-3 mb-8 flex-grow">
                        {article.meta.desc}
                      </p>
                      
                      {/* Кнопка "Читать" */}
                      <div className="text-purple-500 font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform uppercase tracking-widest mt-auto">
                        {t.homeNew?.blogBtn || "Read Article"} 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </div>
                    </div>
                    
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}