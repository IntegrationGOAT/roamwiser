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

// Mock itinerary templates
const itineraryTemplates = [
  {
    title: 'Heritage & Backwaters',
    description: 'Experience the perfect blend of history and nature on this carefully crafted journey. Explore ancient temples, cruise through serene backwaters, and immerse yourself in local culture. Each day brings new discoveries, from sunrise boat rides to evening cultural performances.',
    activities: {
      morning: ['Visit ancient temple complex', 'Sunrise boat cruise', 'Guided heritage walk', 'Explore local markets'],
      afternoon: ['Traditional cooking class', 'Backwater kayaking', 'Village tour', 'Spice plantation visit'],
      evening: ['Cultural dance performance', 'Sunset dinner cruise', 'Folk music evening', 'Night market exploration']
    }
  },
  {
    title: 'Adventure & Wildlife',
    description: 'For the thrill-seekers and nature lovers, this itinerary packs in excitement from dawn to dusk. Trek through lush forests, spot exotic wildlife, and challenge yourself with outdoor adventures. Perfect for those who want to experience the wild side of the destination.',
    activities: {
      morning: ['Wildlife safari', 'Jungle trek', 'Bird watching tour', 'Mountain hiking'],
      afternoon: ['River rafting', 'Rock climbing', 'Zip-lining adventure', 'Nature photography'],
      evening: ['Campfire stories', 'Night safari', 'Stargazing session', 'Bonfire dinner']
    }
  },
  {
    title: 'Cultural Immersion',
    description: 'Dive deep into the local culture with hands-on experiences and authentic interactions. Learn traditional crafts, taste regional cuisines, and connect with local communities. This journey transforms you from tourist to temporary local.',
    activities: {
      morning: ['Traditional craft workshop', 'Yoga and meditation', 'Local family visit', 'Art class'],
      afternoon: ['Culinary tour', 'Historical site exploration', 'Music and dance lesson', 'Market shopping'],
      evening: ['Cultural show', 'Home-cooked dinner', 'Storytelling session', 'Sunset ceremony']
    }
  },
  {
    title: 'Relaxation & Wellness',
    description: 'Rejuvenate your mind, body, and soul with this wellness-focused itinerary. From Ayurvedic treatments to peaceful meditation sessions, every moment is designed to help you unwind and recharge. Return home feeling refreshed and revitalized.',
    activities: {
      morning: ['Sunrise yoga', 'Meditation session', 'Ayurvedic massage', 'Spa treatment'],
      afternoon: ['Beach relaxation', 'Poolside lunch', 'Wellness workshop', 'Nature walk'],
      evening: ['Sunset meditation', 'Herbal tea ceremony', 'Gentle yoga', 'Peaceful dinner']
    }
  }
]

export async function generateItineraries(tripData: TripData): Promise<Itinerary[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const dates = generateDates(tripData.startDate || '', tripData.tripLength)
  const itineraries: Itinerary[] = []
  
  for (let i = 0; i < 4; i++) {
    const template = itineraryTemplates[i]
    const days = []
    
    for (let j = 0; j < tripData.tripLength; j++) {
      const morningActivities = template.activities.morning
      const afternoonActivities = template.activities.afternoon
      const eveningActivities = template.activities.evening
      
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
  
  // Generate varied budget breakdowns based on destination
  const breakdowns = [
    { stay: 35, food: 20, transport: 15, activities: 20, buffer: 10 },
    { stay: 30, food: 25, transport: 20, activities: 15, buffer: 10 },
    { stay: 40, food: 18, transport: 12, activities: 22, buffer: 8 },
    { stay: 32, food: 22, transport: 18, activities: 20, buffer: 8 }
  ]
  
  const breakdown = breakdowns[Math.floor(Math.random() * breakdowns.length)]
  
  console.log('Generated mock budget:', { total: budgetAmount, breakdown })
  return {
    total: budgetAmount,
    breakdown: breakdown
  }
}

export async function generateRiskPlanning(tripData: TripData): Promise<RiskData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  const dates = generateDates(tripData.startDate || '', tripData.tripLength)
  const weatherConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear']
  const temperatures = ['22-28°C', '24-30°C', '20-26°C', '25-32°C', '23-29°C']
  const humidities = ['60%', '65%', '70%', '55%', '68%']
  
  const weatherForecast = dates.map((date, idx) => ({
    day: idx + 1,
    condition: weatherConditions[idx % weatherConditions.length],
    temperature: temperatures[idx % temperatures.length],
    humidity: humidities[idx % humidities.length],
    recommendation: idx % 2 === 0 ? 'Pack light, stay hydrated' : 'Carry umbrella, wear comfortable shoes'
  }))
  
  const riskData: RiskData = {
    overall: 'Generally safe destination with standard travel precautions. Local infrastructure is well-developed and tourist areas are well-maintained.',
    level: 'Low',
    advisories: [
      'Carry valid ID and travel documents at all times',
      'Use reputable transportation services',
      'Keep emergency contacts saved in your phone',
      'Respect local customs and traditions'
    ],
    weather: [
      'Expect moderate temperatures during your visit',
      'Carry light rain gear for occasional showers',
      'Stay hydrated, especially during daytime activities',
      'Sunscreen and hats recommended for sun protection'
    ],
    safety: [
      'Stay in well-lit areas during evening hours',
      'Keep valuables secure and out of sight',
      'Use hotel safes for important documents',
      'Stay aware of your surroundings in crowded areas'
    ],
    weatherForecast: weatherForecast
  }
  
  console.log('Generated mock risk data:', riskData)
  return riskData
}