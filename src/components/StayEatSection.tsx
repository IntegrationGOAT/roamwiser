import type { StayEatRecommendation } from '../services/openrouter.ts'
import { HotelIcon, CottageIcon, FoodIcon, DiningIcon } from './Icons'

interface StayEatSectionProps {
  stayEatData: StayEatRecommendation[] | null
  isGenerating: boolean
}

export const StayEatSection = ({
  stayEatData,
  isGenerating
}: StayEatSectionProps) => {
  const getIcon = (id: string) => {
    switch(id) {
      case 'backwater-house': return <HotelIcon />
      case 'tea-cottages': return <CottageIcon />
      case 'spice-trail': return <FoodIcon />
      case 'lagoon-dining': return <DiningIcon />
      default: return null
    }
  }

  return (
    <section id="stay" className="dark" data-spine="Stay & Eat">
      <div className="sec-head">
        <div className="eyebrow">Stay & eat</div>
        <h2>Hotels and food, matched to your route</h2>
        <p className="muted">Recommendations shift with your budget and the day's plan — nothing you'd need a detour for.</p>
      </div>

      <div className="cards-row">
        {isGenerating ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton-line" style={{height: '130px'}}></div>
              <div style={{padding: '16px'}}>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line medium"></div>
              </div>
            </div>
          ))
        ) : stayEatData && stayEatData.length > 0 ? (
          stayEatData.map(card => (
            <div key={card.id} className="rec-card">
              <div className="rec-photo" style={{background: card.bg}}>
                {getIcon(card.id)}
              </div>
              <div className="rec-body">
                <div className="rec-tag">{card.tag}</div>
                <div className="rec-title">{card.title}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p className="empty-state-title">No recommendations generated yet</p>
            <p className="empty-state-text">Generate your itinerary to see personalized stay & dining recommendations</p>
          </div>
        )}
      </div>
    </section>
  )
}