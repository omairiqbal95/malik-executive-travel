"use client";

// Services for Homepage 1 (Main Services)
export const services = [
  {
    id: 1,
    title: "Barcelona City Rides",
    description: "Explore the city comfortably with our reliable and punctual service within Barcelona.",
    image: "/assets/imgs/page/homepage1/service1.png", // Consider updating image if needed
  },
  {
    id: 2,
    title: "Chauffeur Service",
    description: "Professional, knowledgeable drivers for a stress-free and informative journey around Barcelona.",
    image: "/assets/imgs/page/homepage1/service2.png", // Consider updating image if needed
  },
  {
    id: 3,
    title: "Airport Transfers",
    description: "Seamless pickups and drop-offs to and from Barcelona El Prat Airport (BCN).",
    image: "/assets/imgs/page/homepage1/service3.png", // Consider updating image if needed
  },
  {
    id: 4,
    title: "Group Travel (8-seater)",
    description: "Spacious Mercedes Vito options for larger groups exploring Barcelona and surroundings.",
    image: "/assets/imgs/page/homepage1/service5.png", // Consider updating image if needed
  },
  {
    id: 5,
    title: "Special Occasions",
    description: "Make your event memorable with our elegant and reliable transport for weddings, parties, etc.",
    image: "/assets/imgs/page/services/wedding.png", // Consider updating image if needed
  },
  {
    id: 6,
    title: "Day Trips & Tours",
    description: "Convenient travel to nearby destinations like Sitges, Girona, or Montserrat.",
    image: "/assets/imgs/page/services/travel.png", // Consider updating image if needed
  },
];


import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Service() {
  useEffect(() => {
    addLeftPaddingSwiper();
    //add padding to .swiper-padding according to .swiper-title
    window.addEventListener("resize", addLeftPaddingSwiper);
    return () => {
      window.removeEventListener("resize", addLeftPaddingSwiper);
    };
  }, []);
  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn3",
      prevEl: ".snbp3",
    },
    modules: [Navigation, Autoplay],

    autoplay: {
      delay: 10000,
    },

    breakpoints: {
      1399: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <section className="section pt-90 pb-120 bg-our-service">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-7 col-7">
            <h2 className="heading-44-medium title-fleet wow fadeInUp swiper-title">
              Our Services
            </h2>
          </div>
          <div className="col-lg-6 col-sm-5 col-5 text-end">
            <Link
              className="text-16-medium color-primary d-flex align-items-center justify-content-end wow fadeInUp"
              href="/service-grid"
            >
              More Services
              <svg
                className="icon-16 ml-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="box-slide-fleet mt-50 swiper-padding">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            {...settings}
            className="swiper-container swiper-group-4-service pb-0"
          >
            {services.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="cardService wow fadeInUp">
                  <div className="cardInfo">
                    <h3 className="cardTitle text-20-medium color-white mb-10">
                      {elm.title}
                    </h3>
                    <div className="box-inner-info">
                      <p className="cardDesc text-14 color-white mb-30">
                        {elm.description}
                      </p>
                      <Link
                        className="cardLink btn btn-arrow-up"
                        href={`/service-single/${elm.id}`}
                      >
                        <svg
                          className="icon-16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="cardImage">
                    <Image
                      width={370}
                      height={400}
                      style={{ height: "fit-content" }}
                      src={elm.image}
                      alt="Luxride"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="box-pagination-fleet">
              <div className="swiper-button-prev swiper-button-prev-fleet snbp3">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </div>
              <div className="swiper-button-next swiper-button-next-fleet snbn3">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
