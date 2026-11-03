/**
 * Primary navigation — extracted verbatim from the live site's
 * #primary-menu (order, labels, URLs and nesting preserved).
 * Source: https://securitysolutionsdubai.com/ (October 2026).
 */

const SITE = "https://securitysolutionsdubai.com";

export type MenuLink = {
  label: string;
  href: string;
  children?: MenuLink[];
};

export type ServiceGroup = {
  label: string;
  href: string;
  children?: MenuLink[];
};

export type MenuItem = {
  label: string;
  href: string;
  type: "link" | "dropdown" | "mega";
  children?: MenuLink[];
};

/** Services mega-menu: 29 groups in the live order. */
export const serviceMenu: ServiceGroup[] = [
  { label: "Verticals", href: `${SITE}/services/verticals/` },
  {
    label: "CCTV Video Surveillance",
    href: `${SITE}/services/cctv-video-surveillance/`,
    children: [
      { label: "Avigilon Access Control Dubai", href: `${SITE}/avigilon-access-control-dubai/` },
      { label: "Avigilon VMS system", href: `${SITE}/services/avigilon-vms-software/` },
      { label: "Avigilon security cameras", href: `${SITE}/services/avigilon-security-cameras/` },
    ],
  },
  { label: "Time Attendance Management", href: `${SITE}/services/time-attendance-management/` },
  { label: "Premise Access Control Solutions", href: `${SITE}/services/premise-access-control-solutions/` },
  { label: "Unified Communications", href: `${SITE}/services/unified-communications/` },
  { label: "ICT & ELV Infrastructure Setup Solutions", href: `${SITE}/services/ict-elv-infrastructure-setup-solutions/` },
  { label: "Structured Cabling & Networking", href: `${SITE}/services/structured-cabling-networking-solutions/` },
  { label: "Wireless Connectivity Solution", href: `${SITE}/services/wireless-connectivity-solution/` },
  {
    label: "Thermal Screening Solutions",
    href: `${SITE}/intelligent-body-temperature-detection-analysis-solution/`,
  },
  { label: "Vehicle Tracking & Management", href: `${SITE}/services/vehicle-tracking-management/` },
  { label: "Guard Tour Patrol Monitoring", href: `${SITE}/services/guard-tour-patrol-monitoring/` },
  { label: "HR & Payroll Management", href: `${SITE}/services/hr-payroll-management/` },
  { label: "Computer Activity Monitoring", href: `${SITE}/services/computer-activity-monitoring/` },
  { label: "Visitor Management Solution", href: `${SITE}/services/visitor-management-solution/` },
  {
    label: "Meeting Room Management Solutions",
    href: "#",
    children: [
      {
        label: "Wisemeet Meeting Room Management Solution",
        href: `${SITE}/wisemeet-meeting-room-management-solution/`,
      },
      {
        label: "Evoko Meeting Room Reservation and Scheduling System",
        href: `${SITE}/evoko-meeting-room-reservation-and-scheduling-system/`,
      },
    ],
  },
  { label: "Smart Entrance Management Systems", href: `${SITE}/services/smart-entrance-management-systems/` },
  { label: "Atlasti Distributor", href: `${SITE}/services/qualitative-data-analysis-atlas-ti-in-uae/` },
  { label: "Servers Storage Virtualization", href: `${SITE}/servers-storage-virtualization/` },
  {
    label: "Professional Starlink Installation Dubai",
    href: `${SITE}/services/professional-starlink-installation-in-dubai-uae/`,
  },
  { label: "Portable Hidden Camera Detector", href: `${SITE}/services/portable-hidden-camera-detector/` },
  { label: "Enterprise Networking Solutions", href: `${SITE}/services/enterprise-networking-solutions/` },
  { label: "IT Relocation Services", href: `${SITE}/services/it-relocation-services/` },
  { label: "IT Office Setup Solutions", href: `${SITE}/services/it-office-setup-solutions/` },
  { label: "Data Backup and Recovery Solutions", href: `${SITE}/services/secure-data-backup-guide/` },
  { label: "Endpoint Security Solutions", href: `${SITE}/services/endpoint-security-solutions/` },
  { label: "Email Security Solutions", href: `${SITE}/services/email-security-solutions/` },
  { label: "Physical Port Security", href: `${SITE}/services/physical-port-security/` },
  { label: "IT AMC Services Dubai", href: `${SITE}/services/it-amc-services-dubai/` },
  { label: "Data Center Modernization Solutions", href: `${SITE}/data-center-modernization-guide/` },
];

