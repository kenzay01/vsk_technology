import React from "react";

export default function StepsItem({
  index,
  subtitle,
  body,
}: {
  index: number;
  subtitle: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-start items-start p-6 gap-2 w-64 border border-gray-300 shadow-md">
      <h1 className="text-violet-900 text-5xl font-serif">Step {index + 1}</h1>
      <h2 className="text-violet-900 text-lg font-serif font-bold">
        {subtitle}
      </h2>
      {body}
    </div>
  );
}
