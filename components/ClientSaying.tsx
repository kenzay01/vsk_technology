export default function ClientSaying() {
  const containerInfo = [
    {
      paragraph: `“I had a great experience with VSK Technology! The technician was
            prompt, knowledgeable, and fixed my refrigerator in no time. I
            highly recommend their services to anyone in need of appliance
            repairs.”`,
      name: "John D.",
    },
    {
      paragraph: `“VSK Technology saved me! My dryer was not working, and they were
            able to diagnose and repair it quickly. The $80 service fee was
            worth every penny for the quality I received.”`,
      name: "Sarah S.",
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
      <div className="max-w-7xl flex flex-col gap-8 p-8 bg-white">
        <div className="flex flex-col gap-6 justify-center items-center">
          <h1 className="text-5xl font-serif">What our clients are saying </h1>
          {/* <h2 className="text-xl">
            More than 100 people are using our services and trust us.
          </h2> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {containerInfo.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <p className="text-md">{item.paragraph}</p>
              <p className="text-md font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
