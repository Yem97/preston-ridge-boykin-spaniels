"use client"
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [fbHandle, setFbHandle] = useState('');

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(d => {
        const p = d?.profile;
        if (!p) return;
        if (p.whatsapp) setWhatsapp(p.whatsapp.replace(/\D/g, ''));
        if (p.facebook_url) {
          try {
            const url = new URL(p.facebook_url.startsWith('http') ? p.facebook_url : `https://${p.facebook_url}`);
            const handle = url.pathname.replace(/^\/|\/$/g, '');
            if (handle) setFbHandle(handle);
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const waMsg = encodeURIComponent("Hi! I visited Preston Ridge Boykin Spaniels and I'm interested in a puppy.");
  const hasWhatsapp = Boolean(whatsapp);
  const hasMessenger = Boolean(fbHandle);
  if (!hasWhatsapp && !hasMessenger) return null;

  return (
    <>
      <style>{`
        @keyframes chat-ping {
          0%   { transform: scale(1); opacity: 0.55; }
          80%  { transform: scale(1.85); opacity: 0; }
          100% { transform: scale(1.85); opacity: 0; }
        }
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(14px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-opt {
          animation: chat-slide-up 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .chat-opt-2 { animation-delay: 0.08s; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {open && (
          <div className="flex flex-col items-end gap-3 mb-1">

            {hasWhatsapp && (
              <a
                href={`https://wa.me/${whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group chat-opt"
                onClick={() => setOpen(false)}
              >
                {/* Label */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 translate-x-1 group-hover:translate-x-0">
                  <span className="block bg-white text-gray-800 text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' }}>
                    WhatsApp
                  </span>
                </div>
                {/* Button */}
                <div className="relative flex-shrink-0">
                  <div className="w-13 h-13 rounded-full transition-all duration-200 group-hover:scale-110"
                    style={{
                      width: 52, height: 52,
                      background: 'linear-gradient(145deg, #2EE06A 0%, #25D366 45%, #1AAF54 100%)',
                      boxShadow: '0 4px 16px rgba(37,211,102,0.5), 0 2px 6px rgba(0,0,0,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%',
                    }}>
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </a>
            )}

            {hasMessenger && (
              <a
                href={`https://m.me/${fbHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group chat-opt chat-opt-2"
                onClick={() => setOpen(false)}
              >
                {/* Label */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-150 translate-x-1 group-hover:translate-x-0">
                  <span className="block bg-white text-gray-800 text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' }}>
                    Messenger
                  </span>
                </div>
                {/* Button */}
                <div
                  className="flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{
                    width: 52, height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #44D4FF 0%, #0084FF 50%, #A020F0 100%)',
                    boxShadow: '0 4px 16px rgba(0,132,255,0.5), 0 2px 6px rgba(0,0,0,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <svg width="27" height="27" viewBox="0 0 56 56" fill="none">
                    <path d="M28 2C13.64 2 2 12.98 2 26.4c0 7.74 3.86 14.64 9.9 19.18V54l9.02-4.96a27.8 27.8 0 007.08.96C42.36 50 54 39.02 54 25.6 54 12.18 42.36 2 28 2zm2.64 33.12l-7.28-7.76-14.2 7.76 15.62-16.56 7.46 7.76 14.04-7.76-15.64 16.56z" fill="white"/>
                  </svg>
                </div>
              </a>
            )}

          </div>
        )}

        {/* Main toggle */}
        <div className="relative">
          {!open && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'rgba(212,128,42,0.4)', animation: 'chat-ping 2.2s ease-out infinite' }}
            />
          )}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Chat with us"
            className="relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{
              width: 56, height: 56,
              background: open
                ? 'linear-gradient(155deg, #5C2810, #4A1E08)'
                : 'linear-gradient(155deg, #7B3A1A, #4A1E08)',
              boxShadow: open
                ? '0 4px 18px rgba(74,30,8,0.45)'
                : '0 4px 22px rgba(74,30,8,0.55)',
            }}
          >
            <div className={`transition-all duration-300 ${open ? 'rotate-90 scale-90' : 'rotate-0 scale-100'}`}>
              {open
                ? <X size={22} color="#FDF5E8" strokeWidth={2.5} />
                : <MessageCircle size={22} color="#FDF5E8" strokeWidth={2} />
              }
            </div>
          </button>
        </div>

      </div>
    </>
  );
}
