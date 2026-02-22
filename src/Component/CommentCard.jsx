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
            <div className="w-11 h-11 rounded-full bg-[#2B3992] flex items-center justify-center text-white font-bold text-sm sm:text-base">
              {initials}
            </div>
          )}
        </div>

        {/* Name + date */}
        <div className="flex-1 text-right">
          <div className="flex  items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              {name}
            </h4>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {date}
            </span>
          </div>

          {/* Stars */}
          <div className="flex  gap-[2px] mt-1 text-lg">
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