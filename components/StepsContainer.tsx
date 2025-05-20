"use client";

import StepsItem from "./StepsItem";
import { BiSolidPhoneCall } from "react-icons/bi";

export default function StepsContainer() {
  const stepsItems = [
    {
      subtitle: "",
      body: (
        <div className="text-violet-900 flex flex-col h-full w-full">
          <h2 className="font-bold font-serif text-base sm:text-lg md:text-base">
            You can Call Us
          </h2>
          <div className="flex items-center gap-2 sm:gap-6 ml-2 my-2 sm:my-6 md:my-8">
            <BiSolidPhoneCall className="text-amber-500 text-2xl sm:text-3xl" />
            <h1 className="text-base sm:text-lg font-bold">(213) 715-5757</h1>
          </div>
          <h2 className="font-bold font-serif text-base sm:text-lg md:text-base">
            or leave a request
          </h2>
          <div className="mt-4 md:mt-auto w-full text-center mb-2  md:mb-2">
            <a
              href="#appointment"
              className="py-3 sm:py-4 px-4 w-full bg-amber-500 text-white hover:bg-amber-600 transition duration-300 font-medium rounded-md mt-4 cursor-pointer text-sm sm:text-base"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      ),
    },
    {
      subtitle: "Technician Visit",
      body: (
        <p className="text-violet-900 text-sm sm:text-base">
          A certified technician will arrive at your location for a professional
          service call.
        </p>
      ),
    },
    {
      subtitle: "Diagnostics & Repair",
      body: (
        <p className="text-violet-900 text-sm sm:text-base">
          Our expert will diagnose the issue and carry out the necessary repairs
          efficiently.
        </p>
      ),
    },
    {
      subtitle: "Completion & Payment",
      body: (
        <p className="text-violet-900 text-sm sm:text-base">
          Once the repair is successfully completed, you can proceed with the
          payment. We ensure quality service and customer satisfaction before
          closing the job.
        </p>
      ),
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center bg-white p-4 sm:p-6 md:p-8 gap-2 w-full">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-serif font-bold italic ml-6 sm:ml-8 md:ml-10 mb-4">
          Just 4 Simple steps
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6 px-4 sm:px-0">
          {stepsItems.map((item, index) => (
            <StepsItem
              key={index}
              index={index}
              subtitle={item.subtitle}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
