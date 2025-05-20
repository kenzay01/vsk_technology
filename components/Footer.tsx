"use client";

import { useState } from "react";
import { InputInfo } from "./inputs/InputInfo";
import { escapeMarkdown } from "@/funcs/escapeMarkdown";

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
          : "Please enter a valid phone number (e.g., +12025550123)",
    }));
  };

  const handleSubmit = async () => {
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
    try {
      const currentTime = new Date().toISOString();
      const messageText = `
🔔 *New call request*

📌 *Request details:*
\\- Phone: ${escapeMarkdown(formData.phone)}
\\- Submission time: ${escapeMarkdown(new Date(currentTime).toLocaleString())}
      `.trim();

      console.log("Sending message to Telegram:", messageText);

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
        }),
      });

      if (response.ok) {
        alert("Thank you for your request! We will contact you soon.");
        setFormData({ phone: "" });
      } else {
        const errorData = await response.json();
        console.error("Failed to send data to Telegram:", errorData);
        alert("Error sending the request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="w-full bg-white py-6 sm:py-6 md:py-8 px-4 sm:px-6 md:px-4"
      id="contactUs"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center md:items-start gap-6 sm:gap-8 md:gap-12">
        <div className="flex-1">
          <h1 className="text-xl sm:text-xl md:text-2xl font-serif font-bold mb-3 sm:mb-4">
            Request a call
          </h1>
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <InputInfo
              label="Phone"
              type="tel"
              required={true}
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              maxLength={15}
              pattern="^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$"
            />
            <div
              onClick={!loading ? handleSubmit : undefined}
              className={`bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 sm:px-4 rounded-md font-medium text-base sm:text-lg cursor-pointer transition-colors ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-xl sm:text-xl md:text-2xl font-serif font-bold mb-3 sm:mb-4">
            Contacts
          </h1>
          <div className="text-gray-700 text-xs sm:text-sm space-y-1 sm:space-y-2">
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
