"use client";

import { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface AccordionProps {
  title: string;
  content: string;
  isDefaultOpen?: boolean;
}

export default function Accordion({
  title,
  content,
  isDefaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [height, setHeight] = useState<number | undefined>(
    isDefaultOpen ? undefined : 0
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 last:border-b-0 w-full ">
      <button
        className="w-full px-6 py-5 flex justify-between items-center text-left transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 cursor-pointer rounded-t-md"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg text-gray-900 font-serif font-bold">{title}</h3>
        <div className="text-gray-700 transition-transform duration-300">
          {isOpen ? (
            <FaMinus className="w-6 h-6" />
          ) : (
            <FaPlus className="w-6 h-6" />
          )}
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height ? `${height}px` : "0px" }}
        aria-hidden={!isOpen}
      >
        <div className="px-6 pb-5" ref={contentRef}>
          <p className="text-gray-700 whitespace-pre-line">{content}</p>
        </div>
      </div>
    </div>
  );
}
