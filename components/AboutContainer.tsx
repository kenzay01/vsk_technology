"use client";

import Image from "next/image";
import map from "@/public/map.png";
import { useState, useEffect } from "react";

// import { zipCodes } from "@/utils/zipCodes";
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
          console.error("Помилка завантаження зіпкодів");
        }
      } catch (err) {
        console.error(`Помилка сервера ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchZipCodes();
  }, []);
  return (
    <section className="w-full py-8 px-4 md:px-16 bg-white" id="aboutUs">
      <h1 className="text-4xl font-serif font-bold italic ml-10">About us</h1>
      <div>
        <p className="text-lg">
          Welcome to{" "}
          <span className="text-amber-500 font-semibold">VSK Technology</span> –
          your trusted appliance repair experts across Palm Springs and
          surrounding areas. With years of hands-on <br /> experience and a
          customer-first approach, we`re here to bring your home appliances back
          to life quickly, efficiently, and affordably. <br />
          At VSK Technology, we understand how frustrating a broken appliance
          can be. That`s why we offer fast, reliable service at a{" "}
          <span className="font-bold">
            flat rate of <br /> just $80
          </span>{" "}
          for diagnostics which will go towards the repair fee.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4" id="serviceArea">
            <p className="text-lg ">
              Our certified technicians are trained to work on all major brands,
              including Whirlpool, Samsung, LG, GE, Frigidaire, Bosch,
              KitchenAid, Maytag, and more.
            </p>
            <div className="flex flex-col items-center border border-gray-200 border-dashed p-4 rounded-lg">
              <div className="bg-purple-800 text-white p-3 rounded-lg mb-6 text-center">
                <h2 className="text-3xl font-semibold font-serif">
                  Palm Springs and <br /> surrounding areas
                </h2>
              </div>

              {loading ? (
                <p>Завантаження...</p>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-5 gap-x-6 gap-y-1">
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
          <div className="w-full h-full overflow-hidden relative">
            <Image
              src={map}
              alt="map"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
