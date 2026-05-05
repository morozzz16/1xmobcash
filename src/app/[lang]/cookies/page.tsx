import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dictionaries } from '@/lib/dictionaries';

export default async function CookiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Cookie Policy</h1>
          
          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-slate-400">Last updated: May 2026</p>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. What Are Cookies</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              This Cookie Policy explains how 1xMobCash uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them. Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Why We Use Cookies</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website, specifically for tracking affiliate referrals and agent registrations.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Types of Cookies We Use</h2>
            <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
              <li><strong>Essential Website Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
              <li><strong>Performance and Functionality Cookies:</strong> These are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
              <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</li>
              <li><strong>Affiliate Tracking Cookies:</strong> As an iGaming portal, we use tracking cookies to correctly attribute referred traffic, registrations, and agent applications to the correct partner accounts.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. How Can I Control Cookies?</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser&apos;s help menu for more information.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              If you have any questions about our use of cookies or other technologies, please email us at <strong>support@1xmobcash.net</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}