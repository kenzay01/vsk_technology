import pic1 from "@/public/servicesPic/pic1.png";
import pic2 from "@/public/servicesPic/pic2.png";
import pic3 from "@/public/servicesPic/pic3.png";
import pic4 from "@/public/servicesPic/pic4.png";
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
  ];
  return (
    <section className="flex flex-col justify-center items-center bg-white p-8 gap-2 w-full">
      <div className="text-4xl italic font-serif font-bold">Our Services</div>
      <div className="flex justify-center items-center gap-8 w-full max-w-7xl">
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
