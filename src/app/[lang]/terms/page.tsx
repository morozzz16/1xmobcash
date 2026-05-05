import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dictionaries } from '@/lib/dictionaries';

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-slate-400">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              These terms and conditions outline the rules and regulations for the use of 1xMobCash&apos;s Website and Services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 1xMobCash if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Definitions</h2>
            <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
              <li><strong>Company / We / Us:</strong> Refers to 1xMobCash, acting as an independent portal and integration service for iGaming partnership programs.</li>
              <li><strong>Partner / Agent:</strong> Any individual or legal entity that registers through our portal to participate in the affiliate or cashier programs.</li>
              <li><strong>Players:</strong> Customers referred to the betting platform through Affiliate links or individuals utilizing the Agent&apos;s cashier services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Registration and Account Security</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              To become an Agent or Partner, you must be of legal age in your jurisdiction (at least 18 years old). You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your account credentials and for any activities or actions under your account. 1xMobCash reserves the right to decline any registration application at its sole discretion.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Permitted Marketing and Agent Activity</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Partners and Agents must conduct their activities strictly in accordance with local laws and the rules of the official bookmaker. You agree NOT to:
            </p>
            <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
              <li>Use spam, unsolicited email, or fraudulent traffic (including bot traffic, cookie stuffing, or incentivized traffic) to attract Players.</li>
              <li>Register personal accounts using your own affiliate links to generate artificial commissions.</li>
              <li>Misrepresent the services, odds, or bonuses offered by the betting platform.</li>
              <li>Target jurisdictions where online gambling and sports betting are explicitly prohibited by law.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Unless otherwise stated, 1xMobCash and/or its licensors own the intellectual property rights for all material on this Website. You may access this from 1xMobCash for your own personal use, subject to restrictions set in these terms and conditions. You must not republish, sell, rent, or sub-license material from 1xMobCash without prior consent. Promotional materials (banners, logos) provided in your account may only be used to promote the respective iGaming brands without modification.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              In no event shall 1xMobCash, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website or the official betting platform. 1xMobCash acts as an intermediary portal and cannot be held responsible for the final decisions regarding commission calculations, account blocks, or software disruptions managed by the primary iGaming operator.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Termination</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We may terminate or suspend your access to our portal immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Contact Information</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              If you have any queries regarding any of our terms, please contact us at <strong>support@1xmobcash.net</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}