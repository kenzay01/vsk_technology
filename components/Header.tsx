"use client";

import { useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import Image from "next/image";
export default function Header() {
  //   const [isOpen, setIsOpen] = useState(false);
  const LinksList = [
    {
      name: "Services",
    },
    {
      name: "Service Area",
    },
    {
      name: "About Us",
    },
    {
      name: "Contact Us",
    },
  ];

  return (
    <nav className="flex justify-center items-center bg-white p-2 gap-12">
      <div className="flex-1/2 flex justify-end items-center w-full max-w-7xl">
        <Image src="/logo.png" alt="logo" width={140} height={140} />
        <ul className="flex gap-6 ml-4">
          {LinksList.map((link) => (
            <li key={link.name} className="text-md hover:text-amber-500">
              <a href="#">{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1/2 flex justify-start items-center w-full max-w-7xl gap-8">
        <button className="px-18 py-2 bg-black rounded text-white text-sm cursor-pointer hover:bg-amber-500 transition duration-200 ease">
          Book Online
        </button>
        <div className="flex items-center gap-6 ml-4">
          <BiSolidPhoneCall className="text-amber-500 text-7xl" />
          <h1 className="text-2xl font-bold">(213) 715-5757</h1>
        </div>
      </div>
    </nav>
  );
}
