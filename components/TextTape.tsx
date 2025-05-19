"use client";

import React, { useEffect } from "react";

export default function TextTape() {
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
  
  .animate-marquee {
    animation: marquee 340s linear infinite;
  }
`;
    document.head.appendChild(style);
  }, []);

  // Додаємо крапку в кінці для закриття ланцюга
  const formattedText = textComponents.join(" • ");

  return (
    <section className="overflow-hidden w-full bg-violet-900 p-4">
      <div className="whitespace-nowrap flex">
        <div className="animate-marquee flex">
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="mx-1 text-5xl text-white font-bold">
                {formattedText}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
