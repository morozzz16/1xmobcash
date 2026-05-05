import { MetadataRoute } from 'next';
import { dictionaries } from '@/lib/dictionaries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://1xmobcash.net';
  

  const languages = ['en', 'fr', 'es', 'ar', 'hi'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    const langKey = lang as keyof typeof dictionaries;
    const t = dictionaries[langKey];

  
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, 
    });


    sitemapEntries.push({
      url: `${baseUrl}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });


    if (t && t.articles) {
      Object.keys(t.articles).forEach((slug) => {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }
  });

  return sitemapEntries;
}