import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to clean JSON string if Gemini adds markdown
const cleanJson = (text: string) => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export interface NameAnalysisResult {
  origin: string;
  meaning: string;
  personality: string;
  fatherSynergy: string;
  funFact: string;
}

export const generateNameAnalysis = async (name: string, fatherName: string, language: Language): Promise<NameAnalysisResult> => {
  if (!name.trim()) throw new Error("Name is required");

  const prompt = `
    Analyze the name "${name}" ${fatherName ? `and its connection with the father's name "${fatherName}"` : ''}.
    IMPORTANT: The output MUST be in the "${language.name}" (${language.nativeName}) language.
    
    Return it as a strictly formatted JSON object with the following keys. 
    Do NOT use Markdown. Just raw JSON.
    
    JSON Keys:
    - "origin": Origin and Etymology of the name.
    - "meaning": Core meaning of the name.
    - "personality": Detailed personality traits associated with this name.
    - "fatherSynergy": If father's name is provided, describe the bond/synergy between names. If not, give a general advice for success.
    - "funFact": A unique or historical fact about the name.

    Ensure the content is detailed, professional, and written in the correct script for ${language.name}.
  `;

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    
    return JSON.parse(cleanJson(response.text || '{}'));
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate insights.");
  }
};

export interface DobAnalysisResult {
  zodiac: string;
  numerology: string;
  dayBorn: string; // The day of the week they were born
  islamicDate: string;
  gregorianDate: string;
  otherCalendar: string; // Any other relevant calendar (e.g. Chinese, Hindu)
  quote: string;
}

export const generateDobAnalysis = async (day: string, month: string, year: string, language: Language): Promise<DobAnalysisResult> => {
  const prompt = `
    Analyze the date of birth: ${day}/${month}/${year} (DD/MM/YYYY).
    IMPORTANT: The output MUST be in the "${language.name}" (${language.nativeName}) language.
    
    Return strictly as a JSON object with these keys:
    
    - "zodiac": Zodiac Sign & Elemental Qualities.
    - "numerology": Life Path Number & Meaning.
    - "dayBorn": The specific Day of the Week this date fell on (e.g. Monday).
    - "islamicDate": The estimated date in the Islamic (Hijri) calendar.
    - "gregorianDate": The standard English date format.
    - "otherCalendar": Convert this date to one other famous traditional calendar (e.g. Bikrami, Chinese, or Greek) relevant to the region or general history.
    - "quote": A short motivational quote for this person.
  `;

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(cleanJson(response.text || '{}'));
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to analyze date.");
  }
};

export const generateHistoryEvents = async (day: string, month: string, year: string, language: Language): Promise<string> => {
  const prompt = `
    Act as a news historian.
    Target Date: ${day} / ${month} / ${year}.
    Target Language: "${language.name}" (${language.nativeName}).

    Task:
    1. Find major news headlines and world events that happened specifically on ${day} ${month}, ${year} (the day this person was born).
    2. Also include 1-2 major historical events that happened on this calendar day (${day}/${month}) in other years.
    
    Output Format:
    - Provide the output purely in the ${language.name} language.
    - Use a clean, bulleted list format.
    - If you cannot find events for that specific year, fallback to "On this day in history" generally.
    - Style it as "Headlines from your Birthday" and "On this Day in History".
  `;

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No history found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to fetch history.");
  }
};

export interface CityAnalysisResult {
  history: string;
  geography: string;
  people: string;
  nostalgia: string;
}

export const generateCityInsights = async (city: string, country: string, language: Language): Promise<CityAnalysisResult> => {
  const prompt = `
    Analyze the city "${city}" in "${country}".
    IMPORTANT: The output MUST be in the "${language.name}" (${language.nativeName}) language.
    
    Return a strictly formatted JSON object with these exact keys:
    
    - "history": A brief but engaging summary of the city's historical significance and origins.
    - "geography": Describe the land, the terrain, the climate, and the physical beauty of the place.
    - "people": Describe the nature, hospitality, culture, and demeanor of the local people.
    - "nostalgia": Evoke a sense of old memories, what the city felt like in the past, its classic vibe, or "Purani Yaadein".

    Tone: Professional yet evocative and storytelling.
  `;

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(cleanJson(response.text || '{}'));
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to analyze city.");
  }
};