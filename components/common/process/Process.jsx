// components/Process.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

// Define process data directly within the component file
const process = [
  {
    id: 1,
    title: "Book Instantly",
    description: "Easily enter your pickup and dropoff locations in Barcelona or book for a specific duration via our website or app.",
    img: "/assets/imgs/page/homepage1/laptop.png", // Or a relevant booking icon/image
  },
  {
    id: 2,
    title: "Select Your Vehicle",
    description: "Choose from our diverse fleet, including luxury sedans, spacious vans (up to 8-seater), and eco-friendly options.",
    img: "/assets/imgs/page/homepage1/desktop.png", // Or a relevant vehicle selection icon/image
  },
  {
    id: 3,
    title: "Relax & Arrive Safely",
    description: "Enjoy a comfortable, punctual journey with our professional drivers across Barcelona and beyond.",
    img: "/assets/imgs/page/homepage1/desktop2.png", // Or a relevant journey/arrival icon/image
  },
];

function PrevArrow() {
  return (
    <button type="button" className="slick-prev">
      <svg
        className="w-6 h-6 icon-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
    </button>
  );
}

function NextArrow() {
  return (
    <button type="button" className="slick-next">
      <svg
        className="w-6 h-6 icon-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </button>
  );
}

export default function Process() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null); // Use 'const' for refs
  const sliderRef2 = useRef(null); // Use 'const' for refs

  useEffect(() => {
    // Update state with the actual slider instances after they are rendered
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
    // Run this effect only once after initial render, or whenever the refs change
    // (though refs usually don't change after initial render)
  }, []); // Empty dependency array ensures it runs once after mount

  const options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: 0,
    fade: false,
    draggable: false,
    // asNavFor: nav2, // Set this directly in the Slider component props below
  };

  const options2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    // asNavFor: nav1, // Set this directly in the Slider component props below
    dots: false,
    arrows: false,
    focusOnSelect: true,
    vertical: true,
    infinite: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section className="section pt-120 pb-20 bg-primary bg-how-it-works">
      <div className="container-sub">
        <h2 className="heading-44-medium color-white mb-60 wow fadeInUp">
          How It Works
        </h2>
        <div className="row">
          <div className="col-lg-6 order-lg-last">
            <div className="box-main-slider">
              <div className="detail-gallery wow fadeInUp">
                <Slider
                  asNavFor={nav2} // Use the state variable directly
                  ref={sliderRef1} // Assign the ref
                  {...options}
                  className="main-image-slider"
                >
                  {process.map((elm) => ( // Use elm.id for key
                    <figure key={elm.id}>
                      <Image
                        width={1041}
                        height={689}
                        style={{ width: "fit-content", height: "fit-content" }}
                        src={elm.img}
                        alt="luxride"
                      />
                    </figure>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-lg-first justify-content-between position-z3 wow fadeInUp">
            <Slider
              {...options2}
              asNavFor={nav1} // Use the state variable directly
              ref={sliderRef2} // Assign the ref
              className="slider-nav-thumbnails list-how"
            >
              {process.map((elm) => ( // Use elm.id for key
                <li key={elm.id}>
                  <span className="line-white"></span>
                  <h4 className="text-20-medium mb-20">{elm.title}</h4> {/* Ensure title is rendered */}
                  <p className="text-16">{elm.description}</p>
                </li>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}