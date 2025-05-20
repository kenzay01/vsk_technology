import Accardion from "./Accardion";

export default function QuestionsContainer() {
  const accardionsInfo = [
    {
      title: "What types of appliances do you repair?",
      content:
        "We specialize in repairing a variety of household appliances, including washers, dryers, dishwashers, refrigerators, and ovens. Our skilled technician is trained to handle common issues across these appliances efficiently and effectively.",
    },
    {
      title: "How much do you charge for a service call?",
      content:
        "Our service call fee is $80, which covers the initial assessment and consultation. Service call fee will be waived If you decide to do the repair with us. ",
    },
    {
      title: "How can I schedule an appointment?",
      content:
        "Scheduling an appointment is easy with our user-friendly online booking system and via call. Simply visit our website, select your preferred date and time, and we’ll confirm your appointment promptly for your convenience.",
    },
  ];
  return (
    <section className="w-full py-8 px-4 md:px-16 bg-white flex flex-row gap-8">
      <div className="flex-1 flex flex-col gap-4 justify-start items-center mt-4">
        <h1 className="text-4xl font-serif">Frequently Asked Questions</h1>
        <h2 className="text-md">Your Questions Answered</h2>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          {accardionsInfo.map((item, index) => (
            <Accardion key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </section>
  );
}
