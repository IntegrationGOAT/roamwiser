// Using Hugging Face chat-completions API (free tier available)
const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN || ''
const API_BASE = import.meta.env.VITE_HUGGINGFACE_ENDPOINT || 'https://router.huggingface.co'
const API_URL = `${API_BASE}/v1/chat/completions`
const API_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'

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

async function callHuggingFaceAPI(prompt: string, _retries = 3): Promise<string> {
  try {
    console.log('Calling Hugging Face API...')

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }

    if (API_TOKEN) {
      headers.Authorization = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: API_MODEL,
        messages: [
          {
            role: 'system',
            content: 'Return only valid JSON. Do not include markdown fences, explanations, or extra text.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2048
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
    if (Array.isArray(data?.choices) && data.choices[0]?.message?.content) {
      return data.choices[0].message.content
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
  const prompt = `Create 4 travel itineraries for ${tripData.destination}. Trip length: ${tripData.tripLength} days. Travelers: ${tripData.travelers}. Interests: ${tripData.interests.join(', ')}. Budget: ${tripData.budget}. Start date: ${tripData.startDate || 'today'}.

Return ONLY valid JSON as an array of 4 objects.
Keep it compact:
- title: 2-4 words
- description: 1 sentence
- morning/afternoon/evening: short phrases, 4-8 words each
- one day entry for each trip day

Use dates in order from the trip start date.
Format:
[{"id":"itin1","num":"ITINERARY 01","title":"...","description":"...","days":[{"day":1,"date":"...","morning":"...","afternoon":"...","evening":"..."}]}]`

  try {
    const text = await callHuggingFaceAPI(prompt)
    console.log('Hugging Face Response:', text)
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0].replace(/\s+/g, ' ').trim())
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