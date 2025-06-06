"use client";

export default function ClientSaying() {
  const containerInfo = [
    {
      paragraph: `“VSK Technology was awesome. They were efficient in scheduling, diagnosing the problem and fixing it at a reasonable price. I would definitely recommend them to anyone who needs an appliance repair especially if you have a high end appliance like the Bertazzoni dishwasher. The door was not closing due to a latch and foot on the bottom of dishwasher. Thank you Vadym and VSK!”`,
      name: "Nancy C.",
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
      paragraph: `“VSK Technology did such a great job fixing my refrigerator. the technician was very friendly and knowledgeable. the problem wasn't apparent and so he replaced several components until we found the faulty board. he came to my house at least 7 times to check on the refrigerator to make sure it was working since I was out of town and not able to monitor the situation. I felt comfortable enough to give him my key and let him come into the house and check the refrigerator when i was out of town and he sent back the key to me after he was convinced the job was done. I would highly recommend them for Applicance repair they are very capable and friendly and very trustworthy - not something you see often today.”`,
      name: "Terry P.",
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
