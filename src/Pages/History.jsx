import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function History() {
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, wins, losses, draws
const navigate = useNavigate();

  // دیتای نمونه
  const gamesHistory = [
    {
      id: 1,
      opponent: "احمد رضایی",
      opponentRating: 1420,
      result: "win",
      resultText: "پیروزی",
      color: "white",
      date: "۱۴۰۳/۰۲/۱۵",
      time: "۱۸:۳۲",
      moves: 34,
      ratingChange: +12,
      gameCode: "AB3D9F",
    },
    {
      id: 2,
      opponent: "سارا محمدی",
      opponentRating: 1580,
      result: "loss",
      resultText: "شکست",
      color: "black",
      date: "۱۴۰۳/۰۲/۱۴",
      time: "۲۱:۱۵",
      moves: 28,
      ratingChange: -8,
      gameCode: "K7M2P1",
    },
    {
      id: 3,
      opponent: "رضا کریمی",
      opponentRating: 1350,
      result: "win",
      resultText: "پیروزی",
      color: "white",
      date: "۱۴۰۳/۰۲/۱۳",
      time: "۱۴:۲۰",
      moves: 42,
      ratingChange: +8,
      gameCode: "F4J8L2",
    },
    {
      id: 4,
      opponent: "مریم حسینی",
      opponentRating: 1650,
      result: "draw",
      resultText: "مساوی",
      color: "black",
      date: "۱۴۰۳/۰۲/۱۲",
      time: "۱۹:۴۵",
      moves: 56,
      ratingChange: 0,
      gameCode: "W3E6R9",
    },
    {
      id: 5,
      opponent: "علی نوری",
      opponentRating: 1480,
      result: "win",
      resultText: "پیروزی",
      color: "black",
      date: "۱۴۰۳/۰۲/۱۱",
      time: "۲۲:۰۰",
      moves: 31,
      ratingChange: +10,
      gameCode: "H5U7I4",
    },
    {
      id: 6,
      opponent: "زهرا احمدی",
      opponentRating: 1520,
      result: "loss",
      resultText: "شکست",
      color: "white",
      date: "۱۴۰۳/۰۲/۱۰",
      time: "۱۶:۵۰",
      moves: 22,
      ratingChange: -6,
      gameCode: "P9L3K8",
    },
    {
      id: 7,
      opponent: "محمد رضوی",
      opponentRating: 1700,
      result: "loss",
      resultText: "شکست",
      color: "white",
      date: "۱۴۰۳/۰۲/۰۹",
      time: "۲۰:۳۰",
      moves: 48,
      ratingChange: -15,
      gameCode: "M2N7B5",
    },
    {
      id: 8,
      opponent: "نگار جعفری",
      opponentRating: 1280,
      result: "win",
      resultText: "پیروزی",
      color: "black",
      date: "۱۴۰۳/۰۲/۰۸",
      time: "۱۳:۱۵",
      moves: 25,
      ratingChange: +5,
      gameCode: "C4V9Y6",
    },
  ];

  const filteredGames = gamesHistory.filter((game) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "wins") return game.result === "win";
    if (selectedFilter === "losses") return game.result === "loss";
    if (selectedFilter === "draws") return game.result === "draw";
    return true;
  });

  const getResultStyle = (result) => {
    switch (result) {
      case "win":
        return "text-green-500 bg-green-500/10";
      case "loss":
        return "text-red-500 bg-red-500/10";
      case "draw":
        return "text-yellow-500 bg-yellow-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getResultText = (result) => {
    switch (result) {
      case "win":
        return "پیروزی";
      case "loss":
        return "شکست";
      case "draw":
        return "مساوی";
      default:
        return "-";
    }
  };

  const getColorIcon = (color) => {
    return color === "white" ? "⚪" : "⚫";
  };

  const stats = {
    total: gamesHistory.length,
    wins: gamesHistory.filter((g) => g.result === "win").length,
    losses: gamesHistory.filter((g) => g.result === "loss").length,
    draws: gamesHistory.filter((g) => g.result === "draw").length,
    winRate: Math.round(
      (gamesHistory.filter((g) => g.result === "win").length /
        gamesHistory.length) *
        100,
    ),
  };

  return (
    <div className="min-h-screen bg-[#312e2b] flex flex-col">
      {/* هدر */}
      <div className="bg-[#262421] px-4 py-4 sticky top-0 z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/lobby")}
            className="text-white/70"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-white text-xl font-bold">تاریخچه بازی‌ها</h1>
        </div>
      </div>

      {/* آمار کلی */}
      <div className="px-4 py-4">
        <div className="bg-[#262421] rounded-xl p-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-white/40 text-xs mb-1">کل بازی‌ها</div>
              <div className="text-white text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="text-center">
              <div className="text-white/40 text-xs mb-1">پیروزی</div>
              <div className="text-green-500 text-2xl font-bold">
                {stats.wins}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/40 text-xs mb-1">شکست</div>
              <div className="text-red-500 text-2xl font-bold">
                {stats.losses}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/40 text-xs mb-1">درصد برد</div>
              <div className="text-white text-2xl font-bold">
                {stats.winRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* فیلترها */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              selectedFilter === "all"
                ? "bg-purple-600 text-white"
                : "bg-[#262421] text-white/60"
            }`}
          >
            همه
          </button>
          <button
            onClick={() => setSelectedFilter("wins")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              selectedFilter === "wins"
                ? "bg-green-600 text-white"
                : "bg-[#262421] text-white/60"
            }`}
          >
            پیروزی‌ها
          </button>
          <button
            onClick={() => setSelectedFilter("losses")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              selectedFilter === "losses"
                ? "bg-red-600 text-white"
                : "bg-[#262421] text-white/60"
            }`}
          >
            شکست‌ها
          </button>
          <button
            onClick={() => setSelectedFilter("draws")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              selectedFilter === "draws"
                ? "bg-yellow-600 text-white"
                : "bg-[#262421] text-white/60"
            }`}
          >
            مساوی‌ها
          </button>
        </div>
      </div>

      {/* لیست بازی‌ها */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-[#262421] rounded-xl p-4 active:scale-98 transition-transform cursor-pointer"
            onClick={() =>
              navigate("/player-profile", {
                state: {
                  player: {
                    id: game.id,
                    name: game.opponent,
                    username: game.opponent.replace(/\s/g, "_").toLowerCase(),
                    rating: game.opponentRating,
                    ratingChange: game.ratingChange,
                    rank: Math.floor(Math.random() * 200) + 1,
                    avatar: "🤵",
                    avatarBg: "from-blue-500 to-cyan-500",
                    joinDate: "۱۴۰۲/۰۱/۰۱",
                    country: "ایران",
                    city: "تهران",
                    totalGames: Math.floor(Math.random() * 300) + 50,
                    wins: Math.floor(Math.random() * 150) + 30,
                    losses: Math.floor(Math.random() * 120) + 20,
                    draws: Math.floor(Math.random() * 30) + 5,
                    winRate: Math.floor(Math.random() * 70) + 30,
                    weeklyRating: game.opponentRating,
                    monthlyRating: game.opponentRating - 20,
                    yearlyRating: game.opponentRating - 50,
                    peakRating: game.opponentRating + 80,
                    recentForm: [
                      "win",
                      "loss",
                      "win",
                      "draw",
                      "win",
                      "loss",
                      "win",
                    ],
                    recentGames: [
                      {
                        id: 1,
                        opponent: "شما",
                        result: game.result === "win" ? "loss" : "win",
                        date: game.date,
                        ratingChange: game.ratingChange * -1,
                      },
                    ],
                    achievements: [
                      { title: "۵۰ بازی", icon: "🏆", date: "۱۴۰۲/۱۲/۰۱" },
                      { title: "۲۵ برد", icon: "🎯", date: "۱۴۰۲/۱۱/۱۵" },
                    ],
                  },
                },
              })
            }
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getColorIcon(game.color)}</span>
                <div>
                  <div className="text-white font-semibold text-base">
                    {game.opponent}
                  </div>
                  <div className="text-white/40 text-xs">
                    ریتینگ: {game.opponentRating}
                  </div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${getResultStyle(game.result)}`}
              >
                {game.resultText}
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10">
              <div className="flex gap-4 text-xs text-white/40">
                <div>
                  <span>📅 </span>
                  {game.date}
                </div>
                <div>
                  <span>⏰ </span>
                  {game.time}
                </div>
                <div>
                  <span>🎯 </span>
                  {game.moves} حرکت
                </div>
              </div>
              <div
                className={`text-sm font-bold ${
                  game.ratingChange > 0
                    ? "text-green-500"
                    : game.ratingChange < 0
                      ? "text-red-500"
                      : "text-white/40"
                }`}
              >
                {game.ratingChange > 0
                  ? `+${game.ratingChange}`
                  : game.ratingChange}
              </div>
            </div>

            <div className="mt-2 text-xs text-white/30 flex justify-between">
              <span>کد: {game.gameCode}</span>
              <span>🔄</span>
            </div>
          </div>
        ))}

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-3">🎮</div>
            <div className="text-white/40 text-sm">بازی‌ای یافت نشد</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
