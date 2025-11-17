"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBookingStore } from "@/store/useBookingStore";

const tabs = [
  { id: 1, href: "/booking-vehicle", iconClass: "icon-book icon-vehicle", text: "Vehicle" },
  { id: 2, href: "/booking-extra", iconClass: "icon-book icon-extra", text: "Extras" },
  { id: 3, href: "/booking-passenger", iconClass: "icon-book icon-pax", text: "Details" },
];

export default function BookingTab() {
  const pathname = usePathname();
  const [activePathIndex, setActivePathIndex] = useState(0);
  const { selectedVehicle } = useBookingStore();

  useEffect(() => {
    const activeTab = tabs.find((elm) => elm.href === pathname);
    setActivePathIndex(tabs.indexOf(activeTab));
  }, [pathname]);

  return (
    <div className="box-booking-tabs">
      {tabs.map((tab, i) => {
        // Disable tab if it's forward step and requirements are not met
        const disabled = (i === 1 && !selectedVehicle) || (i > 1 && !selectedVehicle);
        return (
          <div key={i} className="item-tab wow fadeInUp">
            {disabled ? (
              <div className={`box-tab-step ${activePathIndex >= i ? "active" : ""}`} style={{ cursor: "not-allowed", opacity: 0.5 }}>
                <div className="icon-tab">
                  <span className={tab.iconClass}></span>
                  <span className="text-tab">{tab.text}</span>
                </div>
                <div className="number-tab">
                  <span>0{i + 1}</span>
                </div>
              </div>
            ) : (
              <Link href={tab.href}>
                <div className={`box-tab-step ${activePathIndex >= i ? "active" : ""}`}>
                  <div className="icon-tab">
                    <span className={tab.iconClass}></span>
                    <span className="text-tab">{tab.text}</span>
                  </div>
                  <div className="number-tab">
                    <span>0{i + 1}</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
