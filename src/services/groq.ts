import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

const MODEL = "openai/gpt-oss-20b";
const groq = createGroq({ apiKey: import.meta.env.VITE_GROQ_API_KEY });

export interface TripData {
    destination: string;
    travelers: number;
    tripLength: number;
    budget: string;
    interests: string[];
    startDate?: string;
}

export interface Itinerary {
    id: string;
    num: string;
    title: string;
    description: string;
    days: {
        day: number;
        date: string;
        morning: string;
        afternoon: string;
        evening: string;
    }[];
}

export interface BudgetData {
    total: number;
    breakdown: {
        stay: number;
        food: number;
        transport: number;
        activities: number;
        buffer: number;
    };
}

export interface RiskData {
    overall: string;
    level: string;
    advisories: string[];
    weather: string[];
    safety: string[];
    weatherForecast?: {
        day: number;
        condition: string;
        temperature: string;
        humidity: string;
        recommendation: string;
    }[];
}

export interface ExploreSpot {
    id: string;
    title: string;
    description: string;
}

// Helper function to extract and parse JSON from model responses
function extractAndParseJSON(text: string, isArray = false): unknown | null {
    if (!text) return null;

    // Strip markdown code fences (```json ... ``` or ``` ... ```)
    let cleaned = text.replace(/```(?:json)?\s*([\s\S]*?)```/g, "$1").trim();

    // Try to find JSON in the response
    const pattern = isArray ? /\[[\s\S]*\]/ : /\{[\s\S]*\}/;
    const jsonMatch = cleaned.match(pattern);

    if (!jsonMatch) return null;

    let jsonStr = jsonMatch[0].trim();

    // Try direct parsing first
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        console.log("Initial JSON parse failed, attempting to fix...");
    }

    // Try to fix common JSON issues
    // Remove trailing commas before closing brackets
    jsonStr = jsonStr.replace(/,\s*([}\]])/g, "$1");

    // Try parsing again
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        console.log("Fixed JSON parse still failed, trying more aggressive fix...");
    }

    // More aggressive: try to find complete JSON by matching brackets
    const openChar = isArray ? "[" : "{";
    const closeChar = isArray ? "]" : "}";
    let depth = 0;
    let startIndex = -1;

    for (let i = 0; i < cleaned.length; i++) {
        if (cleaned[i] === openChar) {
            if (depth === 0) startIndex = i;
            depth++;
        } else if (cleaned[i] === closeChar) {
            depth--;
            if (depth === 0 && startIndex !== -1) {
                jsonStr = cleaned.slice(startIndex, i + 1);
                // Remove trailing commas
                jsonStr = jsonStr.replace(/,\s*([}\]])/g, "$1");
                try {
                    return JSON.parse(jsonStr);
                } catch (e) {
                    // Continue to try other approaches
                }
            }
        }
    }

    // If bracket matching never closed (e.g. model output ends mid-JSON),
    // try to extract what we have from startIndex to end
    if (startIndex !== -1) {
        jsonStr = cleaned.slice(startIndex);
        // Remove trailing non-JSON content after the last valid-looking part
        // Try to find the last complete object/array
        const lastClose = jsonStr.lastIndexOf(closeChar);
        if (lastClose !== -1) {
            jsonStr = jsonStr.slice(0, lastClose + 1);
        }
        jsonStr = jsonStr.replace(/,\s*([}\]])/g, "$1");
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            // Continue to fallback approaches
        }
    }

    // Fallback: extract all complete {...} objects by tracking brace depth
    const objects: unknown[] = [];
    let objStart = -1;
    let braceDepth = 0;

    for (let i = 0; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (ch === "{") {
            if (braceDepth === 0) objStart = i;
            braceDepth++;
        } else if (ch === "}") {
            braceDepth--;
            if (braceDepth === 0 && objStart !== -1) {
                const candidate = cleaned.slice(objStart, i + 1);
                const cleanedJson = candidate.replace(/,\s*([}\]])/g, "$1");
                try {
                    const parsed = JSON.parse(cleanedJson);
                    if (typeof parsed === "object" && parsed !== null) {
                        objects.push(parsed);
                    }
                } catch (e) {
                    // Skip invalid objects
                }
                objStart = -1;
            }
        }
    }

    if (objects.length > 0) {
        if (isArray) {
            return objects;
        }
        return objects[0];
    }

    // Last resort: handle malformed array entries
    if (isArray) {
        const firstObjEnd = cleaned.indexOf("},");
        if (firstObjEnd !== -1) {
            const firstObj = cleaned.slice(0, firstObjEnd + 1);
            try {
                const parsed = JSON.parse(firstObj);
                if (typeof parsed === "object" && parsed !== null) {
                    objects.push(parsed);
                }
            } catch (e) {
                // Skip
            }

            const remaining = cleaned.slice(firstObjEnd + 1).trim();
            const entryRegex = /,\s*"([^"]+)"\s*:\s*"([^"]*)"\s*,\s*"([^"]+)"\s*:\s*"([^"]*)"\s*\}/g;
            let entryMatch;
            while ((entryMatch = entryRegex.exec(remaining)) !== null) {
                const key1 = entryMatch[1];
                const val1 = entryMatch[2];
                const key2 = entryMatch[3];
                const val2 = entryMatch[4];
                const reconstructed = `{"id":"${key1}","title":${JSON.stringify(val1)},"${key2}":${JSON.stringify(val2)}}`;
                try {
                    const parsed = JSON.parse(reconstructed);
                    if (typeof parsed === "object" && parsed !== null) {
                        objects.push(parsed);
                    }
                } catch (e) {
                    // Skip
                }
            }
        }

        if (objects.length > 0) {
            return objects;
        }
    }

    return null;
}

