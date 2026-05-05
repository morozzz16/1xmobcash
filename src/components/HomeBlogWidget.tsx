import React from 'react';
import Link from 'next/link';

export default function HomeBlogWidget({ langKey, t }: { langKey: string, t: any }) {
  if (!t.homeNew) return null;

  return (
    <section className="py-24 bg-[#070b14] border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t.homeNew.blogTitle}</h2>
            <p className="text-slate-400 text-lg max-w-xl">{t.homeNew.blogSubtitle}</p>
          </div>
          <Link href={`/${langKey}/blog`} className="text-purple-400 font-bold hover:text-purple-300 transition-colors whitespace-nowrap flex items-center gap-2">
            {t.homeNew.blogBtn} <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {t.articles && Object.entries(t.articles).slice(0, 3).map(([slug, article]: [string, any], index) => {
            
            const cardStyles = [
              { text: 'text-blue-400', hoverBorder: 'group-hover:border-blue-500/30', hoverText: 'group-hover:text-blue-300' },
              { text: 'text-purple-400', hoverBorder: 'group-hover:border-purple-500/30', hoverText: 'group-hover:text-purple-300' },
              { text: 'text-emerald-400', hoverBorder: 'group-hover:border-emerald-500/30', hoverText: 'group-hover:text-emerald-300' },
            ];
            const style = cardStyles[index % cardStyles.length];

            const hiddenClass = index === 2 ? 'hidden lg:block' : '';

            return (
              <Link href={`/${langKey}/blog/${slug}`} key={slug} className={`group ${hiddenClass}`}>
                <div className="h-48 bg-[#0f172a] rounded-t-3xl border-t border-x border-white/5 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: `url(${article.meta.ogImage})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-80"></div>
                </div>
                
                <div className={`bg-[#0a0f1c] p-6 rounded-b-3xl border border-white/5 ${style.hoverBorder} transition-all h-[220px] flex flex-col`}>
                  <div className={`text-xs font-bold ${style.text} uppercase mb-3 tracking-wider`}>
                    {article.header.tag} • {article.header.readTime}
                  </div>
                  <h3 className={`text-xl font-bold text-white mb-3 ${style.hoverText} transition-colors line-clamp-2`}>
                    {article.header.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3">
                    {article.meta.desc}
                  </p>
                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}