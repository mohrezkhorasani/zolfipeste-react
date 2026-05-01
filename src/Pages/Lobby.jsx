import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api/post';

function Lobby() {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  // بازی رنک شده تصادفی
  const handleRandomRankedGame = async () => {
    setIsSearching(true);
    var game = await createGame()
    console.log("game")
    console.log(game)
    // شبیه‌سازی جستجوی حریف هم‌رنک 
    setTimeout(() => {
      setIsSearching(false);
      navigate(`/game?gameID=${game.gameID}`, { 
        state: { 
          gameCode: game.gameID,
          playerRole: game.role,
          isRanked: true,
          opponentRating: Math.floor(Math.random() * 300) + 1300 // ریتینگ تصادفی بین 1300-1600
        } 
      });
    }, 3000);
  };

  // ساخت بازی دوستانه با لینک
  const handleCreateFriendGame = () => {
    setIsCreating(true);
    setTimeout(() => {
      const newGameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      navigate('/game', { 
        state: { 
          gameCode: newGameCode, 
          playerRole: 'creator',
          isRanked: false,
          opponentRating: null
        } 
      });
    }, 500);
  };

  // پیوستن به بازی دوستانه با کد
  const handleJoinWithCode = () => {
    if (joinCode.trim()) {
      navigate('/game', { 
        state: { 
          gameCode: joinCode.toUpperCase(), 
          playerRole: 'joiner',
          isRanked: false,
          opponentRating: null
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-bounce inline-block">♜</div>
            <h1 className="text-white text-3xl font-bold mb-2">شطرنج آنلاین</h1>
            <p className="text-white/60 text-sm">با دوستانت بازی کن یا رنک شده بازی کن</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            
            {/* دکمه بازی رنک شده تصادفی - اولویت اصلی */}
            <button 
              className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 mb-4 ${
                !isSearching && 'active:scale-98'
              } ${isSearching && 'opacity-70'}`}
              onClick={handleRandomRankedGame}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  در حال جستجوی حریف هم‌رنک...
                </>
              ) : (
                <>
                  <span className="text-xl">🏆</span>
                  شروع بازی رنک شده
                </>
              )}
            </button>

            {/* دکمه لیست دوستان */}
            <button 
              onClick={() => navigate('/friends')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 active:scale-98 mb-4"
            >
              <span className="text-xl">👥</span>
              لیست دوستان
            </button>

            {/* دکمه ساخت بازی دوستانه */}
            <button 
              onClick={handleCreateFriendGame}
              disabled={isCreating}
              className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 mb-4 ${
                !isCreating && 'active:scale-98'
              } ${isCreating && 'opacity-70'}`}
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  در حال ساخت...
                </>
              ) : (
                <>
                  <span className="text-xl">🔗</span>
                  ساخت لینک بازی دوستانه
                </>
              )}
            </button>

            {/* دکمه پیوستن با کد */}
            {!showCodeInput ? (
              <button 
                onClick={() => setShowCodeInput(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 active:scale-98 mb-4"
              >
                <span className="text-xl">🔑</span>
                پیوستن به بازی دوستانه
              </button>
            ) : (
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔑</span>
                  <input
                    type="text"
                    placeholder="کد ۶ رقمی"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                    className="w-full py-4 px-4 pl-12 text-center text-lg font-bold tracking-[4px] border-2 border-gray-200 rounded-xl font-mono bg-gray-50 focus:outline-none focus:border-orange-500 focus:bg-white"
                    maxLength={6}
                    autoCapitalize="characters"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      joinCode.trim() 
                        ? 'bg-orange-500 text-white active:scale-98' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handleJoinWithCode}
                    disabled={!joinCode.trim()}
                  >
                    <span>✅</span>
                    تأیید
                  </button>
                  <button 
                    onClick={() => {
                      setShowCodeInput(false);
                      setJoinCode('');
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all active:scale-98"
                  >
                    <span>❌</span>
                    انصراف
                  </button>
                </div>
              </div>
            )}

            {/* دکمه تاریخچه */}
            <button 
              onClick={() => navigate('/history')}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 active:scale-98 hover:bg-gray-200"
            >
              <span>📋</span>
              تاریخچه بازی‌ها
            </button>

            {/* توضیحات */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-lg">🏆</span>
                <span>بازی رنک شده با حریفی هم‌رنک شما (امتیاز تغییر می‌کند)</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
                <span className="text-lg">👥</span>
                <span>بازی دوستانه بدون تغییر امتیاز</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
                <span className="text-lg">🔗</span>
                <span>ساخت لینک خصوصی برای دعوت دوستان</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6 text-white/40 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>۱۲۵ بازیکن آنلاین</span>
            </div>
            <div>•</div>
            <div>🏆 رنک شده</div>
            <div>•</div>
            <div>🎮 دوستانه</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;