"use client";

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
        "Our service call fee is $80, which covers the initial assessment and consultation. Service call fee will be waived If you decide to do the repair with us.",
    },
    {
      title: "How can I schedule an appointment?",
      content:
        "Scheduling an appointment is easy with our user-friendly online booking system and via call. Simply visit our website, select your preferred date and time, and we'll confirm your appointment promptly for your convenience.",
    },
  ];

  return (
    <section 
      className="w-full py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-16 bg-white flex flex-col sm:flex-col md:flex-row gap-6 sm:gap-6 md:gap-8"
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="flex-1 flex flex-col gap-3 sm:gap-4 justify-start items-center mt-4">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-serif text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base md:text-md text-center">
          Your Questions Answered
        </p>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-3 sm:gap-4">
          {accardionsInfo.map((item, index) => (
            <Accardion 
              key={index} 
              title={item.title} 
              content={item.content} 
              hasFaqSchema={true}
            />
          ))}
        </div>
      </div>
      
      {/* Adding structured data for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": accardionsInfo.map(faq => ({
              "@type": "Question",
              "name": faq.title,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.content
              }
            }))
          })
        }}
      />
    </section>
  );
}
