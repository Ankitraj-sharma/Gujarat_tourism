import { DestinationCity, UserProfile } from '../types';
import { CENTRAL_GUJARAT_CITIES } from './cities/centralGujarat';
import { SAURASHTRA_CITIES } from './cities/saurashtra';
import { NORTH_GUJARAT_CITIES } from './cities/northGujarat';
import { SOUTH_GUJARAT_CITIES } from './cities/southGujarat';
import { KUTCH_CITIES } from './cities/kutch';

export const CITIES_DATA: DestinationCity[] = [
  ...CENTRAL_GUJARAT_CITIES,
  ...SAURASHTRA_CITIES,
  ...NORTH_GUJARAT_CITIES,
  ...SOUTH_GUJARAT_CITIES,
  ...KUTCH_CITIES,
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_ankit_125891',
  name: 'Ankit Sharma',
  username: 'ankit_wanders',
  email: 'ankitrajsharma.125891@marwadiuniversity.ac.in',
  phone: '+91 98765 43210',
  avatarUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WewJGM3H7HNvDr6lzL5W7qfI1xsQXEVd15kwF6FVl5RJjgSLj-Zwco3kDarx0sbfe_wV2CnP0FuiL4GvzpDwVcNesZZ7Nuzoa9b06bCjL17zLmAabctA4uHjwz-_iluIJ_0RXK-qBLymlaz2khmwtcApYtxpuva6mGoSY-0wXurk2tEXFPd0i7pw4TqUsxVcSOZeHWhshuiKT-NVS1vgpz2HRb87Wp6mbvOdmd9t0OnBtaJlNOkrQzNKU',
  tagline: 'Heritage Enthusiast & Coastal Road Tripper',
  level: 'Vibrant Gujarat Silver Explorer (Level 4)',
  districtsExplored: 8,
  placesVisited: 24,
  bookmarkedCount: 14,
  travelReviewsCount: 6,
  badges: [
    {
      id: 'coastal-pioneer',
      name: 'Coastal Pioneer',
      description: '1,600 km coastal circuit completed across Saurashtra and Kutch',
      earned: true,
      icon: 'sailing',
      category: 'Coastal',
    },
    {
      id: 'char-dham',
      name: 'Char Dham',
      description: 'Dwarka sacred circuit pilgrimage and Mangla Aarti completed',
      earned: true,
      icon: 'wb_sunny',
      category: 'Pilgrimage',
    },
    {
      id: 'rann-nomad',
      name: 'Rann Nomad',
      description: 'Great Rann white salt desert full moon night expedition',
      earned: true,
      icon: 'landscape',
      category: 'Desert',
    },
    {
      id: 'lion-guardian',
      name: 'Lion Tracker',
      description: 'Spotted pride of wild Asiatic Lions in Gir National Park',
      earned: true,
      icon: 'pets',
      category: 'Wildlife',
    },
    {
      id: 'stepwell-scholar',
      name: 'Stepwell Scholar',
      description: 'Explored Rani ki Vav & Adalaj subterranean architecture',
      earned: true,
      icon: 'account_balance',
      category: 'Heritage',
    },
  ],
  bookings: [
    {
      id: 'bk_dwr_89241',
      title: 'Dwarkadhish Temple Sacred Darshan',
      type: 'VIP Darshan',
      time: 'Tomorrow, 07:00 AM',
      date: 'Tomorrow, 07:00 AM',
      location: 'Dwarka • Mangla Aarti Pass • Gate No. 3',
      passNumber: 'E-Pass #DWR-89241-VIP',
      travelers: 1,
      status: 'Confirmed',
      qrCodeValue: 'GJ-TOURISM-DWR-89241-VIP-ANKIT',
    },
    {
      id: 'bk_gir_7729',
      title: 'Gir National Park Lion Safari',
      type: 'Wildlife Safari',
      time: 'Oct 28 • 3:00 PM',
      date: 'Oct 28, 2026',
      location: 'Devalia Safari Zone • Gypsy Permit #GIR-7729',
      passNumber: 'Permit #GIR-7729',
      travelers: 2,
      status: 'Confirmed',
      qrCodeValue: 'GJ-GIR-SAFARI-7729-2TRAV',
    },
  ],
  preferences: {
    language: 'English / ગુજરાતી',
    interests: ['Spiritual', 'Heritage', 'Coastal drives'],
    offlineGuidesEnabled: true,
  },
};