async function callGroqAPI(prompt: string): Promise<string> {
    try {
        console.log("Calling Groq via AI SDK...");

        const { text } = await generateText({
            model: groq(MODEL),
            system: "Return only valid JSON. Do not include markdown fences, explanations, or extra text. Keep responses concise.",
            prompt,
            temperature: 0.1,
        });

        console.log("Groq response:", text);
        return text;
    } catch (error) {
        console.error("Error calling Groq API:", error);
        throw error;
    }
}

// Free-form chat: send the user's prompt straight to the model and return
// the generated text. No JSON constraints, no structured output.
export async function generateChatResponse(prompt: string): Promise<string> {
    const { text } = await generateText({
        model: groq(MODEL),
        system:
            "You are RoamwiseAI, a friendly and knowledgeable travel assistant. " +
            "Answer the user's questions clearly, concisely, and helpfully. " +
            "Use markdown formatting when it improves readability.",
        prompt,
        temperature: 0.7,
    });

    return text;
}

// Generate a single itinerary for a specific style
async function generateSingleItinerary(tripData: TripData, index: number, style: string): Promise<Itinerary | null> {
    const prompt = `Create 1 travel itinerary for ${tripData.destination}. Trip length: ${tripData.tripLength} days. Travelers: ${tripData.travelers}. Interests: ${tripData.interests.join(", ")}. Budget: ${tripData.budget}. Start date: ${tripData.startDate || "today"}.

Style: ${style}

Return ONLY valid JSON as a single object.
Keep it compact:
- title: 2-4 words
- description: 1 sentence
- morning/afternoon/evening: short phrases, 4-8 words each
- one day entry for each trip day

Use dates in order from the trip start date.
Format:
{"id":"itin${index}","num":"Itinerary","title":"...","description":"...","days":[{"day":1,"date":"...","morning":"...","afternoon":"...","evening":"..."}]}`;

    try {
        const text = await callGroqAPI(prompt);
        console.log(`Itinerary ${index} Response:`, text);

        const parsed = extractAndParseJSON(text, false);
        if (parsed && typeof parsed === "object") {
            return parsed as Itinerary;
        }

        console.error(`No valid JSON found for itinerary ${index}`);
        return null;
    } catch (error) {
        console.error(`Error generating itinerary ${index}:`, error);
        return null;
    }
}

