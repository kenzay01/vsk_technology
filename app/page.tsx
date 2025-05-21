import { Metadata } from "next";
import HomeHeader from "@/components/HomeHeader";
import TextTape from "@/components/TextTape";
import ContainerServices from "@/components/ContainerServices";
import AboutContainer from "@/components/AboutContainer";
import StepsContainer from "@/components/StepsContainer";
import BrandsContainer from "@/components/BrandsContainer";
import QuestionsContainer from "@/components/QuestionsContainer";
import OnlineAppointment from "@/components/OnlineAppointment";
import ClientSaying from "@/components/ClientSaying";

export const metadata: Metadata = {
  title: "VSK Technology - Professional Appliance Repair Services",
  description: "Reliable appliance repair from VSK Technology. Our qualified technicians provide fast and quality service for all your appliance needs.",
};

export default function Home() {
  return (
    <main>
      <HomeHeader />
      <TextTape type="text" />
      <section id="services" aria-label="Our Services">
        <ContainerServices />
      </section>
      <section id="aboutUs" aria-label="About Us">
        <AboutContainer />
      </section>
      <section id="contactUs" aria-label="Book Online">
        <OnlineAppointment />
      </section>
      <section id="process" aria-label="Our Work Process">
        <StepsContainer />
      </section>
      <section id="brands" aria-label="Brands We Service">
        <BrandsContainer />
      </section>
      <section id="faq" aria-label="Frequently Asked Questions">
        <QuestionsContainer />
      </section>
      <section id="testimonials" aria-label="Client Testimonials">
        <ClientSaying />
      </section>
      <TextTape type="logo" />
    </main>
  );
}
