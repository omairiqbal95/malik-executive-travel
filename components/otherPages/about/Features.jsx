// components/AboutSection.jsx (or Features.jsx if it's the main about component)
// import { features7 } from "@/data/features"; // Removed import

export default function AboutSection() { // Renamed component for clarity
  // Define the list items directly within the component
  const ourValues = [
    "Diverse Fleet for Every Need",
    "Impeccably Clean & Well-Maintained Vehicles",
    "Safe & Secure Journeys",
    "Comfortable & Enjoyable Rides",
    "Professional, Courteous & Local Expert Drivers",
  ];

  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-60">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            Your Trusted Partner for Barcelona Travel
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              At Malik Executive Travel, we provide premium chauffeur-driven services across Barcelona and the surrounding region. From seamless airport transfers to comfortable city rides, day trips, and corporate travel, we prioritize your safety, comfort, and punctuality. Our professional drivers know the city intimately, ensuring a smooth and enjoyable journey every time.
            </p>
            <p>
              Our commitment is to deliver a reliable, high-quality transportation service that exceeds your expectations. We operate a diverse fleet of well-maintained vehicles, from standard sedans to spacious vans and luxury options, all designed to cater to your specific travel needs in and around Barcelona.
            </p>
            <ul className="list-ticks list-ticks-small">
              {ourValues.map((value, index) => ( // Renamed variable for clarity
                <li key={index} className="text-16 mb-20"> {/* Use index as key since values are static */}
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}