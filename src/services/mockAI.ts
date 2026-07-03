// Mock AI service — passes generation to the Hugging Face inference API

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

export interface ExploreSpot {
  id: string
  title: string
  description: string
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

function generateDates(startDate: string, numDays: number): string[] {
  const dates: string[] = []
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const baseDate = startDate ? new Date(startDate) : new Date()

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(baseDate)
    currentDate.setDate(baseDate.getDate() + i)
    dates.push(`${months[currentDate.getMonth()]} ${currentDate.getDate()}`)
  }

  return dates
}

function parseModelJson<T>(text: string, pattern: RegExp): T {
  const match = text.match(pattern)
  if (!match) {
    throw new Error('Model did not return JSON')
  }

  const cleaned = match[0]
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .replace(/,\s*([}\]])/g, '$1')

  return JSON.parse(cleaned) as T
}

function stripWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function toBudgetPercentage(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  if (value && typeof value === 'object') {
    const candidate = value as { percentage?: unknown; amount?: unknown; value?: unknown }
    return toBudgetPercentage(candidate.percentage ?? candidate.amount ?? candidate.value, fallback)
  }
  return fallback
}

function normalizeBudgetData(parsed: BudgetData): BudgetData {
  const breakdown = parsed.breakdown as unknown as Record<string, unknown>
  const stay = toBudgetPercentage(breakdown.stay, 35)
  const food = toBudgetPercentage(breakdown.food, 20)
  const transport = toBudgetPercentage(breakdown.transport, 15)
  const activities = toBudgetPercentage(breakdown.activities, 20)
  const buffer = toBudgetPercentage(breakdown.buffer, 10)

  return {
    total: typeof parsed.total === 'number' && Number.isFinite(parsed.total) ? parsed.total : 85000,
    breakdown: { stay, food, transport, activities, buffer }
  }
}

const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN || ''
const API_BASE = import.meta.env.VITE_HUGGINGFACE_ENDPOINT || 'https://router.huggingface.co'
const API_URL = `${API_BASE}/v1/chat/completions`
const API_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'

async function callHuggingFace(prompt: string): Promise<string> {
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
      max_tokens: 1024
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  if (Array.isArray(data?.choices) && data.choices[0]?.message?.content) {
    return data.choices[0].message.content
  }
  if (data?.generated_text) return data.generated_text
  if (typeof data === 'string') return data
  throw new Error('Invalid API response')
}

async function generateItineraryCard(tripData: TripData, dates: string[], index: number): Promise<Itinerary> {
  const styles = [
    'balanced and practical',
    'food-forward and cultural',
    'relaxed and scenic',
    'active and exploratory'
  ]

  const prompt = `Create ONE compact travel itinerary for ${tripData.destination}.
Style: ${styles[index]}.
Trip length: ${tripData.tripLength} days.
Travelers: ${tripData.travelers}.
Interests: ${tripData.interests.join(', ')}.
Budget: ${tripData.budget}.
Start date: ${tripData.startDate || 'today'}.

Return ONLY valid JSON for this exact shape:
{"id":"itin${index + 1}","num":"ITINERARY 0${index + 1}","title":"2-4 words","description":"1 sentence","days":[{"day":1,"date":"${dates[0] || 'Day 1'}","morning":"short phrase","afternoon":"short phrase","evening":"short phrase"}]}

Rules:
- one short title
- one sentence description
- one day entry for each trip day
- short activity phrases
- no markdown`

  const text = await callHuggingFace(prompt)
  const parsed = parseModelJson<Itinerary>(stripWhitespace(text), /\{[\s\S]*\}/)

  return {
    ...parsed,
    id: parsed.id || `itin${index + 1}`,
    num: parsed.num || `ITINERARY 0${index + 1}`
  }
}

export async function generateItineraries(tripData: TripData): Promise<Itinerary[]> {
  const dates = generateDates(tripData.startDate || '', tripData.tripLength)

  try {
    return await Promise.all([0, 1, 2, 3].map((index) => generateItineraryCard(tripData, dates, index)))
  } catch (error) {
    console.error('Error generating itineraries:', error)
    return []
  }
}

export async function generateExploreSpots(tripData: TripData): Promise<ExploreSpot[]> {
  const prompt = `Create 7 places to explore in ${tripData.destination} for a traveler interested in ${tripData.interests.join(', ')}.

Return ONLY valid JSON as an array of 7 objects.
Each object must have:
- id: short slug
- title: place name or landmark
- description: one short sentence

Keep it compact and specific to ${tripData.destination}. No markdown.`

  try {
    const text = await callHuggingFace(prompt)
    const parsed = parseModelJson<ExploreSpot[]>(stripWhitespace(text), /\[[\s\S]*\]/)
    return parsed.map((spot, index) => ({
      id: spot.id || `spot${index + 1}`,
      title: spot.title,
      description: spot.description
    }))
  } catch (error) {
    console.error('Error generating explore spots:', error)
    return []
  }
}

export async function generateBudget(tripData: TripData): Promise<BudgetData> {
  const budgetAmount = parseInt(tripData.budget.replace(/[^0-9]/g, '')) || 85000

  const prompt = `Generate budget breakdown for ${tripData.tripLength}-day trip to ${tripData.destination} for ${tripData.travelers} people with total budget ₹${budgetAmount}. Return ONLY JSON: {"total": ${budgetAmount}, "breakdown": {"stay": 35, "food": 20, "transport": 15, "activities": 20, "buffer": 10}}`

  try {
    const text = await callHuggingFace(prompt)
    const parsed = parseModelJson<BudgetData>(stripWhitespace(text), /\{[\s\S]*\}/)
    if (parsed.breakdown) return normalizeBudgetData(parsed)
    throw new Error('Invalid budget JSON')
  } catch (error) {
    console.error('Error generating budget:', error)
    return {
      total: budgetAmount,
      breakdown: { stay: 35, food: 20, transport: 15, activities: 20, buffer: 10 }
    }
  }
}

export async function generateRiskPlanning(tripData: TripData): Promise<RiskData> {
  const dates = generateDates(tripData.startDate || '', tripData.tripLength)

  const prompt = `Generate travel safety and weather info for a ${tripData.tripLength}-day trip to ${tripData.destination}. Return ONLY JSON:
{
  "overall": "Brief safety assessment for ${tripData.destination}.",
  "level": "Low",
  "advisories": ["4 relevant travel advisories"],
  "weather": ["4 weather tips"],
  "safety": ["4 safety precautions"],
  "weatherForecast": [
    {
      "day": 1,
      "date": "${dates[0] || 'Day 1'}",
      "condition": "weather condition",
      "temperature": "temperature range",
      "humidity": "humidity percentage",
      "recommendation": "practical tip"
    }
  ]
}`

  try {
    const text = await callHuggingFace(prompt)
    const parsed = parseModelJson<RiskData>(stripWhitespace(text), /\{[\s\S]*\}/)
    if (parsed.overall) return parsed
    throw new Error('Invalid risk JSON')
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
