"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { InputInfo } from "./inputs/InputInfo";
import { TextareaInfo } from "./inputs/TextareaInfo";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { escapeMarkdown } from "@/funcs/escapeMarkdown";
import { Toaster } from "./Toaster";
import map from "@/public/map.png";

export default function OnlineAppointment() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addToastRef = useRef<
    (message: string, type: "success" | "error") => void
  >(() => {});

  const [zipCodes, setZipCodes] = useState<string[]>([]);
  useEffect(() => {
    const fetchZipCodes = async () => {
      try {
        const response = await fetch("/api/zipcodes");
        if (response.ok) {
          const data = await response.json();
          setZipCodes(data.zipCodes);
        } else {
          console.error("Error loading zip codes");
          addToastRef.current?.("Error loading zip codes", "error");
        }
      } catch (err) {
        console.error(`Server error ${err}`);
        addToastRef.current?.(`Server error ${err}`, "error");
      }
    };

    fetchZipCodes();
  }, []);

  const [formData, setFormData] = useState({
    zipCode: "",
    name: "",
    phone: "",
    streetAddress: "",
    apartmentUnit: "",
    applianceTypes: [] as string[],
    date: "",
    timeSlot: "",
    text: "",
    agreeToServiceFee: false,
  });
  const [errors, setErrors] = useState({
    zipCode: "",
    name: "",
    phone: "",
    streetAddress: "",
    apartmentUnit: "",
    applianceTypes: "",
    date: "",
    timeSlot: "",
    text: "",
    agreeToServiceFee: "",
  });

  // Функція для отримання мінімальної дати в американському часовому поясі
  const getMinDateInUSTime = () => {
    const now = new Date();
    const usDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    return usDate.toISOString().split("T")[0];
  };

  // Функція для форматування дати в американському форматі
  const formatDateForUS = (dateString: string) => {
    if (!dateString) return "";

    // Створюємо дату як локальну дату (без конвертації в UTC)
    const [year, month, day] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // Форматуємо дату в американському форматі
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/New_York",
    });
  };

  // Функція для отримання поточного часу в американському часовому поясі
  const getCurrentUSTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(?:\+?1\s?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;
    return phoneRegex.test(phone.trim()) || phone === "";
  };

  const validateZipCode = (zip: string) => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip) && zipCodes.includes(zip);
  };

  const validateStreetAddress = (address: string) => {
    return address.trim().length >= 5 || address === "";
  };

  const timeSlotOptions = [
    "8am – 11am",
    "9am – 12pm",
    "10am – 1pm",
    "11am – 2pm",
    "12pm – 3pm",
    "1pm – 4pm",
    "2pm – 5pm",
    "3pm – 6pm",
    "4pm – 7pm",
    "5pm – 8pm",
    "6pm – 9pm",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

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
          isValid || value === "" ? "" : "Please enter a valid phone number",
      }));
    } else if (name === "name" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        name: value === "" ? "Name is required" : "",
      }));
    } else if (name === "streetAddress" && isFormVisible) {
      const isValid = validateStreetAddress(value);
      setErrors((prev) => ({
        ...prev,
        streetAddress:
          isValid || value === ""
            ? ""
            : "Street address must be at least 5 characters",
      }));
    } else if (name === "date" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        date: value === "" ? "Date is required" : "",
      }));
    } else if (name === "timeSlot" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        timeSlot: value === "" ? "Time slot is required" : "",
      }));
    } else if (name === "text" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        text: value === "" ? "Message is required" : "",
      }));
    } else if (name === "agreeToServiceFee" && isFormVisible) {
      setErrors((prev) => ({
        ...prev,
        agreeToServiceFee: checked
          ? ""
          : "You must agree to the service call fee",
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

    setErrors((prev) => ({
      ...prev,
      applianceTypes:
        checked || formData.applianceTypes.length > 1
          ? ""
          : "At least one appliance type must be selected",
    }));
  };

  const handleSubmit = async () => {
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
          : "Please enter a valid phone number",
      streetAddress:
        !formData.streetAddress && isFormVisible
          ? "Street address is required"
          : errors.streetAddress ||
            validateStreetAddress(formData.streetAddress)
          ? ""
          : "Street address must be at least 5 characters",
      apartmentUnit: "",
      applianceTypes:
        formData.applianceTypes.length === 0 && isFormVisible
          ? "At least one appliance type must be selected"
          : "",
      date: !formData.date && isFormVisible ? "Date is required" : "",
      timeSlot:
        !formData.timeSlot && isFormVisible ? "Time slot is required" : "",
      text: !formData.text && isFormVisible ? "Message is required" : "",
      agreeToServiceFee:
        !formData.agreeToServiceFee && isFormVisible
          ? "You must agree to the service call fee"
          : "",
    };

    setErrors(newErrors);

    if (
      !isFormVisible ||
      newErrors.zipCode ||
      newErrors.name ||
      newErrors.phone ||
      newErrors.streetAddress ||
      newErrors.applianceTypes ||
      newErrors.date ||
      newErrors.timeSlot ||
      newErrors.text ||
      newErrors.agreeToServiceFee
    ) {
      addToastRef.current?.("Please fix the form errors", "error");
      return;
    }

    setLoading(true);
    try {
      const currentTime = new Date().toISOString();
      // const currentUSTime = getCurrentUSTime();
      const formattedDate = formatDateForUS(formData.date);
      const formattedDateTime = `${formattedDate} ${formData.timeSlot}`;

      // Normalize phone number for submission
      let normalizedPhone = formData.phone.replace(/\D/g, "");
      if (!normalizedPhone.startsWith("1")) {
        normalizedPhone = `1${normalizedPhone}`;
      }
      normalizedPhone = `+${normalizedPhone}`;

      const messageText = `
🔔 *New repair request*

📌 *Request details:*
\\- ZIP code: ${escapeMarkdown(formData.zipCode)}
\\- Street address: ${escapeMarkdown(formData.streetAddress)}
\\- Apartment/Unit${
        formData.apartmentUnit
          ? ` & Gate code: ${escapeMarkdown(formData.apartmentUnit)}`
          : ": None"
      }
\\- Appliance types: ${escapeMarkdown(
        formData.applianceTypes.join(", ") || "None"
      )}
\\- Date and time: ${escapeMarkdown(formattedDateTime)}
\\- Message: ${escapeMarkdown(formData.text)}
👤 *User information:*
\\- Name: ${escapeMarkdown(formData.name)}
\\- Phone: ${escapeMarkdown(normalizedPhone)}
\\- Submission time: ${escapeMarkdown(new Date(currentTime).toLocaleString())}
\\- Service call fee: $80
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
        setFormData({
          zipCode: "",
          name: "",
          phone: "",
          streetAddress: "",
          apartmentUnit: "",
          applianceTypes: [],
          date: "",
          timeSlot: "",
          text: "",
          agreeToServiceFee: false,
        });
        setIsFormVisible(false);
        setIsOpen(false);
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

  const applianceOptions = [
    "Refrigerator Repair",
    "Washer Repair",
    "Dryer Repair",
    "Range Repair",
    "Oven Repair",
    "Stove Repair",
    "Cooktop Repair",
    "Dishwasher Repair",
    "Microwave Repair",
  ];

  return (
    <section className="mt-8 sm:mt-12 md:mt-16 bg-white" id="serviceArea">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold italic ml-4 sm:ml-42 text-center md:text-left pt-4 md:pt-0">
        Service Area
      </h1>
      <div
        className="flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-lg overflow-hidden md:gap-8"
        id="appointment"
      >
        <Toaster addToast={addToastRef} />
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h2 className="text-4xl md:text-5xl mb-8 font-serif text-center md:text-left">
            Online appointment
          </h2>
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
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  maxLength={15}
                  pattern="^(?:\+?1\s?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$"
                />
                <InputInfo
                  label="Street Address"
                  placeholder="Enter your street address"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  error={errors.streetAddress}
                  maxLength={100}
                  required={true}
                />
                <InputInfo
                  label="Apartment/Unit & Gate Code (if applicable)"
                  placeholder="Enter apartment/unit and gate code"
                  name="apartmentUnit"
                  value={formData.apartmentUnit}
                  onChange={handleChange}
                  error={errors.apartmentUnit}
                  maxLength={50}
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
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                  required={true}
                  min={getMinDateInUSTime()}
                />
                <div className="mb-6 w-full">
                  <label className="text-lg mb-2 font-medium text-gray-700 flex gap-2 items-center">
                    Time Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="" disabled>
                      Select a time slot
                    </option>
                    {timeSlotOptions.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.timeSlot}
                    </p>
                  )}
                </div>
                <TextareaInfo
                  label="Text"
                  placeholder="Enter your message"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  error={errors.text}
                  required={true}
                />
                <div className="mb-6 w-full">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeToServiceFee"
                      name="agreeToServiceFee"
                      checked={formData.agreeToServiceFee}
                      onChange={handleChange}
                      className="mr-3 mt-1 leading-tight"
                    />
                    <label
                      htmlFor="agreeToServiceFee"
                      className="text-gray-700 text-sm leading-relaxed"
                    >
                      <strong>I agree to pay the service call fee.</strong>
                      <br />{" "}
                      <span className="text-gray-600 italic">
                        Our service call fee is $80, which covers the initial
                        diagnosis and the technician`s visit. The service call
                        fee will be waived if you choose to proceed with the
                        repair through us.
                      </span>
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                  </div>
                  {errors.agreeToServiceFee && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.agreeToServiceFee}
                    </p>
                  )}
                </div>
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
        <div className="w-full md:w-1/2 relative h-64 sm:h-80 md:h-[400px] mt-8 max-w-sm md:max-w-none mx-auto md:mx-0">
          <Image
            src={map}
            alt="Service area map for VSK Technology LLC"
            fill
            className="object-contain rounded-xl"
            quality={85}
            priority
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
