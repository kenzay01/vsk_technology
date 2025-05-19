"use client";

import { useState } from "react";
import Image from "next/image";
import appointmentImage from "@/public/appointment.png";
import { InputInfo } from "./inputs/InputInfo";
import { TextareaInfo } from "./inputs/TextareaInfo";

export default function OnlineAppointment() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateTime: "",
    text: "",
  });
  const [errors, setErrors] = useState({ phone: "" });

  const validatePhone = (phone: string) => {
    const phoneRegex =
      /^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$/;
    // Explanation:
    // - ^\+? : Optional + at the start
    // - [1-9]\d{0,2} : Country code (1-3 digits, starting with 1-9)
    // - (?:\s|-)? : Optional space or hyphen
    // - \(?\d{3}\)? : Optional parentheses around 3 digits (area code)
    // - (?:\s|-)? : Optional space or hyphen
    // - \d{3} : Next 3 digits
    // - (?:\s|-)? : Optional space or hyphen
    // - \d{4} : Last 4 digits
    return phoneRegex.test(phone.trim()) || phone === "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      const isValid = validatePhone(value);
      setErrors((prev) => ({
        ...prev,
        phone:
          isValid || value === ""
            ? ""
            : "Please enter a valid phone number (e.g., +12025550123 or (202) 555-0123)",
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.phone || errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: !formData.phone
          ? "Phone is required"
          : "Please enter a valid phone number (e.g., +12025550123 or (202) 555-0123)",
      }));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Дякуємо за заявку! Ми скоро зв'яжемося з вами.");
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-lg overflow-hidden">
      <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
        <Image
          src={appointmentImage}
          alt="Appliances for online appointment"
          fill
          className="object-contain w-full h-full"
          quality={85}
          priority
          placeholder="blur"
        />
      </div>
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-5xl mb-8 font-serif">Online appointment</h2>
        <div>
          <InputInfo
            label="Name"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputInfo
            label="Phone"
            type="tel"
            required={true}
            placeholder="Enter your phone number (e.g., +12025550123)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            maxLength={15} // Added character limit
            pattern="^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$" // Browser-level validation
          />
          <InputInfo
            label="Date and time"
            type="date"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
          />
          <TextareaInfo
            label="Text"
            placeholder="Enter your message"
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
          <div
            onClick={!loading ? handleSubmit : undefined}
            className={`w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium text-lg text-center cursor-pointer transition-colors ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? "Processing..." : "Confirm"}
          </div>
        </div>
      </div>
    </div>
  );
}
