import { StaticImageData } from "next/image";
import Image from "next/image";

export default function ServiceItem({
  title,
  image,
}: {
  title: string;
  image: StaticImageData;
}) {
  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto h-full">
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-center line-clamp-2 font-serif">
          {title}
        </h1>
      </div>

      <div className="w-full h-48 mb-6 overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          width={320}
          height={192}
          priority
        />
      </div>

      <div className="flex flex-col gap-3">
        <button className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 rounded-full text-white font-medium text-md cursor-pointer transition duration-200 ease shadow-md">
          Call Us
        </button>
        <button className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 rounded-full text-white font-medium text-md cursor-pointer transition duration-200 ease shadow-md">
          Book Online
        </button>
      </div>
    </div>
  );
}
