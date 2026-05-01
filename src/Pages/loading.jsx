import { useState, useEffect } from 'react';

const LoadingPage = () => {
  const [message, setMessage] = useState('در حال آماده سازی...');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const messages = [
      'در حال بررسی سیستم...',
      'اتصال به سرور بازی...',
      'بارگذاری تخته شطرنج...',
      'آماده سازی مهره‌ها...',
      'جستجوی حریف مناسب...',
      'به زودی بازی شروع می‌شود...'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setMessage(messages[messageIndex]);
    }, 2000);
    
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        
        {/* آنیمیشن مهره شطرنج */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* دایره بیرونی */}
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-indigo-500 border-l-indigo-500 rounded-full animate-spin animation-delay-500"></div>
          
          {/* مهره شطرنج در مرکز */}
          <div className="absolute inset-0 flex items-center justify-center text-5xl animate-pulse">
            ♞
          </div>
          
          {/* مهره‌های کوچک چرخان */}
          <div className="absolute -top-2 -right-2 text-xl animate-bounce">♔</div>
          <div className="absolute -bottom-2 -left-2 text-xl animate-bounce animation-delay-300">♕</div>
          <div className="absolute top-1/2 -left-3 text-lg animate-pulse">♖</div>
          <div className="absolute top-1/2 -right-3 text-lg animate-pulse animation-delay-700">♘</div>
        </div>
        
        {/* متن اصلی */}
        <h2 className="text-2xl font-bold text-white mb-3">
          شطرنج آنلاین
        </h2>
        <p className="text-purple-400 text-sm font-medium">
          {message}
          <span className="inline-block w-6 text-right">{dots}</span>
        </p>
        
        {/* نوار پیشرفت */}
        <div className="w-64 mx-auto mt-6 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-loading"></div>
        </div>
        
        {/* تیزر پایین */}
        <div className="mt-8 text-white/30 text-xs">
          <div className="flex justify-center gap-4">
            <span>♜</span>
            <span>♞</span>
            <span>♝</span>
            <span>♛</span>
            <span>♚</span>
            <span>♟</span>
          </div>
          <p className="mt-2">بهترین تجربه بازی شطرنج آنلاین</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading {
          animation: loading 3s ease-in-out infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;