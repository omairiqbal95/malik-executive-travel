// app/page.js (or the relevant home page file)
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobileHeader1 from "@/components/headers/MobailHeader1";
import Facts from "@/components/common/facts/Facts";
import Faq from "@/components/homes/home-1/Faq";
import Features from "@/components/common/features/Features";
import Feet from "@/components/homes/home-1/Feet";
import Hero from "@/components/homes/home-1/Hero";
import Partners from "@/components/common/partners/Partners";
import Process from "@/components/common/process/Process";
import Service from "@/components/homes/home-1/Service";
import Testimonials from "@/components/common/testimonials/Testimonials2";
import { BookingProvider } from "@/context/BookingContext"; // Import the provider

export const metadata = {
  title:
    "Malik Executive Travel",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
};
export default function Home() {
  return (
    <BookingProvider> {/* Wrap the main content area with BookingProvider */}
      <>
        <Header1 /> <MobileHeader1 />
        <main className="main">
          <Hero />
          <Partners />
          <Feet />
          <Process />
          <Features />
          <Facts />
          <Service />
          <Testimonials />
          <Faq />
        </main>
        <Footer1 />
      </>
    </BookingProvider>
  );
}