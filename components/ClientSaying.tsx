"use client";

export default function ClientSaying() {
  const containerInfo = [
    {
      paragraph: `“They responded right away and scheduled the appointment. I would higly recommend. Very professional and polite.”`,
      name: "Alexandra D.",
    },
    {
      paragraph: `“VSK Technology saved me! My dryer was not working, and they were
            able to diagnose and repair it quickly. The $80 service fee was
            worth every penny for the quality I received.”`,
      name: "Sarah S.",
    },
    {
      paragraph: `“The technician was very professional and kind. Thanks to Vadym, my fridge is now working perfectly. I will work with him on other appliances in the future if needed.”`,
      name: "Mary S.",
    },
    {
      paragraph: `“I had a great experience with VSK Technology! The technician was
            prompt, knowledgeable, and fixed my refrigerator in no time. I
            highly recommend their services to anyone in need of appliance
            repairs.”`,
      name: "John D.",
    },
    {
      paragraph: `“I was impressed by how quickly VSK Technology handled my oven
            repair. The technician was professional and ensured everything was
            working perfectly before leaving. I will definitely use their
            services again!”`,
      name: "Jane A.",
    },
  ];

  return (
    <section className="w-full flex justify-center items-center">
      <div className="max-w-7xl flex flex-col gap-6 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 bg-white">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center">
            What our clients are saying
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
          {containerInfo.map((item, index) => (
            <div key={index} className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm sm:text-base md:text-md">
                {item.paragraph}
              </p>
              <p className="text-sm sm:text-base md:text-md font-semibold">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
