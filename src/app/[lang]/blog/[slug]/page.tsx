import React from 'react';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { lang: string, slug: string } }) {
  const langKey = (params.lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  // В будущем здесь будет запрос к базе данных или CMS (например, Sanity или Markdown файлам)
  // const post = await getPostBySlug(params.slug, langKey);
  
  // А пока делаем красивую имитацию загрузки или демо-статью
  const demoPost = {
    title: `Reading article: ${params.slug.replace(/-/g, ' ')}`,
    date: 'April 29, 2026',
    category: 'Guides',
    content: 'This is a placeholder for the article content. In the future, your CMS will inject the actual HTML or Markdown here. Stay tuned for advanced strategies on how to maximize your MobCash agent revenue!'
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow pt-32 pb-24">
        <article className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Кнопка назад */}
          <Link href={`/${langKey}/blog`} className="inline-flex items-center text-purple-400 hover:text-purple-300 font-bold mb-10 transition-colors">
            ← {t.blogPage?.btnBack || "Back to Blog"}
          </Link>

          {/* Шапка статьи */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">
              <span className="text-purple-400">{demoPost.category}</span>
              <span>•</span>
              <time>{demoPost.date}</time>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight capitalize">
              {demoPost.title}
            </h1>
          </header>

          {/* Тело статьи */}
          <div className="prose prose-invert prose-lg prose-purple max-w-none">
            <p className="text-slate-300 leading-relaxed text-xl mb-8">
              {demoPost.content}
            </p>
            {/* Здесь будет рендериться остальной контент статьи */}
            <div className="p-8 bg-[#0f172a] border border-white/10 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Want to read more?</h3>
              <p className="text-slate-400">Content management system integration is pending.</p>
            </div>
          </div>

        </article>
      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}