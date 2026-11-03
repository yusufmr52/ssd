import { primaryMenu, serviceMenu, type MenuLink } from '../src/data/menu';
import { services, type Service } from '../src/data/site';
import type { IconName } from '../src/components/Icon';

export const ORIGIN = 'https://securitysolutionsdubai.com';
export type Detail = { intro: string; bullets: string[]; icon: IconName; image: string; category: string };
export type Page = {
  path: string;
  title: string;
  description: string;
  kind: 'home' | 'services' | 'service' | 'about' | 'process' | 'location' | 'contact' | 'blog' | 'resources' | 'article' | 'careers' | 'legal' | 'sitemap' | 'notfound';
  eyebrow?: string;
  heading?: string;
  intro?: string;
  image?: string;
  detail?: Detail;
  service?: Service;
  group?: MenuLink;
  article?: Article;
};

const fromUrl = (url: string) => `${new URL(url).origin === ORIGIN ? new URL(url).pathname.replace(/^\//, '') : ''}index.html`;
const coreByPath: Record<string, string> = {
  'services/cctv-video-surveillance/': 'cctv',
  'services/premise-access-control-solutions/': 'access-control',
  'services/visitor-management-solution/': 'visitor-management',
  'services/structured-cabling-networking-solutions/': 'networking',
  'services/wireless-connectivity-solution/': 'wifi',
  'services/ict-elv-infrastructure-setup-solutions/': 'it-infrastructure',
  'services/professional-starlink-installation-in-dubai-uae/': 'connectivity',
  'wisemeet-meeting-room-management-solution/': 'meeting-rooms',
};
const images: Record<string, string> = {
  security: 'photo-hero.webp', network: 'photo-network.webp', rooms: 'photo-meeting.webp',
  people: 'photo-attendance.webp', access: 'photo-access.webp', cctv: 'photo-cctv.webp',
  skyline: 'photo-skyline.webp', school: 'photo-school.webp',
};

