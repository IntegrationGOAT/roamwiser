import { useState, useEffect, useRef } from 'react'

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

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  const interests = ['Adventure', 'Food', 'Nature', 'Culture', 'Nightlife', 'Wellness']

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) 
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    )
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
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor nisi in consectetur placerat. Nullam elementum eros non orci vehicula, sed viverra purus mattis. Proin id dolor justo. Vivamus urna odio, tempor eu pellentesque ac, molestie sit amet orci. Proin finibus risus vel justo laoreet, a fermentum lorem gravida. Proin a lorem nisi. Nunc id odio ipsum. Nulla magna nisl, molestie at accumsan sit amet, vehicula eu magna. Nam quis est odio.`
  
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
    <>
      {/* Route Spine */}
      <div id="spine">
        <svg viewBox="0 0 60 1000" preserveAspectRatio="none">
          <line x1="30" y1="0" x2="30" y2="1000" stroke="rgba(237,243,234,.18)" strokeWidth="1.5" strokeDasharray="2 7"/>
          <g id="spine-dots">
            {['hero', 'route', 'budget', 'safety', 'stay', 'about', 'contact'].map((id, i) => {
              const section = document.getElementById(id)
              const y = section ? (section.offsetTop / (document.body.scrollHeight - window.innerHeight)) * 1000 : 0
              const labels: { [key: string]: string } = {
                hero: 'Plan',
                route: 'Route',
                budget: 'Budget',
                safety: 'Safety',
                stay: 'Stay & Eat',
                about: 'About',
                contact: 'Contact'
              }
              return (
                <g 
                  key={id}
                  className={`spine-dot ${activeSection === id ? 'active' : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  <circle className="core" cx="30" cy={y} r="5"/>
                  <text className="spine-label" x="42" y={y + 4}>{labels[id]}</text>
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
      <section id="hero" data-spine="Plan">
        <svg className="contours" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M-50,600 Q300,500 600,600 T1250,550" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".3"/>
          <path d="M-50,650 Q300,560 600,660 T1250,610" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".22"/>
          <path d="M-50,700 Q300,620 600,710 T1250,670" stroke="#5BCBB3" strokeWidth="1" fill="none" opacity=".15"/>
        </svg>
        
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">AI itinerary planning · budget optimiser · live safety alerts</div>
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
              <div className="eyebrow" style={{color: 'var(--color-muted-dark)'}}>01 / RM</div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Destination</label>
                <input type="text" placeholder="e.g. Kerala, India"/>
              </div>
              <div className="field">
                <label>Travellers</label>
                <input type="number" min={1} placeholder="1"/>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Trip length</label>
                <input type="number" min={1} placeholder="Days"/>
              </div>
              <div className="field">
                <label>Total budget</label>
                <input type="text" placeholder="e.g. ₹85,000"/>
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
            </div>
            <div className="field-row">
              <div className="field">
                <label>Start date</label>
                <input type="date" />
              </div>
              <div className="field">
                <label>End date</label>
                <input type="date" />
              </div>
            </div>
            <button className="btn btn-gold ticket-cta">Generate my itinerary →</button>
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
        
        <div className="days">
          <div className="day-card">
            <div className="day-num">DAY 01</div>
            <div className="day-title">Arrival & Old Town</div>
            <div className="slot">
              <span className="tag">Morning</span>
              <span>Land, check into homestay, walk the backwaters promenade</span>
            </div>
            <div className="slot">
              <span className="tag">Afternoon</span>
              <span>Spice market food trail with a local guide</span>
            </div>
            <div className="slot">
              <span className="tag">Evening</span>
              <span>Sunset houseboat, light dinner onboard</span>
            </div>
            <div className="day-cost">Est. ₹3,200 / person</div>
          </div>

          <div className="day-card">
            <div className="day-num">DAY 02</div>
            <div className="day-title">Adventure Trek</div>
            <div className="slot">
              <span className="tag">Morning</span>
              <span>Guided trek to the tea-hill viewpoint</span>
            </div>
            <div className="slot">
              <span className="tag">Afternoon</span>
              <span>River rafting, grade II — beginner friendly</span>
            </div>
            <div className="slot">
              <span className="tag">Evening</span>
              <span>Bonfire & regional folk performance</span>
            </div>
            <div className="day-cost">Est. ₹4,600 / person</div>
          </div>

          <div className="day-card">
            <div className="day-num">DAY 03</div>
            <div className="day-title">Nature & Wildlife</div>
            <div className="slot">
              <span className="tag">Morning</span>
              <span>Sanctuary boat safari, sightings likely at dawn</span>
            </div>
            <div className="slot">
              <span className="tag">Afternoon</span>
              <span>Rest at stay — pool & ayurveda massage</span>
            </div>
            <div className="slot">
              <span className="tag">Evening</span>
              <span>Rooftop dinner, live weather check for tomorrow</span>
            </div>
            <div className="day-cost">Est. ₹3,900 / person</div>
          </div>

          <div className="day-card">
            <div className="day-num">DAY 04</div>
            <div className="day-title">Culture & Departure</div>
            <div className="slot">
              <span className="tag">Morning</span>
              <span>Heritage fort walk & local craft workshop</span>
            </div>
            <div className="slot">
              <span className="tag">Afternoon</span>
              <span>Last food trail stop, pack & checkout</span>
            </div>
            <div className="slot">
              <span className="tag">Evening</span>
              <span>Transfer to airport, buffer built in</span>
            </div>
            <div className="day-cost">Est. ₹2,400 / person</div>
          </div>
        </div>
      </section>

      {/* Budget Optimiser Section */}
      <section id="budget" className="dark" data-spine="Budget">
        <div className="sec-head">
          <div className="eyebrow">Budget optimiser</div>
          <h2>Spend it where the trip needs it</h2>
          <p className="muted">Set one number for the whole trip. Roamwise splits it across stay, food, transport and activities — then finds where a small shift saves real money.</p>
        </div>

        <div className="budget-wrap">
          <div className="bars">
            <div className="bar-row">
              <div className="b-label">Stay</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: '35%'}}></div>
              </div>
              <div className="b-pct">35%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Food</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: '20%'}}></div>
              </div>
              <div className="b-pct">20%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Transport</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: '15%'}}></div>
              </div>
              <div className="b-pct">15%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Activities</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: '20%'}}></div>
              </div>
              <div className="b-pct">20%</div>
            </div>
            <div className="bar-row">
              <div className="b-label">Buffer</div>
              <div className="bar-track">
                <div className="bar-fill" style={{width: '10%'}}></div>
              </div>
              <div className="b-pct">10%</div>
            </div>
          </div>

          <div className="budget-card">
            <div className="eyebrow" style={{color: 'var(--color-muted-light)'}}>Total trip budget</div>
            <div className="budget-total">₹85,000</div>
            <div className="budget-meta">4 travellers · 6 days · Kerala, India</div>
            <div className="save-callout">
              💡 Optimised: shifting two nights to a shoulder-season stay saves roughly <strong>18%</strong> without changing your route.
            </div>
          </div>
        </div>
      </section>

      {/* Safety Advisor Section */}
      <section id="safety" className="light" data-spine="Safety">
        <div className="sec-head">
          <div className="eyebrow">Safety advisor</div>
          <h2>Know before you go, and while you're there</h2>
          <p className="muted">Safe-zone mapping, live weather flags and government advisories, layered directly onto your route.</p>
        </div>

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
                    <p>{loremIpsum}</p>
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
          ].map(tile => (
            <div 
              key={tile.id}
              className={`tile ${tile.big ? 'big' : ''} ${expandedCards[tile.id] ? 'expanded' : ''}`}
              style={{background: expandedCards[tile.id] ? getTileGradient(tile.id) : tile.bg}}
              onClick={() => toggleCard(tile.id)}
            >
              {expandedCards[tile.id] && (
                <div className="tile-expanded-content">
                  <p>{loremIpsum}</p>
                </div>
              )}
              {!expandedCards[tile.id] && <span>{tile.title}</span>}
            </div>
          ))}
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