// Mock AI service for demo purposes
// Generates realistic travel data without API calls

export interface TripData {
  destination: string
  travelers: number
  tripLength: number
  budget: string
  interests: string[]
  startDate?: string
}

export interface Itinerary {
  id: string
  num: string
  title: string
  description: string
  days: {
    day: number
    date: string
    morning: string
    afternoon: string
    evening: string
  }[]
}

export interface BudgetData {
  total: number
  breakdown: {
    stay: number
    food: number
    transport: number
    activities: number
    buffer: number
  }
}

export interface RiskData {
  overall: string
  level: string
  advisories: string[]
  weather: string[]
  safety: string[]
  weatherForecast?: {
    day: number
    condition: string
    temperature: string
    humidity: string
    recommendation: string
  }[]
}

// Helper to generate dates
function generateDates(startDate: string, numDays: number): string[] {
  const dates: string[] = []
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  if (startDate) {
    const date = new Date(startDate)
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date(date)
      currentDate.setDate(date.getDate() + i)
      dates.push(`${months[currentDate.getMonth()]} ${currentDate.getDate()}`)
    }
  } else {
    const today = new Date()
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      dates.push(`${months[currentDate.getMonth()]} ${currentDate.getDate()}`)
    }
  }
  return dates
}

// Deterministic hash from destination string to pick varied content
function hashDestination(dest: string): number {
  let hash = 0
  for (let i = 0; i < dest.length; i++) {
    hash = ((hash << 5) - hash) + dest.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// Destination-specific data pools
const destinationData: Record<string, {
  region: string
  themes: string[]
  landmarks: string[]
  foods: string[]
  activities: string[]
  weatherProfile: { conditions: string[], temps: string[], humidity: string[] }
  riskLevel: string
  advisories: string[]
}> = {
  'kerala': {
    region: 'South India',
    themes: ['Backwaters', 'Ayurveda', 'Spice Plantations', 'Kathakali'],
    landmarks: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Fort Kochi', 'Periyar Wildlife Sanctuary', 'Kumarakom Bird Sanctuary'],
    foods: ['Appam with Stew', 'Kerala Sadya', 'Fish Moilee', 'Puttu and Kadala Curry'],
    activities: ['Houseboat cruise', 'Tea plantation walk', 'Kathakali performance', 'Ayurvedic massage', 'Spice market tour'],
    weatherProfile: { conditions: ['Partly Cloudy', 'Humid', 'Light Rain', 'Sunny', 'Warm'], temps: ['24-30°C', '23-28°C', '25-31°C', '22-29°C', '26-32°C'], humidity: ['78%', '82%', '75%', '80%', '85%'] },
    riskLevel: 'Low',
    advisories: ['Monsoon season June-September — pack rain gear', 'Respect local dress codes at temples', 'Use registered houseboat operators only', 'Carry mosquito repellent']
  },
  'goa': {
    region: 'West Coast',
    themes: ['Beaches', 'Portuguese Heritage', 'Water Sports', 'Nightlife'],
    landmarks: ['Baga Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Fort Aguada', 'Anjuna Flea Market'],
    foods: ['Pork Vindaloo', 'Goan Fish Curry', 'Bebinca', 'Feni'],
    activities: ['Sunset cruise', 'Water sports', 'Old town walking tour', 'Beach hopping', 'Spice plantation visit'],
    weatherProfile: { conditions: ['Sunny', 'Clear', 'Warm', 'Breezy', 'Hot'], temps: ['28-34°C', '27-33°C', '26-32°C', '29-35°C', '28-33°C'], humidity: ['70%', '65%', '75%', '68%', '72%'] },
    riskLevel: 'Low',
    advisories: ['Avoid strong currents at unpatrolled beaches', 'Negotiate taxi fares upfront', 'Stay hydrated in the heat', 'Respect local beach timings']
  },
  'rajasthan': {
    region: 'Northwest India',
    themes: ['Desert', 'Palaces', 'Forts', 'Folk Culture'],
    landmarks: ['Amber Fort', 'City Palace Jaipur', 'Mehrangarh Fort', 'Lake Pichola', 'Thar Desert'],
    foods: ['Dal Baati Churma', 'Laal Maas', 'Gatte ki Sabzi', 'Mawa Kachori'],
    activities: ['Desert safari', 'Palace tour', 'Camel ride', 'Folk dance evening', 'Heritage walk'],
    weatherProfile: { conditions: ['Sunny', 'Hot', 'Clear', 'Dry', 'Warm'], temps: ['32-40°C', '30-38°C', '28-36°C', '33-42°C', '31-39°C'], humidity: ['30%', '25%', '35%', '28%', '32%'] },
    riskLevel: 'Low',
    advisories: ['Carry plenty of water in desert areas', 'Dress modestly in rural areas', 'Beware of touts at tourist sites', 'Sunscreen and head cover essential']
  },
  'himachal': {
    region: 'North India',
    themes: ['Mountains', 'Trekking', 'Adventure', 'Hill Stations'],
    landmarks: ['Rohtang Pass', 'Manali', 'Shimla Ridge', 'Dharamshala', 'Spiti Valley'],
    foods: ['Sidu', 'Dham', 'Chha Gosht', 'Tudkiya Bhath'],
    activities: ['Trekking', 'River rafting', 'Paragliding', 'Temple visits', 'Apple orchard tour'],
    weatherProfile: { conditions: ['Cool', 'Cloudy', 'Clear', 'Pleasant', 'Breezy'], temps: ['12-20°C', '10-18°C', '8-16°C', '14-22°C', '11-19°C'], humidity: ['55%', '60%', '50%', '58%', '52%'] },
    riskLevel: 'Low',
    advisories: ['Check road conditions before mountain travel', 'Carry warm clothes even in summer', 'Acclimatize to altitude gradually', 'Book trekking with registered guides']
  },
  'varanasi': {
    region: 'North India',
    themes: ['Spiritual', 'Ghats', 'Temples', 'Silk Weaving'],
    landmarks: ['Kashi Vishwanath Temple', 'Dashashwamedh Ghat', 'Sarnath', 'Assi Ghat', 'Ramnagar Fort'],
    foods: ['Kachori Sabzi', 'Banarasi Paan', 'Malaiyyo', 'Tamatar Chaat'],
    activities: ['Ganga Aarti ceremony', 'Morning boat ride', 'Temple tour', 'Silk weaving demo', 'Old city walk'],
    weatherProfile: { conditions: ['Sunny', 'Warm', 'Humid', 'Clear', 'Hot'], temps: ['26-34°C', '24-32°C', '28-36°C', '25-33°C', '27-35°C'], humidity: ['60%', '65%', '70%', '58%', '62%'] },
    riskLevel: 'Low',
    advisories: ['Beware of pickpockets in crowded ghats', 'Dress modestly at temples', 'Negotiate boat ride prices beforehand', 'Avoid touts offering "special" temple access']
  },
  'delhi': {
    region: 'North India',
    themes: ['History', 'Street Food', 'Markets', 'Monuments'],
    landmarks: ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun\'s Tomb', 'Chandni Chowk'],
    foods: ['Butter Chicken', 'Chole Bhature', 'Paranthe wali Gali', 'Jalebis'],
    activities: ['Monument tour', 'Street food walk', 'Metro exploration', 'Market shopping', 'Museum visit'],
    weatherProfile: { conditions: ['Sunny', 'Smoggy', 'Clear', 'Hot', 'Pleasant'], temps: ['28-36°C', '22-30°C', '18-26°C', '30-40°C', '20-28°C'], humidity: ['45%', '55%', '40%', '50%', '48%'] },
    riskLevel: 'Medium',
    advisories: ['Use metro for fastest travel', 'Beware of pickpockets in crowded areas', 'Carry ID at all times', 'Avoid street food if sensitive stomach']
  }
}

// Generic fallback for unknown destinations
function getDestinationInfo(dest: string) {
  const key = dest.toLowerCase().trim()
  for (const [name, data] of Object.entries(destinationData)) {
    if (key.includes(name)) return data
  }
  // Return a composite based on hash of destination name
  const hash = hashDestination(dest)
  const allEntries = Object.values(destinationData)
  const base = allEntries[hash % allEntries.length]
  return {
    ...base,
    region: dest,
    themes: base.themes.map(t => `${t} Experience`),
    riskLevel: hash % 3 === 0 ? 'Medium' : 'Low',
    advisories: [`Check local guidelines for ${dest}`, 'Carry valid identification', 'Keep emergency contacts handy', 'Respect local customs']
  }
}

// Generate itinerary titles based on destination and interests
function generateItineraryTitles(dest: string, interests: string[]): Array<{ title: string, description: string, morning: string[], afternoon: string[], evening: string[] }> {
  const info = getDestinationInfo(dest)
  const hash = hashDestination(dest + interests.join(','))
  
  const templates = [
    {
      title: `${info.themes[0]} & ${info.themes[1]}`,
      description: `Discover the best of ${dest} through its iconic ${info.themes[0].toLowerCase()} and ${info.themes[1].toLowerCase()} experiences. This carefully crafted ${interests.length > 0 ? interests.slice(0, 2).join(' and ').toLowerCase() : 'sightseeing'} itinerary takes you through ${info.landmarks.slice(0, 2).join(' and ')}, with authentic local encounters and unforgettable moments at every turn.`,
      morning: [`Guided tour of ${info.landmarks[0]}`, `Visit ${info.landmarks[1]}`, `Explore ${info.landmarks[2]}`, `Sunrise visit to ${info.landmarks[3]}`],
      afternoon: [`${info.activities[0]} experience`, `Traditional ${info.foods[0]} lunch`, `${info.activities[1]} adventure`, `Market exploration`],
      evening: [`Sunset at ${info.landmarks[4] || info.landmarks[0]}`, `Local cultural show`, `${info.activities[2]} evening`, `Dinner at heritage restaurant`]
    },
    {
      title: `Adventure & ${info.themes[2]}`,
      description: `For thrill-seekers and nature lovers visiting ${dest}, this action-packed itinerary combines outdoor adventures with ${info.themes[2].toLowerCase()} exploration. From ${info.activities[1].toLowerCase()} to ${info.activities[3].toLowerCase()}, every day brings new excitement and discovery in this beautiful ${info.region} destination.`,
      morning: [`${info.activities[1]} morning expedition`, `Nature walk through ${info.landmarks[3]}`, `Early morning ${info.activities[3]}`, `Adventure sports session`],
      afternoon: [`${info.activities[0]} afternoon`, `Visit to ${info.landmarks[2]}`, `Lunch with ${info.foods[1]}`, `Scenic drive through the region`],
      evening: [`Campfire dinner`, `Stargazing session`, `Night photography tour`, `Bonfire with local music`]
    },
    {
      title: `Cultural Immersion in ${dest}`,
      description: `Immerse yourself in the rich cultural tapestry of ${dest}. This itinerary focuses on authentic experiences — from learning about ${info.themes[3]?.toLowerCase() || 'local traditions'} to savoring ${info.foods.slice(0, 2).join(' and ')}. Connect with local communities and gain a deeper understanding of this remarkable ${info.region} destination.`,
      morning: [`Heritage walking tour`, `Visit to local artisan workshop`, `Temple/monument visit`, `Photography walk through old town`],
      afternoon: [`Cooking class featuring ${info.foods[0]}`, `Museum and gallery tour`, `Interaction with local craftspeople`, `Spice/heritage market visit`],
      evening: [`Traditional music and dance performance`, `Sunset at ${info.landmarks[4] || info.landmarks[1]}`, `Local family dinner experience`, `Evening cultural show`]
    },
    {
      title: `Relaxation & Wellness in ${dest}`,
      description: `Unwind and rejuvenate in the serene surroundings of ${dest}. This wellness-focused itinerary balances gentle exploration with relaxation, featuring ${info.activities[3]?.toLowerCase() || 'spa treatments'}, peaceful walks through ${info.landmarks[1]}, and plenty of time to soak in the tranquil atmosphere of this ${info.region} gem.`,
      morning: [`Sunrise yoga session`, `Meditation at ${info.landmarks[0]}`, `Wellness spa treatment`, `Peaceful morning walk`],
      afternoon: [`Leisure time at scenic spot`, `Relaxing boat ride`, `Spa and wellness center visit`, `Afternoon tea at heritage property`],
      evening: [`Sunset relaxation session`, `Gentle nature walk`, `Herbal tea ceremony`, `Peaceful dinner with local cuisine`]
    }
  ]
  
  // Shift templates based on destination hash for variety
  const shift = hash % templates.length
  return [...templates.slice(shift), ...templates.slice(0, shift)]
}

export async function generateItineraries(tripData: TripData): Promise<Itinerary[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const dates = generateDates(tripData.startDate || '', tripData.tripLength)
  const templates = generateItineraryTitles(tripData.destination, tripData.interests)
  const itineraries: Itinerary[] = []
  
  for (let i = 0; i < 4; i++) {
    const template = templates[i]
    const days = []
    
    for (let j = 0; j < tripData.tripLength; j++) {
      const morningActivities = template.morning
      const afternoonActivities = template.afternoon
      const eveningActivities = template.evening
      
      days.push({
        day: j + 1,
        date: dates[j] || `Day ${j + 1}`,
        morning: morningActivities[j % morningActivities.length],
        afternoon: afternoonActivities[j % afternoonActivities.length],
        evening: eveningActivities[j % eveningActivities.length]
      })
    }
    
    itineraries.push({
      id: `itin${i + 1}`,
      num: `ITINERARY 0${i + 1}`,
      title: template.title,
      description: template.description,
      days: days
    })
  }
  
  console.log('Generated mock itineraries:', itineraries)
  return itineraries
}

export async function generateBudget(tripData: TripData): Promise<BudgetData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const budgetAmount = parseInt(tripData.budget.replace(/[^0-9]/g, '')) || 85000
  
  // Vary budget breakdown based on destination hash
  const hash = hashDestination(tripData.destination + tripData.tripLength.toString())
  const breakdowns = [
    { stay: 35, food: 20, transport: 15, activities: 20, buffer: 10 },
    { stay: 30, food: 25, transport: 20, activities: 15, buffer: 10 },
    { stay: 40, food: 18, transport: 12, activities: 22, buffer: 8 },
    { stay: 32, food: 22, transport: 18, activities: 20, buffer: 8 },
    { stay: 28, food: 30, transport: 15, activities: 18, buffer: 9 },
    { stay: 38, food: 15, transport: 22, activities: 18, buffer: 7 }
  ]
  
  const breakdown = breakdowns[hash % breakdowns.length]
  
  console.log('Generated mock budget:', { total: budgetAmount, breakdown })
  return {
    total: budgetAmount,
    breakdown: breakdown
  }
}

