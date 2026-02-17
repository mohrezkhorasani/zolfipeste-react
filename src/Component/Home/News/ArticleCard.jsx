export default function ArticleCard({ title, image, date }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm w-[260px] shrink-0
      hover:border hover:border-blue-600 duration-500 border  border-white overflow-hidden group
      hover:shadow-[0_0_18px_4px_rgba(187,212,48,0.35)] hover:shadow-[#BBD430]/40 transition-all 

    ">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[150px] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2" />

        <span className="absolute top-3 right-3
  bg-[rgba(201,201,201,0.19)] backdrop-blur-sm
  text-white text-xs px-3 py-1 rounded-full
  cursor-pointer hover:bg-[#11207A] hover:text-white duration-200 transition-all
  ">
          آموزشی
        </span>
      </div>

      {/* Content */}
      <div className="p-4" dir="rtl">
        <h3
          className="
    text-xs font-bold text-gray-800 leading-6 text-right
    line-clamp-1
    group-hover:line-clamp-none
    transition-all duration-600 cursor-pointer
  "
        >
          {title}
        </h3>


        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400 iconlyBulk-Time-Square">
            <i class="path1"></i>
            {date}
            </span>
          <button className="flex items-center gap-2 hover:gap-1 transition-all duration-300 cursor-pointer
          text-blue-700 text-xs font-medium">
            بیشتر بخوانید
            <i class="iconly-Arrow-Left icbo font-24"></i>

          </button>


        </div>
      </div>
    </div>
  );
}
