"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function BrandsContainer() {
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

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes marquee-brands {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .animate-marquee-brands {
        animation: marquee-brands 180s linear infinite;
      }

    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="mx-auto ">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center italic mb-8 sm:mb-10 md:mb-12 font-serif">
          We Repair all brands
        </h2>

        <div className="overflow-hidden w-full">
          <div className="whitespace-nowrap flex">
            <div className="animate-marquee-brands flex">
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="flex items-center justify-center mx-4 sm:mx-6 md:mx-8 w-24 h-16 sm:w-28 sm:h-20 md:w-36 md:h-28"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/brands/${brand}.png`}
                      alt={`${brand} logo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      style={{
                        objectFit: "contain",
                      }}
                      quality={50}
                      priority={index === 0}
                      loading={index > 0 ? "lazy" : undefined}
                      placeholder="blur"
                      blurDataURL={`/brands/${brand}.png`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
