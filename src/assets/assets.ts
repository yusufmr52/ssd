import {
  isoBadgeDataUri as isoBadge,
  logoAlternateDataUri as logoLight,
  logoPrimaryDataUri as logoDark,
  manropeFontDataUri as manropeFont,
} from "./embedded";
import * as embedded from "./embedded";

/**
 * All brand and project assets belong to Hutaib InfoTech Solutions and were
 * taken from the client's live website (www.securitysolutionsdubai.com).
 * They are embedded so the preview is fully self-contained.
 */
export const assets = {
  logo: logoDark,
  logoLight,
  isoBadge,
  font: manropeFont,

  hero: embedded.photoHeroDataUri,
  network: embedded.photoNetworkDataUri,
  meeting: embedded.photoMeetingDataUri,
  it: embedded.photoAttendanceDataUri,
  access: embedded.photoAccessDataUri,
  cctv: embedded.photoCctvDataUri,
  skyline: embedded.photoSkylineDataUri,

  attendance: embedded.photoAttendanceDataUri,
  doorAccess: embedded.photoHeroDataUri,
  wireless: embedded.photoNetworkDataUri,
  school: embedded.photoSchoolDataUri,
  starlink: embedded.photoNetworkDataUri,
  pbx: embedded.photoMeetingDataUri,
  meetingPanel: embedded.photoMeetingDataUri,
};

export type ClientLogo = { name: string; src: string };

export const clientLogos: ClientLogo[] = [
  { name: "Deloitte", src: embedded.clientLogoDeloitte },
  { name: "du", src: embedded.clientLogoDu },
  { name: "Mubadala", src: embedded.clientLogoMubadala },
  { name: "Al Naboodah", src: embedded.clientLogoAlnaboodah },
  { name: "Arabtec", src: embedded.clientLogoArabtec },
  { name: "Heinz", src: embedded.clientLogoHeinz },
  { name: "Weatherford", src: embedded.clientLogoWeatherford },
  { name: "Averda", src: embedded.clientLogoAverda },
  { name: "Rostamani", src: embedded.clientLogoRostamani },
  { name: "Al Ain Hospital", src: embedded.clientLogoAlainhospital },
];

export const imageByName: Record<string, string> = {
  "door-access-control.jpg": assets.doorAccess,
  "wireless-solutions.jpg": assets.network,
  "matrix-ipbx.jpg": assets.pbx,
  "time-attendance.jpg": assets.attendance,
  "Access-Control.png": assets.access,
  "cctv-access-control.jpg": assets.cctv,
  "School.jpg": assets.school,
  "slide5-1.jpg": assets.skyline,
  "hutaib-logo.png": assets.logo,
  "hutaib-logo-light.png": assets.logoLight,
  "ISO-9001-2008.png": assets.isoBadge,
};
