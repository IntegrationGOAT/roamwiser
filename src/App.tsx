import { useState, useEffect } from 'react'
import { generateItineraries, generateBudget, generateRiskPlanning, generateExploreSpots } from './services/huggingface.ts'
import type { TripData, Itinerary, BudgetData, RiskData, ExploreSpot } from './services/huggingface.ts'
import heroBg from './assets/assets.jpg'

const CountUp = ({ end, duration = 2000, suffix = '', prefix = '' }: { end: number, duration?: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      // For large numbers, round to appropriate significant digits
      let currentCount: number
      if (end >= 10000) {
        currentCount = Math.floor(easeOut * end / 1000) * 1000
      } else if (end >= 1000) {
        currentCount = Math.floor(easeOut * end / 100) * 100
      } else {
        currentCount = Math.floor(easeOut * end)
      }
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString('en-IN')
    }
    return num.toString()
  }
  
  return <span>{prefix}{formatNumber(count)}{suffix}</span>
}

// Icons as components
const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C7 2 5 6 5 10c0 6 7 12 7 12s7-6 7-12c0-4-2-8-7-8z" stroke="#D9A441" strokeWidth="1.6"/>
    <circle cx="12" cy="10" r="2.5" stroke="#D9A441" strokeWidth="1.6"/>
  </svg>
)

const ShieldIcon = () => (
  <svg className="safety-icon" viewBox="0 0 24 24" fill="none">
    <path d="M12 2 4 5v6c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V5l-8-3z" stroke="#1E6B44" strokeWidth="1.6"/>
    <path d="M9 12l2 2 4-4" stroke="#1E6B44" strokeWidth="1.6"/>
  </svg>
)

const WeatherIcon = () => (
  <svg className="safety-icon" viewBox="0 0 24 24" fill="none">
    <path d="M4 15a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118.5 15H4z" stroke="#9A5B12" strokeWidth="1.6"/>
    <path d="M8 19l1-2M12 19l1-2M16 19l1-2" stroke="#9A5B12" strokeWidth="1.6"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="safety-icon" viewBox="0 0 24 24" fill="none">
    <path d="M12 2 4 5v6c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V5l-8-3z" stroke="#1E6B44" strokeWidth="1.6"/>
    <path d="M12 8v5M12 16h.01" stroke="#1E6B44" strokeWidth="1.6"/>
  </svg>
)

const HotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{position: 'absolute', bottom: 10, right: 10, width: 30, height: 30, opacity: 0.85}}>
    <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" stroke="#EDF3EA" strokeWidth="1.4"/>
  </svg>
)

const CottageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{position: 'absolute', bottom: 10, right: 10, width: 30, height: 30, opacity: 0.85}}>
    <path d="M4 20l4-14 4 14M14 20l4-9 2 9" stroke="#EDF3EA" strokeWidth="1.4"/>
  </svg>
)

const FoodIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{position: 'absolute', bottom: 10, right: 10, width: 30, height: 30, opacity: 0.85}}>
    <circle cx="12" cy="12" r="8" stroke="#EDF3EA" strokeWidth="1.4"/>
    <path d="M12 6v6l4 2" stroke="#EDF3EA" strokeWidth="1.4"/>
  </svg>
)

const DiningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{position: 'absolute', bottom: 10, right: 10, width: 30, height: 30, opacity: 0.85}}>
    <path d="M7 3v18M17 3v6a3 3 0 01-3 3v9M7 3a3 3 0 000 6" stroke="#EDF3EA" strokeWidth="1.4"/>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{width: 20, height: 20, flexShrink: 0, marginTop: 2, color: '#D9A441'}}>
    <path d="M3 5h18v14H3z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{width: 20, height: 20, flexShrink: 0, marginTop: 2, color: '#D9A441'}}>
    <path d="M3 5c0 9 7 16 16 16l3-4-6-3-2 2c-3-1.5-5-3.5-6-6l2-2-3-6-4 3z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{width: 20, height: 20, flexShrink: 0, marginTop: 2, color: '#D9A441'}}>
    <path d="M12 2C7 2 5 6 5 10c0 6 7 12 7 12s7-6 7-12c0-4-2-8-7-8z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

