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
      description: "Professional repair services for all refrigerator brands and models"
    },
    {
      title: "Washer/Dryer Repair",
      image: pic2,
      description: "Expert washer and dryer repair for residential appliances"
    },
    {
      title: "Range/Stove & Cooktop Repair",
      image: pic3,
      description: "Specialized repair services for all types of cooking appliances"
    },
    {
      title: "Dishwasher Repair",
      image: pic4,
      description: "Reliable dishwasher repair and maintenance services"
    },
    {
      title: "Microwave Repair",
      image: pic5,
      description: "Quality microwave oven repair services for all brands"
    },
  ];
  
  return (
    <section
      className="flex flex-col justify-center items-center bg-white p-4 md:p-8 gap-2 w-full"
      id="services"
      itemScope
      itemType="https://schema.org/Service"
    >
      <h2 className="text-3xl md:text-4xl italic font-serif font-bold mt-4 md:mt-0 md:mb-2" itemProp="name">
        Our Services
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full max-w-7xl">
        {services.map((service) => (
          <ServiceItem
            key={service.title}
            title={service.title}
            image={service.image}
            description={service.description}
          />
        ))}
      </div>
      <div itemProp="provider" itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="name" content="VSK Technology LLC" />
        <meta itemProp="telephone" content="+12137155757" />
      </div>
    </section>
  );
}
