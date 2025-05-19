"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function BrandsContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef(null);

  // Список брендів з їх логотипами
  const brands = [
    "amana",
    "beko",
    "bloomberg",
    "bosch",
    "crosley",
    "dacor",
    "electrolux",
    "fisher&paykel",
    "frigidaire",
    "ge",
    "haier",
    "hotpoint",
    "hisense",
    "kenmore",
    "kitchenAid",
    "lg",
    "liebherr",
    "magicChef",
    "maytag",
    "miele",
    "monogram",
    "samsung",
    "sharp",
    "speedQueen",
    "sub-zero",
    "thermador",
    "u-line",
    "viking",
    "whirlpool",
    "wolf",
    "zline",
  ];

  const visibleCount = 3;

  const getExtendedBrands = () => {
    return [...brands, ...brands, ...brands];
  };

  const extendedBrands = getExtendedBrands();
  const startOffset = brands.length;

  useEffect(() => {
    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      goToNext();
    }, 4000);
  };
  const goToPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? brands.length - 1 : prevIndex - 1;
      return newIndex;
    });

    resetInterval();

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % brands.length;
      return newIndex;
    });

    resetInterval();

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const resetInterval = () => {
    startAutoRotation();
  };

  const getVisibleBrands = () => {
    const result = [];
    const offset = startOffset + currentIndex;

    for (let i = 0; i < visibleCount; i++) {
      const index = (offset + i) % extendedBrands.length;
      result.push(extendedBrands[index]);
    }

    return result;
  };
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-semibold text-center italic mb-12 font-serif">
          We Repair all brands
        </h2>

        <div className="relative overflow-hidden" ref={containerRef}>
          <div className="flex items-center justify-center">
            <button
              onClick={goToPrevious}
              className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none cursor-pointer"
              aria-label="Previous brand"
              disabled={isTransitioning}
            >
              <IoIosArrowBack className="text-2xl pr-0.5" />
            </button>

            <div className="w-full overflow-hidden">
              <div className="flex justify-center items-center space-x-12 md:space-x-36 py-4 transition-transform duration-500 ease-in-out">
                {getVisibleBrands().map((brand, index) => (
                  <div
                    key={`${brand}-${index}`}
                    className={`flex items-center justify-center w-32 h-24 md:w-36 md:h-28 transition-all duration-500 ${
                      isTransitioning ? "scale-100" : "scale-100"
                    }`}
                    style={{
                      transform: `translateX(${isTransitioning ? "-3%" : "0"})`,
                      transition:
                        "transform 600ms ease-in-out, opacity 600ms ease-in-out",
                      opacity: isTransitioning ? 0.75 : 1,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`/brands/${brand}.png`}
                        alt={`${brand} logo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{
                          objectFit: "contain",
                        }}
                        quality={50}
                        priority={index === 0 && currentIndex === 0}
                        loading={index > 0 ? "lazy" : undefined}
                        placeholder="blur"
                        blurDataURL={`/brands/${brand}.png`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={goToNext}
              className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none cursor-pointer"
              aria-label="Next brand"
              disabled={isTransitioning}
            >
              <IoIosArrowForward className="text-2xl pl-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
