import Link from "next/link";

export const links1 = [
  { id: 1, text: "About us", href: "/about" },
  { id: 2, text: "Our Fleet", href: "/fleet-list" },
  { id: 3, text: "Our Team", href: "/our-team" },
  { id: 4, text: "Contact", href: "/contact" },
];

export const links2 = [
  { id: 1, name: "Barcelona", href: "/booking-vehicle?from=Barcelona" },
  { id: 2, name: "Tarragona", href: "/booking-vehicle?from=Tarragona" },
  { id: 3, name: "Lleida", href: "/booking-vehicle?from=Lleida" },
  { id: 4, name: "Girona", href: "/booking-vehicle?from=Girona" },
];

export const links3 = [
  { id: 1, name: "Airport Transfers", href: "/booking-vehicle?type=airport" },
  { id: 2, name: "City Rides", href: "/booking-vehicle?type=city" },
  { id: 3, name: "Chauffeur Service", href: "/booking-vehicle?type=chauffeur" },
  { id: 4, name: "Corporate Travel", href: "/booking-vehicle?type=corporate" },
  { id: 5, name: "Special Occasions", href: "/booking-vehicle?type=occasion" },
];

export const links4 = [
  { id: 1, name: "Mercedes Vito", href: "/fleet-list?category=vito" },
  { id: 2, name: "Mercedes V-Class", href: "/fleet-list?category=v-class" },
  { id: 3, name: "Mercedes E-Class", href: "/fleet-list?category=e-class" },
  { id: 4, name: "Toyota", href: "/fleet-list?category=toyota" },
  { id: 5, name: "Lexus", href: "/fleet-list?category=lexus" },
  { id: 6, name: "Tesla", href: "/fleet-list?category=tesla" },
];

export const legalLinks = [
  { id: 1, name: "Terms of Service", href: "/page/terms" },
  { id: 2, name: "Privacy Policy", href: "/page/privacy" },
  { id: 3, name: "Cancellation Policy", href: "/page/cancellation" },
  { id: 4, name: "Cookie Policy", href: "/page/cookies" },
];

export default function Footer1() {
  return (
    <footer className="footer">
      <div className="footer-1">
        <div className="container-sub">
          <div className="box-footer-top">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 text-md-start text-center mb-15">
                <div className="d-flex align-items-center justify-content-md-start justify-content-center">
                  <a
                    className="text-14-medium call-phone color-white hover-up"
                    href="tel:+41227157000"
                  >
                    +34 612 47 23 29
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-40">
            <div className="col-lg-3 width-20">
              <h5 className="text-18-medium color-white mb-20">Company</h5>
              <ul className="menu-footer">
                {links1.map((elm, i) => (
                  <li key={i}>
                    <Link href={elm.href}>{elm.text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-3 width-20 mb-30">
              <h5 className="text-18-medium color-white mb-20">Top cities</h5>
              <ul className="menu-footer">
                {links2.map((elm, i) => (
                  <li key={i}>
                    <a href={elm.href}>{elm.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-3 width-20 mb-30">
              <h5 className="text-18-medium color-white mb-20">Services</h5>
              <ul className="menu-footer">
                {links3.map((elm, i) => (
                  <li key={i}>
                    <a href={elm.href}>{elm.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-3 width-20 mb-30">
              <h5 className="text-18-medium color-white mb-20">Cars</h5>
              <ul className="menu-footer">
                {links4.map((elm, i) => (
                  <li key={i}>
                    <a href={elm.href}>{elm.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-2">
        <div className="container-sub">
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12 text-center text-lg-start">
                <span className="text-14 color-white mr-50">
                  © {new Date().getFullYear()} Luxride
                </span>
                <ul className="menu-bottom">
                  {legalLinks.map((elm, i) => (
                    <li key={i}>
                      <Link href={elm.href}>{elm.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-4 col-md-12 text-center text-lg-end">
                <a className="btn btn-link-location" href="#">
                  Barcelona
                </a>
                <a className="btn btn-link-globe active" href="#">
                  English
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
