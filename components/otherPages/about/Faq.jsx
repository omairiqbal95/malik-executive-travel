export const faqs = [
  {
    id: 1,
    question: `How do I book a ride in Barcelona?`,
    answer: `Booking a ride with us in Barcelona is simple. Use our website to enter your pickup and dropoff locations. Select your preferred vehicle type, confirm the details, and your ride will be scheduled. You can book instantly or in advance for your convenience.`,
  },
  {
    id: 2,
    question: `What types of vehicles do you offer in Barcelona?`,
    answer: `We offer a diverse fleet in Barcelona to suit your needs, including standard sedans, spacious Mercedes Vito vans (up to 8 passengers), luxury Mercedes E-Class and Tesla options, and eco-friendly hybrid vehicles. You can choose the perfect vehicle during the booking process.`,
  },
  {
    id: 3,
    question: `How do I pay for my ride?`,
    answer: `We accept various payment methods including major credit cards and debit cards. Payment is typically processed securely through our website after booking confirmation. Our pricing is transparent with no hidden fees.`,
  },
  {
    id: 4,
    question: `How do I book an airport transfer to/from Barcelona El Prat (BCN)?`,
    answer: `Booking an airport transfer is easy. Simply select 'Airport Transfer' as your service type during booking on our website, enter 'Barcelona El Prat Airport (BCN)' as the pickup or dropoff point, and provide your flight details. Our driver will meet you at the terminal with a sign.`,
  },
  {
    id: 5,
    question: `What if my flight is delayed?`,
    answer: `No problem. Our airport transfer service monitors flight arrival times. If your flight is delayed, your driver will adjust the pickup time accordingly at no extra cost.`,
  },
  {
    id: 6,
    question: `Are your drivers licensed and professional?`,
    answer: `Yes, all our drivers in Barcelona are fully licensed, professionally trained, and knowledgeable about the city. They are selected for their reliability, courtesy, and safe driving record.`,
  },
  {
    id: 7,
    question: `Can I book a ride for a specific time in the future?`,
    answer: `Absolutely! You can schedule your ride for a specific date and time up to several days in advance using our booking system on the website.`,
  },
  {
    id: 8,
    question: `What is your cancellation policy?`,
    answer: `You can cancel your booking up to 24 hours before the scheduled pickup time without any charge. Cancellations made after this time may incur a fee. Details are provided in your booking confirmation.`,
  },
  {
    id: 9,
    question: `Do you provide child car seats?`,
    answer: `Yes, child car seats are available upon request during the booking process on our website. Please specify the type of seat required (infant, toddler, booster) when making your reservation.`,
  },
  {
    id: 10,
    question: `How do I contact customer support?`,
    answer: `You can reach our customer support team via the contact form on our website or by email at info@malikexecutivetravel.com. We are available [your-support-hours, e.g., 24/7, Mon-Fri 9am-6pm].`,
  },
  {
    id: 11,
    question: `Do you operate outside of Barcelona city center?`,
    answer: `Yes, we provide services throughout the Barcelona metropolitan area, including nearby towns, the airport, and for day trips to destinations like Sitges, Girona, or Montserrat.`,
  },
  {
    id: 12,
    question: `Can I request a specific driver or vehicle?`,
    answer: `While we cannot guarantee a specific driver or vehicle due to availability, we will do our best to accommodate special requests if notified in advance.`,
  },
];


export default function Faq() {
  return (
    <section className="section pt-80 mb-30">
      <div className="container-sub">
        <div className="box-faqs">
          <div className="text-center">
            <h2 className="color-brand-1 mb-20 wow fadeInUp">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-60 mb-40">
            <div className="accordion wow fadeInUp" id="accordionFAQ">
              {faqs.map((elm, i) => (
                <div key={i} className="accordion-item">
                  <h5 className="accordion-header" id={`heading${i}`}>
                    <button
                      className={`accordion-button text-heading-5 ${
                        i ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${i}`}
                      aria-expanded={`${!i ? "true" : "false"}`}
                      aria-controls={`collapse${i}`}
                    >
                      {elm.question}
                    </button>
                  </h5>
                  <div
                    className={`accordion-collapse collapse ${
                      !i ? "show" : ""
                    }`}
                    id={`collapse${i}`}
                    aria-labelledby={`heading${i}`}
                    data-bs-parent="#accordionFAQ"
                  >
                    <div className="accordion-body">{elm.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
