import { useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
  followUp?: FAQ[]
}

const faqData: FAQ[] = [
  {
    id: 'greeting',
    question: '👋 Hi! I\'m RoamwiseAI',
    answer: 'Welcome! I\'m here to help you plan the perfect trip. I can assist you with destinations, budgeting, itineraries, safety tips, accommodations, and much more. What would you like to know?',
    followUp: [
      {
        id: 'destinations',
        question: '🌍 How do I choose a destination?',
        answer: 'Great question! Consider these factors:\n\n1. **Budget** - How much can you spend?\n2. **Duration** - How many days do you have?\n3. **Interests** - Adventure, culture, relaxation, food?\n4. **Season** - What\'s the weather like?\n5. **Travel style** - Luxury, budget, backpacking?\n\nPopular choices: Kerala (nature), Goa (beaches), Rajasthan (culture), Himachal (adventure)',
        followUp: [
          {
            id: 'kerala',
            question: '🏞️ Tell me about Kerala',
            answer: 'Kerala is perfect for nature lovers!\n\n**Best time:** October-March\n**Duration:** 5-7 days\n**Budget:** ₹25,000-50,000\n\nMust-visit: Munnar (tea gardens), Alleppey (backwaters), Kovalam (beaches), Wayanad (wildlife)\n\nActivities: Houseboat stays, Ayurvedic spa, trekking, wildlife safaris',
            followUp: [
              {
                id: 'kerala-budget',
                question: '💰 Budget for Kerala trip',
                answer: 'Here\'s a breakdown:\n\n**Budget (₹20,000-30,000):**\n- Accommodation: ₹800-1,500/night\n- Food: ₹500-800/day\n- Transport: ₹3,000-5,000\n- Activities: ₹2,000-4,000\n\n**Mid-range (₹40,000-60,000):**\n- Hotels: ₹2,500-4,000/night\n- Meals: ₹1,000-1,500/day\n- Private transport: ₹8,000-12,000\n- Experiences: ₹5,000-8,000',
                followUp: [
                  {
                    id: 'save-money',
                    question: '💡 How to save money?',
                    answer: 'Smart saving tips:\n\n1. **Book in advance** - Flights & hotels\n2. **Travel off-season** - 30-40% cheaper\n3. **Use public transport** - Trains & buses\n4. **Eat local** - Street food & small restaurants\n5. **Group tours** - Split costs\n6. **Homestays** - Cheaper than hotels\n7. **Free attractions** - Parks, temples, beaches\n\nPro tip: Use Roamwise budget optimizer!',
                    followUp: []
                  },
                  {
                    id: 'best-time',
                    question: '📅 Best time to visit?',
                    answer: '**Peak Season (Dec-Feb):**\n- Perfect weather (20-30°C)\n- Higher prices\n- Book 2-3 months ahead\n\n**Moderate (Oct-Nov, Mar-Apr):**\n- Good weather\n- Moderate prices\n- Less crowded\n\n**Off-season (May-Sep):**\n- Monsoon (beautiful landscapes!)\n- 40% discounts\n- Fewer tourists',
                    followUp: []
                  }
                ]
              },
              {
                id: 'kerala-itinerary',
                question: '📋 5-day itinerary?',
                answer: '**Day 1:** Arrive Kochi → Fort Kochi sightseeing → Chinese fishing nets → Evening at Marine Drive\n\n**Day 2:** Kochi → Munnar (4 hrs) → Tea gardens → Eravikulam National Park\n\n**Day 3:** Munnar → Thekkady (3 hrs) → Periyar Wildlife Sanctuary → Spice plantation tour\n\n**Day 4:** Thekkady → Alleppey (3 hrs) → Houseboat check-in → Backwater cruise → Overnight stay\n\n**Day 5:** Alleppey → Kovalam (2.5 hrs) → Beach time → Departure',
                followUp: []
              }
            ]
          },
          {
            id: 'goa',
            question: '🏖️ Tell me about Goa',
            answer: 'Goa is India\'s beach paradise!\n\n**Best time:** November-February\n**Duration:** 3-5 days\n**Budget:** ₹15,000-35,000\n\n**North Goa:** Anjuna, Baga, Calangute (party beaches, water sports)\n**South Goa:** Palolem, Agonda (peaceful, clean)\n\nDon\'t miss: Dudhsagar Falls, Old Goa churches, spice plantations, dolphin watching',
            followUp: [
              {
                id: 'goa-activities',
                question: '🎯 Things to do in Goa?',
                answer: '**Water Sports:**\n- Parasailing, jet skiing, banana ride\n- Scuba diving (₹3,000-5,000)\n- Snorkeling\n\n**Nightlife:**\n- Beach shacks with live music\n- Clubs: Tito\'s, Club Cubana\n- Casino cruises\n\n**Culture:**\n- Old Goa churches (UNESCO)\n- Spice plantations\n- Anjuna flea market (Wednesday)\n\n**Food:**\n- Fish curry rice, vindaloo, xacuti\n- Feni (local drink)\n- Beach barbeques',
                followUp: []
              }
            ]
          }
        ]
      },
      {
        id: 'budget',
        question: '💰 How do I plan my budget?',
        answer: 'Smart budgeting is key! Here\'s how:\n\n**1. Set your total budget**\n**2. Allocate percentages:**\n- Accommodation: 30-35%\n- Food: 20-25%\n- Transport: 15-20%\n- Activities: 15-20%\n- Shopping/misc: 10%\n\n**3. Use Roamwise budget optimizer**\nWe\'ll help you optimize every rupee!\n\n**4. Track expenses**\nUse apps or spreadsheets',
        followUp: [
          {
            id: 'save-money',
            question: '💡 How to save money?',
            answer: 'Smart saving tips:\n\n1. **Book in advance** - Flights & hotels\n2. **Travel off-season** - 30-40% cheaper\n3. **Use public transport** - Trains & buses\n4. **Eat local** - Street food & small restaurants\n5. **Group tours** - Split costs\n6. **Homestays** - Cheaper than hotels\n7. **Free attractions** - Parks, temples, beaches\n\nPro tip: Use Roamwise budget optimizer!',
            followUp: []
          },
          {
            id: 'hidden-costs',
            question: '⚠️ Hidden costs to consider?',
            answer: 'Don\'t forget these:\n\n**Travel Insurance:** ₹500-1,500\n**Visa fees:** ₹1,000-5,000 (if international)\n**Airport transfers:** ₹500-2,000\n**Tips & gratuities:** ₹200-500/day\n**Entry fees:** ₹50-500 per monument\n**Local transport:** ₹100-500/day\n**Emergency buffer:** 10-15% of budget\n\nAlways keep 15% extra for unexpected expenses!',
            followUp: []
          }
        ]
      },
      {
        id: 'itinerary',
        question: '📋 How do I make an itinerary?',
        answer: 'Perfect itineraries balance structure and flexibility!\n\n**Step 1:** List must-visit places\n**Step 2:** Group by location\n**Step 3:** Allocate time realistically\n**Step 4:** Add buffer time\n**Step 5:** Book key activities in advance\n\n**Golden rules:**\n- Don\'t overpack (max 2-3 activities/day)\n- Keep one day free\n- Mix sightseeing with relaxation\n- Check opening hours\n\nUse Roamwise to generate optimized day-by-day plans!',
        followUp: [
          {
            id: 'day-planning',
            question: '📅 How to plan each day?',
            answer: '**Morning (8 AM - 12 PM):**\n- Main attraction/activity\n- Best light for photos\n- Less crowded\n\n**Afternoon (12 PM - 4 PM):**\n- Lunch break\n- Indoor activities (museums)\n- Rest during peak heat\n\n**Evening (4 PM - 8 PM):**\n- Secondary attractions\n- Sunset viewpoints\n- Local markets\n\n**Night (8 PM onwards):**\n- Dinner\n- Entertainment\n- Leisurely walks',
            followUp: []
          }
        ]
      },
      {
        id: 'safety',
        question: '🛡️ Safety tips for travelers?',
        answer: 'Stay safe while exploring!\n\n**Before you go:**\n- Research destination safety\n- Share itinerary with family\n- Get travel insurance\n- Save emergency numbers\n\n**During travel:**\n- Keep valuables secure\n- Use hotel safes\n- Stay aware of surroundings\n- Avoid isolated areas at night\n- Trust your instincts\n\n**Health:**\n- Carry basic medicines\n- Drink bottled water\n- Eat at busy places\n- Get travel vaccinations',
        followUp: [
          {
            id: 'emergency',
            question: '🚨 Emergency contacts?',
            answer: '**India Emergency Numbers:**\n- Police: 100\n- Fire: 101\n- Ambulance: 102\n- Tourist Helpline: 1363\n- Women Helpline: 1091\n\n**Save these apps:**\n- Google Maps (offline maps)\n- Uber/Ola (safe transport)\n- Zomato/Swiggy (food delivery)\n- Paytm (cashless payments)\n\n**Pro tip:** Keep digital & physical copies of important documents!',
            followUp: []
          }
        ]
      },
      {
        id: 'packing',
        question: '🎒 What should I pack?',
        answer: 'Pack smart, travel light!\n\n**Essentials:**\n- ID proof (multiple copies)\n- Cash & cards\n- Phone & charger\n- Medications\n- Toiletries\n\n**Clothing:**\n- Comfortable walking shoes\n- Weather-appropriate clothes\n- One formal outfit\n- Rain gear (if needed)\n\n**Tech:**\n- Power bank\n- Camera\n- Universal adapter\n- Portable WiFi (optional)\n\n**Pro tip:** Roll clothes to save space!',
        followUp: [
          {
            id: 'packing-tips',
            question: '💡 Packing hacks?',
            answer: '**Space savers:**\n- Roll clothes instead of folding\n- Use packing cubes\n- Wear heaviest items while traveling\n- Pack travel-size toiletries\n\n**Must-carry:**\n- First-aid kit\n- Power bank (20,000mAh)\n- Reusable water bottle\n- Snacks for journey\n- Umbrella/raincoat\n- Sunscreen & sunglasses\n\n**Documents (digital + physical):**\n- ID proof\n- Booking confirmations\n- Travel insurance\n- Emergency contacts',
            followUp: []
          }
        ]
      },
      {
        id: 'food',
        question: '🍽️ Food recommendations?',
        answer: 'Taste the local flavors!\n\n**Street Food (safe & cheap):**\n- Chaat, vada pav, dosa\n- Kathi rolls, momos\n- Pani puri, bhel puri\n\n**Regional specialties:**\n- North: Butter chicken, biryani\n- South: Dosa, idli, sambar\n- East: Momos, fish curry\n- West: Dhokla, pav bhaji\n\n**Tips:**\n- Eat where locals eat\n- Avoid raw/uncooked food\n- Drink bottled water\n- Try local thalis',
        followUp: [
          {
            id: 'food-safety',
            question: '⚠️ Food safety tips?',
            answer: '**DO:**\n✓ Eat at busy places (high turnover)\n✓ Eat freshly cooked food\n✓ Peel fruits yourself\n✓ Drink bottled/boiled water\n✓ Try local yogurt (helps digestion)\n\n**DON\'T:**\n✗ Eat raw/uncooked food\n✗ Drink tap water\n✗ Eat from unhygienic stalls\n✗ Overeat spicy food\n✗ Mix too many new foods\n\n**Remember:** "Boil it, cook it, peel it, or forget it!"',
            followUp: []
          }
        ]
      },
      {
        id: 'transport',
        question: '🚗 How to get around?',
        answer: 'Multiple transport options!\n\n**Public Transport:**\n- Metro (cities: Delhi, Mumbai, Bangalore)\n- Buses (state-run & private)\n- Trains (long distance)\n\n**Private Options:**\n- Taxis (Ola, Uber)\n- Auto-rickshaws (negotiate!)\n- Bike rentals\n- Self-drive cars\n\n**Inter-city:**\n- Flights (expensive, fast)\n- Trains (scenic, affordable)\n- Buses (budget option)\n\n**Tip:** Book trains 2-3 months in advance for best prices!',
        followUp: [
          {
            id: 'train-travel',
            question: '🚂 Train travel tips?',
            answer: '**Booking:**\n- IRCTC website/app\n- Book 2-3 months ahead\n- Tatkal (last minute, expensive)\n\n**Classes:**\n- 3AC (best balance)\n- 2AC (more comfortable)\n- Sleeper (budget option)\n\n**Tips:**\n- Carry your own water & snacks\n- Keep ID proof handy\n- Book seats in advance for groups\n- Download offline maps\n- Carry power bank',
            followUp: []
          }
        ]
      },
      {
        id: 'accommodation',
        question: '🏨 Where should I stay?',
        answer: 'Choose based on budget & preference!\n\n**Luxury (₹5,000+/night):**\n- 5-star hotels\n- Resorts\n- Boutique hotels\n\n**Mid-range (₹2,000-5,000):**\n- 3-4 star hotels\n- Good amenities\n- Central locations\n\n**Budget (₹500-2,000):**\n- Hostels\n- Homestays\n- Budget hotels\n- Guesthouses\n\n**Pro tips:**\n- Read recent reviews\n- Check location on map\n- Compare prices on multiple sites',
        followUp: [
          {
            id: 'booking-tips',
            question: '📱 Best booking platforms?',
            answer: '**Hotels:**\n- Booking.com (best cancellation)\n- Agoda (Asia focus)\n- MakeMyTrip (Indian deals)\n- Airbnb (unique stays)\n\n**Hostels:**\n- Hostelworld\n- Booking.com\n\n**Homestays:**\n- Airbnb\n- Homestay.com\n- Local tourism websites\n\n**Money-saving tips:**\n- Compare prices across platforms\n- Check hotel website directly\n- Use credit card rewards\n- Book non-refundable for discounts',
            followUp: []
          }
        ]
      }
    ]
  },
  {
    id: 'weather',
    question: '🌤️ Weather considerations?',
    answer: 'Plan around the weather!\n\n**Check before booking:**\n- Temperature ranges\n- Rainfall patterns\n- Peak tourist seasons\n\n**Pack accordingly:**\n- Summer: Light clothes, sunscreen\n- Winter: Warm layers, jackets\n- Monsoon: Rain gear, umbrella\n\n**Best seasons:**\n- Most places: Oct-Mar\n- Hill stations: Mar-Jun, Sep-Nov\n- Beaches: Nov-Feb\n\n**Pro tip:** Weather can change in mountains - pack layers!',
    followUp: [
      {
        id: 'monsoon-travel',
        question: '🌧️ Travel during monsoon?',
        answer: 'Monsoon travel has pros & cons!\n\n**Pros:**\n- Lush green landscapes\n- Fewer tourists\n- Lower prices (30-50% off)\n- Waterfalls at peak\n\n**Cons:**\n- Heavy rainfall\n- Landslide risks\n- Some places closed\n- Limited outdoor activities\n\n**Best monsoon destinations:**\n- Kerala (backwaters beautiful)\n- Western Ghats (waterfalls)\n- Meghalaya (rainiest place!)\n- Goa (less crowded)\n\n**Safety:** Check road conditions, avoid hilly areas during heavy rain',
        followUp: []
      }
    ]
  },
  {
    id: 'documents',
    question: '📄 Required documents?',
    answer: 'Keep these ready!\n\n**Domestic travel:**\n- Government ID (Aadhaar, PAN, DL)\n- Booking confirmations\n- COVID vaccination (if required)\n\n**International travel:**\n- Passport (6+ months validity)\n- Visa\n- Travel insurance\n- Flight tickets\n- Hotel bookings\n- Return ticket\n- Foreign currency\n\n**Pro tip:** Keep digital copies on phone + cloud storage!',
    followUp: [
      {
        id: 'visa-info',
        question: '🛂 Visa information?',
        answer: '**Visa types:**\n- Tourist (most common)\n- Business\n- Transit\n- E-visa (many countries)\n\n**Application process:**\n1. Check requirements online\n2. Fill application form\n3. Upload documents\n4. Pay fees\n5. Schedule appointment (if needed)\n6. Wait for approval\n\n**Processing time:**\n- E-visa: 3-7 days\n- Regular: 10-15 days\n- Urgent: 2-3 days (extra cost)\n\n**Tip:** Apply well in advance!',
        followUp: []
      }
    ]
  },
  {
    id: 'money',
    question: '💳 Money & payments?',
    answer: 'Handle money smartly!\n\n**Payment methods:**\n- Cash (always carry some)\n- Debit/Credit cards\n- UPI (India only)\n- Mobile wallets\n\n**Currency exchange:**\n- Airport (worst rates)\n- Banks (good rates)\n- Forex cards (convenient)\n\n**Tips:**\n- Inform bank before travel\n- Keep multiple payment options\n- Withdraw larger amounts (saves fees)\n- Keep emergency cash separate',
    followUp: [
      {
        id: 'atm-safety',
        question: '🏦 ATM safety tips?',
        answer: '**Use ATMs safely:**\n\n✓ Use bank ATMs (not standalone)\n✓ Check for skimming devices\n✓ Cover PIN while typing\n✓ Use during daylight hours\n✓ Keep receipt\n\n**If card gets stuck:**\n- Don\'t leave ATM\n- Call bank immediately\n- Block card if needed\n\n**Pro tip:** Withdraw from bank branches if unsure about ATM safety!',
        followUp: []
      }
    ]
  },
  {
    id: 'photography',
    question: '📸 Photography tips?',
    answer: 'Capture memories beautifully!\n\n**Best times:**\n- Golden hour (sunrise/sunset)\n- Blue hour (after sunset)\n- Morning light (less crowded)\n\n**Gear:**\n- Smartphone (good enough!)\n- Camera (if you have)\n- Power bank\n- Portable tripod\n\n**Tips:**\n- Respect local customs\n- Ask permission for people\n- Sunrise = fewer crowds\n- Edit photos later (don\'t spend hours on location)',
    followUp: [
      {
        id: 'photo-spots',
        question: '📍 Best photo spots?',
        answer: '**Iconic locations:**\n- Taj Mahal (sunrise)\n- Jaipur palaces (golden hour)\n- Kerala backwaters (aerial shots)\n- Ladakh landscapes (blue sky)\n- Goa beaches (sunset)\n\n**Hidden gems:**\n- Local markets\n- Street food stalls\n- Rooftop cafes\n- Less crowded viewpoints\n\n**Pro tip:** Wake up early for crowd-free shots!',
        followUp: []
      }
    ]
  },
  {
    id: 'solo-travel',
    question: '👤 Solo travel tips?',
    answer: 'Traveling alone? Here\'s how!\n\n**Safety:**\n- Research destination well\n- Stay in central areas\n- Keep family updated\n- Trust your instincts\n\n**Social:**\n- Join group tours\n- Stay in hostels\n- Use travel apps\n- Attend local events\n\n**Benefits:**\n- Complete freedom\n- Meet more people\n- Self-discovery\n- Flexible schedule',
    followUp: [
      {
        id: 'solo-destinations',
        question: '🌍 Best solo destinations?',
        answer: '**Safest for solo travelers:**\n\n1. **Kerala** - Very safe, tourist-friendly\n2. **Goa** - Backpacker hub\n3. **Hampi** - Peaceful, historical\n4. **Rishikesh** - Spiritual, community\n5. **Pondicherry** - French charm, safe\n6. **McLeod Ganj** - Tibetan culture\n\n**Tips:**\n- Start with domestic trips\n- Join free walking tours\n- Use women-only compartments (if needed)\n- Stay connected with family',
        followUp: []
      }
    ]
  },
  {
    id: 'family-travel',
    question: '👨‍👩‍👧‍👦 Family travel tips?',
    answer: 'Traveling with family? Plan well!\n\n**With kids:**\n- Shorter travel days\n- Kid-friendly accommodations\n- Pack entertainment\n- Plan rest breaks\n- Research kid attractions\n\n**With elders:**\n- Comfortable transport\n- Medical facilities nearby\n- Less physically demanding\n- Good medical insurance\n\n**General:**\n- Book connecting rooms\n- Carry snacks\n- Plan flexible itinerary\n- Keep medications handy',
    followUp: [
      {
        id: 'family-destinations',
        question: '🏖️ Best family destinations?',
        answer: '**Top family-friendly places:**\n\n1. **Kerala** - Backwaters, beaches, wildlife\n2. **Goa** - Beaches, water sports\n3. **Shimla/Manali** - Cool weather, fun\n4. **Jaipur** - Palaces, culture\n5. **Andaman** - Beaches, snorkeling\n6. **Darjeeling** - Toy train, views\n\n**Activities for kids:**\n- Wildlife sanctuaries\n- Beaches\n- Amusement parks\n- Train journeys\n- Cultural shows',
        followUp: []
      }
    ]
  },
  {
    id: 'weather-info',
    question: '🌡️ Weather information?',
    answer: 'Plan your trip around weather!\n\n**Summer (Mar-Jun):**\n- Hot (35-45°C)\n- Stay hydrated\n- Visit hill stations\n- Carry sunscreen\n\n**Monsoon (Jul-Sep):**\n- Heavy rainfall\n- Lush greenery\n- Lower prices\n- Some areas inaccessible\n\n**Winter (Oct-Feb):**\n- Pleasant (10-25°C)\n- Best time to travel\n- Peak season\n- Book in advance',
    followUp: [
      {
        id: 'packing-weather',
        question: '🎒 Pack for weather?',
        answer: '**Summer packing:**\n- Light cotton clothes\n- Sunscreen (SPF 50+)\n- Sunglasses\n- Hat/cap\n- Water bottle\n- Light scarf\n\n**Monsoon packing:**\n- Raincoat/umbrella\n- Waterproof shoes\n- Quick-dry clothes\n- Plastic bags for electronics\n- Insect repellent\n\n**Winter packing:**\n- Warm layers\n- Jacket/sweater\n- Thermals (hill stations)\n- Gloves, scarf\n- Moisturizer',
        followUp: []
      }
    ]
  }
]

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFAQ, setCurrentFAQ] = useState<FAQ | null>(null)
  const [displayedFAQs, setDisplayedFAQs] = useState<FAQ[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'question' | 'answer' | 'options', content: string }>>([])

  const showThinking = () => {
    setIsThinking(true)
    setChatHistory(prev => [...prev, { type: 'question', content: currentFAQ?.question || '' }])
    
    setTimeout(() => {
      setIsThinking(false)
      if (currentFAQ?.answer) {
        setChatHistory(prev => [...prev, { type: 'answer', content: currentFAQ.answer }])
      }
      if (currentFAQ?.followUp && currentFAQ.followUp.length > 0) {
        setDisplayedFAQs(currentFAQ.followUp)
      }
    }, 2000)
  }

  const handleFAQClick = (faq: FAQ) => {
    setCurrentFAQ(faq)
    showThinking()
  }

  const handleBack = () => {
    setCurrentFAQ(null)
    setDisplayedFAQs([])
    setChatHistory([])
  }

  const openChat = () => {
    setIsOpen(true)
    setDisplayedFAQs(faqData)
    setChatHistory([])
    setCurrentFAQ(null)
  }

  const closeChat = () => {
    setIsOpen(false)
    setCurrentFAQ(null)
    setDisplayedFAQs([])
    setChatHistory([])
  }

  return (
    <>
      {/* Chat Button */}
      <button 
        className="ai-chat-button"
        onClick={openChat}
        aria-label="Open AI Chat"
      >
        <span className="ai-tooltip">RoamwiseAI</span>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <span className="ai-icon">✨</span>
              <span>RoamwiseAI</span>
            </div>
            <div className="ai-status">
              <span className="status-dot"></span>
              Online
            </div>
            <button 
              className="ai-close-button"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="ai-chat-messages">
            {chatHistory.map((item, index) => (
              <div 
                key={index} 
                className={`ai-message ${item.type === 'question' ? 'user-message' : 'ai-message-text'}`}
              >
                <div className="message-content">
                  {item.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="ai-message ai-message-text">
                <div className="message-content thinking">
                  <div className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {!currentFAQ && displayedFAQs.length > 0 && (
              <div className="faq-options">
                {displayedFAQs.map(faq => (
                  <button
                    key={faq.id}
                    className="faq-button"
                    onClick={() => handleFAQClick(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            {currentFAQ && !isThinking && displayedFAQs.length > 0 && (
              <div className="faq-options">
                <button
                  className="faq-button back-button"
                  onClick={handleBack}
                >
                  ← Back to main menu
                </button>
                {displayedFAQs.map(faq => (
                  <button
                    key={faq.id}
                    className="faq-button"
                    onClick={() => handleFAQClick(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}