import { timeAgo } from "../../Tools/tools";

export default function RoomCard({ i, isRoomLive,live=null }) {
  // Determine if the room is currently live
  const handleCopy = async (roomID) => {
    const link = `https://vc2.hekmateislami.com/rooms/${roomID}/join`;

    await navigator.clipboard.writeText(link);
    alert("کپی شد!");
  };
  // Determine if there's an upcoming session and format its details
  let nextSessionInfo = null;
  if (i.nextMeet) {
    const nextMeetDate = new Date(i.nextMeet);
    const now = new Date();

    // Create UTC dates for comparison (to avoid timezone issues)
    const nextUTCDate = new Date(Date.UTC(
      nextMeetDate.getUTCFullYear(),
      nextMeetDate.getUTCMonth(),
      nextMeetDate.getUTCDate()
    ));

    const nowUTCDate = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    ));

    let dateString = '';

    if (nextUTCDate.getTime() === nowUTCDate.getTime()) {
      dateString = 'امروز';
    } else {
      const daysDifference = Math.ceil((nextUTCDate - nowUTCDate) / (1000 * 60 * 60 * 24));

      if (daysDifference === 1) {
        dateString = 'فردا';
      } else if (daysDifference < 0) {
        i.nextMeet = null;
        nextSessionInfo = null;
      } else {
        // Convert to Persian date
        const persianDate = new Intl.DateTimeFormat('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(nextMeetDate);
        dateString = persianDate;
      }
    }

    if (i.nextMeet) {
      // Use UTC time (same as input)
      const timeString = nextMeetDate.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      });
      nextSessionInfo = `${dateString} ساعت ${timeString}`;
    }
  }

  // Extract teacher names if available
  const teacherNames = i.nextMeetTeacher && i.nextMeetTeacher.length > 0
    ? i.nextMeetTeacher.join(', ')
    : '';

  // Conditional styling for the room card if there's an upcoming session
  const roomCardStyle = i.nextMeet ? "bg-yellow-50 border border-yellow-200 shadow-md" : "bg-white shadow-md border border-gray-100";



  return (
    <div
      key={i.roomID}
      className={`
    relative rounded-2xl p-5 flex flex-col h-full
    bg-white shadow-md hover:shadow-xl transition-all duration-300
    ${isRoomLive ? 'ring-2 ring-red-500 ring-offset-2' : 'border border-gray-100'}
  `}
    >
      {/* === راست بالا: نشانگر زنده === */}
      {isRoomLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-500/10 backdrop-blur-sm px-2 py-1 rounded-full z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-red-600 text-xs font-bold">زنده</span>
        </div>
      )}

      {/* === چپ بالا: تعداد حضار با آیکون (فقط در حالت زنده) === */}
      {isRoomLive && live.countPartis > 0 && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#f5f5f5] backdrop-blur-sm 
        px-2.5 py-1 rounded-full ">
          <span className="text-gray-700 text-xs font-semibold tabular-nums">
            {live.countPartis} نفر
          </span>
          <i className="bi bi-eye text-gray-600 text-sm leading-none"></i>
        </div>
      )}
      {/* بقیه محتوای کارت (بدون تغییر) */}
      <div className="flex-1 flex flex-col">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-3 text-[#30d4cc]">
            <i className="bi bi-people text-5xl"></i>
          </div>

          <h2 className="text-lg font-bold mb-1 break-words text-gray-800 flex items-center justify-center gap-2 flex-wrap">
            {i.title}
            {isRoomLive && (
              <span className="inline-flex items-center gap-1 text-red-500 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                (جلسه در حال پخش میباشد)
              </span>
            )}
          </h2>

          {/* نام موسسه */}
          {i.owner && i.owner.fullname && (
            <p className="text-gray-600 text-sm font-semibold mt-1 flex items-center justify-center gap-1.5">
              <i className="bi bi-building text-gray-500 text-xs"></i>
              <span>{i.owner.fullname}</span>
            </p>
          )}

          {/* نمایش آخرین جلسه یا موضوع جلسه */}
          <p className="text-gray-500 text-sm mt-1">
            {isRoomLive  ? (
              <span>موضوع جلسه: {i.latestTitle || '-'}</span>
            ) : (
              <span className="">آخرین جلسه: {timeAgo(i.lastMeet)}</span>
            )}
          </p>

          {/* بخش جلسه بعدی */}
          <div className="mt-3">
            {nextSessionInfo && i.nextMeet ? (
              <div className="p-2 bg-green-50 rounded-lg text-sm">
                <p className="text-green-800 font-semibold">جلسه بعدی:</p>
                <p className="text-green-700">{nextSessionInfo}</p>
                {teacherNames && <p className="text-gray-600 text-xs mt-1">با: {teacherNames}</p>}
              </div>
            ) : (
              <div className="invisible h-0"></div>
            )}
          </div>
        </div>
      </div>

      {/* دکمه‌ها: فقط در حالت زنده دکمه ورود زنده، در غیر این صورت دکمه معمولی */}
      <div className="flex flex-col sm:flex-row items-center w-full justify-center mt-6 gap-3">
        <div className="flex flex-row items-center justify-center gap-3 w-full">
          <button
            onClick={() => handleCopy(i.roomID)}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 hover:border-[#30d4cc] transition w-full font-medium"
          >
            کپی لینک
          </button>

          {isRoomLive && (
            <button
              onClick={() => window.open(`/rooms/${i.roomID}/join`, '_blank')}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition w-full shadow-sm animate-pulse"
            >
              ورود زنده
            </button>
          )}

          {!isRoomLive && i.nextMeet && (
            <button
              onClick={() => window.open(`/rooms/${i.roomID}/join`, '_blank')}
              className="px-4 py-2 rounded-xl bg-[#30d4cc] text-[#0b3f32] text-sm font-bold hover:bg-[#30d4cc]/80 transition w-full shadow-sm"
            >
              ورود به جلسه
            </button>
          )}
        </div>
      </div>
    </div>
  )
}