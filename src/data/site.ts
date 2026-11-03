import type { IconName } from "../components/Icon";
import { assets } from "../assets/assets";

export const contact = {
  company: "Hutaib InfoTech Solutions",
  brand: "Security Solutions Dubai",
  phoneDisplay: "+971 50 360 5274",
  phoneHref: "tel:+971503605274",
  whatsapp:
    "https://wa.me/971503605274?text=Hello%20Hutaib%2C%20I%27d%20like%20to%20discuss%20a%20security%20or%20IT%20project%20in%20the%20UAE.",
  email: "info@hutaibinfotech.com",
  salesEmail: "sales@hutaibinfotech.com",
  address: "Level 33, Al Saqr Business Tower, Sheikh Zayed Road, Dubai, United Arab Emirates",
  addressShort: "Al Saqr Business Tower, Sheikh Zayed Road, Dubai",
  sharjahAddress: "Office 105, Al Noor Tower, Arooba Street, Sharjah, UAE",
  hours: "Site visits by appointment",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al+Saqr+Business+Tower+Sheikh+Zayed+Road+Dubai",
};

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  tags: string[];
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "cctv",
    title: "CCTV & video surveillance",
    short:
      "Cameras, recorders and video management designed for clear coverage, quick search and reliable evidence.",
    description:
      "We plan camera positions around your site rather than a generic kit list. From Avigilon and Mobotix cameras to recorders, video walls and secure remote viewing, you get a surveillance system your team can actually operate.",
    icon: "camera",
    tags: ["Avigilon", "Mobotix", "VMS & video walls"],
    bullets: [
      "Coverage and lens plan based on your site survey",
      "IP CCTV, NVR, VMS and video wall deployment",
      "Secure remote viewing over your network",
      "Maintenance, health checks and upgrade support",
    ],
  },
  {
    id: "access-control",
    title: "Access control",
    short:
      "Control who enters where with cards, PINs, biometrics and mobile credentials across every controlled door.",
    description:
      "We secure entrances, back-of-house doors, parking and restricted zones — then make administration simple. Access rules, time zones and attendance reporting can work together rather than as separate systems.",
    icon: "fingerprint",
    tags: ["Doors", "Turnstiles", "Biometrics"],
    bullets: [
      "Door, gate, turnstile and lift access control",
      "Card, PIN, fingerprint and mobile credentials",
      "Access levels, time zones and audit trails",
      "Integration with attendance and HR records",
    ],
  },
  {
    id: "visitor-management",
    title: "Visitor management",
    short:
      "Pre-registration, QR check-in, badge printing and host alerts for a calmer, safer reception.",
    description:
      "Replace paper visitor books with a reception process that records who arrives, who they are visiting and when they leave. Pre-registration and self-service check-in reduce queues without lowering your security standard.",
    icon: "idCard",
    tags: ["Reception", "QR check-in", "Badges"],
    bullets: [
      "Pre-registration and host notifications",
      "QR and self-service check-in kiosks",
      "Badge printing and watchlist checks",
      "Visitor logs and compliance reporting",
    ],
  },
  {
    id: "networking",
    title: "Networking & structured cabling",
    short:
      "A stable foundation for every connected system: enterprise LAN, fibre, copper, racks and patching.",
    description:
      "Security and IT systems can only be as reliable as the network beneath them. We design and install structured cabling, racks, switches and patching to a documented standard — with capacity for what comes next.",
    icon: "network",
    tags: ["Fibre & copper", "Racks", "Cabling"],
    bullets: [
      "Site-wide LAN and structured cabling design",
      "Fibre backbone, copper cabling and patch panels",
      "Equipment racks, labelling and documentation",
      "Testing, certification and cable management",
    ],
  },
  {
    id: "wifi",
    title: "Enterprise Wi-Fi",
    short:
      "High-density wireless coverage that keeps working across offices, warehouses, schools and hospitality spaces.",
    description:
      "Good Wi-Fi is a design decision, not a box on the ceiling. We carry out coverage surveys, select the right access points and configure secure guest, staff and device networks that remain easy to manage.",
    icon: "wifi",
    tags: ["Coverage surveys", "Guest access", "Wi-Fi 6"],
    bullets: [
      "Predictive and on-site coverage surveys",
      "Indoor and outdoor access point deployment",
      "Secure guest, staff and device segmentation",
      "Network monitoring and ongoing tuning",
    ],
  },
  {
    id: "it-infrastructure",
    title: "IT infrastructure & ELV",
    short:
      "Server rooms, storage, backup, telephony and endpoint protection — planned and delivered as one stack.",
    description:
      "We support the IT foundation behind the building: server rooms and data centres, storage and virtualisation, PABX telephony, backup and recovery, endpoint and email security. One scope, one accountable team.",
    icon: "server",
    tags: ["Servers", "PABX", "Backup & recovery"],
    bullets: [
      "Server room and data-centre design",
      "Servers, storage and virtualisation",
      "IP telephony and PABX systems",
      "Backup, recovery and endpoint security",
    ],
  },
  {
    id: "meeting-rooms",
    title: "Meeting-room solutions",
    short:
      "Room booking, displays and video conferencing that simply work when your meeting starts.",
    description:
      "Make every room easy to find, book and use. We deploy room-scheduling panels, displays and video conferencing with clear user guidance — supported by Evoko and Wisemeet solutions where they fit.",
    icon: "monitor",
    tags: ["Evoko", "Wisemeet", "Video conferencing"],
    bullets: [
      "Room booking and occupancy displays",
      "Meeting-room displays and video walls",
      "Video conferencing and audio setup",
      "User training and day-two support",
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity & Starlink",
    short:
      "Primary and backup connectivity, Starlink installation and site links that keep operations online.",
    description:
      "Keep your business connected when the local line is not enough — or not available yet. We install primary and backup internet, Starlink terminals and secure links between sites, including temporary and remote locations.",
    icon: "satellite",
    tags: ["Starlink", "Backup links", "Site-to-site"],
    bullets: [
      "Primary and failover internet design",
      "Professional Starlink installation in the UAE",
      "Site-to-site links and secure VPN access",
      "Connectivity health monitoring and support",
    ],
  },
];

