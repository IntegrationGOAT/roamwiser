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
  const defaultTiles = [
    { id: 'backwaters', title: 'Backwaters, Kerala', bg: 'linear-gradient(160deg,#2E5C50,#0F221D)', big: true },
    { id: 'desert', title: 'Desert dunes, Rajasthan', bg: 'linear-gradient(160deg,#7A4B2A,#2D1D10)', big: false },
    { id: 'coastal', title: 'Coastal cliffs, Goa', bg: 'linear-gradient(160deg,#3D6E7A,#12292E)', big: false },
    { id: 'teahills', title: 'Tea hills, Munnar', bg: 'linear-gradient(160deg,#4A6B3A,#152414)', big: false },
    { id: 'temple', title: 'Temple town, Madurai', bg: 'linear-gradient(160deg,#6B4A7A,#1F1429)', big: false },
    { id: 'mountain', title: 'Mountain trails, Himachal', bg: 'linear-gradient(160deg,#7A5A2A,#2A1E0C)', big: false },
    { id: 'island', title: 'Island hopping, Andaman', bg: 'linear-gradient(160deg,#2A5A7A,#0D1F2A)', big: true }
  ]

  const getTileGradient = (tileId: string): string => {
    const gradients: { [key: string]: string } = {
      'backwaters': 'linear-gradient(160deg,#2E5C50,#0F221D)',
      'desert': 'linear-gradient(160deg,#7A4B2A,#2D1D10)',
      'coastal': 'linear-gradient(160deg,#3D6E7A,#12292E)',
      'teahills': 'linear-gradient(160deg,#4A6B3A,#152414)',
      'temple': 'linear-gradient(160deg,#6B4A7A,#1F1429)',
      'mountain': 'linear-gradient(160deg,#7A5A2A,#2A1E0C)',
      'island': 'linear-gradient(160deg,#2A5A7A,#0D1F2A)'
    }
    return gradients[tileId] || 'linear-gradient(160deg,#2E5C50,#0F221D)'
  }

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
          defaultTiles.map((tile, idx) => {
            const spot = exploreSpots?.[idx]
            return (
              <div 
                key={tile.id}
                className={`tile ${tile.big ? 'big' : ''} ${expandedCards[tile.id] ? 'expanded' : ''}`}
                style={{background: expandedCards[tile.id] ? getTileGradient(tile.id) : tile.bg}}
                onClick={() => onToggleCard(tile.id)}
              >
                {expandedCards[tile.id] && (
                  <div className="tile-expanded-content">
                    <div className="eyebrow">{spot?.title || tile.title}</div>
                    <p dangerouslySetInnerHTML={{__html: spot?.description || 'Explore this destination for a fuller local perspective.'}} />
                  </div>
                )}
                {!expandedCards[tile.id] && <span>{spot?.title || tile.title}</span>}
              </div>
            )
          })
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