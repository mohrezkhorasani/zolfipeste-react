import { useLocation, useNavigate } from 'react-router-dom';

function PlayerProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { player } = location.state || {};

  // دیتای نمونه برای بازیکن انتخاب شده
  const selectedPlayer = player || {
    id: 1,
    name: "احمد رضایی",
    username: "ahmad_rezai",
    rating: 1420,
    ratingChange: +12,
    rank: 124,
    avatar: "🤵",
    avatarBg: "from-blue-500 to-cyan-500",
    joinDate: "۱۴۰۲/۰۵/۱۰",
    country: "ایران",
    city: "تهران",
    
    // آمار کلی
    totalGames: 187,
    wins: 98,
    losses: 72,
    draws: 17,
    winRate: 52,
    
    // آمار ریتینگ
    weeklyRating: 1420,
    monthlyRating: 1390,
    yearlyRating: 1350,
    peakRating: 1550,
    
    // آمار اخیر
    recentForm: ["win", "win", "loss", "win", "draw", "loss", "win"],
    
    // بازی‌های اخیر
    recentGames: [
      { id: 1, opponent: "شما", result: "win", date: "۱۴۰۳/۰۲/۱۵", ratingChange: +12 },
      { id: 2, opponent: "سارا محمدی", result: "win", date: "۱۴۰۳/۰۲/۱۴", ratingChange: +8 },
      { id: 3, opponent: "رضا کریمی", result: "loss", date: "۱۴۰۳/۰۲/۱۳", ratingChange: -6 },
      { id: 4, opponent: "مریم حسینی", result: "win", date: "۱۴۰۳/۰۲/۱۲", ratingChange: +10 },
    ],
    
    // افتخارات
    achievements: [
      { title: "۱۰۰ بازی", icon: "🏆", date: "۱۴۰۳/۰۱/۲۰" },
      { title: "۵۰ برد", icon: "🎯", date: "۱۴۰۳/۰۱/۰۵" },
      { title: "۳ برد متوالی", icon: "⚡", date: "۱۴۰۳/۰۲/۱۰" }
    ]
  };

  // دیتای خودم (برای مقایسه)
  const currentUser = {
    id: 999,
    name: "شما",
    username: "current_user",
    rating: 1480,
    rank: 95,
    avatar: "👤",
    avatarBg: "from-purple-500 to-pink-500",
    totalGames: 145,
    wins: 78,
    losses: 52,
    draws: 15,
    winRate: 54
  };

  const getFormIcon = (result) => {
    switch(result) {
      case 'win': return '✅';
      case 'loss': return '❌';
      case 'draw': return '🤝';
      default: return '⚪';
    }
  };

  const getFormColor = (result) => {
    switch(result) {
      case 'win': return 'text-green-500 bg-green-500/10';
      case 'loss': return 'text-red-500 bg-red-500/10';
      case 'draw': return 'text-yellow-500 bg-yellow-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#312e2b] flex flex-col">
      
      {/* هدر */}
      <div className="bg-[#262421] px-4 py-4 sticky top-0 z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/history')} className="text-white/70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold">پروفایل بازیکن</h1>
        </div>
      </div>

      <div className="flex-1 pb-24">
        
        {/* کارت پروفایل اصلی */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 pb-6">
          <div className="px-4 pt-6">
            <div className="bg-[#262421] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedPlayer.avatarBg} flex items-center justify-center text-4xl`}>
                  {selectedPlayer.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-white text-2xl font-bold">{selectedPlayer.name}</h2>
                  <p className="text-white/40 text-sm">@{selectedPlayer.username}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-yellow-500 text-sm">⭐</div>
                    <div className="text-white/60 text-sm">ریتینگ: {selectedPlayer.rating}</div>
                    <div className={`text-xs ${selectedPlayer.ratingChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedPlayer.ratingChange > 0 ? `+${selectedPlayer.ratingChange}` : selectedPlayer.ratingChange}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-black/30 rounded-xl p-2">
                  <div className="text-white/40 text-xs">رتبه</div>
                  <div className="text-white text-xl font-bold">#{selectedPlayer.rank}</div>
                </div>
                <div className="bg-black/30 rounded-xl p-2">
                  <div className="text-white/40 text-xs">کل بازی‌ها</div>
                  <div className="text-white text-xl font-bold">{selectedPlayer.totalGames}</div>
                </div>
                <div className="bg-black/30 rounded-xl p-2">
                  <div className="text-white/40 text-xs">کشور</div>
                  <div className="text-white text-sm font-bold">{selectedPlayer.country}</div>
                </div>
                <div className="bg-black/30 rounded-xl p-2">
                  <div className="text-white/40 text-xs">عضو از</div>
                  <div className="text-white text-xs font-bold">{selectedPlayer.joinDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* فرم اخیر */}
        <div className="px-4 mt-4">
          <div className="bg-[#262421] rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">فرم اخیر</h3>
            <div className="flex gap-2">
              {selectedPlayer.recentForm.map((result, index) => (
                <div key={index} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${getFormColor(result)}`}>
                  {getFormIcon(result)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* آمار ریتینگ */}
        <div className="px-4 mt-4">
          <div className="bg-[#262421] rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">آمار ریتینگ</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>هفتگی</span>
                  <span>{selectedPlayer.weeklyRating}</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(selectedPlayer.weeklyRating / 2000) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>ماهانه</span>
                  <span>{selectedPlayer.monthlyRating}</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(selectedPlayer.monthlyRating / 2000) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>سالانه</span>
                  <span>{selectedPlayer.yearlyRating}</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(selectedPlayer.yearlyRating / 2000) * 100}%` }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">بیشترین ریتینگ</span>
                  <span className="text-yellow-500 font-bold">{selectedPlayer.peakRating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* مقایسه با شما */}
        <div className="px-4 mt-4">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span>📊</span> مقایسه با شما
            </h3>
            
            <div className="space-y-4">
              {/* ریتینگ */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">ریتینگ</span>
                  <div className="flex gap-4">
                    <span className="text-purple-400">{selectedPlayer.rating}</span>
                    <span className="text-white/40">vs</span>
                    <span className="text-pink-400">{currentUser.rating}</span>
                  </div>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden flex">
                  <div className="h-full bg-purple-500" style={{ width: `${(selectedPlayer.rating / (selectedPlayer.rating + currentUser.rating)) * 100}%` }}></div>
                  <div className="h-full bg-pink-500" style={{ width: `${(currentUser.rating / (selectedPlayer.rating + currentUser.rating)) * 100}%` }}></div>
                </div>
              </div>

              {/* کل بازی‌ها */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">کل بازی‌ها</span>
                  <div className="flex gap-4">
                    <span className="text-purple-400">{selectedPlayer.totalGames}</span>
                    <span className="text-white/40">vs</span>
                    <span className="text-pink-400">{currentUser.totalGames}</span>
                  </div>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden flex">
                  <div className="h-full bg-purple-500" style={{ width: `${(selectedPlayer.totalGames / (selectedPlayer.totalGames + currentUser.totalGames)) * 100}%` }}></div>
                  <div className="h-full bg-pink-500" style={{ width: `${(currentUser.totalGames / (selectedPlayer.totalGames + currentUser.totalGames)) * 100}%` }}></div>
                </div>
              </div>

              {/* نرخ برد */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">نرخ برد</span>
                  <div className="flex gap-4">
                    <span className="text-purple-400">{selectedPlayer.winRate}%</span>
                    <span className="text-white/40">vs</span>
                    <span className="text-pink-400">{currentUser.winRate}%</span>
                  </div>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden flex">
                  <div className="h-full bg-purple-500" style={{ width: `${selectedPlayer.winRate}%` }}></div>
                  <div className="h-full bg-pink-500" style={{ width: `${currentUser.winRate}%` }}></div>
                </div>
              </div>

              {/* برد و باخت */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-green-500 text-xl font-bold">{selectedPlayer.wins}</div>
                  <div className="text-white/40 text-xs">برد</div>
                </div>
                <div className="text-center">
                  <div className="text-red-500 text-xl font-bold">{selectedPlayer.losses}</div>
                  <div className="text-white/40 text-xs">باخت</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بازی‌های اخیر با حریف */}
        <div className="px-4 mt-4">
          <div className="bg-[#262421] rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">بازی‌های اخیر با شما</h3>
            {selectedPlayer.recentGames.filter(g => g.opponent === "شما").length > 0 ? (
              <div className="space-y-2">
                {selectedPlayer.recentGames.filter(g => g.opponent === "شما").map((game) => (
                  <div key={game.id} className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className={game.result === 'win' ? 'text-green-500' : 'text-red-500'}>
                        {game.result === 'win' ? '✅' : '❌'}
                      </span>
                      <span className="text-white/80 text-sm">{game.date}</span>
                    </div>
                    <div className={`text-sm font-bold ${game.ratingChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {game.ratingChange > 0 ? `+${game.ratingChange}` : game.ratingChange}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/40 text-sm py-4">
                هنوز با هم بازی نداشته‌اید
              </div>
            )}
          </div>
        </div>

        {/* افتخارات */}
        <div className="px-4 mt-4">
          <div className="bg-[#262421] rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">افتخارات</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedPlayer.achievements.map((ach, index) => (
                <div key={index} className="text-center p-2 bg-black/30 rounded-lg">
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <div className="text-white/80 text-xs font-bold">{ach.title}</div>
                  <div className="text-white/30 text-[10px]">{ach.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default PlayerProfile;