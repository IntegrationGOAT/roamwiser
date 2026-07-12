import type { Itinerary } from "../services/groq.ts";

interface RouteSectionProps {
    itineraries: Itinerary[];
    isGenerating: boolean;
    expandedCards: { [key: string]: boolean };
    onToggleCard: (cardId: string) => void;
}

export const RouteSection = ({ itineraries, isGenerating, expandedCards, onToggleCard }: RouteSectionProps) => {
    return (
        <section id="route" className="light" data-spine="Route">
            <div className="sec-head">
                <div className="eyebrow">Your route</div>
                <h2>Your trip, mapped day by day</h2>
                <p className="muted">
                    Every itinerary is built around your interests and travel pace — mornings for the must-sees,
                    afternoons for the thing you actually came for, evenings to slow down.
                </p>
            </div>

            <div className="days">
                {isGenerating ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="skeleton-card">
                            <div className="skeleton-line short"></div>
                            <div className="skeleton-line medium"></div>
                            <div className="skeleton-line long"></div>
                            <div className="skeleton-line medium"></div>
                        </div>
                    ))
                ) : itineraries.length > 0 ? (
                    itineraries.map(itin => (
                        <div
                            key={itin.id}
                            className={`day-card ${expandedCards[itin.id] ? "expanded" : ""}`}
                            onClick={() => onToggleCard(itin.id)}
                        >
                            <div className="day-title">{itin.title}</div>
                            <div className="slot">
                                <span>{itin.description.substring(0, 120)}...</span>
                            </div>
                            {expandedCards[itin.id] && itin.days && (
                                <div className="day-expanded-content">
                                    <div className="day-details">
                                        <p className="day-description">{itin.description}</p>
                                        <div className="day-schedule">
                                            <h4 className="schedule-title">Day-wise Schedule</h4>
                                            {itin.days.map((day, idx) => (
                                                <div key={idx} className="schedule-day">
                                                    <div className="schedule-header">
                                                        DAY {day.day} · {day.date}
                                                    </div>
                                                    <div className="schedule-content">
                                                        <div className="schedule-item">
                                                            <strong>Morning:</strong> {day.morning}
                                                        </div>
                                                        <div className="schedule-item">
                                                            <strong>Afternoon:</strong> {day.afternoon}
                                                        </div>
                                                        <div className="schedule-item">
                                                            <strong>Evening:</strong> {day.evening}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p className="empty-state-title">No itineraries generated yet</p>
                        <p className="empty-state-text">
                            Fill in your trip details and click "Generate my itinerary" to see your personalized travel
                            plans
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
