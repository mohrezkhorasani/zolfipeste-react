
export default function DashboardPageItem({ icon, title, count = 0 }) {
    return (
        <div className="group flex-row flex-1 flex py-[1%] px-[1%] border border-dashed justify-start items-center border-[#11207A] text-[#11207A] rounded-2xl
        hover:bg-[#11207A]/90 transition-all duration-300 hover:border-white hover:text-white
        ">
            <div className="relative flex items-center justify-center w-12 h-12">
                {/* هاله پشت آیکون */}
                <div className="absolute w-full h-full rounded-full bg-[#2A3891]/50 group-hover:bg-[#FFFFFF]/50 blur-xl"></div>

                {/* آیکون */}
                <i className={`${icon} relative  text-2xl`}></i>
            </div>
            <h1 className="text-black group-hover:text-[#FFFFFF] font-bold mx-[3%] transition-all duration-300">{count} </h1>
            <h1 className="text-black group-hover:text-[#FFFFFF] text-sm transition-all duration-300">{title} </h1>
        </div>
    )
}   