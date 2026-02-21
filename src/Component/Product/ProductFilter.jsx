export default function ProductFilter({ title = "250 گرم", selected = false, onClick }) {
  return (
    <div
      className={`px-3 rounded-md border items-center justify-center w-fit
        hover:border-black transition-all duration-300 cursor-pointer
        ${selected ? "border-black" : "border-[#BBBBBB]"} py-1`}
      onClick={onClick}
    >
      <p className="text-black text-xs text-center w-fit">{title}</p>
    </div>
  );
}