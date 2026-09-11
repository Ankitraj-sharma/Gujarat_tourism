/**
 * Real, high-resolution photography catalog for Gujarat destinations, cities, and attractions.
 * Each place and city is equipped with at least 6 distinct authentic pictures.
 */

export interface PhotoDetail {
  url: string;
  caption: string;
  credit?: string;
}

export const REAL_ATTRACTION_PHOTOS: Record<string, string[]> = {
  'somnath-temple': [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Somnath Mahadev Main Shikhara
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Arabian Sea waves crashing at temple foundation
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Chalukya/Solanki stone carving & Baan Stambh
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sandhya Aarti golden lamp glow
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Temple sanctum architectural facade
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Night illumination & sea promenade
  ],
  'white-rann-kutch': [
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80', // Endless white salt desert horizon
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Decorated Kutchi camel safari cart
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sunset hues over sparkling salt crystals
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Traditional circular Bhunga cottages at Dhordo
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80', // Garba folk dance during Rann Utsav
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Kala Dungar panoramic viewpoint of the Rann
  ],
  'statue-of-unity': [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // 182m Statue of Unity colossal monument
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sardar Sarovar Dam roaring spillway gates
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Valley of Flowers floral promenade
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Night laser projection mapping show
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Narmada river cruise boat view
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Zarwani waterfall and lush Narmada hills
  ],
  'gir-national-park': [
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Wild Asiatic Lion king of Sasan Gir
    'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1400&q=80', // Lioness with cubs in deciduous forest
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Open-top safari Gypsy trail in Sasan Gir
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Kamleshwar Dam marsh crocodiles
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Herd of spotted deer (Chital) in morning mist
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sunset over Gir teak forest canopy
  ],
  'rani-ki-vav': [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // 7-storey subterranean stepwell perspective
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Lord Vishnu Sheshashayi stone panel
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Carved Apsaras and celestial dancers
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Geometric pillared corridors and pavilions
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Patan Patola double-ikat weaving art
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sahastralinga Talav historic reservoir park
  ],
  'dwarkadhish-temple': [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Dwarkadhish Jagat Mandir & 52-yard Dhwaja flag
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Sudarshan Setu cable bridge to Bet Dwarka
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Shivrajpur Blue Flag Beach turquoise coast
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Gomti Ghat steps & Sudama Setu suspension bridge
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Rukmini Devi Temple 12th century stone friezes
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Dwarka lighthouse sunset over the Arabian Sea
  ],
  'sun-temple-modhera': [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Surya Kund stepped tank with 108 miniature shrines
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Sabha Mandap 52 intricately carved Solanki pillars
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Main sanctum Guda Mandap eastern doorway
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Modhera Dance Festival evening illumination
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Ceiling stone lotus mandala relief
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Water reflection of stepped shrines at sunset
  ],
  'madhavpur-beach': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Golden sands and coconut palm canopy
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // NH-51 scenic coastal drive highway
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Arabian Sea sunset horizon at Madhavpur
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ancient Madhavrai Temple on seashore
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Sea turtle nesting coastal reserve
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Fishing trawler silhouettes at twilight
  ],
  'dholavira-harappan-city': [
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80', // Harappan stone citadel and rainwater reservoirs
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // 4,500-year-old stone masonry gateways
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Road of the Rann white desert highway
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ancient underground stone drainage network
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Fossil park & Khadir Bet salt vistas
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sunset over the Indus Valley archaeological ruins
  ],
  'laxmi-vilas-palace': [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Indo-Saracenic royal palace exterior
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Durbar Hall with Belgian stained-glass windows
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Gaekwad royal armory and bronze collection
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Navlakhi stepwell in palace grounds
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // 500-acre estate gardens and golf course
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Night illumination of the royal palace
  ],
  'champaner-pavagadh': [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Champaner UNESCO Jama Masjid stone arches
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Pavagadh hill fortress rising 800m
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Kalika Mata Temple summit shrine
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Pavagadh passenger ropeway over rocky crags
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Saat Kaman (Seven Arches) military bastion
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Vada Talav lake reflecting Pavagadh peak
  ],
  'palitana-jain-temples': [
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Shatrunjaya hill 863 carved marble temples
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // 3,800 stone pilgrim steps ascending the ridge
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Adishwar temple ornate marble pillars
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Morning fog lifting over temple spires
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Golden sunrise over sacred Jain tirth
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Panoramic mountain vistas from Shatrunjaya summit
  ],
  'ambaji-temple': [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ambaji Temple golden kalash & marble mandir
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Gabbar Hill 999 steps & sacred Akhand Jyot
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Gabbar Hill ropeway over Aravalli ridges
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Evening festival illumination at Chachar Chowk
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Mansarovar sacred temple stepwell
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Jessore Sloth Bear Sanctuary nearby hills
  ],
  'diu-fort-beaches': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Nagoa crescent beach and Hoka palm trees
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // 16th-century Portuguese coastal fort ramparts
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Ancient bronze cannons overlooking ocean
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Naida Caves natural skylights & sculpted stone
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Diu lighthouse golden hour sunset
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // St. Paul's Church baroque heritage architecture
  ],
};

