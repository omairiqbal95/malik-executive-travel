// Social media links (usually external, or placeholder if internal strategy exists)
export const socialMediaPlatforms = [
  {
    id: 1,
    name: "Facebook",
    className: "icon-socials icon-facebook",
    href: "google.com", 
  },
  {
    id: 2,
    name: "Twitter",
    className: "icon-socials icon-twitter",
    href: "google.com", 
  },
  {
    id: 3,
    name: "Instagram",
    className: "icon-socials icon-instagram",
    href: "google.com", 
  },
  {
    id: 4,
    name: "LinkedIn",
    className: "icon-socials icon-linkedin",
    href: "google.com", 
  },
];

// Main footer links (Column 1)
export const links1 = [
  { id: 1, text: "About us", href: "/about" },
  { id: 2, text: "Our Fleet", href: "/fleet-list" }, // Changed to match LuxRide's fleet pages
  { id: 4, text: "Our Team", href: "/our-team" }, // Changed from 'Investors' to 'Our Team'
  { id: 5, text: "Contact", href: "/contact" }, // Added Contact as a common link
  // Removed 'Careers' and 'Gift cards' as they might be less standard, kept Blog from original
];

// Location links (Column 2) - Updated for Barcelona
export const links2 = [
  { id: 1, name: "Barcelona", href: "/booking-vehicle?from=Barcelona" },
  { id: 2, name: "Tarragona", href: "/booking-vehicle?from=Tarragona" },
  { id: 3, name: "Lleida", href: "/booking-vehicle?from=Lleida" },
  { id: 4, name: "Girona", href: "/booking-vehicle?from=Girona" },
];

// Service links (Column 3)
export const links3 = [
  { id: 1, name: "Airport Transfers", href: "/booking-vehicle?type=airport" }, // Changed from 'Intercity rides'
  { id: 2, name: "City Rides", href: "/booking-vehicle?type=city" }, // Changed from 'Limousine service'
  { id: 3, name: "Chauffeur Service", href: "/booking-vehicle?type=chauffeur" },
  { id: 4, name: "Corporate Travel", href: "/booking-vehicle?type=corporate" }, // Changed from 'Ground transportation'
  { id: 5, name: "Special Occasions", href: "/booking-vehicle?type=occasion" }, // Changed from 'Airport transfer' (already covered above)
];

// Vehicle type links (Column 4) - Using LuxRide's likely fleet categories
export const links4 = [
  { id: 1, name: "Standard", href: "/fleet-list?category=standard" },
  { id: 2, name: "Executive", href: "/fleet-list?category=executive" },
  { id: 3, name: "Van", href: "/fleet-list?category=van" },
  { id: 4, name: "SUV", href: "/fleet-list?category=suv" },
  // Replaced 'Business', 'First', 'XL', 'Assistant' with common vehicle types
];

// Legal links (Bottom footer)
export const legalLinks = [
  { id: 1, name: "Terms of Service", href: "/page/terms" }, // Changed from /about
  { id: 2, name: "Privacy Policy", href: "/page/privacy" }, // Changed from /about
  { id: 3, name: "Cancellation Policy", href: "/page/cancellation" }, // Changed from /about
  { id: 4, name: "Cookie Policy", href: "/page/cookies" }, // Changed from /about, common addition
];