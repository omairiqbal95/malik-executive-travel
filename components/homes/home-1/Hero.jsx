"use client";

import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useBookingStore } from "@/store/useBookingStore";

const settings = {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".snbn2",
    prevEl: ".snbp2",
  },
  modules: [Navigation, Autoplay, Pagination],
  pagination: {
    el: ".sph1",
    clickable: true,
    type: "fraction",
  },
  autoplay: {
    delay: 10000,
  },
};

const banners = [
  {
    id: 1,
    url: "/assets/imgs/page/homepage1/banner.png", // Replace with actual image path
    title: "Explore Barcelona in Style",
    text: "Premium Chauffeur Service & Comfort",
  },
  {
    id: 2,
    url: "/assets/imgs/page/homepage1/banner2.png", // Replace with actual image path
    title: "Barcelona Airport Transfers",
    text: "Reliable & Punctual Service (BCN)",
  },
  {
    id: 3,
    url: "/assets/imgs/page/homepage1/banner3.png", // Replace with actual image path
    title: "Luxury Redefined",
    text: "Travel in Style and Comfort",
  },
  {
    id: 4,
    url: "/assets/imgs/page/homepage1/banner4.png", // Replace with actual image path
    title: "Discover Gaudí's Masterpieces",
    text: "Private Tours of Sagrada Família & More",
  },
  {
    id: 5,
    url: "/assets/imgs/page/homepage1/banner5.png", // Replace with actual image path
    title: "Satisfied Customers",
    text: "Join Our Happy Fleet of Clients",
  },
  {
    id: 6,
    url: "/assets/imgs/page/homepage1/banner.png", // Replace with actual image path
    title: "Day Trips from Barcelona",
    text: "Explore Sitges, Girona & Montserrat",
  },
  {
    id: 7,
    url: "/assets/imgs/page/homepage1/banner2.png", // Replace with actual image path
    title: "Corporate Travel Solutions",
    text: "Professional Service for Business Meetings",
  },
  {
    id: 8,
    url: "/assets/imgs/page/homepage1/banner3.png", // Replace with actual image path
    title: "Beach & Port Transfers",
    text: "Easy Access to Barcelona's Coastline",
  },
  {
    id: 9,
    url: "/assets/imgs/page/homepage1/banner4.png", // Replace with actual image path
    title: "Private City Tours",
    text: "Customizable Routes Around Barcelona",
  },
  {
    id: 10,
    url: "/assets/imgs/page/homepage1/banner5.png", // Replace with actual image path
    title: "Event & Wedding Transport",
    text: "Make Your Special Day Memorable",
  },
];

export default function Hero() {

  const { 
  date, 
  time, 
  pickup, 
  dropoff, 
  setDate, 
  setTime, 
  setPickup, 
  setDropoff 
} = useBookingStore();

  const handleDateChange = (dateObject) => {
    if (!dateObject) {
      setDate(null);
      return;
    }
    const jsDate = dateObject.toDate(); 
    setDate(jsDate);
  };
  
  const handleTimeChange = (newTime) => setTime(newTime);
  const handleFromChange = (location) => setPickup(location);
  const handleToChange = (location) => setDropoff(location);

  return (
    <section className="section banner-home1">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div
                className="box-cover-image boxBgImage"
                style={{
                  backgroundImage: `url(${elm.url})`,
                }}
              ></div>
              <div className="box-banner-info">
                <p className="text-16 color-white wow fadeInUp">{elm.title}</p>
                <h2 className="heading-52-medium color-white wow fadeInUp">
                  {elm.text.split(" ").slice(0, 2).join(" ")}{" "}
                  <br className="d-none d-lg-block" />
                  {elm.text.split(" ").slice(2).join(" ")}
                </h2>
              </div>
            </SwiperSlide>
          ))}

          <div className="box-pagination-button hero1nagigation">
            <div className="swiper-button-prev swiper-button-prev-banner snbp2"></div>
            <div className="swiper-button-next swiper-button-next-banner snbn2"></div>
            <div className="swiper-pagination swiper-pagination-banner sph1"></div>
          </div>
        </Swiper>
      </div>
      <div className="box-search-ride wow fadeInUp">
        <div className="search-item search-date">
          <div className="search-icon"><span className="item-icon icon-date"> </span></div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Date</label>
            <DatePickerComponent value={date} onChange={handleDateChange} />
          </div>
        </div>
        <div className="search-item search-time">
          <div className="search-icon"><span className="item-icon icon-time"> </span></div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Time</label>
            <TimePickerComponent value={time} onChange={handleTimeChange} />
          </div>
        </div>
        <div className="search-item search-from">
          <div className="search-icon"><span className="item-icon icon-from"> </span></div>
          <div className="search-inputs">
            <label className="text-14 color-grey">From</label>
            <PlacePicker value={pickup?.address || ""} onChange={handleFromChange} />
          </div>
        </div>
        <div className="search-item search-to">
          <div className="search-icon"><span className="item-icon icon-to"> </span></div>
          <div className="search-inputs">
            <label className="text-14 color-grey">To</label>
            <PlacePicker value={dropoff?.address || ""} onChange={handleToChange} />
          </div>
        </div>
        <div className="search-item search-button">
          <Link href="/booking-vehicle">
            <button className="btn btn-search" type="button">
              <Image
                width={20}
                height={20}
                src="/assets/imgs/template/icons/search.svg"
                alt="Search"
              />
              Search
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
