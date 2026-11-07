// Silo 06 — 60 freehold community valuation & yield hubs (/areas/[emirate]/[slug]).
// INDICATIVE figures (price per sq.ft., gross yield, typical unit price) for page modelling.
// Replace with the desk's monthly DLD/ADREC transaction pull before publishing.

export type Emirate = 'dubai' | 'abu-dhabi' | 'northern';
export type Community = {
  slug: string;
  emirate: Emirate;
  name: string;
  ar?: string;
  stock: 'Apartments' | 'Villas & townhouses' | 'Mixed';
  psf: number; // AED / sq.ft.
  yieldPct: number; // gross
  typical: number; // AED M typical unit
  rent: number; // AED / year for typical unit
  devs: string;
};

const d = (slug: string, name: string, stock: Community['stock'], psf: number, yieldPct: number, typical: number, devs: string, ar?: string, emirate: Emirate = 'dubai'): Community =>
  ({ slug, emirate, name, ar, stock, psf, yieldPct, typical, rent: Math.round((typical * 1e6 * yieldPct) / 100 / 1000) * 1000, devs });

export const EMIRATES: Record<Emirate, { name: string; ar: string; regulator: string }> = {
  dubai: { name: 'Dubai', ar: 'دبي', regulator: 'Dubai Land Department (DLD)' },
  'abu-dhabi': { name: 'Abu Dhabi', ar: 'أبوظبي', regulator: 'Abu Dhabi Real Estate Centre (ADREC)' },
  northern: { name: 'RAK & Sharjah', ar: 'رأس الخيمة والشارقة', regulator: 'RAK Land Department / Sharjah Real Estate Registration Department' },
};