// Proposed scope copy for service pages whose full content was not included in the design repository.
// No additional certifications, client wins, response times or product claims are introduced.
const details: Record<string, Detail> = {
  'time-attendance-management': {
    intro: 'Give your HR and operations teams a clearer view of working time. We plan attendance terminals, employee enrolment and reporting around your shifts, sites and approval process.',
    bullets: ['Attendance terminal and enrolment planning', 'Shift, roster and access-rule configuration', 'HR and payroll export requirements reviewed', 'Administrator training and support options'], icon: 'clock', image: images.people, category: 'Workforce & business',
  },
  'unified-communications': {
    intro: 'Bring voice, meeting tools and workplace communication into a coordinated setup. We review how your teams communicate, then specify the endpoints, network capacity and user experience needed.',
    bullets: ['IP telephony and PABX requirements', 'Meeting-room audio and video integration', 'Network readiness and user adoption planning', 'Configuration, handover and ongoing support'], icon: 'phone', image: images.rooms, category: 'Infrastructure & connectivity',
  },
  'intelligent-body-temperature-detection-analysis-solution': {
    intro: 'Plan a screening workflow that fits your entrance and operational procedures. Camera position, environmental conditions, people flow and the response to an alert all need to be considered together.',
    bullets: ['Entrance and queue layout review', 'Screening device positioning and configuration', 'Operator alerts and response workflow', 'Clear limitations and operating guidance'], icon: 'health', category: 'Security & surveillance', image: images.access,
  },
  'vehicle-tracking-management': {
    intro: 'Make fleet activity easier to review with a tracking setup scoped around your vehicles and reporting needs. We help define the information your operations team actually needs before selecting a system.',
    bullets: ['Vehicle and device requirements review', 'Location reporting and dashboard configuration', 'Driver, vehicle and access permissions', 'User training and operational handover'], icon: 'pin', image: images.network, category: 'Security & surveillance',
  },
  'guard-tour-patrol-monitoring': {
    intro: 'Replace informal patrol records with a documented checkpoint process. Define patrol routes, checkpoint locations and exception reporting so supervisors can see what was completed and what needs attention.',
    bullets: ['Patrol route and checkpoint planning', 'Reader and checkpoint deployment', 'Supervisor dashboards and exception reports', 'Guard training and review procedures'], icon: 'shield', image: images.security, category: 'Security & surveillance',
  },
  'hr-payroll-management': {
    intro: 'Connect workforce records with the way your organisation manages people. We scope employee information, attendance inputs and payroll export requirements with your HR and finance teams.',
    bullets: ['Employee record and approval workflow review', 'Attendance and leave data integration', 'Payroll export and reporting requirements', 'Role-based access and administrator training'], icon: 'users', image: images.people, category: 'Workforce & business',
  },
  'computer-activity-monitoring': {
    intro: 'Define a workplace monitoring approach with clear business purposes and appropriate access. We help translate your requirements into an implementation scope for authorised administrators.',
    bullets: ['Monitoring objectives and scope documented', 'User permissions and reporting configuration', 'Endpoint and network readiness review', 'Administrator training and retention requirements'], icon: 'monitor', image: images.network, category: 'Workforce & business',
  },
  'smart-entrance-management-systems': {
    intro: 'Make arrival at your site controlled, clear and practical. Entrance control needs to account for employees, visitors, vehicles and deliveries without creating unnecessary queues.',
    bullets: ['Pedestrian and vehicle entrance assessment', 'Door, gate and turnstile control integration', 'Credential, visitor and intercom coordination', 'Safe operation, testing and user guidance'], icon: 'fingerprint', image: images.security, category: 'Security & surveillance',
  },
  'qualitative-data-analysis-atlas-ti-in-uae': {
    intro: 'Support your research team with a properly planned Atlas.ti working environment. We scope installation, licensing requirements and collaboration arrangements around your research workflow.',
    bullets: ['Licensing and version requirements confirmed', 'Workstation installation and configuration', 'Project storage and collaboration planning', 'Setup guidance and technical support scope'], icon: 'layers', image: images.network, category: 'Workforce & business',
  },
  'servers-storage-virtualization': {
    intro: 'Build a server and storage environment around your workloads, recovery objectives and growth plans. We document the compute, storage, network and backup requirements before proposing a configuration.',
    bullets: ['Workload and capacity assessment', 'Server, storage and virtualisation design', 'Backup and recovery integration', 'Migration planning, testing and documentation'], icon: 'server', image: images.network, category: 'Infrastructure & connectivity',
  },
  'portable-hidden-camera-detector': {
    intro: 'Choose a portable inspection tool around the environments you need to review and the limits of the technology. We help define the requirement, demonstrate the operating approach and document practical use.',
    bullets: ['Inspection requirement and use-case review', 'Suitable device and feature selection', 'Operating guidance and limitations explained', 'Handover and support arrangements'], icon: 'camera', image: images.cctv, category: 'Security & surveillance',
  },
  'enterprise-networking-solutions': {
    intro: 'Design the network as a business system, not a collection of switches. We review users, applications, security boundaries and site links to create a manageable foundation for everyday operations.',
    bullets: ['LAN, WAN and network segmentation planning', 'Switching, routing and wireless coordination', 'Secure remote access and device connectivity', 'Configuration records, testing and support'], icon: 'network', image: images.network, category: 'Infrastructure & connectivity',
  },
  'it-relocation-services': {
    intro: 'Move your workplace technology with an inventory, a dependency map and a tested restart plan. We coordinate the technology scope around your fit-out, connectivity dates and business priorities.',
    bullets: ['Asset inventory and dependency mapping', 'Shutdown, transport and reinstallation planning', 'Connectivity and server-room readiness', 'Restart testing and user handover'], icon: 'building', image: images.network, category: 'IT operations & protection',
  },
  'it-office-setup-solutions': {
    intro: 'Get a new office ready for people to work from day one. We coordinate cabling, network, Wi-Fi, endpoints, telephony, meeting rooms and security as one documented technology package.',
    bullets: ['Office technology requirements and layout review', 'Cabling, network and workspace coordination', 'Meeting-room and access-system integration', 'Commissioning, user guidance and support'], icon: 'building', image: images.rooms, category: 'IT operations & protection',
  },
  'secure-data-backup-guide': {
    intro: 'Backup is only useful when the right data can be recovered. We review your critical systems, recovery priorities and existing protection, then define a backup and recovery scope that can be tested.',
    bullets: ['Critical data and recovery objective review', 'Backup storage, schedule and access planning', 'Recovery runbooks and responsibility mapping', 'Restore testing and periodic health checks'], icon: 'server', image: images.network, category: 'IT operations & protection',
  },
  'endpoint-security-solutions': {
    intro: 'Protect the laptops, desktops and devices your teams depend on with a manageable endpoint security setup. We review the estate, administration needs and reporting before recommending controls.',
    bullets: ['Endpoint inventory and policy requirements', 'Security agent deployment and configuration', 'Alert handling and administrator access', 'Health reporting and review procedures'], icon: 'shield', image: images.network, category: 'IT operations & protection',
  },
  'email-security-solutions': {
    intro: 'Reduce email risk with controls that fit your mail environment and user workflows. We scope authentication, filtering and administration requirements alongside user guidance and incident escalation.',
    bullets: ['Mail environment and domain review', 'Filtering and authentication requirements', 'Administrative roles and alert workflows', 'User guidance and operational handover'], icon: 'mail', image: images.network, category: 'IT operations & protection',
  },
  'physical-port-security': {
    intro: 'Know what can connect to your network. We review accessible network ports, connected devices and admission requirements so unused sockets and unmanaged connections do not become an overlooked gap.',
    bullets: ['Accessible port and device inventory', 'Switch-port and network access policies', 'Authorised device and exception handling', 'Labelling, documentation and change review'], icon: 'network', image: images.network, category: 'IT operations & protection',
  },
  'it-amc-services-dubai': {
    intro: 'Keep installed systems under review after the project team leaves. We agree an asset list, preventive checks, reporting and escalation arrangements around the equipment and support coverage you need.',
    bullets: ['Asset register and condition review', 'Agreed preventive maintenance schedule', 'Remote and on-site support scope confirmed', 'Service records and lifecycle recommendations'], icon: 'wrench', image: images.access, category: 'IT operations & protection',
  },
  'data-center-modernization-guide': {
    intro: 'Modernise the server room in phases that respect live operations. We assess power, cooling, racks, cabling, compute, storage and recovery dependencies before defining the change sequence.',
    bullets: ['Current-state infrastructure and capacity audit', 'Power, cooling, rack and cabling review', 'Compute, storage and network upgrade planning', 'Phased migration, testing and as-built records'], icon: 'server', image: images.network, category: 'Infrastructure & connectivity',
  },
  'avigilon-access-control-dubai': {
    intro: 'Plan Avigilon access control around your doors, users and operational procedures, with video integration considered where it adds value. The final hardware and licensing scope follows a site and compatibility review.',
    bullets: ['Door and credential requirements assessment', 'Controller, reader and licensing planning', 'Avigilon video integration requirements reviewed', 'Access rules, testing and administrator training'], icon: 'fingerprint', image: images.security, category: 'Security & surveillance',
  },
  'avigilon-vms-software': {
    intro: 'Make recorded video searchable and manageable. We scope Avigilon video management around camera compatibility, retention, operator workstations, user permissions and the way your team investigates incidents.',
    bullets: ['Camera and server compatibility review', 'Recording, retention and storage planning', 'Operator workstations and user permissions', 'Video export workflow and training'], icon: 'monitor', image: images.cctv, category: 'Security & surveillance',
  },
  'avigilon-security-cameras': {
    intro: 'Select Avigilon cameras for the views your site actually needs. We review lighting, coverage, lens selection, network capacity and recording requirements rather than specifying from a generic camera count.',
    bullets: ['Site survey and camera coverage plan', 'Camera, lens and mounting selection', 'Network, recording and VMS integration', 'Image review, commissioning and handover'], icon: 'camera', image: images.cctv, category: 'Security & surveillance',
  },
  'wisemeet-meeting-room-management-solution': {
    intro: 'Make room availability visible and booking straightforward. Wisemeet room-scheduling requirements are reviewed alongside your calendar environment, room equipment and the experience you want for employees and visitors.',
    bullets: ['Room inventory and booking workflow review', 'Calendar and connectivity requirements', 'Scheduling display placement and configuration', 'User guidance and day-two support'], icon: 'monitor', image: images.rooms, category: 'Workforce & business',
  },
  'evoko-meeting-room-reservation-and-scheduling-system': {
    intro: 'Give every meeting room a clear booking experience. We plan Evoko scheduling panels around room availability, display location, network connectivity and your calendar environment.',
    bullets: ['Room and display requirements review', 'Calendar integration and network readiness', 'Panel installation and room configuration', 'User training and support planning'], icon: 'monitor', image: images.rooms, category: 'Workforce & business',
  },
};

