// components/Facts.jsx
export default function Facts() {
  // Define facts data directly within the component file, combining the best elements
  const facts = [
    { id: 1, number: "150+", text: "Professional Drivers in Barcelona" },
    { id: 2, number: "24/7", text: "Available Service" },
    { id: 3, number: "10K+", text: "Satisfied Customers" },
    { id: 4, number: "98%", text: "Customer Satisfaction" }, // From facts2
    { id: 5, number: "4.8/5", text: "Average Rating" }, // Adapted from facts2
  ];

  return (
    <section className="section mb-30 mt-80 box-showcase">
      <div className="bg-showcase pt-100 pb-70">
        <div className="container-sub">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30">
              <h2 className="heading-44-medium color-white wow fadeInUp">
                Showcase some impressive numbers.
              </h2>
            </div>
            <div className="col-lg-6">
              <div className="row align-items-center">
                {facts.map((elm) => ( // Use elm.id for key
                  <div key={elm.id} className="col-4 mb-30 wow fadeInUp">
                    <div className="box-number">
                      <h2 className="heading-44-medium color-white">
                        {elm.number}
                      </h2>
                      <p className="text-20 color-white">{elm.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}