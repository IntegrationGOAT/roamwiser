// Using Hugging Face API (free tier available)
const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN || ''
// When running via Vite dev server, use the proxy to avoid CORS issues
// In production, this would need a proper backend proxy
const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? '/api/huggingface'
  : 'https://api-inference.huggingface.co'
const API_URL = `${API_BASE}/models/google/flan-t5-base`

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

async function callHuggingFaceAPI(prompt: string, retries = 3): Promise<string> {
  try {
    console.log('Calling Hugging Face API...')

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1000,
          temperature: 0.7,
          do_sample: true
        }
      })
    })

    console.log('API Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', errorText)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Full API response:', data)
    
    // Handle different response formats
    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      return data[0].generated_text
    } else if (data.generated_text) {
      return data.generated_text
    } else if (typeof data === 'string') {
      return data
    }
    
    throw new Error('Invalid API response structure')
  } catch (error) {
    console.error('Error calling Hugging Face API:', error)
    throw error
  }
}

export async function generateItineraries(tripData: TripData): Promise<Itinerary[]> {
  const prompt = `Generate 4 unique travel itineraries for ${tripData.destination} for ${tripData.travelers} traveler(s) over ${tripData.tripLength} days. Interests: ${tripData.interests.join(', ')}.

For each itinerary provide:
1. Title (e.g., "Heritage & Backwaters")
2. Description (100 words)
3. Day-by-day schedule with morning, afternoon, evening activities
4. Dates starting from ${tripData.startDate || 'current date'}

Format as JSON array:
[
  {
    "id": "itin1",
    "num": "ITINERARY 01",
    "title": "Title",
    "description": "Description",
    "days": [
      {
        "day": 1,
        "date": "July 15",
        "morning": "Activity",
        "afternoon": "Activity",
        "evening": "Activity"
      }
    ]
  }
]`

  try {
    const text = await callHuggingFaceAPI(prompt)
    console.log('Hugging Face Response:', text)
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    // If no JSON found, return empty array
    console.error('No JSON found in response')
    return []
  } catch (error) {
    console.error('Error generating itineraries:', error)
    return []
  }
}

export async function generateBudget(tripData: TripData): Promise<BudgetData> {
  const budgetAmount = parseInt(tripData.budget.replace(/[^0-9]/g, '')) || 85000
  
  const prompt = `Generate budget breakdown for ${tripData.tripLength}-day trip to ${tripData.destination} for ${tripData.travelers} people with total budget ₹${budgetAmount}.

Return JSON:
{
  "total": ${budgetAmount},
  "breakdown": {
    "stay": 35,
    "food": 20,
    "transport": 15,
    "activities": 20,
    "buffer": 10
  }
}`

  try {
    const text = await callHuggingFaceAPI(prompt)
    console.log('Budget Response:', text)
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    // Return default if parsing fails
    return {
      total: budgetAmount,
      breakdown: { stay: 35, food: 20, transport: 15, activities: 20, buffer: 10 }
    }
  } catch (error) {
    console.error('Error generating budget:', error)
    return {
      total: budgetAmount,
      breakdown: { stay: 35, food: 20, transport: 15, activities: 20, buffer: 10 }
    }
  }
}

export async function generateRiskPlanning(tripData: TripData): Promise<RiskData> {
  const prompt = `Generate safety and weather information for ${tripData.tripLength}-day trip to ${tripData.destination} for ${tripData.travelers} people.

Return JSON:
{
  "overall": "Brief assessment",
  "level": "Low/Medium/High",
  "advisories": ["advisory 1", "advisory 2"],
  "weather": ["weather tip 1", "weather tip 2"],
  "safety": ["safety tip 1", "safety tip 2"],
  "weatherForecast": [
    {
      "day": 1,
      "condition": "Sunny",
      "temperature": "25-30°C",
      "humidity": "60%",
      "recommendation": "Wear light clothes"
    }
  ]
}`

  try {
    const text = await callHuggingFaceAPI(prompt)
    console.log('Risk Response:', text)
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    // Return default if parsing fails
    return {
      overall: 'Standard travel precautions advised',
      level: 'Low',
      advisories: ['Check local regulations', 'Keep digital copies of documents'],
      weather: ['Monitor weather forecasts', 'Pack appropriate clothing'],
      safety: ['Stay in well-lit areas', 'Keep emergency contacts handy']
    }
  } catch (error) {
    console.error('Error generating risk planning:', error)
    return {
      overall: 'Standard travel precautions advised',
      level: 'Low',
      advisories: ['Check local regulations', 'Keep digital copies of documents'],
      weather: ['Monitor weather forecasts', 'Pack appropriate clothing'],
      safety: ['Stay in well-lit areas', 'Keep emergency contacts handy']
    }
  }
}