"use client";

import Image from "next/image";
import map from "@/public/map.png";
import { useState, useEffect } from "react";

export default function AboutContainer() {
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchZipCodes = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/zipcodes");
        if (response.ok) {
          const data = await response.json();
          setZipCodes(data.zipCodes);
        } else {
          console.error("Error loading zip codes");
        }
      } catch (err) {
        console.error(`Server error ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchZipCodes();
  }, []);
  return (
    <section className="w-full py-6 px-4 md:px-16 bg-white" id="aboutUs">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold italic ml-4 sm:ml-10 text-center md:text-left">
        About us
      </h1>
      <div className="mt-4">
        <p className="text-base sm:text-lg">
          VSK Technology LLC was founded with a commitment to providing reliable
          and affordable appliance repair services in Palm Springs, CA. With
          years of hands-on experience, our team specializes in repairing
          washers, dryers, dishwashers, refrigerators, ovens, stoves, ranges,
          and cooktops. We know how frustrating a broken appliance can be, so we
          offer emergency service and prioritize quick, efficient repairs. Our
          mission is to deliver high-quality workmanship with honest pricing.
          Our technicians are trained to handle all major brands and models,
          ensuring that your appliances run smoothly again in no time. At VSK
          Technology LLC, customer satisfaction is at the heart of everything we
          do.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4" id="serviceArea">
            <p className="text-base sm:text-lg">
              We take pride in our transparent service, expert repairs, and
              dedication to doing the job right the first time. Whether it’s a
              minor fix or a complex issue, we’re here to help!
            </p>
            <div className="flex flex-col items-center border border-gray-200 border-dashed p-3 sm:p-4 rounded-lg">
              <div className="bg-purple-800 text-white p-2 sm:p-3 rounded-lg mb-4 sm:mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold font-serif">
                  Palm Springs and <br /> surrounding areas
                </h2>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-1">
                    {zipCodes.map((zip, index) => (
                      <div key={index} className="flex items-center mb-1">
                        <span className="h-2 w-2 bg-black rounded-full mr-2"></span>
                        <span>{zip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-full overflow-hidden relative mt-4">
            <Image
              src={map}
              alt="map"
              width={600}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
