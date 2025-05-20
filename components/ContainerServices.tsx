import pic1 from "@/public/servicesPic/pic1.png";
import pic2 from "@/public/servicesPic/pic2.png";
import pic3 from "@/public/servicesPic/pic3.png";
import pic4 from "@/public/servicesPic/pic4.png";
import pic5 from "@/public/servicesPic/pic5.png";
import ServiceItem from "./ServiceItem";
export default function ContainerServices() {
  const services = [
    {
      title: "Refrigerator Repair",
      image: pic1,
    },
    {
      title: "Washer/Dryer Repair",
      image: pic2,
    },
    {
      title: "Range/Stove & Cooktop  Repair",
      image: pic3,
    },
    {
      title: "Dishwasher Repair",
      image: pic4,
    },
    {
      title: "Microwave Repair",
      image: pic5,
    },
  ];
  return (
    <section
      className="flex flex-col justify-center items-center bg-white p-4 md:p-8 gap-2 w-full"
      id="services"
    >
      <div className="text-3xl md:text-4xl italic font-serif font-bold mt-4 md:mt-0 md:mb-2">
        Our Services
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full max-w-7xl">
        {services.map((service) => (
          <ServiceItem
            key={service.title}
            title={service.title}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
}
