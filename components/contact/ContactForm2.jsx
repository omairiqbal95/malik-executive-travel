"use client";
import { useState, useEffect } from "react";
import { activeInputFocus } from "@/utlis/activeInputFocus";

export default function ContactForm2() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    activeInputFocus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        e.target.reset();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
      } else {
        console.error("Failed to send contact form");
      }
    } catch (err) {
      console.error("Error sending contact form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section form-contact-2 mt-120 mb-70 relative">
      <div className="container-sub">
        <div className="row">
          <div className="col-lg-6 mt-50 mb-50">
            <h2 className="heading-44-medium color-text mb-60 wow fadeInUp">
              Leave us your info
            </h2>
            <div className="form-contact form-comment wow fadeInUp">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullname">
                        Full Name
                      </label>
                      <input
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        type="text"
                        required
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Your Email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        className="form-control"
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        required
                        placeholder="Your Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Get In Touch"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Popup Notification */}
        {showPopup && (
          <div className="popup-notification">
            Your inquiry has been sent!
          </div>
        )}
      </div>

      <style jsx>{`
        .popup-notification {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: black;
          color: white;
          padding: 20px 30px;
          border-radius: 10px;
          font-weight: 500;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          z-index: 99999;
          animation: fadeInOut 3s ease forwards;
          text-align: center;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          90% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
        }
      `}</style>
    </section>
  );
}