export type Article = { slug: string; title: string; description: string; category: string; icon: IconName; image: string; sections: { title: string; text: string; bullets?: string[] }[] };
export const articles: Article[] = [
  {
    slug: 'cctv-site-survey-checklist', title: 'What to check before approving a CCTV proposal', category: 'Security planning', icon: 'camera', image: images.cctv,
    description: 'A practical checklist for coverage, image quality, recording, access and support — before a camera quantity becomes a quotation.',
    sections: [
      { title: 'Start with the view, not the camera', text: 'Walk the site and identify what each camera needs to show: an overview, a face at an entrance, a vehicle at a gate or activity in a work area. These are different tasks. A single camera cannot always do all of them well.', bullets: ['Mark entrances, exits, loading areas and restricted zones.', 'Review daylight, glare and night-time lighting.', 'Check obstructions including signs, doors and future fit-out work.'] },
      { title: 'Make recording and retrieval part of the scope', text: 'Agree how long video needs to be retained, who may view it and how an incident is exported. Storage should be calculated from the selected cameras, recording settings and retention requirement, with a documented allowance for the agreed design.', bullets: ['Identify the authorised operators and administrators.', 'Document recording schedules and export procedures.', 'Include recorder health and storage checks in the support plan.'] },
      { title: 'Approve a testable handover', text: 'Ask for a camera schedule, coverage drawing and test record. Review actual daytime and night-time images at the agreed viewpoints. The handover should also cover passwords, licences, warranty arrangements and who to call when a camera stops recording.' },
    ],
  },
  {
    slug: 'office-technology-fit-out', title: 'Plan the technology before the office fit-out closes', category: 'Workplace planning', icon: 'building', image: images.rooms,
    description: 'Coordinate cabling, Wi-Fi, meeting rooms, access control and internet while changes are still easy to make.',
    sections: [
      { title: 'Build one technology layout', text: 'Architectural, electrical, furniture and technology drawings need to agree. Desk positions affect floor boxes; meeting displays affect power and cable routes; access doors affect hardware and escape requirements. Coordinate these decisions before walls and ceilings close.' },
      { title: 'Confirm the connections outside your office', text: 'Internet service availability and delivery dates can determine the move schedule. Confirm the building entry point, landlord requirements, lead times and any temporary connectivity needs. Do not assume that a serviced office includes the network or security scope you expect.', bullets: ['Nominate one owner for the technology dependency list.', 'Confirm comms-room space, power, cooling and access.', 'Book carrier installation and test dates before the move.'] },
      { title: 'Test the workplace as a whole', text: 'Before occupation, test a representative user journey: arrive, connect a laptop, join a meeting, print if required and move between controlled areas. Record defects against a room or device schedule and assign an owner for each item.' },
    ],
  },
  {
    slug: 'access-control-door-schedule', title: 'The door schedule behind a better access-control system', category: 'Access control', icon: 'fingerprint', image: images.security,
    description: 'Why every controlled door needs an operational rule, suitable hardware and an agreed emergency response.',
    sections: [
      { title: 'Record the purpose of each door', text: 'List every door, gate or barrier in the proposed scope. Record who needs access, at what times, whether entry and exit are logged, and what happens when the door is held open. Separate public routes, employee routes and restricted areas.' },
      { title: 'Coordinate hardware and life safety', text: 'The door leaf, frame, lock, closer, power supply and emergency arrangements must work together. Engage the relevant building and life-safety specialists to confirm the required behaviour. Security convenience must not override safe evacuation.', bullets: ['Confirm door condition and existing hardware.', 'Agree emergency release and power-failure behaviour with responsible specialists.', 'Document fire-system interfaces and approval responsibilities.'] },
      { title: 'Make administration part of the design', text: 'A new credential should be easy to issue and a lost credential easy to remove. Define roles, approval ownership and the joiner/mover/leaver process. Test the reports your team will actually use, not just whether the door unlocks.' },
    ],
  },
  {
    slug: 'wifi-coverage-survey', title: 'Wi-Fi coverage is not the same as Wi-Fi capacity', category: 'Networking', icon: 'wifi', image: images.network,
    description: 'How to frame a wireless brief around users, devices, applications and the spaces where work happens.',
    sections: [
      { title: 'Describe the demand', text: 'A floor plan and an internet speed are not enough to design business Wi-Fi. Identify the number of people, device types, meeting spaces and critical applications. A busy training room has different needs from a storage aisle.' },
      { title: 'Survey the real environment', text: 'Walls, racking, glass, interference and changing layouts affect wireless performance. Use the appropriate predictive or on-site survey method for the project, then validate the installed result in the areas that matter.', bullets: ['Separate staff, guest and operational-device requirements.', 'Check cabling and switch capacity for each access point.', 'Agree the validation method before installation.'] },
      { title: 'Plan for change', text: 'Document access-point locations, switch ports, network names and ownership. Review performance when occupancy or layout changes. Ongoing tuning is often more valuable than adding access points without a survey.' },
    ],
  },
  {
    slug: 'it-maintenance-handover', title: 'What a useful IT maintenance handover should include', category: 'IT operations', icon: 'wrench', image: images.access,
    description: 'Turn a completed installation into a supportable system with records, responsibilities and a realistic maintenance scope.',
    sections: [
      { title: 'Start with an asset register', text: 'Support begins with knowing what is installed. The register should identify equipment, location, serial number, licence information and the agreed warranty or support arrangements. Keep credentials in an approved secure process, not in an unprotected drawing or spreadsheet.' },
      { title: 'Agree the support boundary', text: 'Write down what is covered, how a fault is reported, which systems are monitored and when an engineer attends. Response and resolution are different things. Any service levels should be explicitly agreed rather than assumed.', bullets: ['Name the client and service-desk contacts.', 'List exclusions and third-party dependencies.', 'Define preventive checks and the reporting format.'] },
      { title: 'Keep the records alive', text: 'As-built drawings are a snapshot. Update them when equipment, firmware, configurations or room layouts change. Review recurring faults and end-of-support equipment so maintenance becomes a lifecycle process rather than a sequence of emergencies.' },
    ],
  },
  {
    slug: 'meeting-room-readiness', title: 'A meeting room is ready when the first meeting works', category: 'Meeting rooms', icon: 'monitor', image: images.rooms,
    description: 'Bring booking, display, audio, video and user guidance together in one practical room-readiness check.',
    sections: [
      { title: 'Design for the people in the room', text: 'Room size, table layout, display position, microphones and camera view should match how the space is used. Check that every participant can see shared content and be heard without leaning across the table.' },
      { title: 'Check the whole booking journey', text: 'Test finding a room, reserving it, seeing its status at the door and starting the meeting. Confirm calendar integration, time zones, permissions and what happens when a booking ends or a room is released.', bullets: ['Test the agreed meeting platforms and a guest laptop connection.', 'Label inputs and provide a short start guide.', 'Confirm network, power and cable strain relief.'] },
      { title: 'Give the room an owner', text: 'Nominate someone to check the room regularly and report problems. Record the equipment, configuration and support route. User training should cover the everyday start sequence as well as who to call when a call has no sound.' },
    ],
  },
];

