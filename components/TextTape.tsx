"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

interface TextTapeProps {
  type?: string;
}

export default function TextTape({ type }: TextTapeProps) {
  const textComponents = [
    "• Free service call with repair",
    "100% satisfaction guaranteed",
    "Flexible scheduling available",
    "Same-day service at no extra cost",
    "$10 off your first repair",
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      @keyframes marquee-logo {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .animate-marquee {
        animation: marquee 340s linear infinite;
      }

      .animate-marquee-logo {
        animation: marquee-logo 170s linear infinite; 
      }
    `;
    document.head.appendChild(style);

    // Cleanup style on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formattedText = textComponents.join(" • ");
  if (type === "text") {
    return (
      <section className="overflow-hidden w-full bg-violet-900 p-2 md:p-4">
        <div className="whitespace-nowrap flex">
          <div className="animate-marquee flex">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="mx-1 text-2xl md:text-4xl text-white font-bold"
                >
                  {formattedText}
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="overflow-hidden w-full p-2 md:p-4">
        <div className="whitespace-nowrap flex">
          <div className="animate-marquee-logo flex">
            {Array(80)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center mx-12">
                  <Image src={logo} alt="logo" width={40} height={40} />
                  <div className="mx-1 text-2xl md:text-4xl text-amber-500 font-bold">
                    VSK Technology
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }
}