export const reasons = [
  {
    title: "Survey first, not sales first",
    body: "We visit the site and review existing systems, coverage, entry points and constraints before recommending equipment.",
    icon: "clipboard" as IconName,
  },
  {
    title: "Designed and documented",
    body: "A clear solution design, equipment schedule and scope of work, so you know exactly what is being approved and why.",
    icon: "layers" as IconName,
  },
  {
    title: "Installed by one team",
    body: "Cabling, cameras, access rules and integrations are delivered and tested by the same team — not handed between vendors.",
    icon: "wrench" as IconName,
  },
  {
    title: "Supported after go-live",
    body: "Training, as-built documentation, warranty support and optional maintenance keep your systems dependable long after handover.",
    icon: "headset" as IconName,
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
  output: string;
  icon: IconName;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discuss your needs",
    body: "A short conversation about your sites, systems, priorities and timeline — with no obligation.",
    output: "Requirement brief",
    icon: "users",
  },
  {
    number: "02",
    title: "Site survey",
    body: "We inspect coverage, entry points, existing cabling, power and access constraints.",
    output: "Survey findings",
    icon: "pin",
  },
  {
    number: "03",
    title: "Recommend a solution",
    body: "Receive a right-sized design, equipment list, clear scope and a proposed delivery programme.",
    output: "Design & proposal",
    icon: "layers",
  },
  {
    number: "04",
    title: "Installation & configuration",
    body: "Our team installs to the agreed plan, coordinating around your operations and building rules.",
    output: "Installed system",
    icon: "wrench",
  },
  {
    number: "05",
    title: "Testing & handover",
    body: "Commissioning, user training and as-built documentation — before we call the job complete.",
    output: "Training & documents",
    icon: "clipboard",
  },
  {
    number: "06",
    title: "Ongoing support",
    body: "Warranty support, preventive maintenance and advice as your sites, teams and systems grow.",
    output: "Long-term care",
    icon: "headset",
  },
];

export type Industry = {
  name: string;
  body: string;
  icon: IconName;
};

