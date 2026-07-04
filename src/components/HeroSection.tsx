interface HeroSectionProps {
  formData: {
    destination: string
    travelers: string
    budget: string
    startDate: string
    endDate: string
  }
  selectedChips: string[]
  customInterests: string[]
  customInterestInput: string
  isGenerating: boolean
  onInputChange: (field: string, value: string) => void
  onToggleChip: (chip: string) => void
  onAddCustomInterest: () => void
  onCustomInterestKeyPress: (e: React.KeyboardEvent) => void
  onCustomInterestInputChange: (value: string) => void
  onGenerateItinerary: () => void
  onScrollToSection: (id: string) => void
}

export const HeroSection = ({
  formData,
  selectedChips,
  customInterests,
  customInterestInput,
  isGenerating,
  onInputChange,
  onToggleChip,
  onAddCustomInterest,
  onCustomInterestKeyPress,
  onCustomInterestInputChange,
  onGenerateItinerary,
  onScrollToSection
}: HeroSectionProps) => {
  const interests = ['Adventure', 'Food', 'Nature', 'Culture', 'Nightlife', ...customInterests]

  return (
    <section id="hero" data-spine="Plan">
      <svg className="contours" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path d="M-50,600 Q300,500 600,600 T1250,550" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".3"/>
        <path d="M-50,650 Q300,560 600,660 T1250,610" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".22"/>
        <path d="M-50,700 Q300,620 600,710 T1250,670" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".15"/>
      </svg>
      
      <div className="hero-grid">
        <div>
          <div className="eyebrow hero-eyebrow">itinerary planning · budget optimiser · live safety alerts</div>
          <h1 className="display">Plan the trip.<br />Skip the <em>guesswork</em>.</h1>
          <p className="hero-sub">Tell Roamwise your budget, your people, your days and what you're into. We build the day-by-day route, optimise the spend, and watch the road ahead for weather and safety so you don't have to.</p>
          <div className="hero-ctas">
            <button className="btn btn-gold" onClick={() => onScrollToSection('hero')}>
              Build my itinerary →
            </button>
            <button className="btn btn-outline" onClick={() => onScrollToSection('safety')}>
              See safety tools
            </button>
          </div>
        </div>

        <div className="ticket" id="plan">
          <div className="ticket-top">
            <div className="eyebrow">Trip builder</div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Destination</label>
              <input 
                type="text" 
                placeholder="e.g. Kerala, India"
                value={formData.destination}
                onChange={(e) => onInputChange('destination', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Travellers</label>
              <input 
                type="number" 
                min={1} 
                placeholder="1"
                value={formData.travelers}
                onChange={(e) => onInputChange('travelers', e.target.value)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Total budget</label>
              <input 
                type="text" 
                placeholder="e.g. ₹85,000"
                value={formData.budget}
                onChange={(e) => onInputChange('budget', e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>Areas of interest</label>
            <div className="chips">
              {interests.map(interest => (
                <div
                  key={interest}
                  className={`chip ${selectedChips.includes(interest) ? 'on' : ''}`}
                  onClick={() => onToggleChip(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
            <div className="custom-interest-input">
              <input 
                type="text" 
                placeholder="Add custom interest..."
                value={customInterestInput}
                onChange={(e) => onCustomInterestInputChange(e.target.value)}
                onKeyPress={onCustomInterestKeyPress}
              />
              <button 
                type="button"
                onClick={onAddCustomInterest}
              >
                Add
              </button>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Start date</label>
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => onInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="field">
              <label>End date</label>
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => onInputChange('endDate', e.target.value)}
              />
            </div>
          </div>
          <button 
            className="btn btn-gold ticket-cta" 
            onClick={onGenerateItinerary}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate my itinerary →'}
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="num">3000+</div>
          <div className="lbl">destinations mapped</div>
        </div>
        <div className="stat">
          <div className="num">₹85,000</div>
          <div className="lbl">budget bands for every traveller</div>
        </div>
        <div className="stat">
          <div className="num">24/7</div>
          <div className="lbl">safety & weather alerts</div>
        </div>
        <div className="stat">
          <div className="num">40+</div>
          <div className="lbl">languages translated live</div>
        </div>
      </div>
    </section>
  )
}