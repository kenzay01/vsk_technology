import HomeHeader from "@/components/HomeHeader";
import TextTape from "@/components/TextTape";
import ContainerServices from "@/components/ContainerServices";
import AboutContainer from "@/components/AboutContainer";
import StepsContainer from "@/components/StepsContainer";
import BrandsContainer from "@/components/BrandsContainer";
import QuestionsContainer from "@/components/QuestionsContainer";
import OnlineAppointment from "@/components/OnlineAppointment";
import ClientSaying from "@/components/ClientSaying";
export default function Home() {
  return (
    <div>
      <HomeHeader />
      <TextTape />
      <ContainerServices />
      <AboutContainer />
      <StepsContainer />
      <BrandsContainer />
      <QuestionsContainer />
      <OnlineAppointment />
      <ClientSaying />
    </div>
  );
}