export const industries: Industry[] = [
  {
    name: "Offices & corporate",
    body: "CCTV, access control, meeting rooms and structured cabling for head offices and business centres.",
    icon: "building",
  },
  {
    name: "Healthcare",
    body: "Discreet surveillance and controlled access for clinics, hospitals and sensitive clinical areas.",
    icon: "health",
  },
  {
    name: "Banking & finance",
    body: "Layered security for branches, back offices, cash areas and restricted zones.",
    icon: "bank",
  },
  {
    name: "Retail & hospitality",
    body: "Loss prevention, footfall visibility and guest-safe access across stores and venues.",
    icon: "cart",
  },
  {
    name: "Warehouses & logistics",
    body: "Perimeter coverage, gate control, Wi-Fi and connectivity across large operational sites.",
    icon: "warehouse",
  },
  {
    name: "Education",
    body: "Campus-wide visibility, visitor control and reliable room booking for schools and universities.",
    icon: "graduation",
  },
  {
    name: "Government & public sector",
    body: "Documented, standards-led delivery for public facilities and controlled environments.",
    icon: "government",
  },
];

export const testimonials = [
  {
    quote:
      "Very user-friendly Leave and Time Attendance Management Solutions. Their brilliant support team and quick turnover time make Employee Time Management most effective.",
    name: "Ms. Catherine Pineda Tigas",
    role: "Time attendance & HR systems",
    initials: "CT",
  },
  {
    quote:
      "Very good communication and fast in the response, trying the best to satisfy the customer. Providing the support and time flexibility according to our requirements.",
    name: "Ishraq Alkhufash",
    role: "Client feedback",
    initials: "IA",
  },
  {
    quote:
      "Thanks a lot Hutaib. A very good service — we could deliver our critical project before timeline and our project manager was well informed on the proceedings.",
    name: "Siraj",
    role: "AqsaCom",
    initials: "S",
  },
  {
    quote:
      "Good initiative. Keep rocking, as this will have a lot of advantage — educating the customer and building the brand. All the best.",
    name: "Sathish Arya",
    role: "WatchNET International Trading LLC",
    initials: "SA",
  },
];

export const faqs = [
  {
    q: "Which areas do you cover?",
    a: "Our team is based in Dubai and delivers projects across the UAE, including Sharjah, Abu Dhabi, Ajman and Ras Al Khaimah. We also support projects in Saudi Arabia and Oman.",
  },
  {
    q: "Do you visit the site before quoting?",
    a: "Yes. We start with a site survey to check coverage, entry points, existing cabling and any constraints. You then receive a recommended design, equipment list and clear scope before work begins.",
  },
  {
    q: "Can you take over or upgrade an existing system?",
    a: "Yes. We audit the existing CCTV, access control, networking and IT setup, keep what is working, and recommend a phased upgrade where a full replacement is not necessary.",
  },
  {
    q: "Do you supply the brands you install?",
    a: "We design with established technology partners including Avigilon and Mobotix for surveillance, FingerTec for time attendance, and Evoko and Wisemeet for meeting-room booking. The right fit depends on your site and budget.",
  },
  {
    q: "What happens after installation?",
    a: "We test the system, train your team, hand over as-built documentation and provide warranty support. Optional annual maintenance contracts cover preventive checks, remote help and on-site support.",
  },
  {
    q: "How long does a typical installation take?",
    a: "It depends on scope, site readiness and equipment lead times. After the survey we confirm a delivery programme in writing and keep you updated on milestones through to handover.",
  },
  {
    q: "Can you integrate security, networking and meeting rooms?",
    a: "Yes. We design CCTV, access control, visitor management, Wi-Fi, structured cabling and meeting-room systems as one coordinated environment, rather than separate disconnected installations.",
  },
];

export const partners = ["Avigilon", "Mobotix", "FingerTec", "Evoko", "Wisemeet", "Starlink"];

export const projectImages = [
  {
    src: assets.access,
    alt: "Access control system supplied by Hutaib InfoTech Solutions",
    caption: "Access control systems",
    width: 900,
    height: 900,
  },
  {
    src: assets.meeting,
    alt: "IP telephony and unified communications system installed by Hutaib",
    caption: "Unified communications",
    width: 900,
    height: 900,
  },
  {
    src: assets.network,
    alt: "Enterprise wireless connectivity deployment by Hutaib",
    caption: "Wireless & connectivity",
    width: 900,
    height: 900,
  },
];

export const coverage = [
  "Dubai",
  "Sharjah",
  "Abu Dhabi",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
];

export const serviceOptions = [
  ...services.map((service) => service.title),
  "Multiple systems",
  "Maintenance / AMC",
  "Not sure yet — please advise",
];

export const locationOptions = [
  "Dubai",
  "Sharjah",
  "Abu Dhabi",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Other — UAE",
  "Saudi Arabia",
  "Oman",
  "Outside the region",
];