function App() {
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})
  
  // Form state
  const [formData, setFormData] = useState({
    destination: '',
    travelers: '',
    budget: '',
    startDate: '',
    endDate: ''
  })
  
  // Generated data state
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null)
  const [riskData, setRiskData] = useState<RiskData | null>(null)
  const [exploreSpots, setExploreSpots] = useState<ExploreSpot[] | null>(null)

  const getBudgetPercent = (value: unknown, fallback = 0) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const parsed = Number.parseFloat(value)
      return Number.isFinite(parsed) ? parsed : fallback
    }
    if (value && typeof value === 'object') {
      const candidate = value as { percentage?: unknown; amount?: unknown; value?: unknown }
      return getBudgetPercent(candidate.percentage ?? candidate.amount ?? candidate.value, fallback)
    }
    return fallback
  }
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const defaultInterests = ['Adventure', 'Food', 'Nature', 'Culture', 'Nightlife']
  const [customInterests, setCustomInterests] = useState<string[]>([])
  const [customInterestInput, setCustomInterestInput] = useState('')
  
  const interests = [...defaultInterests, ...customInterests]

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) 
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    )
  }

  const addCustomInterest = () => {
    if (customInterestInput.trim() && !customInterests.includes(customInterestInput.trim())) {
      setCustomInterests(prev => [...prev, customInterestInput.trim()])
      setCustomInterestInput('')
    }
  }

  const handleCustomInterestKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomInterest()
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-spine]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => {
      // If clicking on already expanded card, collapse it
      if (prev[cardId]) {
        return {}
      }
      // Otherwise, expand only this card (collapse all others)
      return { [cardId]: true }
    })
  }

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerateItinerary = async () => {
    if (!formData.destination || !formData.travelers || !formData.startDate || !formData.endDate) {
      alert('Please fill in destination, travelers, start date, and end date')
      return
    }

    // Set generating state first
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Force UI update before starting generation
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      // Calculate trip length from start and end dates
      const start = formData.startDate ? new Date(formData.startDate) : new Date()
      const end = formData.endDate ? new Date(formData.endDate) : new Date()
      const calculatedTripLength = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))

      const tripData: TripData = {
        destination: formData.destination,
        travelers: parseInt(formData.travelers) || 1,
        tripLength: calculatedTripLength,
        budget: formData.budget || '85000',
        interests: selectedChips.length > 0 ? selectedChips : ['General'],
        startDate: formData.startDate || undefined
      }

      // Generate all data in parallel
      const [generatedItineraries, generatedBudget, generatedRisk] = await Promise.all([
        generateItineraries(tripData),
        generateBudget(tripData),
        generateRiskPlanning(tripData)
      ])

      const generatedExploreSpots = await generateExploreSpots(tripData)

      console.log('Generated itineraries:', generatedItineraries)
      console.log('Generated budget:', generatedBudget)
      console.log('Generated risk:', generatedRisk)
      console.log('Generated explore spots:', generatedExploreSpots)

      if (generatedItineraries.length === 0) {
        alert('Failed to generate itineraries. Please check console for errors and try again.')
      }

      setItineraries(generatedItineraries)
      setBudgetData(generatedBudget)
      setRiskData(generatedRisk)
      setExploreSpots(generatedExploreSpots)
      setGenerationProgress(100)

      // Scroll to route section after a short delay
      setTimeout(() => scrollToSection('route'), 600)
    } catch (error) {
      console.error('Error generating trip data:', error)
      alert('Failed to generate itinerary. Please try again.')
    } finally {
      clearInterval(progressInterval)
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationProgress(0)
      }, 600)
    }
  }

  return (
    <>
      {/* Route Spine */}
      <div id="spine">
        <svg viewBox="0 0 60 1000" preserveAspectRatio="none">
          <line x1="30" y1="0" x2="30" y2="1000" stroke="rgba(217,164,65,.15)" strokeWidth="1.5" strokeDasharray="2 7"/>
          <g id="spine-dots">
            {['hero', 'route', 'budget', 'safety', 'stay', 'about', 'contact'].map((id) => {
              const section = document.getElementById(id)
              const y = section ? (section.offsetTop / (document.body.scrollHeight - window.innerHeight)) * 1000 : 0
              return (
                <g 
                  key={id}
                  className={`spine-dot ${activeSection === id ? 'active' : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  <circle className="core" cx="30" cy={y} r="5"/>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Navigation */}
      <nav>
        <div className="logo">
          <LogoIcon />
          Roamwise
        </div>
        <div className="navlinks">
          <a href="#route">Route</a>
          <a href="#budget">Budget</a>
          <a href="#safety">Safety</a>
          <a href="#stay">Stay & Eat</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="btn btn-gold" onClick={() => scrollToSection('hero')}>
          Start planning →
        </button>
      </nav>

      {/* Hero Section */}
      <section id="hero" data-spine="Plan" style={{ '--hero-bg': `url(${heroBg})` } as React.CSSProperties}>
        <svg className="contours" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M-50,600 Q300,500 600,600 T1250,550" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".3"/>
          <path d="M-50,650 Q300,560 600,660 T1250,610" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".22"/>
          <path d="M-50,700 Q300,620 600,710 T1250,670" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".15"/>
        </svg>
        
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow"> itinerary planning · budget optimiser · live safety alerts</div>
            <h1 className="display">Plan the trip.<br />Skip the <em>guesswork</em>.</h1>
            <p className="hero-sub">Tell Roamwise your budget, your people, your days and what you're into. We build the day-by-day route, optimise the spend, and watch the road ahead for weather and safety so you don't have to.</p>
            <div className="hero-ctas">
              <button className="btn btn-gold" onClick={() => scrollToSection('hero')}>
                Build my itinerary →
              </button>
              <button className="btn btn-outline" onClick={() => scrollToSection('safety')}>
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
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Travellers</label>
                <input 
                  type="number" 
                  min={1} 
                  placeholder="1"
                  value={formData.travelers}
                  onChange={(e) => handleInputChange('travelers', e.target.value)}
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
                  onChange={(e) => handleInputChange('budget', e.target.value)}
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
                    onClick={() => toggleChip(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>
              <div style={{display: 'flex', gap: '8px', marginTop: '10px'}}>
                <input 
                  type="text" 
                  placeholder="Add custom interest..."
                  value={customInterestInput}
                  onChange={(e) => setCustomInterestInput(e.target.value)}
                  onKeyPress={handleCustomInterestKeyPress}
                  style={{flex: 1, fontFamily: 'var(--font-family-nunito)', fontSize: '14px', fontWeight: '700', padding: '8px 12px', border: '1.5px solid rgba(20, 36, 32, 0.14)', borderRadius: '999px', outline: 'none'}}
                />
                <button 
                  type="button"
                  onClick={addCustomInterest}
                  style={{fontFamily: 'var(--font-family-nunito)', fontSize: '13px', padding: '8px 16px', background: 'var(--color-ink)', color: 'var(--color-text-light)', border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'}}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="field-row" style={{marginTop: '20px'}}>
              <div className="field">
                <label>Start date</label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="field">
                <label>End date</label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
            <button 
              className="btn btn-gold ticket-cta" 
              onClick={handleGenerateItinerary}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate my itinerary →'}
            </button>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="num"><CountUp end={3000} suffix="+" /></div>
            <div className="lbl">destinations mapped</div>
          </div>
          <div className="stat">
            <div className="num">₹<CountUp end={85000} /></div>
            <div className="lbl">budget bands for every traveller</div>
          </div>
          <div className="stat">
            <div className="num">24/7</div>
            <div className="lbl">safety & weather alerts</div>
          </div>
          <div className="stat">
            <div className="num"><CountUp end={40} suffix="+" /></div>
            <div className="lbl">languages translated live</div>
          </div>
        </div>
      </section>

      {/* Route / Itinerary Section */}
      <section id="route" className="light" data-spine="Route">
        <div className="sec-head">
          <div className="eyebrow">Your route</div>
          <h2>Your trip, mapped day by day</h2>
          <p className="muted">Every itinerary is built around your interests and travel pace — mornings for the must-sees, afternoons for the thing you actually came for, evenings to slow down.</p>
        </div>
        
        {isGenerating && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${generationProgress}%`}}></div>
            </div>
            <div className="progress-text">Generating your personalized itineraries... {generationProgress}%</div>
          </div>
        )}
        
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
          ) : itineraries.length > 0 ? itineraries.map(itin => (
            <div 
              key={itin.id}
              className={`day-card ${expandedCards[itin.id] ? 'expanded' : ''}`}
              onClick={() => toggleCard(itin.id)}
            >
              <div className="day-num">{itin.num}</div>
              <div className="day-title">{itin.title}</div>
              <div className="slot">
                <span>{itin.description.substring(0, 120)}...</span>
              </div>
              {expandedCards[itin.id] && itin.days && (
                <div className="day-expanded-content">
                  <p style={{marginBottom: '16px', fontSize: '15px'}}>{itin.description}</p>
                  <div style={{marginTop: '20px'}}>
                    <h4 style={{fontFamily: 'var(--font-family-fraunces)', fontSize: '18px', marginBottom: '16px', color: 'var(--color-ink)'}}>Day-wise Schedule</h4>
                    {itin.days.map((day: Itinerary['days'][number], idx: number) => (
                      <div key={idx} style={{marginBottom: '16px', padding: '12px', background: 'var(--color-paper-2)', borderRadius: '8px'}}>
                        <div style={{fontFamily: 'var(--font-family-space)', fontSize: '13px', fontWeight: '600', color: 'var(--color-coral)', marginBottom: '8px'}}>
                          DAY {day.day} · {day.date}
                        </div>
                        <div style={{fontSize: '14px', lineHeight: '1.6'}}>
                          <div style={{marginBottom: '4px'}}><strong>Morning:</strong> {day.morning}</div>
                          <div style={{marginBottom: '4px'}}><strong>Afternoon:</strong> {day.afternoon}</div>
                          <div><strong>Evening:</strong> {day.evening}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )) : (
            <div style={{textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted-dark)'}}>
              <p style={{fontSize: '18px', marginBottom: '12px'}}>No itineraries generated yet</p>
              <p style={{fontSize: '15px'}}>Fill in your trip details and click "Generate my itinerary" to see your personalized travel plans</p>
            </div>
          )}
        </div>
      </section>

      {/* Budget Optimiser Section */}
      <section id="budget" className="dark" data-spine="Budget">
        <div className="sec-head">
          <div className="eyebrow">Budget optimiser</div>
          <h2>Spend it where the trip needs it</h2>
          <p className="muted">Set one number for the whole trip. Roamwise splits it across stay, food, transport and activities — then finds where a small shift saves real money.</p>
        </div>

        {isGenerating && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${generationProgress}%`}}></div>
            </div>
            <div className="progress-text">Analysing budget allocation... {generationProgress}%</div>
          </div>
        )}

        {isGenerating ? (
          <div className="budget-wrap">
            <div className="bars">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="skeleton-budget-row">
                  <div className="skeleton-line short" style={{width: '80px'}}></div>
                  <div className="skeleton-line long" style={{height: '12px', borderRadius: '999px', flex: 1}}></div>
                  <div className="skeleton-line short" style={{width: '30px'}}></div>
                </div>
              ))}
            </div>
            <div className="budget-card skeleton-card" style={{padding: '30px', border: 'none', boxShadow: 'none'}}>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line short" style={{width: '50%', marginTop: '16px'}}></div>
              <div className="skeleton-line long" style={{marginTop: '12px'}}></div>
              <div className="skeleton-line long"></div>
            </div>
          </div>
        ) : budgetData ? (
          <div className="budget-wrap">
            <div className="bars">
              <>
                <div className="bar-row">
                  <div className="b-label">Stay</div>
                  {(() => {
                    const stay = getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).stay, 35)
                    return <>
                  <div className="bar-track">
                    <div className="bar-fill" style={{width: `${stay}%`}}></div>
                  </div>
                  <div className="b-pct">{stay}%</div>
                    </>
                  })()}
                </div>
                <div className="bar-row">
                  <div className="b-label">Food</div>
                  {(() => {
                    const food = getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).food, 20)
                    return <>
                  <div className="bar-track">
                    <div className="bar-fill" style={{width: `${food}%`}}></div>
                  </div>
                  <div className="b-pct">{food}%</div>
                    </>
                  })()}
                </div>
                <div className="bar-row">
                  <div className="b-label">Transport</div>
                  {(() => {
                    const transport = getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).transport, 15)
                    return <>
                  <div className="bar-track">
                    <div className="bar-fill" style={{width: `${transport}%`}}></div>
                  </div>
                  <div className="b-pct">{transport}%</div>
                    </>
                  })()}
                </div>
                <div className="bar-row">
                  <div className="b-label">Activities</div>
                  {(() => {
                    const activities = getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).activities, 20)
                    return <>
                  <div className="bar-track">
                    <div className="bar-fill" style={{width: `${activities}%`}}></div>
                  </div>
                  <div className="b-pct">{activities}%</div>
                    </>
                  })()}
                </div>
                <div className="bar-row">
                  <div className="b-label">Buffer</div>
                  {(() => {
                    const buffer = getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).buffer, 10)
                    return <>
                  <div className="bar-track">
                    <div className="bar-fill" style={{width: `${buffer}%`}}></div>
                  </div>
                  <div className="b-pct">{buffer}%</div>
                    </>
                  })()}
                </div>
              </>
            </div>

            <div className="budget-card">
              <div className="eyebrow" style={{color: 'var(--color-muted-light)'}}>Total trip budget</div>
              <div className="budget-total">₹{budgetData.total.toLocaleString('en-IN')}</div>
              <div className="budget-meta">
                {formData.travelers} traveller{formData.travelers !== '1' ? 's' : ''} · {formData.startDate && formData.endDate ? Math.max(1, Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))) + ' days' : '—'} · {formData.destination || 'Kerala, India'}
              </div>
              <div className="save-callout">
                💡 Budget optimized: Stay {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).stay, 35)}%, Food {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).food, 20)}%, Transport {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).transport, 15)}%, Activities {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).activities, 20)}%, Buffer {getBudgetPercent((budgetData.breakdown as unknown as Record<string, unknown>).buffer, 10)}%
              </div>
            </div>
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted-light)'}}>
            <p style={{fontSize: '18px', marginBottom: '12px'}}>No budget generated yet</p>
            <p style={{fontSize: '15px'}}>Generate your itinerary first to see the optimised budget breakdown</p>
          </div>
        )}
      </section>

      {/* Safety Advisor Section */}
      <section id="safety" className="light" data-spine="Safety">
        <div className="sec-head">
          <div className="eyebrow">Safety advisor</div>
          <h2>Know before you go, and while you're there</h2>
          <p className="muted">Safe-zone mapping, live weather flags and government advisories, layered directly onto your route.</p>
        </div>

        {riskData ? (
          <div className="safety-grid">
            <div className="safety-card">
              <ShieldIcon />
              <h3>Overall Risk Assessment</h3>
              <p>{riskData.overall}</p>
              <div className={`badge ${riskData.level === 'Low' ? 'green' : riskData.level === 'Medium' ? 'amber' : 'green'}`}>
                Risk Level: {riskData.level}
              </div>
            </div>

            <div 
              className="safety-card" 
              style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
              onClick={() => toggleCard('weather-forecast')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 40px -15px rgba(20, 36, 32, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 12px 30px -18px rgba(20, 36, 32, 0.2)'
              }}
            >
              <WeatherIcon />
              <h3>Weather & Climate</h3>
              <p>Click to see day-wise forecast</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '12px'}}>
                {riskData.weather.slice(0, 2).map((tip: string, idx: number) => (
                  <li key={idx} style={{marginBottom: '8px', fontSize: '14px'}}>• {tip}</li>
                ))}
              </ul>
              {expandedCards['weather-forecast'] && riskData.weatherForecast && (
                <div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed rgba(20, 36, 32, 0.12)', animation: 'fadeIn 0.3s ease'}}>
                  <h4 style={{fontFamily: 'var(--font-family-fraunces)', fontSize: '16px', marginBottom: '12px'}}>Day-wise Weather Forecast</h4>
                  {riskData.weatherForecast.map((forecast: NonNullable<RiskData['weatherForecast']>[number], idx: number) => (
                    <div key={idx} style={{marginBottom: '12px', padding: '10px', background: 'var(--color-paper-2)', borderRadius: '6px', fontSize: '13px'}}>
                      <div style={{fontWeight: '600', color: 'var(--color-coral)', marginBottom: '4px'}}>Day {forecast.day}</div>
                      <div style={{marginBottom: '2px'}}><strong>Condition:</strong> {forecast.condition}</div>
                      <div style={{marginBottom: '2px'}}><strong>Temp:</strong> {forecast.temperature}</div>
                      <div style={{marginBottom: '2px'}}><strong>Humidity:</strong> {forecast.humidity}</div>
                      <div style={{marginTop: '4px', fontStyle: 'italic'}}>💡 {forecast.recommendation}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="safety-card">
              <AlertIcon />
              <h3>Travel Advisories</h3>
              <p>Important safety information:</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '12px'}}>
                {riskData.advisories.map((advisory: string, idx: number) => (
                  <li key={idx} style={{marginBottom: '8px', fontSize: '14px'}}>• {advisory}</li>
                ))}
              </ul>
            </div>

            <div className="safety-card" style={{gridColumn: 'span 3'}}>
              <h3 style={{marginBottom: '12px'}}>Safety Precautions</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                {riskData.safety.map((tip: string, idx: number) => (
                  <div key={idx} style={{fontSize: '14px', padding: '12px', background: 'rgba(91, 203, 179, 0.1)', borderRadius: '8px', border: '1px solid rgba(91, 203, 179, 0.2)'}}>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="safety-grid">
            <div className="safety-card">
              <ShieldIcon />
              <h3>Safe-zone mapping</h3>
              <p>Areas rated by local safety data, lit up on your route so you know where to walk after dark.</p>
              <div className="badge green">Old Town — low risk</div>
            </div>

            <div className="safety-card">
              <WeatherIcon />
              <h3>Weather alerts</h3>
              <p>Real-time flags mapped to your itinerary, with a same-day indoor alternative when needed.</p>
              <div className="badge amber">Day 3 — heavy rain expected</div>
            </div>

            <div className="safety-card">
              <AlertIcon />
              <h3>Government advisories</h3>
              <p>Official travel-advisory levels pulled in and translated into plain-language guidance.</p>
              <div className="badge green">Level 1 — normal precautions</div>
            </div>
          </div>
        )}
      </section>

      {/* Stay & Eat Section */}
      <section id="stay" className="dark" data-spine="Stay & Eat">
        <div className="sec-head">
          <div className="eyebrow">Stay & eat</div>
          <h2>Hotels and food, matched to your route</h2>
          <p className="muted">Recommendations shift with your budget and the day's plan — nothing you'd need a detour for.</p>
        </div>

        <div className="cards-row">
          {[
            { id: 'backwater-house', tag: 'Heritage stay', title: 'The Backwater House', rating: '★ 4.8', price: '₹4,200/night', bg: 'linear-gradient(135deg,#2E5C50,#173731)' },
            { id: 'tea-cottages', tag: 'Eco stay', title: 'Hillside Tea Cottages', rating: '★ 4.6', price: '₹3,100/night', bg: 'linear-gradient(135deg,#3D5B3F,#173731)' },
            { id: 'spice-trail', tag: 'Street food', title: 'Fort Kochi Spice Trail', rating: '★ 4.9', price: '₹250/meal', bg: 'linear-gradient(135deg,#7A4B2A,#173731)' },
            { id: 'lagoon-dining', tag: 'Fine dining', title: 'Table by the Lagoon', rating: '★ 4.7', price: '₹1,800/person', bg: 'linear-gradient(135deg,#4A3B6B,#173731)' }
          ].map(card => (
            <div 
              key={card.id}
              className={`rec-card ${expandedCards[card.id] ? 'expanded' : ''}`}
              onClick={() => toggleCard(card.id)}
            >
              <div className="rec-photo" style={{background: card.bg}}>
                {card.id === 'backwater-house' && <HotelIcon />}
                {card.id === 'tea-cottages' && <CottageIcon />}
                {card.id === 'spice-trail' && <FoodIcon />}
                {card.id === 'lagoon-dining' && <DiningIcon />}
              </div>
              <div className="rec-body">
                <div className="rec-tag">{card.tag}</div>
                <div className="rec-title">{card.title}</div>
                <div className="rec-meta">
                  <span>{card.rating}</span>
                  <span>{card.price}</span>
                </div>
                {expandedCards[card.id] && (
                  <div className="rec-expanded-content">
                    <p>loremIpsum</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Translation Section */}
      <section id="translate" className="light" data-spine="Speak">
        <div className="sec-head">
          <div className="eyebrow">Speak the place</div>
          <h2>AI translation, right where you need it</h2>
          <p className="muted">Type or speak in your language, get the local phrase back instantly — with an offline pack for when signal doesn't reach.</p>
        </div>

        <div className="translate-wrap">
          <div className="chat-mock">
            <div className="bubble you">Where can I find a good vegetarian breakfast nearby?</div>
            <div className="bubble local">
              അടുത്തുള്ള നല്ല സസ്യാഹാര പ്രാതൽ എവിടെ കിട്ടും? <br />
              <span style={{opacity: 0.6, fontSize: '12px'}}>Malayalam · tap to hear it spoken</span>
            </div>
            <div className="bubble you">Thank you, that's very helpful</div>
            <div className="bubble local">നന്ദി, അത് വളരെ സഹായകരമാണ്</div>
          </div>

          <div>
            <p style={{fontSize: '15px'}} className="muted">
              Roamwise translates text and voice across 40+ languages, tuned for travel — menus, directions, small talk with your driver, all handled the same way.
            </p>
            <div className="lang-pills">
              <div className="lang-pill">Malayalam</div>
              <div className="lang-pill">Hindi</div>
              <div className="lang-pill">Tamil</div>
              <div className="lang-pill">Bengali</div>
              <div className="lang-pill">Japanese</div>
              <div className="lang-pill">Spanish</div>
              <div className="lang-pill">French</div>
              <div className="lang-pill">+ 33 more</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="dark" data-spine="Explore">
        <div className="sec-head">
          <div className="eyebrow">Explore</div>
          <h2>A world of places to build a route through</h2>
          <p className="muted">Live production galleries pull in real destination photography — placeholders shown here for layout.</p>
        </div>

        <div className="gallery">
          {[
            { id: 'backwaters', title: 'Backwaters, Kerala', bg: 'linear-gradient(160deg,#2E5C50,#0F221D)', big: true },
            { id: 'desert', title: 'Desert dunes, Rajasthan', bg: 'linear-gradient(160deg,#7A4B2A,#2D1D10)', big: false },
            { id: 'coastal', title: 'Coastal cliffs, Goa', bg: 'linear-gradient(160deg,#3D6E7A,#12292E)', big: false },
            { id: 'teahills', title: 'Tea hills, Munnar', bg: 'linear-gradient(160deg,#4A6B3A,#152414)', big: false },
            { id: 'temple', title: 'Temple town, Madurai', bg: 'linear-gradient(160deg,#6B4A7A,#1F1429)', big: false },
            { id: 'mountain', title: 'Mountain trails, Himachal', bg: 'linear-gradient(160deg,#7A5A2A,#2A1E0C)', big: false },
            { id: 'island', title: 'Island hopping, Andaman', bg: 'linear-gradient(160deg,#2A5A7A,#0D1F2A)', big: true }
          ].map((tile, idx) => {
            const spot = exploreSpots?.[idx]
            return (
            <div 
              key={tile.id}
              className={`tile ${tile.big ? 'big' : ''} ${expandedCards[tile.id] ? 'expanded' : ''}`}
              style={{background: expandedCards[tile.id] ? getTileGradient(tile.id) : tile.bg}}
              onClick={() => toggleCard(tile.id)}
            >
              {expandedCards[tile.id] && (
                <div className="tile-expanded-content">
                  <div className="eyebrow" style={{marginBottom: '10px'}}>{spot?.title || tile.title}</div>
                  <p>{spot?.description || 'Explore this destination for a fuller local perspective.'}</p>
                </div>
              )}
              {!expandedCards[tile.id] && <span>{spot?.title || tile.title}</span>}
            </div>
            )
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="light" data-spine="About">
        <div className="about-wrap">
          <div>
            <div className="eyebrow">About Roamwise</div>
            <h2 style={{marginTop: 14, fontSize: 'clamp(26px,3vw,36px)'}}>
              Built by people who over-planned one trip too many
            </h2>
            <p style={{marginTop: 18, fontSize: '15.5px'}} className="muted">
              Roamwise started as a shared spreadsheet between three friends who kept re-doing the same work before every trip — comparing budgets, checking safety advisories, hunting for translations at 1am. We turned that spreadsheet into a platform: tell it your budget, your people and your interests, and it does the planning, the number-crunching and the safety-watching for you.
            </p>
            <p style={{marginTop: 14, fontSize: '15.5px'}} className="muted">
              We're a small team based between Kolkata and Kochi, working directly with local guides, homestays and tourism boards so every recommendation is one we'd actually send a friend to.
            </p>
          </div>

          <div>
            <div className="about-stats">
              <div className="about-stat">
                <div className="num"><CountUp end={2022} /></div>
                <div className="lbl">Founded</div>
              </div>
              <div className="about-stat">
                <div className="num"><CountUp end={120} suffix="+" /></div>
                <div className="lbl">Local partners</div>
              </div>
              <div className="about-stat">
                <div className="num"><CountUp end={18} suffix="k" /></div>
                <div className="lbl">Trips planned</div>
              </div>
              <div className="about-stat">
                <div className="num"><CountUp end={4} suffix=".8★" /></div>
                <div className="lbl">Average trip rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="dark" data-spine="Contact">
        <div className="sec-head">
          <div className="eyebrow">Contact</div>
          <h2>Planning something tricky? Talk to us</h2>
          <p className="muted">Group trips, custom safety briefings, corporate off-sites — write in and a real person replies within a day.</p>
        </div>

        <div className="contact-wrap">
          <div>
            <div className="cinfo-row">
              <EmailIcon />
              <div>
                <div className="l">Email</div>
                <div className="v">hello@roamwise.travel</div>
              </div>
            </div>

            <div className="cinfo-row">
              <PhoneIcon />
              <div>
                <div className="l">Phone</div>
                <div className="v">+91 98300 00000</div>
              </div>
            </div>

            <div className="cinfo-row">
              <LocationIcon />
              <div>
                <div className="l">Studio</div>
                <div className="v">Salt Lake, Kolkata · Fort Kochi, Kerala</div>
              </div>
            </div>

            <div className="socials">
              <a href="#">ig</a>
              <a href="#">x</a>
              <a href="#">in</a>
            </div>
          </div>

          <form className="cform" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full name"/>
            <input type="email" placeholder="Email address"/>
            <textarea placeholder="Tell us about your trip..."></textarea>
            <button type="submit" className="btn btn-gold" style={{justifyContent: 'center'}}>
              Send message →
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">Roamwise</div>
        <div>© 2026 Roamwise Travel Technologies · Made for wanderers</div>
      </footer>
    </>
  )
}

export default App