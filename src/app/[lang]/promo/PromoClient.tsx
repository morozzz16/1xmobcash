'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const FONTS = ['Impact', 'Arial Black', 'Verdana', 'Tahoma', 'Trebuchet MS', 'sans-serif'];

export default function PromoClient({ t, bannerUrls = [] }: { t: any, bannerUrls: string[] }) {
  const [promoCode, setPromoCode] = useState('');
  const [qrPreview, setQrPreview] = useState<string>('');
  const [downloading, setDownloading] = useState(false);
  
  // Храним только активный баннер и его настройки
  const [editingBanner, setEditingBanner] = useState<{url: string, w: number, h: number} | null>(null);
  const [config, setConfig] = useState({ x: 50, y: 85, size: 70, rotation: 0, font: 'Impact', color: '#ffffff' });

  // Генерация QR-кода при открытии редактора или смене промокода
  useEffect(() => {
    if (!editingBanner) return;
    const code = promoCode.trim() || 'YOURPROMO';
    QRCode.toDataURL(`https://1xmobcash.net/?promo=${code}`, {
      width: 250, margin: 1, color: { dark: '#0f172a', light: '#ffffff' }
    }).then(setQrPreview);
  }, [promoCode, editingBanner]);

  // Функция открытия редактора
  const handleOpenEditor = (e: React.MouseEvent<HTMLImageElement>, url: string) => {
    const img = e.currentTarget;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    
    // Начальные настройки
    setConfig(prev => ({ ...prev, size: Math.round(w * 0.07) }));
    setEditingBanner({ url, w, h });
  };

  const handleDownload = async () => {
    if (!editingBanner) return;
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve) => { img.onload = resolve; img.src = editingBanner.url; });

      canvas.width = editingBanner.w;
      canvas.height = editingBanner.h;
      ctx.drawImage(img, 0, 0);

      // QR Code
      const qrImg = new Image();
      await new Promise((resolve) => { qrImg.onload = resolve; qrImg.src = qrPreview; });
      const qSize = editingBanner.w * 0.18; // 18% от ширины баннера
      const qX = editingBanner.w * 0.78;
      const qY = editingBanner.h * 0.78;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qX - 10, qY - 10, qSize + 20, qSize + 20);
      ctx.drawImage(qrImg, qX, qY, qSize, qSize);

      // Text
      ctx.save();
      ctx.translate((config.x / 100) * editingBanner.w, (config.y / 100) * editingBanner.h);
      ctx.rotate((config.rotation * Math.PI) / 180);
      ctx.font = `900 ${config.size}px "${config.font}"`;
      ctx.fillStyle = config.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 10;
      ctx.fillText((promoCode.trim() || 'YOURPROMO').toUpperCase(), 0, 0);
      ctx.restore();

      const link = document.createElement('a');
      link.download = `Promo_Banner.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.92);
      link.click();
      setEditingBanner(null);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full">
      {/* СЕТКА БАННЕРОВ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bannerUrls.map((url, index) => (
          <div key={url} className="group relative bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 cursor-pointer shadow-lg aspect-square">
            <img 
              src={url} 
              alt="Banner" 
              loading={index < 3 ? "eager" : "lazy"} // LCP Оптимизация
              fetchPriority={index < 3 ? "high" : "auto"}
              onClick={(e) => handleOpenEditor(e, url)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
               <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest shadow-xl">Customize</span>
            </div>
          </div>
        ))}
      </div>

      {/* РЕДАКТОР (MODAL) */}
      {editingBanner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0b1120] border border-white/10 w-full max-w-6xl rounded-[2.5rem] flex flex-col lg:flex-row overflow-hidden shadow-2xl max-h-[90vh]">
            
            {/* Preview */}
            <div className="w-full lg:w-3/5 p-6 bg-[#070b14] flex items-center justify-center overflow-hidden">
               <div className="relative shadow-2xl w-full" style={{ aspectRatio: `${editingBanner.w}/${editingBanner.h}`, containerType: 'inline-size' }}>
                  <img src={editingBanner.url} className="w-full h-full object-contain" alt="" />
                  <span 
                    className="absolute font-black uppercase whitespace-nowrap pointer-events-none drop-shadow-2xl"
                    style={{
                      color: config.color,
                      fontFamily: config.font,
                      left: `${config.x}%`, top: `${config.y}%`,
                      transform: `translate(-50%, -50%) rotate(${config.rotation}deg)`,
                      fontSize: `${(config.size / editingBanner.w) * 100}cqi`
                    }}
                  >
                    {promoCode || 'YOURPROMO'}
                  </span>
                  {qrPreview && (
                    <div className="absolute bg-white p-[1%] rounded" style={{ left: '78%', top: '78%', width: '18%', aspectRatio: '1/1' }}>
                       <img src={qrPreview} className="w-full h-full" alt="QR" />
                    </div>
                  )}
               </div>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-2/5 p-8 lg:p-12 space-y-8 overflow-y-auto bg-[#0b1120]">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Banner Editor</h3>
                <button onClick={() => setEditingBanner(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-red-500 text-white transition-all">✕</button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Promo Code</label>
                <input 
                  type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="MYCODE1X"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-blue-500 uppercase"
                  maxLength={15}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {['size', 'rotation', 'x', 'y'].map((key) => (
                  <div key={key} className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>{key}</span>
                      <span className="text-blue-500">{Math.round((config as any)[key])}</span>
                    </label>
                    <input 
                      type="range" 
                      min={key === 'rotation' ? -90 : key === 'size' ? 10 : 0} 
                      max={key === 'size' ? 500 : key === 'rotation' ? 90 : 100}
                      value={(config as any)[key]} 
                      onChange={(e) => setConfig(prev => ({...prev, [key]: Number(e.target.value)}))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select 
                  value={config.font} onChange={(e) => setConfig(prev => ({...prev, font: e.target.value}))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none cursor-pointer"
                >
                  {FONTS.map(f => <option key={f} value={f} className="bg-[#0b1120]">{f}</option>)}
                </select>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
                  <input type="color" value={config.color} onChange={(e) => setConfig(prev => ({...prev, color: e.target.value}))} className="w-full h-8 cursor-pointer bg-transparent border-0" />
                </div>
              </div>

              <button 
                onClick={handleDownload} disabled={downloading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] disabled:opacity-50"
              >
                {downloading ? 'Generating...' : t?.promo?.downloadBtn || 'Download Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}