export const COMMUNITIES: Community[] = [
  d('dubai-marina', 'Dubai Marina', 'Apartments', 1950, 6.4, 2.1, 'Emaar, Select Group, LIV', 'دبي مارينا'),
  d('downtown-dubai', 'Downtown Dubai', 'Apartments', 2650, 5.6, 2.8, 'Emaar', 'وسط مدينة دبي'),
  d('business-bay', 'Business Bay', 'Apartments', 2050, 6.6, 1.7, 'DAMAC, Binghatti, Select Group, Ellington', 'الخليج التجاري'),
  d('palm-jumeirah', 'Palm Jumeirah', 'Mixed', 3600, 5.2, 6.5, 'Nakheel, Omniyat, Ellington, Emaar', 'نخلة جميرا'),
  d('dubai-hills-estate', 'Dubai Hills Estate', 'Mixed', 2150, 5.6, 3.2, 'Emaar', 'دبي هيلز استيت'),
  d('jumeirah-village-circle-jvc', 'Jumeirah Village Circle (JVC)', 'Apartments', 1250, 7.6, 0.95, 'Binghatti, Ellington, Lum1nar', 'قرية جميرا الدائرية'),
  d('dubai-creek-harbour', 'Dubai Creek Harbour', 'Apartments', 2000, 6.0, 2.0, 'Emaar', 'خور دبي'),
  d('emaar-beachfront', 'Emaar Beachfront', 'Apartments', 2900, 5.8, 3.0, 'Emaar'),
  d('jumeirah-lake-towers-jlt', 'Jumeirah Lake Towers (JLT)', 'Apartments', 1500, 7.2, 1.3, 'Sobha, Ellington, DMCC'),
  d('arabian-ranches-1-2-3', 'Arabian Ranches 1, 2 & 3', 'Villas & townhouses', 1650, 5.4, 4.2, 'Emaar', 'المرابع العربية'),
  d('tilal-al-ghaf', 'Tilal Al Ghaf', 'Villas & townhouses', 1900, 5.0, 5.5, 'Majid Al Futtaim', 'تلال الغاف'),
  d('sobha-hartland-mbr-city', 'Sobha Hartland (MBR City)', 'Mixed', 2000, 6.0, 2.2, 'Sobha'),
  d('palm-jebel-ali', 'Palm Jebel Ali', 'Villas & townhouses', 2600, 5.0, 12.0, 'Nakheel', 'نخلة جبل علي'),
  d('dubai-islands', 'Dubai Islands', 'Mixed', 2100, 5.8, 2.6, 'Nakheel'),
  d('al-furjan', 'Al Furjan', 'Mixed', 1350, 6.8, 2.4, 'Nakheel, Azizi', 'الفرجان'),
  d('jumeirah-village-triangle-jvt', 'Jumeirah Village Triangle (JVT)', 'Mixed', 1300, 7.0, 2.6, 'Various'),
  d('the-springs-and-meadows', 'The Springs & The Meadows', 'Villas & townhouses', 1800, 5.2, 4.5, 'Emaar', 'الينابيع والمروج'),
  d('the-lakes-and-emirates-hills', 'The Lakes & Emirates Hills', 'Villas & townhouses', 3200, 4.2, 18.0, 'Emaar', 'تلال الإمارات'),
  d('jumeirah-islands-and-park', 'Jumeirah Islands & Jumeirah Park', 'Villas & townhouses', 2100, 4.8, 8.5, 'Nakheel', 'جزر جميرا'),
  d('damac-hills-1-and-2', 'DAMAC Hills 1 & 2', 'Villas & townhouses', 1150, 6.6, 2.1, 'DAMAC', 'داماك هيلز'),
  d('damac-lagoons', 'DAMAC Lagoons', 'Villas & townhouses', 1400, 6.0, 2.8, 'DAMAC'),
  d('the-valley-by-emaar', 'The Valley by Emaar', 'Villas & townhouses', 1300, 6.2, 2.3, 'Emaar', 'ذا فالي'),
  d('the-oasis-by-emaar', 'The Oasis by Emaar', 'Villas & townhouses', 2300, 4.8, 9.5, 'Emaar', 'ذا أويسس'),
  d('dubai-south-and-expo-city', 'Dubai South & Expo City', 'Mixed', 1150, 7.0, 1.4, 'Dubai South, Emaar'),
  d('emaar-south', 'Emaar South', 'Mixed', 1150, 6.6, 1.6, 'Emaar'),
  d('city-walk-and-jumeirah', 'City Walk & Jumeirah', 'Mixed', 2600, 5.4, 3.1, 'Meraas'),
  d('madinat-jumeirah-living', 'Madinat Jumeirah Living', 'Apartments', 2700, 5.4, 2.6, 'Meraas'),
  d('bluewaters-island', 'Bluewaters Island', 'Apartments', 3200, 5.6, 3.6, 'Meraas'),
  d('dubai-harbour', 'Dubai Harbour', 'Apartments', 2900, 5.8, 3.2, 'Emaar, Sobha, DAMAC'),
  d('rashid-yachts-and-marina', 'Rashid Yachts & Marina', 'Apartments', 2200, 6.0, 1.9, 'Emaar'),
  d('dubai-maritime-city', 'Dubai Maritime City', 'Apartments', 1800, 6.6, 1.6, 'Select Group, Danube, Deyaar'),
  d('al-barari', 'Al Barari', 'Villas & townhouses', 2300, 4.4, 9.0, 'Al Barari Developers', 'البراري'),
  d('al-jaddaf-waterfront', 'Al Jaddaf Waterfront', 'Apartments', 1700, 6.8, 1.4, 'Binghatti, Azizi'),
  d('dubai-festival-city', 'Dubai Festival City', 'Mixed', 1650, 6.0, 2.4, 'Al-Futtaim'),
  d('meydan-nad-al-sheba', 'Meydan & Nad Al Sheba', 'Villas & townhouses', 1800, 5.4, 5.0, 'Meraas, Sobha', 'ميدان وند الشبا'),
  d('town-square-dubai', 'Town Square Dubai', 'Mixed', 1150, 7.0, 1.6, 'Nshama / Emaar'),
  d('mira-and-mira-oasis-reem', 'Mira, Mira Oasis & Reem', 'Villas & townhouses', 1350, 5.8, 2.7, 'Emaar'),
  d('mudon-and-serena', 'Mudon & Serena', 'Villas & townhouses', 1300, 5.8, 2.8, 'Dubai Properties', 'مدن وسيرينا'),
  d('villanova-and-the-villa', 'Villanova & The Villa', 'Villas & townhouses', 1250, 5.8, 3.0, 'Dubai Properties', 'فيلانوفا'),
  d('arjan-and-dubai-science-park', 'Arjan & Dubai Science Park', 'Apartments', 1250, 7.4, 0.95, 'Binghatti, Danube'),
  d('motor-city-and-studio-city', 'Motor City & Studio City', 'Mixed', 1200, 6.8, 1.5, 'Union Properties, Sobha'),
  d('dubai-sports-city', 'Dubai Sports City', 'Apartments', 1000, 7.6, 0.85, 'Various'),
  d('dubai-silicon-oasis-dso', 'Dubai Silicon Oasis (DSO)', 'Apartments', 1000, 7.8, 0.85, 'Deyaar, DSOA'),
  d('the-greens-and-views', 'The Greens & The Views', 'Apartments', 1600, 6.6, 1.5, 'Emaar'),
  d('difc-and-sheikh-zayed-road', 'DIFC & Sheikh Zayed Road', 'Apartments', 2500, 6.0, 2.4, 'Various'),
  d('yas-island', 'Yas Island', 'Mixed', 1450, 6.6, 2.0, 'Aldar', 'جزيرة ياس', 'abu-dhabi'),
  d('saadiyat-island', 'Saadiyat Island', 'Mixed', 2300, 5.2, 4.8, 'Aldar', 'جزيرة السعديات', 'abu-dhabi'),
  d('al-reem-island', 'Al Reem Island', 'Apartments', 1300, 7.0, 1.3, 'Aldar, various', 'جزيرة الريم', 'abu-dhabi'),
  d('al-raha-beach', 'Al Raha Beach', 'Mixed', 1450, 6.4, 2.1, 'Aldar', undefined, 'abu-dhabi'),
  d('al-maryah-island', 'Al Maryah Island', 'Apartments', 1700, 6.2, 1.9, 'Mubadala, Aldar', undefined, 'abu-dhabi'),
  d('hudayriyat-island', 'Hudayriyat Island', 'Villas & townhouses', 2000, 5.0, 6.0, 'Modon', undefined, 'abu-dhabi'),
  d('masdar-city', 'Masdar City', 'Apartments', 1250, 7.0, 1.1, 'Masdar', undefined, 'abu-dhabi'),
  d('al-ghadeer-and-al-reef', 'Al Ghadeer & Al Reef', 'Mixed', 850, 7.6, 1.0, 'Aldar, Manazel', undefined, 'abu-dhabi'),
  d('al-shamkha-fay-alreeman', 'Al Shamkha & Fay Alreeman', 'Villas & townhouses', 1000, 6.4, 2.8, 'Aldar', undefined, 'abu-dhabi'),
  d('al-jurf-ghantoot', 'Al Jurf & Ghantoot', 'Villas & townhouses', 1700, 5.0, 7.5, 'Imkan', undefined, 'abu-dhabi'),
  d('al-marjan-island-rak', 'Al Marjan Island', 'Mixed', 1700, 7.0, 2.0, 'Marjan, Nikki Beach, Ellington', 'جزيرة المرجان', 'northern'),
  d('mina-al-arab-rak', 'Mina Al Arab', 'Mixed', 1150, 6.8, 1.6, 'RAK Properties', undefined, 'northern'),
  d('al-hamra-village-rak', 'Al Hamra Village', 'Mixed', 1000, 6.6, 1.5, 'Al Hamra', undefined, 'northern'),
  d('aljada-sharjah', 'Aljada', 'Mixed', 1050, 7.2, 1.1, 'Arada', 'الجادة', 'northern'),
  d('masaar-sharjah', 'Masaar', 'Villas & townhouses', 900, 6.6, 2.0, 'Arada', undefined, 'northern'),
];

export const communityBy = (emirate: string, slug: string) => COMMUNITIES.find((c) => c.emirate === emirate && c.slug === slug);

/** Arabic mirror: top 16 villa communities & handover hubs (pages 345–360). */
export const AR_COMMUNITIES = [
  'dubai-hills-estate', 'meydan-nad-al-sheba', 'tilal-al-ghaf', 'palm-jebel-ali', 'the-oasis-by-emaar', 'yas-island', 'saadiyat-island',
  'arabian-ranches-1-2-3', 'the-valley-by-emaar', 'damac-hills-1-and-2', 'the-lakes-and-emirates-hills', 'jumeirah-islands-and-park',
  'al-furjan', 'the-springs-and-meadows', 'mudon-and-serena', 'villanova-and-the-villa',
];
