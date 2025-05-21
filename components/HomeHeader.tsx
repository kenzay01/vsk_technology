"use client";

export default function HomeHeader() {
  return (
    <section 
      className="flex flex-col justify-center items-center bg-white p-4 sm:p-6 pt-8 md:p-8 gap-2 md:gap-6 w-full"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <meta itemProp="name" content="VSK Technology LLC" />
      <meta itemProp="description" content="Reliable appliance repair services in Los Angeles area" />
      <meta itemProp="telephone" content="+12137155757" />
      <meta itemProp="priceRange" content="$$" />
      <div className="flex justify-between w-full max-w-7xl items-end">
        <h1 className="text-4xl sm:text-5xl md:text-6xl italic font-serif font-bold" itemProp="legalName">
          VSK Technology
        </h1>
      </div>
      <div className="flex justify-start items-center w-full max-w-4xl px-4 sm:px-0">
        <p className="text-sm sm:text-base md:text-md" itemProp="slogan">
          Looking for a Reliable Appliance Repair Company? Turn to VSK
          Technology—your trusted partner for expert appliance repair. Our
          highly skilled and experienced technicians are committed to diagnosing
          and resolving all your appliance issues efficiently and
          professionally. Contact us today for fast, reliable service!
        </p>
      </div>
    </section>
  );
}