export async function generateItineraries(tripData: TripData): Promise<Itinerary[]> {
    // Generate 4 itineraries one at a time to avoid large request issues
    const styles = ["Adventure", "Relaxation", "Cultural", "Food & Nightlife"];

    const itineraries: Itinerary[] = [];

    for (let i = 0; i < 4; i++) {
        const itinerary = await generateSingleItinerary(tripData, i, styles[i]);
        if (itinerary) {
            itineraries.push(itinerary);
        }
    }

    // If no itineraries were generated, return empty array
    if (itineraries.length === 0) {
        console.error("No itineraries generated");
        return [];
    }

    return itineraries;
}

const DEFAULT_BUDGET_BREAKDOWN: BudgetData["breakdown"] = {
    stay: 35,
    food: 20,
    transport: 15,
    activities: 20,
    buffer: 10,
};

// The model sometimes returns rupee amounts instead of percentages (or
// percentages that don't sum to 100). This normalizes whatever comes back
// into clean percentages that always sum to 100, so the UI never renders
// values like "29999%".
function normalizeBudgetBreakdown(total: number, raw: unknown): BudgetData["breakdown"] {
    const keys = ["stay", "food", "transport", "activities", "buffer"] as const;
    const rawObj = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

    const numbers: Record<string, number> = {};
    let anyOverHundred = false;

    for (const key of keys) {
        const rawValue = rawObj[key];
        let value: number =
            typeof rawValue === "string" ? Number.parseFloat(rawValue) : typeof rawValue === "number" ? rawValue : NaN;

        if (!Number.isFinite(value) || value < 0) {
            value = DEFAULT_BUDGET_BREAKDOWN[key];
        }
        numbers[key] = value;
        if (value > 100) anyOverHundred = true;
    }

    // If any value is over 100, assume the model returned amounts (₹) rather
    // than percentages, and convert them relative to the total budget.
    if (anyOverHundred && total > 0) {
        for (const key of keys) {
            numbers[key] = (numbers[key] / total) * 100;
        }
    }

    const sum = keys.reduce((acc, key) => acc + numbers[key], 0);

    // If the numbers don't sum to ~100 (allow small rounding drift), rescale
    // them proportionally so they do.
    if (sum > 0 && (sum < 99 || sum > 101)) {
        for (const key of keys) {
            numbers[key] = (numbers[key] / sum) * 100;
        }
    }

    const rounded: Record<string, number> = {};
    for (const key of keys) {
        rounded[key] = Math.max(0, Math.min(100, Math.round(numbers[key])));
    }

    // Correct any rounding drift so the total is exactly 100.
    const roundedSum = keys.reduce((acc, key) => acc + rounded[key], 0);
    const diff = 100 - roundedSum;
    if (diff !== 0) {
        const largestKey = keys.reduce((a, b) => (rounded[a] >= rounded[b] ? a : b));
        rounded[largestKey] = Math.max(0, rounded[largestKey] + diff);
    }

    return rounded as unknown as BudgetData["breakdown"];
}

