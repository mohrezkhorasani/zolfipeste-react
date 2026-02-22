import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductFilter from "./ProductFilter";
import QuantitySelector from "./QuantitySelector";
import FilterDetailsSummery from "../Home/Product/FilterDetailsSummery";
import ImageGalleryModal from "../../Modal/ImageGalleryModal";

const filters = ["250 گرم", "500 گرم", "750 گرم"];

export default function ProductDetailBox({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isZoom, setIsZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const zoomScale = 2; // میزان زوم روی تصویر
  const [quantity, setQuantity] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePos({ x, y });
  };

  return (
    <section
      className="transition-all flex flex-col md:flex-row rounded-2xl mt-5 mx-[4%] md:mx-60 p-4 gap-4 shadow-[#F6F6F6] duration-300"
      onMouseEnter={(e) =>
      (e.currentTarget.style.boxShadow =
        "0 0 60px 25px rgba(187, 212, 48, 0.05)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 0 20px 0 rgba(0,0,0,0.1)")
      }
    >
      {/* تصویر محصول */}
      <div className="flex-1 relative overflow-hidden rounded-2xl w-full md:w-auto">
        <FaSearch
          className="absolute z-20 w-8 h-8 top-2 left-2 text-white hover:bg-white hover:border hover:border-[#2B3992] transition-all duration-300 hover:text-[#2B3992] bg-[#2B3992] bg-opacity-50 p-2 rounded-full cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />

        {/* تصویر اصلی */}
        <div
          className="w-full h-full"
          onMouseEnter={() => setIsZoom(true)}
          onMouseLeave={() => setIsZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={selectedImage}
            alt="product"
            className="w-full h-full object-cover rounded-2xl transition-transform duration-100"
            style={
              isZoom
                ? {
                  transform: `scale(${zoomScale}) translate(${-mousePos.x * 50
                    }%, ${-mousePos.y * 50}%)`,
                  transformOrigin: "top left",
                }
                : {}
            }
          />

          {product.discount && (
            <div className="absolute top-2 right-2 bg-[#2B3992] text-white px-2 py-1 rounded-full text-sm font-bold">
              {product.discount}%
            </div>
          )}
        </div>

        {/* تصاویر کوچک */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 flex-wrap justify-center">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border ${selectedImage === img ? "border-[#2B3992]" : "border-gray-200"
                } cursor-pointer`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* جزئیات محصول */}
      <div className="flex flex-1 flex-col p-4 gap-2 w-full">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-gray-700 mt-4 text-sm text-justify">
          {product.description}
        </p>
        <p className="text-md text-[#E41F33] mt-5">
          <span className="font-bold">
            {product.priceFrom.toLocaleString()}
          </span>
          <span className="text-sm"> تومان</span>
          <span className="mx-1">–</span>
          <span className="font-bold">{product.priceTo.toLocaleString()}</span>
          <span className="text-sm"> تومان</span>
        </p>

        <div className="flex flex-wrap mt-6 gap-x-2 gap-y-2">
          {filters.map((filter, index) => (
            <ProductFilter
              key={index}
              title={filter}
              selected={selectedFilter === index}
              onClick={() => setSelectedFilter(index)}
            />
          ))}
        </div>

        <button
          className={`bg-[#F32323]/50 hover:bg-[#F32323]  ${selectedFilter == null ? "opacity-0" : "opacity-100"
            } transition-all duration-300 px-1 py-1 text-white rounded-md w-fit text-[0.65rem]`}
          onClick={() => {
            setSelectedFilter(null);
            setQuantity(0);
          }}
        >
          پاک کردن
        </button>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2">
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            disabled={selectedFilter == null}
          />

          <button
            className="bg-[#2B3992] text-sm font-bold w-full md:w-auto md:flex-1 py-3 rounded-xl text-white transition-all duration-500 hover:-translate-y-[5%] disabled:!cursor-not-allowed disabled:bg-[#2B3992]/50"
            disabled={quantity === 0}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>

      {/* بخش سوم */}
      <div className="flex-1 p-4 bg-linear-180 from-[#ECE5E2] to-white rounded-2xl flex-col w-full md:w-auto mt-4 md:mt-0">
        {/* SKU */}
        <div className="flex flex-row text-black text-xs">
          <h1 className="font-bold mx-3">SKU: </h1>
          <p>N/A</p>
        </div>

        {/* دسته‌بندی */}
        <div className="flex flex-row text-black text-xs mt-2 md:mt-[3%]">
          <h1 className="font-bold mx-3">دسته بندی: </h1>
          <a
            href="#"
            className="hover:underline hover:underline-[#11207A] text-[#11207A]"
          >
            پسته
          </a>
        </div>

        {/* خط جداکننده */}
        <hr
          className="border-t mx-0 md:mx-5 mt-4 md:mt-5"
          style={{ borderColor: "#F2EDEB" }}
        />

        {/* نوع بسته‌بندی */}
        <FilterDetailsSummery
          title={"نوع بسته بندی"}
          value={"پاکت زیپ دار, وکیوم"}
        />

        <hr
          className="border-t mx-0 md:mx-5 mt-2 md:mt-5"
          style={{ borderColor: "#F2EDEB" }}
        />

        {/* وزن */}
        <FilterDetailsSummery
          title={"وزن"}
          value={"250 گرم, 500 گرم"}
          className={"bg-[#F0EDEC]/60 rounded-md"}
        />

        {/* سه آیکون ضمانت */}
        <div className="flex flex-col md:flex-row mt-4 md:mt-[7%] divide-y md:divide-y-0 md:divide-x divide-[#F2EDEB]">
          <div className="flex flex-row md:flex-col flex-1 text-[0.625rem] text-black font-light items-center justify-center px-3 py-2 md:py-0">
            <img
              src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/10/days-return.svg"
              className="w-7 h-7 mb-1"
            />
            <p className="text-center">7 روز ضمانت بازگشت کالا</p>
          </div>

          <div className="flex flex-row md:flex-col flex-1 text-[0.625rem] text-black font-light items-center justify-center px-3 py-2 md:py-0">
            <img
              src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/10/cash-on-delivery.svg"
              className="w-7 h-7 mb-1"
            />
            <p className="text-center">امکان پرداخت در محل</p>
          </div>

          <div className="flex flex-row md:flex-col flex-1 text-[0.625rem] text-black font-light items-center justify-center px-3 py-2 md:py-0">
            <img
              src="https://jiawaz-nuts.bantaco.ir/wp-content/uploads/2024/10/original-products.svg"
              className="w-7 h-7 mb-1"
            />
            <p className="text-center">ضمانت اصل بودن کالا</p>
          </div>
        </div>
      </div>
      <ImageGalleryModal
        images={product.images}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
