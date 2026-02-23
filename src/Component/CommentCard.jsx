export default function CommentCard({
  name = "محمد رضایی",
  date = "۲۵ اردیبهشت ۱۴۰۴",
  rating = 4,
  comment = "این محصول خیلی خوب بود و از خریدم راضی هستم. کیفیت ساخت عالیه 👌",
  avatar,
}) {
  // گرفتن دو حرف اول اسم
  const initials = name
    ? name
        .split(" ")
        .map((n) => n.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  // 50 رنگ رندوم برای آواتار
  const colors = [
    "#FF6633","#FFB399","#FF33FF","#FFFF99","#00B3E6",
    "#E6B333","#3366E6","#999966","#99FF99","#B34D4D",
    "#80B300","#809900","#E6B3B3","#6680B3","#66991A",
    "#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC",
    "#66994D","#B366CC","#4D8000","#B33300","#CC80CC",
    "#66664D","#991AFF","#E666FF","#4DB3FF","#1AB399",
    "#E666B3","#33991A","#CC9999","#B3B31A","#00E680",
    "#4D8066","#809980","#E6FF80","#1AFF33","#999933",
    "#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3",
    "#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF"
  ];

  // انتخاب رندوم رنگ
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      dir="rtl"
      className="w-full bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-11 h-11 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base"
              style={{ backgroundColor: randomColor }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name + date */}
        <div className="flex-1 text-right">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              {name}
            </h4>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {date}
            </span>
          </div>

          {/* Stars */}
          <div className="flex gap-[2px] mt-1 text-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comment text */}
      <p className="text-sm sm:text-[0.95rem] text-gray-700 leading-6 text-right">
        {comment}
      </p>
    </div>
  );
}