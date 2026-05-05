import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dictionaries } from '@/lib/dictionaries';

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-slate-400">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Welcome to 1xMobCash. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website, apply for agent status, or register as a partner. It also explains your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. The Data We Collect</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:
            </p>
            <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
              <li><strong>Identity Data:</strong> includes first name, last name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address, telephone numbers, and messenger handles (e.g., Telegram, WhatsApp).</li>
              <li><strong>Financial Data:</strong> includes payment wallet addresses or bank account details required to process your commissions.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting, operating system, and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Your Personal Data</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
              <li>To register you as a new Partner or local Agent.</li>
              <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
              <li>To process and deliver your commission payouts.</li>
              <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance).</li>
              <li>To deliver relevant website content and advertisements to you and measure the effectiveness of the advertising we serve.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Disclosures of Your Personal Data</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We may have to share your personal data with internal third parties and external third parties, specifically the official iGaming operators and affiliate networks (such as the 1xBet infrastructure), strictly for the purpose of creating your operational accounts, linking your traffic, and processing your payouts. We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Data Security</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Your Legal Rights</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to request access to your personal data, request correction of your data, request erasure of your data, object to processing of your data, and request the transfer of your data.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact our support team at <strong>support@1xmobcash.net</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}