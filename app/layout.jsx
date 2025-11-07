"use client";
import { DM_Sans } from "next/font/google";
import { useBookingStore } from "@/store/useBookingStore";
import { useEffect } from "react";
import "../public/assets/scss/style.scss";
import { extras } from "@/data/cars";
import { register } from "swiper/element/bundle";
import { usePathname } from "next/navigation";

const DM_SansFont = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--dm-saans-font",
});

register();

export default function RootLayout({ children }) {
  // const setExtrasData = useBookingStore(state => state.setExtrasData);

  // useEffect(() => {
  //   setExtrasData(extras);
  // }, [setExtrasData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then((module) => {
      });
    }
  }, []);

  const path = usePathname();
  let wow = null;

  useEffect(() => {
    const { WOW } = require("wowjs");
    wow = new WOW({
      live: false,
      mobile: false,
    });
    wow.init();
  }, [path]);

  return (
    <html lang="en">
      <head></head>
      <body className={DM_SansFont.variable}>{children}</body>
    </html>
  );
}