export const pages: Page[] = [];
const add = (page: Page) => pages.push(page);
add({ path: 'index.html', title: 'Security, networking & IT solutions in Dubai', description: 'One accountable Dubai team for CCTV, access control, networking, IT infrastructure and meeting-room systems. From site survey to handover and support.', kind: 'home' });
add({ path: 'about-us/index.html', title: 'About Hutaib InfoTech Solutions', description: 'Meet the accountable team behind Security Solutions Dubai: survey-led planning, coordinated installation and support after handover.', kind: 'about', eyebrow: 'About us', heading: 'One team. Every system. Accountable from day one.', intro: 'Hutaib InfoTech Solutions brings security, networking and IT infrastructure together for organisations in Dubai, across the UAE and in the wider region.', image: images.people });
const aboutChildren = primaryMenu.find(x => x.label === 'About Us')!.children!;
const aboutContent: Record<string, [string,string]> = {
  'awards-accolades': ['Recognition grounded in delivery', 'Our ISO 9001:2015 certification is the credential featured in the new design. We keep the focus on documented delivery, client feedback and systems that can be supported after handover.'],
  'brand-logo-philosophy': ['A clear identity for connected systems', 'Security Solutions Dubai is a Hutaib InfoTech Solutions brand. The new visual direction brings a confident navy foundation, blue technology accents and an orange signal colour into one consistent experience.'],
  'hutaib-awarded-iso-90012015-certification': ['Quality that carries through the project', 'The new website presents Hutaib as ISO 9001:2015 certified. Quality-managed delivery means a clear scope, controlled project records, testing and a documented handover — not just a badge in the footer.'],
  'qhse-policy': ['Quality, health, safety & environment', 'A responsible project considers the people who install, use and maintain the system. This proposed policy framework covers quality, safe working practices, environmental responsibility and continuous improvement.'],
};
for (const item of aboutChildren) {
  const path = fromUrl(item.href);
  if (path === 'services/verticals/index.html') {
    add({ path, title: 'Industries & verticals', description: 'Security, networking and IT systems planned around offices, healthcare, banking, retail, warehouses, education and public-sector environments.', kind: 'about', eyebrow: 'Industries we serve', heading: 'Built around how your site actually operates.', intro: 'Different environments bring different risks, access rules and reporting needs. We scope the system around your operations, not a template.', image: images.skyline });
  } else {
    const [heading,intro] = aboutContent[new URL(item.href).pathname.split('/').filter(Boolean).pop()!];
    add({ path, title: item.label, description: intro, kind: 'about', eyebrow: 'About Hutaib', heading, intro, image: images.people });
  }
}
add({ path: 'how-it-works/index.html', title: 'How it works — from site survey to support', description: 'Six clear delivery stages: discuss your needs, survey, design, install, test and support. Know the output and next step at every stage.', kind: 'process', eyebrow: 'How it works', heading: 'A clear process. No guesswork at handover.', intro: 'Every stage has a purpose, an output and a conversation with your team. Start with the site and the outcome you need — then build a scope you can approve.', image: images.security });
add({ path: 'services/index.html', title: 'Security, networking & IT services', description: 'Explore eight connected capability lines and the complete 29-group Hutaib service directory, with local pages for every service.', kind: 'services', eyebrow: 'Our services', heading: 'The right systems. Working as one.', intro: 'From a camera on the wall to the network behind it, explore the services that keep your building secure, connected and ready for work.', image: images.network });