export async function generateRiskPlanning(tripData: TripData): Promise<RiskData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  const info = getDestinationInfo(tripData.destination)
  const dates = generateDates(tripData.startDate || '', tripData.tripLength)
  const hash = hashDestination(tripData.destination + tripData.tripLength.toString())
  
  const weatherForecast = dates.map((_date, idx) => {
    const wi = (hash + idx) % info.weatherProfile.conditions.length
    return {
      day: idx + 1,
      condition: info.weatherProfile.conditions[wi],
      temperature: info.weatherProfile.temps[wi],
      humidity: info.weatherProfile.humidity[wi],
      recommendation: wi % 2 === 0 ? 'Pack light, stay hydrated' : 'Carry appropriate gear, plan indoor backups'
    }
  })
  
  const safetyTips = [
    `Stay in well-lit areas during evening hours in ${tripData.destination}`,
    `Keep valuables secure and use hotel safes`,
    `Use registered transport services for travel`,
    `Keep digital copies of important documents`,
    `Share your itinerary with someone back home`,
    `Learn a few local phrases for better interactions`
  ]
  
  const weatherTips = [
    `Check daily weather updates for ${tripData.destination}`,
    `Pack clothing suitable for ${info.weatherProfile.conditions[0].toLowerCase()} conditions`,
    `Carry sun protection and stay hydrated`,
    `Plan indoor activities as backup for inclement weather`
  ]
  
  const riskData: RiskData = {
    overall: `${tripData.destination} is generally a safe destination with standard travel precautions. ${info.region} region has well-developed tourist infrastructure and welcoming local communities. Exercise normal vigilance as you would in any unfamiliar place.`,
    level: info.riskLevel,
    advisories: info.advisories,
    weather: weatherTips,
    safety: safetyTips.slice(0, 4),
    weatherForecast: weatherForecast
  }
  
  console.log('Generated mock risk data:', riskData)
  return riskData
}