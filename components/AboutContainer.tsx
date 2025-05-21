"use client";

import Image from "next/image";

import logo2 from "@/public/logo2.png";

export default function AboutContainer() {
  return (
    <section
      className="w-full py-6 px-4 sm:px-6 md:px-12 lg:px-16 bg-white max-w-7xl mx-auto "
      id="aboutUs"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold italic text-center md:text-left mb-4 sm:mb-6">
        About us
      </h2>
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 px-4 sm:px-6 items-center justify-center">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm h-64 sm:h-80 md:h-96">
            <Image
              src={logo2}
              alt="VSK Technology LLC company logo"
              fill
              className="rounded-lg object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              priority
              itemProp="image"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <p 
            className="text-sm sm:text-base md:text-lg leading-relaxed"
            itemProp="text"
          >
            VSK Technology LLC was founded with a commitment to providing
            reliable and affordable appliance repair services in Palm Springs,
            CA. With years of hands-on experience, our team specializes in
            repairing washers, dryers, dishwashers, refrigerators, ovens,
            stoves, ranges, and cooktops. We know how frustrating a broken
            appliance can be, so we offer emergency service and prioritize
            quick, efficient repairs. Our mission is to deliver high-quality
            workmanship with honest pricing. Our technicians are trained to
            handle all major brands and models, ensuring that your appliances
            run smoothly again in no time. At VSK Technology LLC, customer
            satisfaction is at the heart of everything we do. We take pride in
            our transparent service, expert repairs, and dedication to doing the
            job right the first time. Whether it&apos;s a minor fix or a complex
            issue, we&apos;re here to help!
          </p>
        </div>
      </div>
    </section>
  );
}
