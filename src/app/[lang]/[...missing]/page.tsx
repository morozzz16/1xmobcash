import type { Metadata } from "next";
import { dictionaries } from '@/lib/dictionaries';
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return {
    title: `${t.notFound?.title || '404'} | 1xMobCash`,
    description: t.notFound?.description || "Page not found",
  };
}

export default async function NotFoundCatchAll({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header t={t} langKey={langKey} />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="container max-w-3xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-8xl md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1e293b] mb-4 drop-shadow-2xl leading-none">
            {t.notFound?.title || "404"}
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            {t.notFound?.subtitle || "Page Not Found"}
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
            {t.notFound?.description || "Oops! The page you are looking for doesn't exist or has been moved."}
          </p>
          
          <Link 
            href={`/${langKey}`} 
            className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-100 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-lg uppercase tracking-wider"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            {t.notFound?.backHome || "Go Back Home"}
          </Link>
        </div>
      </main>

      <Footer t={t} langKey={langKey} />
    </div>
  );
}