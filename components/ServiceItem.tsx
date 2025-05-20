"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect } from "react";

export default function ServiceItem({
  title,
  image,
}: {
  title: string;
  image: StaticImageData;
}) {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const isMobile = window.innerWidth < 768; // md breakpoint
    const headerHeight = isMobile ? 120 : 0;

    // Handle both same-page anchor links and full page navigation
    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      } else {
        // Fallback to default navigation if section not found
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
  };

  // Apply smooth scroll globally
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "html { scroll-behavior: smooth; }";
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto h-full">
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-center line-clamp-2 font-serif">
          {title}
        </h1>
      </div>

      <div className="w-full h-48 mb-6 overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          width={320}
          height={192}
          priority
        />
      </div>

      <div className="flex flex-col gap-3">
        <a
          href="#contactUs"
          onClick={(e) => handleLinkClick(e, "/#contactUs")}
          className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 rounded-full text-white font-medium text-md cursor-pointer transition duration-200 ease shadow-md text-center"
        >
          Call Us
        </a>
        <a
          href="#serviceArea"
          onClick={(e) => handleLinkClick(e, "/#serviceArea")}
          className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 rounded-full text-white font-medium text-md cursor-pointer transition duration-200 ease shadow-md text-center"
        >
          Book Online
        </a>
      </div>
    </div>
  );
}
