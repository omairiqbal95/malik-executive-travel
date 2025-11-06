// components/Hero.jsx (or .tsx)
"use client";
import { useBooking } from "@/context/BookingContext"; // Import the hook
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker"; // Assuming this is the updated PlacePicker
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

export default function Hero() {
  // Use the booking context
  const { date, time, fromLocation, toLocation, setDate, setTime, setFromLocation, setToLocation } = useBooking();

  // Define banners data directly within the component file, focused on Barcelona
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

  // Handlers to update the booking context state
  const handleDateChange = (newDate) => {
    // Assuming DatePickerComponent passes the date object correctly
    // You might need to adjust this based on the actual output format of DatePickerComponent
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    // Assuming TimePickerComponent passes the time string correctly (e.g., "HH:mm")
    setTime(newTime);
  };

  const handleFromChange = (newLocation) => {
    setFromLocation(newLocation);
  };

  const handleToChange = (newLocation) => {
    setToLocation(newLocation);
  };

  return (
    <section className="section banner-home1">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((banner) => ( // Use 'banner' instead of 'elm', use banner.id for key
            <SwiperSlide key={banner.id} className="swiper-slide">
              <div
                className="box-cover-image boxBgImage"
                style={{
                  backgroundImage: `url(${banner.url})`,
                }}
              ></div>
              <div className="box-banner-info">
                <p className="text-16 color-white wow fadeInUp">{banner.title}</p>
                <h2 className="heading-52-medium color-white wow fadeInUp">
                  {banner.text.split(" ").slice(0, 2).join(" ")}{" "}
                  <br className="d-none d-lg-block" />
                  {banner.text.split(" ").slice(2).join(" ")}
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
          <div className="search-icon">
            <span className="item-icon icon-date"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Date</label>
            <DatePickerComponent value={date} onChange={handleDateChange} /> {/* Pass current value and handler */}
          </div>
        </div>
        <div className="search-item search-time">
          <div className="search-icon">
            <span className="item-icon icon-time"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Time</label>
            <TimePickerComponent value={time} onChange={handleTimeChange} /> {/* Pass current value and handler */}
          </div>
        </div>
        <div className="search-item search-from">
          <div className="search-icon">
            <span className="item-icon icon-from"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">From</label>
            <PlacePicker value={fromLocation} onChange={handleFromChange} /> {/* Pass current value and handler */}
          </div>
        </div>
        <div className="search-item search-to">
          <div className="search-icon">
            <span className="item-icon icon-to"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">To</label>
            <PlacePicker value={toLocation} onChange={handleToChange} /> {/* Pass current value and handler */}
          </div>
        </div>
        <div className="search-item search-button">
          <Link href="/booking-vehicle">
            <button className="btn btn-search" type="button"> {/* Changed type to 'button' if form submission logic is elsewhere */}
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