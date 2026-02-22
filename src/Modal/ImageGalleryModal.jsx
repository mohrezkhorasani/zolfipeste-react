import React, { useState, useEffect } from "react";

export default function ImageGalleryModal({ images = [], isModalOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isModalOpen) {
      setZoom(1);
      setCurrentIndex(0);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl font-bold z-50"
      >
        &times;
      </button>

      {/* Image Container */}
      <div className="relative max-w-full max-h-full flex flex-col items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`img-${currentIndex}`}
          className="max-w-full max-h-[80vh] object-contain transition-transform"
          style={{ transform: `scale(${zoom})` }}
        />

        {/* Navigation */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={prevImage}
            className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/40 transition"
          >
            قبلی
          </button>
          <button
            onClick={nextImage}
            className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/40 transition"
          >
            بعدی
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1 bg-white/20 text-white rounded-md hover:bg-white/40 transition"
          >
            -
          </button>
          <span className="text-white">{zoom.toFixed(1)}x</span>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1 bg-white/20 text-white rounded-md hover:bg-white/40 transition"
          >
            +
          </button>
        </div>
      </div>
 
    </div>
  );
}