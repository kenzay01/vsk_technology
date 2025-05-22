"use client";

import { useState, useRef, useEffect } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const LinksList = [
    { name: "Services", href: "/#services" },
    { name: "Service Area", href: "/#serviceArea" },
    { name: "About Us", href: "/#aboutUs" },
    { name: "Contact Us", href: "/#contactUs" },
  ] as const;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isButton: boolean = false
  ) => {
    e.preventDefault();
    const isMobile = window.innerWidth < 768;
    const headerHeight = isMobile ? (href === "/#serviceArea" ? 265 : 250) : 0;

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
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
    if (href === "/#serviceArea" && isButton) return;
    toggleMenu();
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "html { scroll-behavior: smooth; }";
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <nav
        ref={headerRef}
        className="flex justify-center items-center bg-white p-2 gap-12 sticky md:static shadow-md md:shadow-none top-0 z-50"
      >
        <div className="flex items-center justify-between w-full max-w-7xl md:flex-1/2 md:justify-end">
          <Image
            src="/logo.png"
            alt="VSK Technology LLC logo"
            width={140}
            height={140}
            className="cursor-pointer w-24 h-24 sm:w-24 sm:h-24 md:w-46 md:h-46"
            onClick={() => {
              window.location.href = "/";
            }}
          />
          {/* Book Online and Phone Number between Logo and Menu Toggle for Mobile */}
          <div className="flex md:hidden items-center justify-center gap-2">
            <button
              onClick={() => {
                handleLinkClick(
                  {
                    preventDefault: () => {},
                  } as React.MouseEvent<HTMLAnchorElement>,
                  "/#serviceArea",
                  true
                );
              }}
              className="px-3 h-[25px] p-0 bg-black text-white text-xs leading-none rounded-lg hover:bg-amber-500 transition duration-200 flex items-center justify-center"
            >
              Book Online
            </button>
            <div className="flex items-center gap-1">
              <BiSolidPhoneCall className="text-amber-500 text-xl" />
              <a
                href="tel:+12137155757"
                className="text-xs font-semibold content-center"
              >
                (213) 715-5757
              </a>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-center pr-2">
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <FaTimes className="text-2xl text-amber-500" />
              ) : (
                <FaBars className="text-2xl text-amber-500" />
              )}
            </button>
          </div>
          <ul className="hidden md:flex gap-6 ml-4">
            {LinksList.map((link) => (
              <li
                key={link.name}
                className="text-md hover:text-amber-500 cursor-pointer"
              >
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Desktop Menu */}
        <div className="flex-1/2 hidden md:flex justify-start items-center w-full max-w-7xl gap-8">
          <button
            onClick={() => {
              handleLinkClick(
                {
                  preventDefault: () => {},
                } as React.MouseEvent<HTMLAnchorElement>,
                "/#serviceArea"
              );
            }}
            className="px-18 py-2 bg-black rounded text-white text-sm cursor-pointer hover:bg-amber-500 transition duration-200 ease"
          >
            Book Online
          </button>
          <div className="flex items-center gap-6 ml-4">
            <BiSolidPhoneCall className="text-amber-500 text-7xl" />
            <h1 className="text-2xl font-bold">(213) 715-5757</h1>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 w-full sticky left-0 top-[104px] z-60 shadow-md transition-all duration-300">
          <ul className="flex flex-col gap-3">
            {LinksList.map((link) => (
              <li
                key={link.name}
                className="text-sm font-medium hover:text-amber-500 cursor-pointer transition duration-200"
              >
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
