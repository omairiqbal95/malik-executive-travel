import ComingSoon from "@/components/ComingSoon";
import MobileHeader1 from "@/components/headers/MobailHeader1";
import React from "react";

export default function page() {
  return (
    <>
      <MobileHeader1 />
      <main className="main">
        <ComingSoon />
      </main>
    </>
  );
}
