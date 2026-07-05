import type { ExploreSpot } from '../services/openrouter.ts'

interface GallerySectionProps {
  exploreSpots: ExploreSpot[] | null
  isGenerating: boolean
  expandedCards: { [key: string]: boolean }
  onToggleCard: (cardId: string) => void
}

export const GallerySection = ({
  exploreSpots,
  isGenerating,
  expandedCards,
  onToggleCard
}: GallerySectionProps) => {
  const gradients = [
    'linear-gradient(160deg,#2E5C50,#0F221D)',
    'linear-gradient(160deg,#7A4B2A,#2D1D10)',
    'linear-gradient(160deg,#3D6E7A,#12292E)',
    'linear-gradient(160deg,#4A6B3A,#152414)',
    'linear-gradient(160deg,#6B4A7A,#1F1429)',
    'linear-gradient(160deg,#7A5A2A,#2A1E0C)',
    'linear-gradient(160deg,#2A5A7A,#0D1F2A)'
  ]

  const tiles = exploreSpots && exploreSpots.length > 0
    ? exploreSpots.map((spot, idx) => ({
        id: spot.id,
        title: spot.title,
        description: spot.description,
        bg: gradients[idx % gradients.length],
        big: idx === 0 || idx === 6 // first and last are big
      }))
    : [
        { id: 'backwaters', title: 'Backwaters, Kerala', description: '', bg: gradients[0], big: true },
        { id: 'desert', title: 'Desert dunes, Rajasthan', description: '', bg: gradients[1], big: false },
        { id: 'coastal', title: 'Coastal cliffs, Goa', description: '', bg: gradients[2], big: false },
        { id: 'teahills', title: 'Tea hills, Munnar', description: '', bg: gradients[3], big: false },
        { id: 'temple', title: 'Temple town, Madurai', description: '', bg: gradients[4], big: false },
        { id: 'mountain', title: 'Mountain trails, Himachal', description: '', bg: gradients[5], big: false },
        { id: 'island', title: 'Island hopping, Andaman', description: '', bg: gradients[6], big: true }
      ]

  return (
    <section id="gallery" className="dark" data-spine="Explore">
      <div className="sec-head">
        <div className="eyebrow">Explore</div>
        <h2>A world of places to build a route through</h2>
        <p className="muted">Live production galleries pull in real destination photography — placeholders shown here for layout.</p>
      </div>

      <div className="gallery">
        {isGenerating ? (
          Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="skeleton-tile">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line medium"></div>
            </div>
          ))
        ) : exploreSpots && exploreSpots.length > 0 ? (
          tiles.map((tile) => (
            <div 
              key={tile.id}
              className={`tile ${tile.big ? 'big' : ''} ${expandedCards[tile.id] ? 'expanded' : ''}`}
              style={{background: expandedCards[tile.id] ? tile.bg : tile.bg}}
              onClick={() => onToggleCard(tile.id)}
            >
              {expandedCards[tile.id] && (
                <div className="tile-expanded-content">
                  <div className="eyebrow">{tile.title}</div>
                  <p dangerouslySetInnerHTML={{__html: tile.description || 'Explore this destination for a fuller local perspective.'}} />
                </div>
              )}
              {!expandedCards[tile.id] && <span>{tile.title}</span>}
            </div>
          ))
        ) : (
          <>
            <div className="empty-state">
              <p className="empty-state-title">No recommendations generated yet</p>
              <p className="empty-state-text">Generate your itinerary to see personalized stay & dining recommendations</p>
            </div>
            <div className="empty-state">
              <p className="empty-state-title">No explore spots generated yet</p>
              <p className="empty-state-text">Generate your itinerary to discover amazing destinations</p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}