// import { LuMapPinCheckInside } from "react-icons/lu";
export default function HomeHeader() {
  return (
    <section className="flex flex-col justify-center items-center bg-white p-8 gap-2 w-full">
      <div className="flex justify-between w-full max-w-7xl items-end">
        <h1 className="text-6xl italic font-serif font-bold">VSK Technology</h1>
        {/* <div className="py-2 px-4 flex items-center gap-4 bg-violet-900">
          <LuMapPinCheckInside className="text-5xl text-white" />
          <p className="text-white text-2xl font-serif">
            Palm Springs and <br /> surrounding Areas
          </p>
        </div> */}
      </div>
      <div className="flex justify-start items-center w-full max-w-4xl">
        <p className="text-md">
          Looking for a Reliable Appliance Repair Company? <br /> Turn to VSK
          Technology—your trusted partner for expert appliance repair. <br />
          Our highly skilled and experienced technicians are committed to
          diagnosing and resolving all <br /> your appliance issues efficiently
          and professionally.Contact us today for fast, reliable service!
        </p>
      </div>
    </section>
  );
}
