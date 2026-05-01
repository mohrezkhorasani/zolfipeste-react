import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Friends() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('friends'); // friends, add

  // دیتای نمونه دوستان
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "احمد رضایی",
      username: "ahmad_rezai",
      rating: 1420,
      rank: 124,
      avatar: "🤵",
      avatarBg: "from-blue-500 to-cyan-500",
      isOnline: true,
      lastSeen: "آنلاین",
      lastGame: "۲ روز پیش",
      winRate: 52,
      totalGames: 187,
      country: "ایران",
      isFavorite: true
    },
    {
      id: 2,
      name: "سارا محمدی",
      username: "sara_mohammadi",
      rating: 1580,
      rank: 68,
      avatar: "👩",
      avatarBg: "from-pink-500 to-rose-500",
      isOnline: false,
      lastSeen: "۱ ساعت پیش",
      lastGame: "۳ روز پیش",
      winRate: 61,
      totalGames: 243,
      country: "ایران",
      isFavorite: false
    },
    {
      id: 3,
      name: "رضا کریمی",
      username: "reza_karimi",
      rating: 1350,
      rank: 201,
      avatar: "👨",
      avatarBg: "from-green-500 to-emerald-600",
      isOnline: true,
      lastSeen: "آنلاین",
      lastGame: "۱ روز پیش",
      winRate: 48,
      totalGames: 156,
      country: "ایران",
      isFavorite: true
    },
    {
      id: 4,
      name: "مریم حسینی",
      username: "maryam_hosseini",
      rating: 1650,
      rank: 42,
      avatar: "👩‍🦰",
      avatarBg: "from-purple-500 to-indigo-600",
      isOnline: false,
      lastSeen: "۵ ساعت پیش",
      lastGame: "دیروز",
      winRate: 64,
      totalGames: 312,
      country: "ایران",
      isFavorite: false
    },
    {
      id: 5,
      name: "علی نوری",
      username: "ali_nouri",
      rating: 1480,
      rank: 95,
      avatar: "🧔",
      avatarBg: "from-amber-500 to-orange-600",
      isOnline: true,
      lastSeen: "آنلاین",
      lastGame: "۳ ساعت پیش",
      winRate: 55,
      totalGames: 198,
      country: "ایران",
      isFavorite: false
    }
  ]);

  // جستجوی کاربران
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      setIsSearching(true);
      // شبیه‌سازی جستجو (بعداً با API واقعی جایگزین میشه)
      setTimeout(() => {
        const results = [
          {
            id: 10,
            name: "محمد رضوی",
            username: "mohammad_razavi",
            rating: 1720,
            rank: 28,
            avatar: "🧑",
            avatarBg: "from-cyan-500 to-blue-600",
            isOnline: true,
            country: "ایران",
            isFriend: false,
            mutualFriends: 3
          },
          {
            id: 11,
            name: "نگار جعفری",
            username: "negar_jafari",
            rating: 1390,
            rank: 178,
            avatar: "👩‍🎨",
            avatarBg: "from-violet-500 to-purple-600",
            isOnline: false,
            country: "ایران",
            isFriend: false,
            mutualFriends: 1
          },
          {
            id: 12,
            name: "امیر حسینی",
            username: "amir_hosseini",
            rating: 1510,
            rank: 87,
            avatar: "👨‍💻",
            avatarBg: "from-teal-500 to-green-600",
            isOnline: true,
            country: "ایران",
            isFriend: false,
            mutualFriends: 0
          }
        ].filter(u => 
          u.name.includes(query) || 
          u.username.includes(query.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleInviteToGame = (friendId, friendName) => {
    const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate('/game', { 
      state: { 
        gameCode: gameCode, 
        playerRole: 'creator',
        opponentName: friendName,
        opponentId: friendId
      } 
    });
  };

  const handleAddFriend = (userId) => {
    // شبیه‌سازی افزودن دوست
    alert(`درخواست دوستی برای کاربر ${userId} ارسال شد`);
  };

  const handleViewProfile = (player) => {
    navigate('/player-profile', { state: { player } });
  };

  return (
    <div className="min-h-screen bg-[#312e2b] flex flex-col">
      
      {/* هدر */}
      <div className="bg-[#262421] px-4 py-4 sticky top-0 z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/lobby')} className="text-white/70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold">دوستان</h1>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="flex border-b border-white/10 bg-[#262421]">
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-3 text-center font-medium transition ${
            activeTab === 'friends'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-white/40'
          }`}
        >
          👥 لیست دوستان ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 py-3 text-center font-medium transition ${
            activeTab === 'add'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-white/40'
          }`}
        >
          ➕ افزودن دوست
        </button>
      </div>

      <div className="flex-1 pb-24">
        
        {/* تب لیست دوستان */}
        {activeTab === 'friends' && (
          <div className="px-4 py-4 space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-[#262421] rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  {/* آواتار */}
                  <div 
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${friend.avatarBg} flex items-center justify-center text-2xl cursor-pointer`}
                    onClick={() => handleViewProfile(friend)}
                  >
                    {friend.avatar}
                  </div>
                  
                  {/* اطلاعات */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 
                          className="text-white font-bold text-base cursor-pointer hover:text-purple-400"
                          onClick={() => handleViewProfile(friend)}
                        >
                          {friend.name}
                        </h3>
                        <p className="text-white/40 text-xs">@{friend.username}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {friend.isFavorite && (
                          <span className="text-yellow-500 text-sm">⭐</span>
                        )}
                        <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-2 text-xs">
                      <div className="text-white/60">
                        <span className="text-yellow-500">⭐</span> {friend.rating}
                      </div>
                      <div className="text-white/40">•</div>
                      <div className="text-white/60">#{friend.rank}</div>
                      <div className="text-white/40">•</div>
                      <div className="text-white/60">{friend.winRate}% برد</div>
                    </div>
                    
                    <div className="text-white/30 text-xs mt-1">
                      {friend.isOnline ? '🟢 آنلاین' : `🕒 ${friend.lastSeen}`}
                    </div>
                    
                    {/* دکمه‌ها */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleInviteToGame(friend.id, friend.name)}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 active:scale-98"
                      >
                        <span>🎮</span> دعوت به بازی
                      </button>
                      <button
                        onClick={() => handleViewProfile(friend)}
                        className="flex-1 bg-white/10 text-white/80 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 active:scale-98"
                      >
                        <span>👤</span> پروفایل
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {friends.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">👥</div>
                <div className="text-white/40 text-sm">هیچ دوستی ندارید</div>
                <button 
                  onClick={() => setActiveTab('add')}
                  className="mt-3 text-purple-400 text-sm"
                >
                  افزودن دوست جدید ➕
                </button>
              </div>
            )}
          </div>
        )}

        {/* تب افزودن دوست */}
        {activeTab === 'add' && (
          <div className="px-4 py-4">
            {/* باکس جستجو */}
            <div className="bg-[#262421] rounded-xl p-4 mb-4">
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                <input
                  type="text"
                  placeholder="جستجوی نام کاربری یا نام..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-black/30 text-white px-4 py-3 pr-12 rounded-xl outline-none focus:ring-1 focus:ring-purple-500 placeholder:text-white/30"
                />
              </div>
            </div>

            {/* نتایج جستجو */}
            {isSearching && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <div className="text-white/40 text-sm">در حال جستجو...</div>
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white/60 text-sm px-2">نتایج جستجو</h3>
                {searchResults.map((result) => (
                  <div key={result.id} className="bg-[#262421] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${result.avatarBg} flex items-center justify-center text-2xl cursor-pointer`}
                        onClick={() => handleViewProfile(result)}
                      >
                        {result.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 
                              className="text-white font-bold text-base cursor-pointer hover:text-purple-400"
                              onClick={() => handleViewProfile(result)}
                            >
                              {result.name}
                            </h3>
                            <p className="text-white/40 text-xs">@{result.username}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${result.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        </div>
                        
                        <div className="flex gap-3 mt-2 text-xs">
                          <div className="text-white/60">
                            <span className="text-yellow-500">⭐</span> {result.rating}
                          </div>
                          <div className="text-white/40">•</div>
                          <div className="text-white/60">#{result.rank}</div>
                          {result.mutualFriends > 0 && (
                            <>
                              <div className="text-white/40">•</div>
                              <div className="text-white/60">{result.mutualFriends} دوست مشترک</div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleAddFriend(result.id)}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 active:scale-98"
                          >
                            <span>➕</span> افزودن به دوستان
                          </button>
                          <button
                            onClick={() => handleInviteToGame(result.id, result.name)}
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 active:scale-98"
                          >
                            <span>🎮</span> دعوت به بازی
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isSearching && searchQuery.length > 1 && searchResults.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">🔍</div>
                <div className="text-white/40 text-sm">کاربری یافت نشد</div>
              </div>
            )}

            {searchQuery.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">👋</div>
                <div className="text-white/40 text-sm">نام کاربری یا نام دوست خود را جستجو کنید</div>
                <div className="text-white/20 text-xs mt-2">مثال: احمد، reza_karimi، ...</div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

export default Friends;