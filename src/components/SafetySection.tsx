import type { RiskData } from "../services/groq.ts";
import { AlertIcon, ShieldIcon, WeatherIcon } from "./Icons";

interface SafetySectionProps {
    riskData: RiskData | null;
    isGenerating: boolean;
    expandedCards: { [key: string]: boolean };
    onToggleCard: (cardId: string) => void;
}

export const SafetySection = ({ riskData, isGenerating, expandedCards, onToggleCard }: SafetySectionProps) => {
    return (
        <section id="safety" className="light" data-spine="Safety">
            <div className="sec-head">
                <div className="eyebrow">Safety advisor</div>
                <h2>Know before you go, and while you're there</h2>
                <p className="muted">
                    Safe-zone mapping, live weather flags and government advisories, layered directly onto your route.
                </p>
            </div>

            {isGenerating ? (
                <div className="safety-grid">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="skeleton-card">
                            <div className="skeleton-line short"></div>
                            <div className="skeleton-line medium"></div>
                            <div className="skeleton-line long"></div>
                        </div>
                    ))}
                </div>
            ) : riskData ? (
                <div className="safety-grid">
                    <div className="safety-card">
                        <ShieldIcon />
                        <h3>Overall Risk Assessment</h3>
                        <p>{riskData.overall}</p>
                        <div className={`badge ${riskData.level === "Low" ? "green" : "amber"}`}>
                            Risk Level: {riskData.level}
                        </div>
                    </div>

                    <div className="safety-card" onClick={() => onToggleCard("weather-forecast")}>
                        <WeatherIcon />
                        <h3>Weather & Climate</h3>
                        <p>Click to see day-wise forecast</p>
                        <ul className="safety-list">
                            {riskData.weather.slice(0, 2).map((tip, idx) => (
                                <li key={idx} className="safety-list-item">
                                    • {tip}
                                </li>
                            ))}
                        </ul>
                        {expandedCards["weather-forecast"] && riskData.weatherForecast && (
                            <div className="weather-forecast">
                                <h4 className="forecast-title">Day-wise Weather Forecast</h4>
                                {riskData.weatherForecast.map((forecast, idx) => (
                                    <div key={idx} className="forecast-day">
                                        <div className="forecast-header">Day {forecast.day}</div>
                                        <div className="forecast-detail">
                                            <strong>Condition:</strong> {forecast.condition}
                                        </div>
                                        <div className="forecast-detail">
                                            <strong>Temp:</strong> {forecast.temperature}
                                        </div>
                                        <div className="forecast-detail">
                                            <strong>Humidity:</strong> {forecast.humidity}
                                        </div>
                                        <div className="forecast-tip">💡 {forecast.recommendation}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="safety-card">
                        <AlertIcon />
                        <h3>Travel Advisories</h3>
                        <p>Important safety information:</p>
                        <ul className="safety-list">
                            {riskData.advisories.map((advisory, idx) => (
                                <li key={idx} className="safety-list-item">
                                    • {advisory}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="safety-card safety-precautions">
                        <h3>Safety Precautions</h3>
                        <div className="safety-tips">
                            {riskData.safety.map((tip, idx) => (
                                <div key={idx} className="safety-tip">
                                    {tip}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <p className="empty-state-title">No safety information generated yet</p>
                    <p className="empty-state-text">
                        Generate your itinerary to get personalized safety advisories and weather forecasts
                    </p>
                </div>
            )}
        </section>
    );
};
