import React, { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  label: string;
  type: "exploration" | "final";
}

const galleryImages: GalleryImage[] = [
  {
    id: "img-2",
    src: "/assets/images/ai_generated_images_image2.jpeg",
    label: "Concept Exploration",
    type: "exploration",
  },
  {
    id: "img-3",
    src: "/assets/images/ai_generated_images_image3.png",
    label: "Concept Exploration — Final Film",
    type: "final",
  },
  {
    id: "img-4",
    src: "/assets/images/ai_generated_images_image4.png",
    label: "Concept Exploration",
    type: "exploration",
  },
  {
    id: "img-5",
    src: "/assets/images/ai_generated_images_image5.png",
    label: "Concept Exploration — Final Film",
    type: "final",
  },
  {
    id: "img-6",
    src: "/assets/images/ai_generated_images_image6.png",
    label: "Concept Exploration",
    type: "exploration",
  },
  {
    id: "img-7",
    src: "/assets/images/ai_generated_images_image7.png",
    label: "Concept Exploration",
    type: "exploration",
  },
  {
    id: "img-8",
    src: "/assets/images/ai_generated_images_image8.png",
    label: "Concept Exploration",
    type: "exploration",
  },
  {
    id: "img-9",
    src: "/assets/images/ai_generated_images_image9.png",
    label: "Concept Exploration — Final Film",
    type: "final",
  },
  {
    id: "img-10",
    src: "/assets/images/ai_generated_images_image10.png",
    label: "Concept Exploration (Panoramic Landscape)",
    type: "exploration",
  },
];

// Pairs for Before/After Slider comparison
const comparisonPairs = [
  {
    before: "/assets/images/ai_generated_images_image2.jpeg",
    after: "/assets/images/ai_generated_images_image3.png",
    beforeLabel: "Concept Exploration",
    afterLabel: "Final Film Transition",
  },
  {
    before: "/assets/images/ai_generated_images_image4.png",
    after: "/assets/images/ai_generated_images_image5.png",
    beforeLabel: "Concept Exploration",
    afterLabel: "Final Film Transition",
  },
  {
    before: "/assets/images/ai_generated_images_image8.png",
    after: "/assets/images/ai_generated_images_image9.png",
    beforeLabel: "Concept Exploration",
    afterLabel: "Final Film Transition",
  },
];

export const ImageGallery: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
    }
  };

  const openLightbox = (id: string) => {
    const idx = galleryImages.findIndex((img) => img.id === id);
    if (idx !== -1) {
      setLightboxIdx(idx);
    }
  };

  const closeLightbox = () => setLightboxIdx(null);

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % galleryImages.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-16 z-10">
      
      {/* Editorial Caption */}
      <div className="max-w-3xl border-l-2 border-wsp-red pl-6 py-2">
        <p className="font-editorial text-sm md:text-base leading-relaxed text-white/90 italic">
          "Concept images generated to explore visual direction. Selected frames were then animated and refined into motion sequences for the final film."
        </p>
      </div>

      {/* 1. Before/After Interactive Comparison Slider */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between font-editorial">
          <span className="text-[10px] tracking-widest text-wsp-red font-bold uppercase">
            Interactive Transition Slider
          </span>
          <div className="flex gap-2">
            {comparisonPairs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSliderIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-3 py-1 border text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  idx === sliderIndex
                    ? "border-wsp-red text-wsp-red bg-wsp-red/5"
                    : "border-white/10 text-white/40 hover:text-white"
                }`}
              >
                Pair {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Drag Reveal Slider Canvas */}
        <div
          className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-white/5 select-none bg-[#080809] cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* After Image (Full width background) */}
          <img
            src={comparisonPairs[sliderIndex].after}
            alt="Final Frame"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/5 text-[9px] tracking-widest uppercase rounded text-wsp-red font-bold font-editorial pointer-events-none z-10">
            {comparisonPairs[sliderIndex].afterLabel}
          </div>

          {/* Before Image (Width based on slider position) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={comparisonPairs[sliderIndex].before}
              alt="Concept Exploration"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/5 text-[9px] tracking-widest uppercase rounded text-white/70 font-editorial pointer-events-none z-10"
            style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
          >
            {comparisonPairs[sliderIndex].beforeLabel}
          </div>

          {/* Divider Line */}
          <div
            className="absolute inset-y-0 w-[1px] bg-wsp-red/80 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-wsp-red flex items-center justify-center text-wsp-red shadow-lg shadow-black/80 backdrop-blur-md">
              <span className="text-[10px] tracking-tighter">&lt;|&gt;</span>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] font-editorial text-white/30 tracking-widest mt-1">
          DRAG THE SLIDER TO EXPLORE THE ANIMATION TRANSITION
        </div>
      </div>

      {/* 2. Photo Grid Gallery with zoom and lightbox link */}
      <div className="flex flex-col gap-4 mt-8">
        <span className="font-editorial text-[10px] tracking-widest text-white/40 font-bold uppercase">
          AI Development Exploration Portfolio
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => openLightbox(img.id)}
              className="group relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-[#080809] cursor-pointer"
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Dim Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Label & Maximize */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex flex-col gap-1">
                  <span className={`inline-block w-fit px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded ${
                    img.type === "final" ? "bg-wsp-red/20 text-wsp-red border border-wsp-red/30" : "bg-white/10 text-white/60 border border-white/10"
                  }`}>
                    {img.type === "final" ? "Motion Reference" : "Ideation Frame"}
                  </span>
                  <p className="text-[10px] md:text-xs font-editorial font-medium tracking-wide text-white">
                    {img.label}
                  </p>
                </div>
                <Maximize2 size={14} className="text-white/60 group-hover:text-wsp-red transition-colors mb-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Glassmorphic Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Lightbox Contents */}
          <div
            className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIdx].src}
              alt={galleryImages[lightboxIdx].label}
              className="max-w-full max-h-[75vh] object-contain rounded border border-white/10"
            />
            <div className="text-center font-editorial">
              <span className="text-[10px] tracking-widest text-wsp-red uppercase font-bold">
                {galleryImages[lightboxIdx].type === "final" ? "Final Film Scene Target" : "Concept Development Concept"}
              </span>
              <p className="text-sm md:text-base text-white/90 font-medium tracking-wide mt-1">
                {galleryImages[lightboxIdx].label}
              </p>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/60 hover:text-white hover:border-wsp-red transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/60 hover:text-white hover:border-wsp-red transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