const meetingPath = 'services/meeting-room-management-solutions/index.html';
const addService = (item: MenuLink, path: string) => {
  if (path === 'services/verticals/index.html') return;
  const core = services.find(s => s.id === coreByPath[path.replace('index.html','')]);
  let detail = details[path.replace(/\/index\.html$/, '').split('/').pop()!];
  if (core) detail = { intro: core.description, bullets: core.bullets, icon: core.icon, image: ({cctv:images.cctv,'access-control':images.security,'visitor-management':images.security,networking:images.network,wifi:images.network,'it-infrastructure':images.network,'meeting-rooms':images.rooms,connectivity:images.network} as Record<string,string>)[core.id], category: 'Connected capabilities' };
  if (path === meetingPath) detail = { intro: 'Make every room easy to find, book and use. We coordinate room-scheduling panels, calendar integration and meeting-room technology, with Evoko and Wisemeet options reviewed against your environment.', bullets: ['Room booking and occupancy displays', 'Calendar and network integration', 'Meeting-room display and video coordination', 'User guidance and day-two support'], icon: 'monitor', image: images.rooms, category: 'Workforce & business' };
  if (!detail) throw new Error(`Missing service scope: ${path}`);
  add({ path, title: item.label, description: core?.short || detail.intro, kind: 'service', eyebrow: detail.category, heading: item.label, intro: detail.intro, image: detail.image, detail, service: core, group: item });
};
for (const item of serviceMenu) {
  const path = item.href === '#' ? meetingPath : fromUrl(item.href);
  addService(item, path);
  for (const child of item.children || []) addService(child, fromUrl(child.href));
}
add({ path: 'uae/index.html', title: 'Security & IT solutions across the UAE', description: 'Dubai head office and Sharjah office, with project delivery across the Emirates. Arrange a site survey with Hutaib InfoTech Solutions.', kind: 'location', eyebrow: 'Locations · United Arab Emirates', heading: 'Dubai roots. UAE-wide delivery.', intro: 'Our team is based in Dubai and delivers projects across the UAE, including Sharjah, Abu Dhabi, Ajman, Ras Al Khaimah and Fujairah.', image: images.skyline });
add({ path: 'saudi-arabia/index.html', title: 'Regional project support in Saudi Arabia', description: 'Discuss your Saudi Arabia security, networking or IT project with the Hutaib Dubai team. Site requirements and delivery arrangements scoped per project.', kind: 'location', eyebrow: 'Locations · Saudi Arabia', heading: 'Connected expertise, beyond borders.', intro: 'We support security and IT projects in Saudi Arabia. Share your location, programme and system requirements so we can confirm the right survey and delivery arrangements.', image: images.network });
add({ path: 'oman/index.html', title: 'Regional project support in Oman', description: 'Plan your Oman security, networking or IT project with Hutaib. Regional delivery and support arrangements confirmed around your site.', kind: 'location', eyebrow: 'Locations · Oman', heading: 'One accountable team for your regional plans.', intro: 'We support projects in Oman from our Dubai base. We scope survey access, installation, handover and ongoing support around the location and requirements of your site.', image: images.skyline });
add({ path: 'careers/index.html', title: 'Careers at Hutaib InfoTech Solutions', description: 'Explore the disciplines behind our security, networking and IT delivery team. Contact Hutaib about career opportunities.', kind: 'careers', eyebrow: 'Careers', heading: 'Build systems people depend on.', intro: 'Good projects need curious people, careful planning and a team that takes ownership. If you work in security, networking or IT infrastructure, we would like to hear from you.', image: images.people });
add({ path: 'contact-us/index.html', title: 'Contact us & request a site survey', description: 'Talk to Hutaib InfoTech Solutions in Dubai. Call, WhatsApp or prepare an email enquiry for a site survey, project quote or maintenance support.', kind: 'contact', eyebrow: 'Contact us', heading: 'Start with a conversation about your site.', intro: 'A new office, an upgrade or a recurring issue — tell us what is changing. We will help you frame the next step.', image: images.skyline });
add({ path: 'blog/index.html', title: 'Insights & project planning guides', description: 'Practical planning notes for CCTV, access control, office fit-outs, wireless networks, meeting rooms and IT maintenance.', kind: 'blog', eyebrow: 'Insights', heading: 'Better questions. Better project decisions.', intro: 'Practical guides for the people responsible for secure, connected workplaces. Use them to frame your brief, review a proposal or prepare for handover.', image: images.network });
add({ path: 'resources/index.html', title: 'Project planning resources & checklists', description: 'Use the Hutaib project planning guides and downloadable checklists to prepare a clearer security and IT brief.', kind: 'resources', eyebrow: 'Resources', heading: 'A clearer brief starts here.', intro: 'Straightforward checklists and planning notes, organised around the decisions you need to make before work begins.', image: images.network });
for (const article of articles) add({ path: `blog/${article.slug}/index.html`, title: article.title, description: article.description, kind: 'article', article, image: article.image });
add({ path: 'privacy-policy/index.html', title: 'Privacy notice for this HTML preview', description: 'How this static design preview handles enquiries, local files and third-party contact links.', kind: 'legal', eyebrow: 'Privacy', heading: 'Your privacy in this preview.', intro: 'This notice describes the static approval package only. It is not a replacement for the approved production website privacy policy.' });
add({ path: 'terms/index.html', title: 'Preview terms of use', description: 'Terms for reviewing the Security Solutions Dubai static design preview.', kind: 'legal', eyebrow: 'Terms', heading: 'A design preview, not a service agreement.', intro: 'This package is provided to review the proposed website design, navigation and content before the production WordPress build.' });
add({ path: 'sitemap.html', title: 'Website sitemap', description: 'Browse every page in the Security Solutions Dubai HTML design preview.', kind: 'sitemap', eyebrow: 'Explore the website', heading: 'Every page, in one place.', intro: 'Company information, services, locations and planning resources — all available inside this preview.' });
add({ path: '404.html', title: 'Page not found', description: 'Return to the Security Solutions Dubai website preview.', kind: 'notfound', eyebrow: '404 · Page not found', heading: 'That page is not on the plan.', intro: 'The link may be out of date. Head back to the homepage or explore the service directory.' });

export const routeMap = new Map<string,string>();
for (const item of primaryMenu) {
  if (item.label === 'Home') routeMap.set(`${ORIGIN}/`, 'index.html');
  else if (item.label === 'Locations') routeMap.set('#locations', 'uae/index.html');
  else routeMap.set(item.href, fromUrl(item.href));
  for (const child of item.children || []) {
    if (child.href !== '#') routeMap.set(child.href, fromUrl(child.href));
    for (const nested of child.children || []) routeMap.set(nested.href, fromUrl(nested.href));
  }
}
routeMap.set(`${ORIGIN}/services/`, 'services/index.html');
routeMap.set('#meeting', meetingPath);
routeMap.set('https://www.securitysolutionsdubai.com/privacy-policy/', 'privacy-policy/index.html');
routeMap.set('https://www.securitysolutionsdubai.com/terms/', 'terms/index.html');
routeMap.set('https://www.securitysolutionsdubai.com/sitemap.xml', 'sitemap.html');
