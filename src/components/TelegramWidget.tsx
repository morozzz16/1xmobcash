import React from 'react';

export default function TelegramWidget() {

  const botUrl = "https://t.me/JOO1xbet_bot";

  return (
    <a
      href={botUrl}
      target="_blank"
      rel="noopener noreferrer"

      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#0088cc] to-[#33bbf2] shadow-[0_8px_25px_rgba(0,136,204,0.4)] hover:scale-110 hover:shadow-[0_12px_35px_rgba(0,136,204,0.6)] transition-all duration-300 group"
      aria-label="Связаться с нами в Telegram"
    >

      <span className="absolute inset-0 rounded-full bg-[#33bbf2] opacity-40 animate-ping"></span>


      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 relative z-10 fill-white pr-[2px] pt-[1px] drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
      >
        <path d="M21.543 2.904L1.884 10.493c-1.341.52-1.33 1.29-.247 1.624l5.068 1.554 11.72-7.394c.552-.365 1.058-.163.642.207l-9.497 8.572-.349 5.218c.513 0 .736-.235 1.022-.514l2.453-2.383 5.105 3.77c.94.52 1.615.253 1.848-.87l3.344-15.753c.343-1.37-.512-1.996-1.45-1.62z"/>
      </svg>
    </a>
  );
}