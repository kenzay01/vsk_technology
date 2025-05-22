"use client";

import { useState, useRef } from "react";
import { InputInfo } from "./inputs/InputInfo";
import { escapeMarkdown } from "@/funcs/escapeMarkdown";
import { Toaster } from "./Toaster";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ phone: "" });
  const [errors, setErrors] = useState({ phone: "" });

  const addToastRef = useRef<
    (message: string, type: "success" | "error") => void
  >(() => {});

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(?:\+?1\s?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;
    return phoneRegex.test(phone.trim()) || phone === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phone: value }));

    const isValid = validatePhone(value);
    setErrors((prev) => ({
      ...prev,
      phone: isValid || value === "" ? "" : "Please enter a valid phone number",
    }));
  };

  const handleSubmit = async () => {
    if (!formData.phone || errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: !formData.phone
          ? "Phone is required"
          : "Please enter a valid phone number",
      }));
      addToastRef.current?.("Please fix the phone number error", "error");
      return;
    }

    setLoading(true);
    try {
      // Normalize phone number for submission
      let normalizedPhone = formData.phone.replace(/\D/g, "");
      if (!normalizedPhone.startsWith("1")) {
        normalizedPhone = `1${normalizedPhone}`;
      }
      normalizedPhone = `+${normalizedPhone}`;

      const currentTime = new Date().toISOString();
      const messageText = `
🔔 *New call request*

📌 *Request details:*
\\- Phone: ${escapeMarkdown(normalizedPhone)}
\\- Submission time: ${escapeMarkdown(new Date(currentTime).toLocaleString())}
      `.trim();

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
        addToastRef.current?.(
          "Thank you for your request! We will contact you soon.",
          "success"
        );
        setFormData({ phone: "" });
      } else {
        const errorData = await response.json();
        console.error("Failed to send data to Telegram:", errorData);
        addToastRef.current?.(
          "Error sending the request. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      addToastRef.current?.("Server error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="w-full bg-white py-6 sm:py-6 md:py-8 px-4 sm:px-6 md:px-4"
      id="contactUs"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <Toaster addToast={addToastRef} />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center md:items-start gap-16 sm:gap-8 md:gap-12">
        <div className="flex-1" id="requestCall">
          <h2 className="text-xl sm:text-xl md:text-2xl font-serif font-bold mb-3 sm:mb-4">
            Request a call
          </h2>
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
              pattern="^(?:\+?1\s?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$"
              aria-label="Phone number"
            />
            <button
              onClick={!loading ? handleSubmit : undefined}
              className={`bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 sm:px-4 rounded-md font-medium text-base sm:text-lg cursor-pointer transition-colors ${
                loading ? "opacity-70" : ""
              }`}
              disabled={loading}
              aria-label="Submit call request"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
        <div className="flex-1 md:ml-8">
          <h2 className="text-xl sm:text-xl md:text-2xl font-serif font-bold mb-3 sm:mb-4">
            Contacts
          </h2>
          <div className="text-gray-700 text-xs sm:text-sm space-y-1 sm:space-y-2">
            <div
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">2252 N INDIAN CANYON DR</span>{" "}
              <br />
              <span itemProp="addressLocality">PALM SPRINGS</span>,
              <span itemProp="addressRegion">CA</span>{" "}
              <span itemProp="postalCode" className="underline">
                92262-3065
              </span>{" "}
              <br />
              <span itemProp="addressCountry">United States</span>
            </div>
            <p itemProp="email">vsktechnology.us@gmail.com</p>
            <p itemProp="telephone">(213) 715-5757</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} VSK Technology LLC. All rights
          reserved.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Created by{" "}
          <a
            href="https://telebots.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 transition-colors"
          >
            Telebots
          </a>
        </p>
      </div>
    </footer>
  );
}
