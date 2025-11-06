// components/headers/Nav.jsx (or .tsx)
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  // Define the simplified menu structure directly
  const navLinks = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Our Fleet", href: "/fleet-list" }, // Or another relevant fleet page
    { id: 3, title: "Services", href: "/service-grid" }, // Or another relevant services page
    { id: 4, title: "FAQ", href: "/faq" }, // Assuming you have a FAQ page
    { id: 5, title: "Contact", href: "/contact-2" },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={link.href}
            className={pathname === link.href ? "active-link" : ""}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </>
  );
}