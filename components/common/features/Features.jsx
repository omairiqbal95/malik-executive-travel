// components/Features.jsx
import Image from "next/image";

// Define features data directly within the component file, combining the best elements
const features = [
  {
    id: 1,
    icon: "/assets/imgs/page/homepage1/safe.svg",
    title: "Safety First",
    description: "Travel with confidence in our Barcelona fleet. All vehicles undergo rigorous safety checks, and our professional drivers are licensed and knowledgeable about the city.",
  },
  {
    id: 2,
    icon: "/assets/imgs/page/homepage1/price.svg",
    title: "Transparent Pricing",
    description: "Enjoy peace of mind with our clear, upfront fares for Barcelona trips. No hidden fees, no surprises. Get an accurate quote before you book.",
  },
  {
    id: 3,
    icon: "/assets/imgs/page/homepage1/vehicle.svg",
    title: "Tailored Travel Solutions",
    description: "Whether it's a quick city transfer, a day trip to Sitges, or corporate travel around Barcelona, we customize our service to meet your specific needs.",
  },
  {
    id: 4,
    icon: "/assets/imgs/page/homepage4/phone.svg", 
    title: "Easy Online Booking",
    description: "Book your ride in Barcelona quickly and easily through our website or app, available 24/7 for your convenience.",
  },
  {
    id: 5,
    icon: "/assets/imgs/page/homepage4/wheel.svg", 
    title: "Reliable & Punctual",
    description: "We guarantee timely pickups and efficient routing to get you to your destination in Barcelona on schedule.",
  },
  {
    id: 6,
    icon: "/assets/imgs/page/services/airport.svg",
    title: "Seamless Airport Transfers",
    description: "Get to or from Barcelona El Prat Airport (BCN) stress-free with our dedicated transfer service.",
  },
];

export default function Features() {
  return (
    <section className="section mt-110">
      <div className="container-sub">
        <div className="text-center">
          <h2 className="heading-44-medium color-text wow fadeInUp">
            Make Your Trip Your Way With Us
          </h2>
        </div>
        <div className="row mt-50 cardIconStyleCircle">
          {features.map((elm) => ( // Use elm.id for key
            <div key={elm.id} className="col-lg-4">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <Image width={48} height={48} src={elm.icon} alt="luxride" />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">{elm.title}</h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">{elm.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}