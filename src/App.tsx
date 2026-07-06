import { useState, useEffect } from 'react'
import { generateItineraries, generateRiskPlanning, generateExploreSpots } from './services/openrouter.ts'
import type { TripData, Itinerary, RiskData, ExploreSpot } from './services/openrouter.ts'
import type { BudgetData } from './services/openrouter.ts'
import { LogoIcon } from './components/Icons'
import { HeroSection } from './components/HeroSection'
import { RouteSection } from './components/RouteSection'
import { BudgetSection } from './components/BudgetSection'
import { SafetySection } from './components/SafetySection'
import { GallerySection } from './components/GallerySection'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { AIChatWidget } from './components/AIChatWidget'

function App() {
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})
  
  const [formData, setFormData] = useState({
    destination: '',
    travelers: '',
    budget: '',
    startDate: '',
    endDate: ''
  })
  
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null)
  const [riskData, setRiskData] = useState<RiskData | null>(null)
  const [exploreSpots, setExploreSpots] = useState<ExploreSpot[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [customInterests, setCustomInterests] = useState<string[]>([])
  const [customInterestInput, setCustomInterestInput] = useState('')

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
      if (prev[cardId]) {
        return {}
      }
      return { [cardId]: true }
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerateItinerary = async () => {
    if (!formData.destination || !formData.travelers || !formData.startDate || !formData.endDate) {
      alert('Please fill in destination, travelers, start date, and end date')
      return
    }

    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 100))

    try {
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

      const generatedItineraries = await generateItineraries(tripData)
      const budgetTotal = parseInt(formData.budget.replace(/[^0-9]/g, '')) || 85000
      const generatedBudget: BudgetData = {
        total: budgetTotal,
        breakdown: { stay: 35, food: 20, transport: 15, activities: 20, buffer: 10 }
      }
      const generatedRisk = await generateRiskPlanning(tripData)
      const generatedExploreSpots = await generateExploreSpots(tripData)

      if (generatedItineraries.length === 0) {
        alert('Failed to generate itineraries. Please check console for errors and try again.')
      }

      setItineraries(generatedItineraries)
      setBudgetData(generatedBudget)
      setRiskData(generatedRisk)
      setExploreSpots(generatedExploreSpots)

      setTimeout(() => scrollToSection('route'), 600)
    } catch (error) {
      console.error('Error generating trip data:', error)
      alert('Failed to generate itinerary. Please try again.')
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
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
            {['hero', 'route', 'budget', 'safety', 'about', 'contact'].map((id) => {
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
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        formData={formData}
        selectedChips={selectedChips}
        customInterests={customInterests}
        customInterestInput={customInterestInput}
        isGenerating={isGenerating}
        onInputChange={handleInputChange}
        onToggleChip={toggleChip}
        onAddCustomInterest={addCustomInterest}
        onCustomInterestKeyPress={handleCustomInterestKeyPress}
        onCustomInterestInputChange={setCustomInterestInput}
        onGenerateItinerary={handleGenerateItinerary}
        onScrollToSection={scrollToSection}
      />

      {/* Route Section */}
      <RouteSection
        itineraries={itineraries}
        isGenerating={isGenerating}
        expandedCards={expandedCards}
        onToggleCard={toggleCard}
      />

      {/* Budget Section */}
      <BudgetSection
        budgetData={budgetData}
        isGenerating={isGenerating}
        formData={formData}
        getBudgetPercent={getBudgetPercent}
      />

      {/* Safety Section */}
      <SafetySection
        riskData={riskData}
        isGenerating={isGenerating}
        expandedCards={expandedCards}
        onToggleCard={toggleCard}
      />


      {/* Gallery Section */}
      <GallerySection
        exploreSpots={exploreSpots}
        isGenerating={isGenerating}
        expandedCards={expandedCards}
        onToggleCard={toggleCard}
      />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* AI Chat Widget */}
      <AIChatWidget />

      {/* Footer */}
      <footer>
        <div className="logo">Roamwise</div>
        <div>© 2026 Jeet Baidya</div>
      </footer>
    </>
  )
}

export default App