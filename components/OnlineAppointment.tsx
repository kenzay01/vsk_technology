"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import appointmentImage from "@/public/appointment.png";
import { InputInfo } from "./inputs/InputInfo";
import { TextareaInfo } from "./inputs/TextareaInfo";
// import { zipCodes } from "@/utils/zipCodes";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function OnlineAppointment() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [zipCodes, setZipCodes] = useState<string[]>([]);
  useEffect(() => {
    const fetchZipCodes = async () => {
      //   setLoading(true);
      try {
        const response = await fetch("/api/zipcodes");
        if (response.ok) {
          const data = await response.json();
          setZipCodes(data.zipCodes);
        } else {
          console.error("Помилка завантаження зіпкодів");
        }
      } catch (err) {
        console.error(`Помилка сервера ${err}`);
      } finally {
        // setLoading(false);
      }
    };

    fetchZipCodes();
  }, []);
  const [formData, setFormData] = useState({
    zipCode: "",
    name: "",
    phone: "",
    applianceTypes: [] as string[],
    dateTime: "",
    text: "",
  });
  const [errors, setErrors] = useState({
    zipCode: "",
    name: "",
    phone: "",
    applianceTypes: "",
    dateTime: "",
    text: "",
  });

  const validatePhone = (phone: string) => {
    const phoneRegex =
      /^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$/;
    return phoneRegex.test(phone.trim()) || phone === "";
  };

  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip) && zipCodes.includes(zip);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "zipCode") {
      const isValid = validateZipCode(value);
      setErrors((prev) => ({
        ...prev,
        zipCode:
          isValid || value === ""
            ? ""
            : "Sorry but we do not cover that location",
      }));
      if (isValid && value !== "") {
        setIsFormVisible(true);
      } else {
        setIsFormVisible(false);
      }
    } else if (name === "phone" && isFormVisible) {
      const isValid = validatePhone(value);
      setErrors((prev) => ({
        ...prev,
        phone:
          isValid || value === ""
            ? ""
            : "Please enter a valid phone number (e.g., +12025550123 or (202) 555-0123)",
      }));
    } else if (name === "name" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        name: value === "" ? "Name is required" : "",
      }));
    } else if (name === "dateTime" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        dateTime: value === "" ? "Date and time are required" : "",
      }));
    } else if (name === "text" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        text: value === "" ? "Message is required" : "",
      }));
    }
  };

  const handleApplianceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedAppliances = checked
        ? [...prev.applianceTypes, value]
        : prev.applianceTypes.filter((type) => type !== value);
      return { ...prev, applianceTypes: updatedAppliances };
    });

    // Validate appliance types immediately after change
    setErrors((prev) => ({
      ...prev,
      applianceTypes:
        checked || formData.applianceTypes.length > 1
          ? ""
          : "At least one appliance type must be selected",
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      zipCode: !formData.zipCode
        ? "ZIP code is required"
        : errors.zipCode || validateZipCode(formData.zipCode)
        ? ""
        : "Sorry but we do not cover that location",
      name: !formData.name && isFormVisible ? "Name is required" : "",
      phone:
        !formData.phone && isFormVisible
          ? "Phone is required"
          : errors.phone || validatePhone(formData.phone)
          ? ""
          : "Please enter a valid phone number (e.g., +12025550123 or (202) 555-0123)",
      applianceTypes:
        formData.applianceTypes.length === 0 && isFormVisible
          ? "At least one appliance type must be selected"
          : "",
      dateTime:
        !formData.dateTime && isFormVisible ? "Date and time are required" : "",
      text: !formData.text && isFormVisible ? "Message is required" : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (
      !isFormVisible ||
      newErrors.zipCode ||
      newErrors.name ||
      newErrors.phone ||
      newErrors.applianceTypes ||
      newErrors.dateTime ||
      newErrors.text
    ) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(
        `Дякуємо за заявку! Ми скоро зв'яжемося з вами.\nSelected appliances: ${
          formData.applianceTypes.join(", ") || "None"
        }`
      );
    }, 1000);
  };

  const applianceOptions = [
    "Refrigerator Repair",
    "Washer/Dryer Repair",
    "Range/Stove & Cooktop Repair",
    "Dishwasher Repair",
  ];

  return (
    <div
      className="flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-lg overflow-hidden"
      id="appointment"
    >
      <div className="w-full md:w-1/2 relative h-[400px]">
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
            label="ZIP Code"
            placeholder="Enter your ZIP code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            maxLength={5}
            pattern="^\d{5}$"
            required={true}
          />
          {isFormVisible && (
            <>
              <InputInfo
                label="Name"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required={true}
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
                maxLength={15}
                pattern="^\+?[1-9]\d{0,2}(?:\s|-)?\(?\d{3}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$"
              />
              <div className="mb-6 w-full">
                <label
                  className="text-lg mb-2 font-medium text-gray-700 hover:cursor-pointer flex gap-2 items-center"
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                  }}
                >
                  Appliance type{" "}
                  {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  <span className="text-red-500">*</span>
                </label>
                {errors.applianceTypes && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.applianceTypes}
                  </p>
                )}
                {isOpen && (
                  <div className="space-y-2">
                    {applianceOptions.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={option}
                          name="applianceTypes"
                          value={option}
                          checked={formData.applianceTypes.includes(option)}
                          onChange={handleApplianceChange}
                          className="mr-2 leading-tight"
                        />
                        <label htmlFor={option} className="text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <InputInfo
                label="Date and time"
                type="date"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                error={errors.dateTime}
                required={true}
              />
              <TextareaInfo
                label="Text"
                placeholder="Enter your message"
                name="text"
                value={formData.text}
                onChange={handleChange}
                error={errors.text}
                required={true}
              />
              <div
                onClick={!loading ? handleSubmit : undefined}
                className={`w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium text-lg text-center cursor-pointer transition-colors ${
                  loading ? "opacity-70" : ""
                }`}
              >
                {loading ? "Processing..." : "Confirm"}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