export const primaryMenu: MenuItem[] = [
  { label: "Home", href: "#top", type: "link" },
  {
    label: "About Us",
    href: `${SITE}/about-us/`,
    type: "dropdown",
    children: [
      { label: "Verticals", href: `${SITE}/services/verticals/` },
      { label: "Awards & Accolades", href: `${SITE}/about-us/awards-accolades/` },
      { label: "Brand, Logo & Philosophy", href: `${SITE}/about-us/brand-logo-philosophy/` },
      {
        label: "Hutaib Awarded with ISO 9001:2015 Certification",
        href: `${SITE}/about-us/hutaib-awarded-iso-90012015-certification/`,
      },
      { label: "QHSE Policy", href: `${SITE}/about-us/qhse-policy/` },
    ],
  },
  { label: "How it works", href: `${SITE}/how-it-works/`, type: "link" },
  {
    label: "Services",
    href: `${SITE}/services/`,
    type: "mega",
    children: serviceMenu.map((group) => ({
      label: group.label,
      href: group.href,
      children: group.children,
    })),
  },
  { label: "Blog", href: `${SITE}/blog/`, type: "link" },
  { label: "Resources", href: `${SITE}/resources/`, type: "link" },
  {
    label: "Locations",
    href: "#",
    type: "dropdown",
    children: [
      { label: "UAE", href: `${SITE}/uae/` },
      { label: "Saudi Arabia", href: `${SITE}/saudi-arabia/` },
      { label: "Oman", href: `${SITE}/oman/` },
    ],
  },
  { label: "Careers", href: `${SITE}/careers/`, type: "link" },
  { label: "Contact Us", href: `${SITE}/contact-us/`, type: "link" },
];

export const menuCounts = {
  topLevel: primaryMenu.length,
  about: primaryMenu.find((item) => item.label === "About Us")?.children?.length ?? 0,
  services: serviceMenu.length,
  serviceSubItems: serviceMenu.reduce((total, group) => total + (group.children?.length ?? 0), 0),
  locations: primaryMenu.find((item) => item.label === "Locations")?.children?.length ?? 0,
};

/** Plain-text tree for documentation / the WPBakery kit. */
export function menuTreeMarkdown(): string {
  const lines: string[] = [
    "# Primary menu — exact structure from the live website",
    "",
    "Source: `https://securitysolutionsdubai.com/` — `#primary-menu` (October 2026).",
    "The preview links Home to `#top` so the demo stays on the page; on WordPress it must be the site root.",
    "Rebuild this in **Appearance → Menus** and assign it to the TheGem Primary Menu location.",
    "Keep the labels and order identical. On WordPress, replace the absolute URLs with the",
    "migrated page URLs; `Home` should point to the site root.",
    "",
    "## Top level",
    "",
  ];
  primaryMenu.forEach((item, index) => {
    const href = item.label === "Home" ? "/ (the site root)" : item.href;
    lines.push(`${index + 1}. **${item.label}** — ${href}`);
  });

  lines.push("", "## About Us submenu", "");
  (primaryMenu.find((item) => item.label === "About Us")?.children ?? []).forEach((child, index) => {
    lines.push(`${index + 1}. ${child.label} — ${child.href}`);
  });

  lines.push("", "## Services mega-menu (2 columns, 29 groups, 5 sub-items)", "");
  serviceMenu.forEach((group, index) => {
    lines.push(`${index + 1}. ${group.label} — ${group.href}`);
    (group.children ?? []).forEach((child) => {
      lines.push(`   - ${child.label} — ${child.href}`);
    });
  });

  lines.push("", "## Locations submenu", "");
  (primaryMenu.find((item) => item.label === "Locations")?.children ?? []).forEach((child, index) => {
    lines.push(`${index + 1}. ${child.label} — ${child.href}`);
  });

  lines.push(
    "",
    "## WordPress setup notes",
    "",
    "- TheGem Header Builder → Primary Menu → select this menu. Sticky header ON.",
    "- Services: enable the multi-column dropdown (mega menu) and set 2 columns to match the live site.",
    "- `Meeting Room Management Solutions` has `#` as its parent URL on the live site; keep the label and use the two child links.",
    "- Add a `Get a quote` button after the menu, linking to the contact page or `#contact`.",
    "- Do not rename labels such as `How it works` (lowercase “it”), `Atlasti Distributor`, or `ICT & ELV Infrastructure Setup Solutions`.",
  );

  return lines.join("\n");
}