export async function generateBudget(tripData: TripData): Promise<BudgetData> {
    const budgetAmount = parseInt(tripData.budget.replace(/[^0-9]/g, "")) || 85000;

    const prompt = `Generate a budget breakdown for a ${tripData.tripLength}-day trip to ${tripData.destination} for ${tripData.travelers} people with total budget ₹${budgetAmount}.

The "breakdown" values MUST be percentages of the total budget (whole numbers between 0 and 100) and MUST add up to exactly 100. Do NOT return rupee amounts.

Return ONLY this JSON shape:
{
  "total": ${budgetAmount},
  "breakdown": {
    "stay": 35,
    "food": 20,
    "transport": 15,
    "activities": 20,
    "buffer": 10
  }
}`;

    try {
        const text = await callGroqAPI(prompt);
        console.log("Budget Response:", text);

        const parsed = extractAndParseJSON(text, false);
        if (parsed && typeof parsed === "object") {
            const obj = parsed as Record<string, unknown>;
            const total = typeof obj.total === "number" && Number.isFinite(obj.total) ? obj.total : budgetAmount;
            return {
                total,
                breakdown: normalizeBudgetBreakdown(total, obj.breakdown),
            };
        }

        // Return default if parsing fails
        return {
            total: budgetAmount,
            breakdown: { ...DEFAULT_BUDGET_BREAKDOWN },
        };
    } catch (error) {
        console.error("Error generating budget:", error);
        return {
            total: budgetAmount,
            breakdown: { ...DEFAULT_BUDGET_BREAKDOWN },
        };
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
}`;

    try {
        const text = await callGroqAPI(prompt);
        console.log("Risk Response:", text);

        const parsed = extractAndParseJSON(text, false);
        if (parsed && typeof parsed === "object") {
            return parsed as RiskData;
        }

        // Return default if parsing fails
        return {
            overall: "Standard travel precautions advised",
            level: "Low",
            advisories: ["Check local regulations", "Keep digital copies of documents"],
            weather: ["Monitor weather forecasts", "Pack appropriate clothing"],
            safety: ["Stay in well-lit areas", "Keep emergency contacts handy"],
        };
    } catch (error) {
        console.error("Error generating risk planning:", error);
        return {
            overall: "Standard travel precautions advised",
            level: "Low",
            advisories: ["Check local regulations", "Keep digital copies of documents"],
            weather: ["Monitor weather forecasts", "Pack appropriate clothing"],
            safety: ["Stay in well-lit areas", "Keep emergency contacts handy"],
        };
    }
}

export async function generateExploreSpots(tripData: TripData): Promise<ExploreSpot[]> {
    const prompt = `Create 7 explore spots for ${tripData.destination}. Trip length: ${tripData.tripLength} days.

Return ONLY a valid JSON array of exactly 7 objects. Do NOT use numbered keys like "spot1": — each item must be an array element, not an object property.

Each object should have:
- id: short slug (e.g., "backwaters", "desert")
- title: place or landmark name
- description: a well-formatted paragraph (2-3 sentences) highlighting key points. Use **bold** text to emphasize important features, tips, or highlights.

Format:
[{"id":"spot1","title":"...","description":"..."}]`;

    try {
        const text = await callGroqAPI(prompt);
        console.log("Explore Spots Response:", text);

        const parsed = extractAndParseJSON(text, true);
        if (parsed && Array.isArray(parsed)) {
            return parsed as ExploreSpot[];
        }

        // Return default if parsing fails
        return [
            { id: "backwaters", title: "Backwaters, Kerala", description: "Serene waterways and lush greenery" },
            { id: "desert", title: "Desert dunes, Rajasthan", description: "Golden sands and camel safaris" },
            { id: "coastal", title: "Coastal cliffs, Goa", description: "Dramatic ocean views" },
            { id: "teahills", title: "Tea hills, Munnar", description: "Rolling tea plantations" },
            { id: "temple", title: "Temple town, Madurai", description: "Ancient Dravidian architecture" },
            { id: "mountain", title: "Mountain trails, Himachal", description: "Scenic trekking paths" },
            { id: "island", title: "Island hopping, Andaman", description: "Pristine beaches and coral reefs" },
        ];
    } catch (error) {
        console.error("Error generating explore spots:", error);
        return [
            { id: "backwaters", title: "Backwaters, Kerala", description: "Serene waterways and lush greenery" },
            { id: "desert", title: "Desert dunes, Rajasthan", description: "Golden sands and camel safaris" },
            { id: "coastal", title: "Coastal cliffs, Goa", description: "Dramatic ocean views" },
            { id: "teahills", title: "Tea hills, Munnar", description: "Rolling tea plantations" },
            { id: "temple", title: "Temple town, Madurai", description: "Ancient Dravidian architecture" },
            { id: "mountain", title: "Mountain trails, Himachal", description: "Scenic trekking paths" },
            { id: "island", title: "Island hopping, Andaman", description: "Pristine beaches and coral reefs" },
        ];
    }
}
