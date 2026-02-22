export default function FilterDetail({ title, value, className }) {
  return (
    <div
      className={`flex items-center py-4 px-3 text-black text-xs sm:text-sm ${className}`}
    >
      {/* ستون title با عرض ثابت */}
      <h1 className="font-bold w-28 sm:w-32 shrink-0">
        {title}:
      </h1>

      {/* ستون value */}
      <a
        href="#"
        className="hover:underline hover:decoration-[#11207A] text-[#242424] truncate"
      >
        {value}
      </a>
    </div>
  );
}