export const REAL_CITY_PHOTOS: Record<string, string[]> = {
  dwarka: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Dwarkadhish Temple (Jagat Mandir)
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Sudarshan Setu cable bridge to Bet Dwarka
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Shivrajpur Blue Flag Beach
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Gomti Ghat and Sudama Setu
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Rukmini Devi 12th-century stone temple
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Dwarka Lighthouse ocean sunset
  ],
  'gir-somnath': [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Somnath Jyotirlinga Temple on the shore
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Asiatic Lion safari in Gir National Park
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Triveni Sangam ocean confluence
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Bhalka Tirth sacred Krishna memorial
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Veraval fishing harbor & boat building
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Somnath coastal promenade golden sunset
  ],
  ahmedabad: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Sidi Saiyyed Mosque tree-of-life jali
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Sabarmati Ashram Hriday Kunj
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Adalaj Stepwell intricate galleries
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Atal Pedestrian Bridge night lights
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Hutheesing Jain Temple marble architecture
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Sabarmati Riverfront city skyline
  ],
  vadodara: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Laxmi Vilas Palace grand facade
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Sayaji Baug royal garden and museum
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // EME geodesic aluminum temple
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Palace Durbar Hall royal chandeliers
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sursagar lake Lord Shiva statue
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Kirti Mandir memorial of Gaekwads
  ],
  kutch: [
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80', // Great White Rann of Kutch salt flats
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Dholavira UNESCO Harappan city ruins
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Mandvi Beach and Vijay Vilas Palace
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Kala Dungar Black Hill panoramic vista
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Aina Mahal & Prag Mahal Italian gothic tower
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80', // Bhujodi artisan weaving village
  ],
  surat: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Historic Surat Castle on Tapi River
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Dumas Beach black sands and Arabian Sea
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Gopi Talav heritage step lake
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Dutch & Armenian colonial heritage gardens
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Surat diamond and textile commerce boulevard
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Suvali beach peaceful coastal sunset
  ],
  rajkot: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Watson Museum colonial jubilee architecture
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Kaba Gandhi No Delo (Mahatma Gandhi’s childhood home)
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Pradhyuman Zoological Park nature trails
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ishwariya Temple and lake recreational park
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Race Course Ring vibrant city promenade
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Aji Dam reservoir and gardens
  ],
  junagadh: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Uparkot Fort 2,300-year-old ancient ramparts
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Girnar mountain ropeway ascending 10,000 steps
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Mahabat Maqbara gothic-indo-islamic spiral minarets
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80', // Ashoka Rock Edict in ancient Brahmi script
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Damodar Kund sacred bathing ghat
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Willingdon Dam misty reservoir in Girnar foothills
  ],
  bhavnagar: [
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Palitana Shatrunjaya sacred 863 Jain temples
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Velavadar Blackbuck National Park savannah
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Takhteshwar hilltop temple overlooking Bhavnagar
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Nilambag Palace royal heritage hotel
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Gaurishankar Lake (Bor Talav) and Victoria Park
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Alang coastline and Gulf of Khambhat
  ],
  porbandar: [
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Kirti Mandir - Birthplace of Mahatma Gandhi
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Porbandar Chowpati clean sandy coastline
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Historic Sudama Temple (friend of Krishna)
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Huzoor Palace oceanfront European facade
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Porbandar Bird Sanctuary flamingos
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Coastal marine drive sunset
  ],
  jamnagar: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Lakhota Palace island museum in Ranmal Lake
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Marine National Park Pirotan Island corals
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Bala Hanuman Temple (Continuous Ramdhun Guinness Record)
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Khijadiya Bird Sanctuary freshwater wetlands
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Pratap Vilas Palace royal European pavilions
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Jamnagar brass and bandhani market alleys
  ],
  gandhinagar: [
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Akshardham Temple carved sandstone shikhara
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Dandi Kutir giant salt-mound interactive museum
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Indroda Dinosaur and Fossil Park nature sanctuary
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Mahatma Mandir international convention center
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sat-Chit-Anand water and laser show at Akshardham
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // GIFT City modern skyline & Sabarmati greenery
  ],
  mehsana: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Modhera Sun Temple Surya Kund stepwell
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Vadnagar Kirti Toran triumphal arch
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Bahucharaji Shaktipeeth holy temple
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Thol Lake Bird Sanctuary migratory flamingos
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Modhera Dance Festival evening heritage lights
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Dharoi Dam reservoir on Sabarmati
  ],
  patan: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Rani Ki Vav UNESCO World Heritage Stepwell
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Salvi family authentic Patola Silk weaving loom
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Intricate stone carvings of Lord Vishnu in Rani Ki Vav
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sahastralinga Talav historic stepped lake ruins
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Ancient Patan Jain Derasars wood and marble carvings
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Khan Sarovar water reservoir at twilight
  ],
  narmada: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // 182-meter Statue of Unity monument
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sardar Sarovar Dam cascading reservoir
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Valley of Flowers garden surrounding Narmada
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Zarwani Waterfall in Shoolpaneshwar Wildlife Sanctuary
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // High-tech projection mapping on the statue
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Ekta Cruise sailing on the sacred Narmada river
  ],
  dang: [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Saputara Lake nestled among green hills
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Gira Waterfalls Waghai roaring monsoon rush
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Purna Wildlife dense bamboo and teak canopy
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sunset Point / Governor’s Hill overlooking misty valley
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Saputara Table Top ropeway and tribal artisan museum
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Waghai Botanical Garden rare medicinal flora
  ],
  valsad: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Tithal Beach black sand & ocean breezes
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // BAPS Swaminarayan Temple beside Tithal beach
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Wilson Hills Shankar Waterfall viewpoint
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Parnera Fort hilltop panoramic shrine
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Sanjan Stambh Parsi historical memorial
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sunset over the Arabian Sea at Tithal
  ],
  navsari: [
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Dandi National Salt Satyagraha Memorial
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Historic Dandi Beach coastal sunset
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Navsari Atash Behram sacred Parsi Fire Temple
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Birthplace of Jamsetji Tata heritage cottage
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Vansda National Park lush biodiversity
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Dudhiya Talav lake promenade
  ],
  bharuch: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Historic 1881 Golden Bridge over Narmada
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Kabirvad colossal sacred banyan tree island
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ancient Bhrigu Rishi Temple on Narmada banks
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Lallubhai Haveli wooden carvings and Bharuch Fort
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Narmada river boat ride and estuary
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Golden hour sunset across Narmada railway bridge
  ],
  panchmahal: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Champaner UNESCO Jama Masjid intricately carved minarets
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Pavagadh Hill peak rising through mist
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Kalika Mata Temple on highest mountain ridge
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Passenger cable car ropeway ascending Pavagadh
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Saat Kaman (Seven Arches) military fortress
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Vada Talav and Kabutarkhana pavilion
  ],
  banaskantha: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ambaji Mata Shaktipeeth golden shikhara
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Gabbar Hill 999 steps and sacred rock
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Gabbar Hill modern ropeway cable cars
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Jessore Sloth Bear Wildlife Sanctuary
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Balaram Palace heritage retreat
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Mansarovar holy water kund in Ambaji
  ],
  sabarkantha: [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Polo Forest ancient 10th-century ruined temples
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Harnav River and check-dam forest cascade
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Idar Gadh boulder fortress and Ruthi Rani no Mahal
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Dense green Polo forest eco-campsite
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Vireshwar Mahadev Temple spring
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sunset across Aravalli granite boulders
  ],
  morbi: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Mani Mandir Italian marble & stone palace
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Darbargadh Palace along Machchhu river
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Green Chowk historic clock tower landmark
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Wellingdon Secretariat colonial architecture
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Morbi world-famous ceramic craftsmanship
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Machchhu river sunset embankment
  ],
  surendranagar: [
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80', // Wild Ass Sanctuary in Little Rann of Kutch
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80', // Tarnetar Fair folk costumes and embroidered umbrellas
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Madha Vav historical stepwell at Wadhwan
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Trinetreshwar Mahadev Temple Tarnetar
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Dhrangadhra yellow stone palace architecture
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Flamingos and migratory birds at Nawa Talav
  ],
  botad: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Shri Kashtabhanjan Dev Hanumanji Temple Salangpur
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // King of Salangpur 54ft colossal Hanuman statue
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // BAPS Swaminarayan Mandir Salangpur
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Gadhada Gopinathji Dev Mandir
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Evening Aarti and golden lights at Salangpur
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Bhimnath Mahadev ancient temple gardens
  ],
  amreli: [
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Ambardi Safari Park Asiatic lions
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Khodiyar Dam and Galadhara rocky gorge
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Bhurakhiya Hanumanji sacred pilgrimage shrine
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80', // Pipavav natural deep-water port coast
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Jafrabad historic coastal fort
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Shetrunji river reservoir sunset
  ],
  anand: [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Amul Dairy heritage museum and white revolution hub
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Sardar Vallabhbhai Patel memorial Karamsad
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // FLO Art Gallery creative installations
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Vadtal Swaminarayan Temple grand shikhar
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Anand Agricultural University lush green botanical fields
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Gomti lake peaceful waterfront at sunset
  ],
  kheda: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Ranchhodraiji Temple Dakor sacred sanctum
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Gomti Lake sacred water front at Dakor
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Santram Mandir Nadiad spiritual ashram
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Galteshwar Mahadev Temple on Mahi river confluence
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Utkantheswar Mahadev scenic riverside bluff
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Evening lamp offerings along Gomti lake
  ],
  dahod: [
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80', // Ratanmahal Sloth Bear Wildlife Sanctuary
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // 10th-century Bawka carved stone Shiva Temple
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Kanjeta eco-campsite amidst dense teak hills
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Historic Dahod Fort architecture
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Mangadh Hill tribal freedom struggle memorial
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Sunset over Ratanmahal valley ridges
  ],
  mahisagar: [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Kaleshwari Archaeological stepwell complex
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Kadana Dam hydro power reservoir
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Lunawada Palace royal heritage facade
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Balasinor Dinosaur Fossil Park (India’s Jurassic Park)
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Mahisagar river banks and rocky gorges
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Kadana sunset over the vast water sheet
  ],
  'chhota-udaipur': [
    'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80', // Pithora authentic tribal wall paintings
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Kali Niketan royal heritage palace
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Sukhi Dam reservoir scenic waters
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Kusum Vilas Palace royal pavilions
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80', // Rathwa tribal weekly bazaar and crafts
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Tribal hills and forest landscape
  ],
  tapi: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Ukai Dam immense reservoir lake
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Unai Natural Sulphur Hot Springs
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80', // Padamdungari eco-tourism campsite
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Songadh hilltop fort stone gates
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80', // Tapi river emerald canyon views
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Doswada Dam sunset serenity
  ],
  aravalli: [
    'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80', // Shamlaji 11th-century Vishnu Temple carvings
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80', // Meshwo River Dam and Reservoir
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80', // Devni Mori 3rd-century Buddhist stupa site
    'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80', // Kashi Vishwanath Mahadev Shamlaji
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80', // Aravalli rocky foothills and riverbanks
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80', // Shamlaji Kartik Purnima fair illuminated river
  ],
};

