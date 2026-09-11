export type GujaratRegion = 'Saurashtra' | 'Kutch' | 'North Gujarat' | 'Central Gujarat' | 'South Gujarat';

export type AttractionCategory = 
  | 'Spiritual & Temples'
  | 'UNESCO & Heritage'
  | 'Wildlife & Sanctuaries'
  | 'Coastal & Beaches'
  | 'Modern Wonders'
  | 'Culture & Desert';

export interface Attraction {
  id: string;
  name: string;
  gujaratiName?: string;
  category: AttractionCategory;
  region: GujaratRegion;
  cityOrDistrict: string;
  shortDescription: string;
  detailedDescription: string;
  historicalSignificance: string;
  highlights: string[];
  entryFee: string;
  timings: string;
  bestTimeOfDay: string;
  recommendedDuration: string;
  dressCode?: string;
  insiderTips: string[];
  mustTryFoodNearby: string[];
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isUnescoSite?: boolean;
  latitude: number;
  longitude: number;
  tags: string[];
}

export interface AartiTiming {
  name: string;
  time: string;
  significance: string;
}

export interface Temple {
  id: string;
  name: string;
  deity: string;
  location: string;
  district: string;
  region: GujaratRegion;
  sacredStatus: string; // e.g. "1st of 12 Jyotirlingas", "Char Dham", "51 Shaktipeeth"
  darshanTimings: string;
  aartis: AartiTiming[];
  lightAndSoundShow?: string;
  dressCode: string;
  photographyRules: string;
  cloakroomLockerFacility: string;
  specialDarshanInfo: string;
  historicalLegend: string;
  importantFestivals: string[];
  nearestAirportOrStation: string;
  imageUrl: string;
}

export interface StayOption {
  id: string;
  name: string;
  type: 'Heritage Palace' | 'Desert Tent City' | 'Jungle Safari Lodge' | 'Temple Trust Bhavan' | 'Coastal Resort' | 'Boutique City Stay';
  location: string;
  region: GujaratRegion;
  priceRange: string; // e.g. "₹2,500 - ₹4,500 / night"
  pricePerNightEstimate: number;
  rating: number;
  reviews: number;
  amenities: string[];
  experienceHighlight: string;
  imageUrl: string;
  recommendedFor: string[];
}

export interface CoastalDrive {
  id: string;
  title: string;
  highwayName: string;
  routeStops: string[];
  totalDistanceKm: number;
  drivingTimeHours: number;
  scenicHighlights: string[];
  bestSunsetSpot: string;
  roadCondition: string;
  recommendedVehicle: string;
  beachSafetyNotes: string;
  seafoodAndSnacks: string[];
  coverImage: string;
}

export interface DayPlan {
  dayNumber: number;
  destination: string;
  morningPlan: string;
  afternoonPlan: string;
  eveningPlan: string;
  nightStayLocation: string;
  drivingDistanceKm: number;
  estimatedDrivingTime: string;
  recommendedMeal: string;
  proTravelTip: string;
  keyAttractions: string[];
}

export interface TrioRoute {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  durationDays: number;
  primaryHubs: [string, string, string];
  region: GujaratRegion;
  idealFor: string[];
  overview: string;
  distanceKm: number;
  estimatedCostPerPerson: number;
  itinerary: DayPlan[];
  heroImage: string;
}

export interface CulinarySpecialty {
  id: string;
  name: string;
  gujaratiName: string;
  category: 'Farsan (Snacks)' | 'Main Course / Thali' | 'Desserts & Sweets' | 'Street Food';
  originRegion: string;
  description: string;
  mustTrySpot: string;
  flavorProfile: string;
  isVegetarian: boolean;
  imageUrl: string;
}

export interface HandicraftArt {
  id: string;
  name: string;
  artisanVillage: string;
  district: string;
  artForm: string;
  historicalAge: string;
  giTagCertified: boolean;
  description: string;
  whereToBuyDirectly: string;
  imageUrl: string;
}

export type StartingHub = 
  | 'Ahmedabad'
  | 'Rajkot'
  | 'Vadodara'
  | 'Surat'
  | 'Bhuj (Kutch)'
  | 'Somnath / Porbandar';

export interface PlannerPreferences {
  startingHub: StartingHub;
  durationDays: number;
  travelPace: 'Relaxed' | 'Balanced' | 'Explorer';
  interests: string[];
  travelMonth: string;
  travelersCount: number;
  budgetTier: 'Budget (Dharamshala/Guesthouses)' | 'Comfort (3-4 Star/Resorts)' | 'Luxury (Palaces/Tents)';
}

export interface CityPlace {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  timings: string;
  entryFee: string;
  imageUrl: string;
  tags: string[];
  navigationQuery: string;
  categories: string[];
}

export interface DestinationCity {
  id: string;
  name: string;
  district: string;
  region: string;
  category: 'all' | 'heritage' | 'spiritual' | 'wildlife' | 'beaches' | 'desert';
  placesCount: number;
  badge: string;
  tagline: string;
  subRegion: string;
  imageUrl: string;
  weather: string;
  rating: number;
  reviews: string;
  keyAttractionsCount: number;
  bestTimeToVisit: string;
  nearestAirport: string;
  description: string;
  famousPlaces: CityPlace[];
  localTip: string;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
  category: string;
}

export interface UserBooking {
  id: string;
  title: string;
  type: string;
  time: string;
  date: string;
  location: string;
  passNumber: string;
  travelers: number;
  status: string;
  qrCodeValue: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  tagline: string;
  level: string;
  districtsExplored: number;
  placesVisited: number;
  bookmarkedCount: number;
  travelReviewsCount: number;
  badges: UserBadge[];
  bookings: UserBooking[];
  preferences: {
    language: string;
    interests: string[];
    offlineGuidesEnabled: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  authMethod?: 'google' | 'facebook' | 'phone' | 'email' | 'guest';
}
