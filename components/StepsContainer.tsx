import StepsItem from "./StepsItem";
import { BiSolidPhoneCall } from "react-icons/bi";

export default function StepsContainer() {
  const stepsItems = [
    {
      subtitle: "",
      body: (
        <div className="text-violet-900 flex flex-col h-full w-full ">
          <h2 className="font-bold font-serif">You can Call Us</h2>
          <div className="flex items-center gap-6 ml-2 my-8">
            <BiSolidPhoneCall className="text-amber-500 text-3xl" />
            <h1 className="text-md font-bold text-lg">(213) 715-5757</h1>
          </div>
          <h2 className="font-bold font-serif">or leave a request</h2>
          <div className="mt-auto w-full">
            <button className="py-4 w-full bg-amber-500 text-white hover:bg-amber-600 transition duration-300 font-medium rounded-md mt-4 cursor-pointer">
              Book an Appointment
            </button>
          </div>
        </div>
      ),
    },
    {
      subtitle: "Technician Visit",
      body: (
        <p className="text-violet-900">
          A certified technician will arrive at your location for a professional
          service call.
        </p>
      ),
    },
    {
      subtitle: "Diagnostics & Repair",
      body: (
        <p className="text-violet-900">
          Our expert will diagnose the issue and carry out the necessary repairs
          efficiently.
        </p>
      ),
    },
    {
      subtitle: "Completion & Payment",
      body: (
        <p className="text-violet-900">
          Once the repair is successfully completed, you can proceed with the
          payment. We ensure quality service and customer satisfaction before
          closing the job.
        </p>
      ),
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center bg-white p-8 gap-2 w-full">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-serif font-bold italic ml-10 mb-4">
          Just 4 Simple steps{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
          {stepsItems.map((item, index) => (
            <StepsItem
              key={index}
              index={index}
              subtitle={item.subtitle}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
