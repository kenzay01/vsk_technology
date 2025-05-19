import Image from "next/image";
import map from "@/public/map.png";
export default function AboutContainer() {
  const zipCodes = [
    92201, 92203, 92210, 92211, 92220, 92223, 92230, 92234, 92236, 92240, 92241,
    92252, 92253, 92256, 92258, 92260, 92262, 92264, 92268, 92270, 92276, 92277,
    92278, 92282, 92284, 92313, 92320, 92324, 92339, 92346, 92354, 92359, 92373,
    92374, 92399, 92401, 92405, 92408, 92410, 92411, 92501, 92504, 92506, 92507,
    92508, 92518, 92530, 92532, 92543, 92545, 92548, 92551, 92553, 92555, 92557,
    92562, 92563, 92567, 92570, 92571, 92582, 92583, 92584, 92585, 92586, 92587,
    92590, 92591, 92592, 92595, 92596,
  ];

  return (
    <section className="w-full py-8 px-4 md:px-16 bg-white">
      <h1 className="text-4xl font-serif font-bold italic ml-10">About us</h1>
      <div>
        <p className="text-lg">
          Welcome to{" "}
          <span className="text-amber-500 font-semibold">VSK Technology</span> –
          your trusted appliance repair experts across Palm Springs and
          surrounding areas. With years of hands-on <br /> experience and a
          customer-first approach, we're here to bring your home appliances back
          to life quickly, efficiently, and affordably. <br />
          At VSK Technology, we understand how frustrating a broken appliance
          can be. That's why we offer fast, reliable service at a{" "}
          <span className="font-bold">
            flat rate of <br /> just $80
          </span>{" "}
          for diagnostics which will go towards the repair fee.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-lg ">
              Our certified technicians are trained to work on all major brands,
              including Whirlpool, Samsung, LG, GE, Frigidaire, Bosch,
              KitchenAid, Maytag, and more.
            </p>
            <div className="flex flex-col items-center border border-gray-200 border-dashed p-4 rounded-lg">
              <div className="bg-purple-800 text-white p-3 rounded-lg mb-6 text-center">
                <h2 className="text-3xl font-semibold font-serif">
                  Palm Springs and <br /> surrounding areas
                </h2>
              </div>

              <div className="flex justify-center items-center">
                <div className="grid grid-cols-5 gap-x-6 gap-y-1">
                  {zipCodes.map((zip, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <span className="h-2 w-2 bg-black rounded-full mr-2"></span>
                      <span>{zip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full overflow-hidden relative">
            <Image
              src={map}
              alt="map"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
