"use client";

import { useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const LinksList = [
    { name: "Services", href: "/#services" },
    { name: "Service Area", href: "/#serviceArea" },
    { name: "About Us", href: "/#aboutUs" },
    { name: "Contact Us", href: "/#contactUs" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-center items-center bg-white p-2 gap-12 sticky md:static shadow-md md:shadow-none top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-7xl md:flex-1/2 md:justify-end">
        <Image
          src="/logo.png"
          alt="logo"
          width={140}
          height={140}
          className="cursor-pointer w-26 h-26 sm:w-24 sm:h-24 md:w-46 md:h-46"
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <ul className="hidden md:flex gap-6 ml-4">
          {LinksList.map((link) => (
            <li
              key={link.name}
              className="text-md hover:text-amber-500 cursor-pointer"
            >
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden pr-4">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? (
              <FaTimes className="text-2xl text-amber-500" />
            ) : (
              <FaBars className="text-2xl text-amber-500" />
            )}
          </button>
        </div>
      </div>
      <div className="flex-1/2 hidden md:flex justify-start items-center w-full max-w-7xl gap-8">
        <button
          onClick={() => {
            window.location.href = "#appointment";
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
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 w-full absolute left-0 top-[120px] z-40 shadow-md transition-all duration-300">
          <ul className="flex flex-col gap-3">
            {LinksList.map((link) => (
              <li
                key={link.name}
                className="text-sm font-medium hover:text-amber-500 cursor-pointer transition duration-200"
              >
                <a href={link.href} onClick={toggleMenu}>
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  window.location.href = "#appointment";
                  toggleMenu();
                }}
                className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-amber-500 transition duration-200"
              >
                Book Online
              </button>
            </li>
            <li className="flex items-center gap-2">
              <BiSolidPhoneCall className="text-amber-500 text-2xl" />
              <a href="tel:+12137155757" className="text-base font-semibold">
                (213) 715-5757
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