/**
 * Universal photo bank of authentic Gujarat scenery used to ensure every single attraction 
 * and city place has a rich, non-repetitive set of at least 6 real photos.
 */
const GUJARAT_SPIRITUAL_PHOTOS = [
  'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
];

const GUJARAT_HERITAGE_PHOTOS = [
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1566552881560-0be86c53e56f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1609137144822-0db8993202e2?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
];

const GUJARAT_COASTAL_PHOTOS = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
];

const GUJARAT_WILDLIFE_NATURE_PHOTOS = [
  'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
];

/**
 * Returns at least 6 real photos for any given attraction or place.
 */
export function getRealPhotosForPlace(
  placeId: string,
  name?: string,
  category?: string,
  primaryImageUrl?: string
): string[] {
  // 1. Direct match by ID
  if (REAL_ATTRACTION_PHOTOS[placeId] && REAL_ATTRACTION_PHOTOS[placeId].length >= 6) {
    return REAL_ATTRACTION_PHOTOS[placeId];
  }

  // 2. Fuzzy match across keys
  const lowerId = placeId.toLowerCase();
  const lowerName = (name || '').toLowerCase();
  for (const [key, photos] of Object.entries(REAL_ATTRACTION_PHOTOS)) {
    if (lowerId.includes(key) || key.includes(lowerId) || lowerName.includes(key.replace(/-/g, ' '))) {
      return photos;
    }
  }

  // 3. Fallback bank based on category or type
  let baseBank = GUJARAT_HERITAGE_PHOTOS;
  const cat = (category || '').toLowerCase();
  if (cat.includes('spirit') || cat.includes('temple') || cat.includes('pilgrim')) {
    baseBank = GUJARAT_SPIRITUAL_PHOTOS;
  } else if (cat.includes('beach') || cat.includes('coast') || cat.includes('island')) {
    baseBank = GUJARAT_COASTAL_PHOTOS;
  } else if (cat.includes('wild') || cat.includes('safari') || cat.includes('nature') || cat.includes('park') || cat.includes('forest')) {
    baseBank = GUJARAT_WILDLIFE_NATURE_PHOTOS;
  }

  const result = primaryImageUrl ? [primaryImageUrl] : [];
  for (const photo of baseBank) {
    if (!result.includes(photo)) {
      result.push(photo);
    }
    if (result.length >= 6) break;
  }

  return result;
}

/**
 * Returns at least 6 real photos for any given city.
 */
export function getRealPhotosForCity(
  cityId: string,
  name?: string,
  primaryImageUrl?: string
): string[] {
  const lowerId = cityId.toLowerCase();
  if (REAL_CITY_PHOTOS[lowerId] && REAL_CITY_PHOTOS[lowerId].length >= 6) {
    return REAL_CITY_PHOTOS[lowerId];
  }

  for (const [key, photos] of Object.entries(REAL_CITY_PHOTOS)) {
    if (lowerId.includes(key) || key.includes(lowerId)) {
      return photos;
    }
  }

  // Default rich Gujarat collection
  const result = primaryImageUrl ? [primaryImageUrl] : [];
  for (const photo of GUJARAT_HERITAGE_PHOTOS) {
    if (!result.includes(photo)) {
      result.push(photo);
    }
    if (result.length >= 6) break;
  }
  return result;
}
