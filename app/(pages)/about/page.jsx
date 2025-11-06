import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/otherPages/about/Banner";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import Faq from "@/components/otherPages/about/Faq";
import AboutSection from "@/components/otherPages/about/Features";

export const metadata = {
  title: "About Us || Malik Executive Travel - Premium Barcelona Transport",
  description: "Learn more about Malik Executive Travel, your trusted partner for premium chauffeur-driven services in Barcelona.",
};

export default function AboutPage() {
  return (
    <>
      <Header1 />
      <main className="main">
        <Breadcumb />
        <Banner />
        <AboutSection />
        <Faq />
      </main>
      <Footer1 />
    </>
  );
}