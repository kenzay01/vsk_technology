"use client";

import { useState } from "react";
import { InputInfo } from "./inputs/InputInfo";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ phone: "" });
  const [errors, setErrors] = useState({ phone: "" });

  const validatePhone = (phone: string) => {
    const phoneRegex =
      /^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$/;
    return phoneRegex.test(phone.trim()) || phone === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phone: value }));

    const isValid = validatePhone(value);
    setErrors((prev) => ({
      ...prev,
      phone:
        isValid || value === ""
          ? ""
          : "Please enter a valid phone number (e.g., +12025550123 or (202) 555-0123)",
    }));
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
    <footer className="w-full bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex-1">
          <h1 className="text-2xl font-serif font-bold mb-4">Request a call</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <InputInfo
              label="Phone"
              type="tel"
              required={true}
              placeholder="Enter your phone number (e.g., +12025550123)"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              maxLength={15}
              pattern="^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$"
            />
            <div
              onClick={!loading ? handleSubmit : undefined}
              className={`bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md font-medium text-lg cursor-pointer transition-colors ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-serif font-bold mb-4">Contacts</h1>
          <div className="text-gray-700 text-sm space-y-2">
            <div>
              2252 N INDIAN CANYON DR <br /> PALM SPRINGS, CA{" "}
              <span className="underline">92262-3065</span> <br /> United States
            </div>
            <p>vsktechnology.us@gmail.com</p>
            <p>(213) 715-5757</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
