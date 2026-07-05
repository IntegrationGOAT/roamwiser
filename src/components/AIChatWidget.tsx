import React, { useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
  followUp?: FAQ[]
}

const faqData: FAQ[] = [
  {
    id: 'destinations',
    question: '🌍 How do I choose the perfect travel destination?',
    answer: `Choosing the right travel destination is one of the most important decisions you'll make for your trip, and it requires careful consideration of multiple factors that will shape your entire travel experience. The process begins with understanding your personal travel style and what you truly want to get out of your journey, whether that's relaxation on pristine beaches, cultural immersion in historic cities, adventure in natural landscapes, or culinary exploration through local cuisines.

Your budget plays a fundamental role in destination selection, as different countries and cities vary dramatically in cost of living. Research average daily expenses including accommodation, meals, transportation, and activities to ensure your chosen destination aligns with your financial means. Consider that destinations in Southeast Asia, Eastern Europe, and parts of South America typically offer excellent value, while Western Europe, North America, and major global cities like Tokyo or Sydney generally require larger budgets.

The time of year you plan to travel significantly impacts both your experience and costs. Research the climate patterns, seasonal weather conditions, peak tourist seasons, and any major festivals or events that might enhance or complicate your visit. Shoulder seasons often provide the best balance of pleasant weather, manageable crowds, and reasonable prices, while peak seasons guarantee good weather but come with higher prices and larger crowds.

Your interests and passions should guide your destination choice. If you're passionate about ancient history, destinations like Rome, Athens, or Cairo offer unparalleled experiences. For nature lovers, consider New Zealand, Costa Rica, or Norway. Food enthusiasts might gravitate toward Thailand, Italy, or Mexico. Adventure seekers could choose Peru, Nepal, or Tanzania. Aligning your destination with your genuine interests ensures a more fulfilling and memorable travel experience.

Travel time and distance matter more than many people realize. A destination requiring 30+ hours of travel time with multiple connections might not be worth it for a week-long trip, as you'll spend a significant portion of your limited vacation time in transit. Consider destinations that offer a good balance of travel time and experience quality for your available vacation days.

Safety and political stability are non-negotiable considerations. Research current travel advisories from your government, read recent traveler reviews, understand local customs and laws, and assess healthcare quality. Some destinations offer incredible experiences but require additional preparation and awareness, while others provide more straightforward and comfortable travel experiences.

Language barriers can either enhance your travel experience through cultural immersion or create frustrating challenges depending on your personality and travel style. Consider whether you thrive on navigating unfamiliar situations or prefer destinations where communication is easier. English-speaking countries offer convenience, while non-English destinations provide richer cultural experiences for adventurous travelers.

Visa requirements and entry restrictions vary significantly by nationality and destination. Some countries offer visa-free entry or easy e-visas, while others require extensive documentation, interviews, and processing times that can take weeks or months. Factor these requirements into your planning timeline to avoid disappointment.

Connectivity and infrastructure affect your travel comfort. Research internet availability, public transportation quality, road conditions, and tourism infrastructure. Some travelers prefer well-developed destinations with reliable services, while others seek remote locations away from tourist infrastructure for authentic experiences.

Ultimately, the best destination is one that excites you, fits your budget and schedule, matches your interests, and provides the type of experience you're seeking. Trust your instincts when making the final decision, as enthusiasm for your destination will enhance every aspect of your trip.`,
    followUp: []
  },
  {
    id: 'budget-planning',
        question: '💰 How do I plan my travel budget effectively?',
        answer: `Effective budget planning is the foundation of a successful trip, ensuring you can enjoy your travel experience without financial stress. Start by determining your total available funds, including savings specifically allocated for travel, any income you'll earn during your trip, and a comfortable emergency buffer of at least 15-20% of your total budget for unexpected expenses.

Research your destination's cost of living thoroughly by consulting multiple sources including travel blogs, government tourism websites, and recent traveler reviews. Look for current prices on accommodation, meals at different restaurant levels, local transportation costs, attraction entrance fees, and typical activity expenses. Remember that tourist areas often charge 30-50% more than local neighborhoods.

Create a detailed budget breakdown allocating percentages to different categories. A typical allocation might be: 30-35% for accommodation, 20-25% for food and dining, 15-20% for transportation including flights and local transit, 15-20% for activities, tours, and experiences, and 10% for miscellaneous expenses like souvenirs, tips, and incidentals.

Identify hidden costs that many first-time travelers overlook. Budget airlines charge for baggage, many hotels add resort fees or tourist taxes, restaurants may include service charges, some attractions require advance permits or have photography fees, and popular destinations often have higher prices during festivals or peak seasons. Researching these costs prevents unpleasant surprises.

Develop a daily spending limit by dividing your total budget by the number of travel days. This helps you track expenses in real-time and make informed decisions about splurging versus saving. Use budgeting apps like Trail Wallet, TrackMyTravel, or even a simple spreadsheet to record every expense and compare it against your planned allocation.

Implement money-saving strategies without sacrificing experience quality. Book flights and trains well in advance for better prices, eat at local establishments rather than tourist restaurants, use public transportation instead of taxis when safe and practical, choose accommodations with kitchen facilities to prepare some meals, and prioritize free attractions and activities alongside paid experiences.

Consider travel rewards programs and credit card points if you travel frequently. Many credit cards offer sign-up bonuses worth hundreds in travel credits, and loyalty programs with airlines and hotel chains provide free nights, upgrades, and other perks that can significantly reduce future travel costs.

Build flexibility into your budget for spontaneous opportunities. Some of the best travel experiences come from unplanned moments like joining a local festival, taking an impromptu day trip with new friends, or discovering an amazing restaurant. Having a buffer allows you to embrace these moments without financial anxiety.

Track your spending daily and adjust as needed. If you're overspending in one category, look for savings in another. Perhaps you spent more on a special dinner but can compensate by choosing free hiking activities the next day. Regular budget reviews keep you on track throughout your trip.

Remember that travel is an investment in experiences and memories. While being budget-conscious is important, don't let frugality prevent you from enjoying unique opportunities that may only come once. The goal is smart spending, not deprivation.`,
        followUp: [
          {
            id: 'accommodation-tips',
            question: '🏨 How do I choose the right accommodation?',
            answer: `Selecting the right accommodation profoundly impacts your entire travel experience, affecting your comfort, safety, convenience, budget, and opportunities for cultural interaction. The location should be your primary consideration, as staying in the right area can save you hours of daily commuting time, reduce transportation costs significantly, and place you within walking distance of major attractions, restaurants, and entertainment options.

Evaluate different accommodation types based on your needs and preferences. Hotels offer standardized service, privacy, and amenities but tend to be more expensive. Hostels provide budget-friendly options and excellent social opportunities, with many now offering private rooms for travelers seeking more privacy. Guesthouses and homestays offer authentic local experiences and insider knowledge from hosts. Vacation rentals provide space and kitchen facilities ideal for families or longer stays. Boutique hotels offer unique character and personalized service.

Read recent reviews carefully, focusing on comments from travelers with similar needs and expectations. Look for patterns in reviews regarding cleanliness, noise levels, staff helpfulness, location accuracy, and value for money. Recent reviews are more reliable than older ones, as management, ownership, and conditions can change over time.

Consider amenities that matter most for your trip. Reliable WiFi is essential for digital nomads and staying connected with home. Breakfast inclusion saves morning time and money. 24-hour reception is crucial for late arrivals. Laundry facilities benefit longer trips. Air conditioning or heating depends on your destination's climate. Parking matters if you're renting a car. Make a prioritized list of must-have amenities.

Safety features deserve special attention, especially for solo travelers, families, or those arriving late at night. Look for secure locks, well-lit entrances, in-room safes, 24-hour security, and neighborhood safety ratings. Check recent reviews for any safety concerns or incidents reported by previous guests.

Understand cancellation policies before booking. Flexible policies typically cost 10-20% more but provide peace of mind if your plans change. Non-refundable rates offer the lowest prices but mean losing your entire payment if you need to cancel. Choose based on your certainty about travel dates and potential for changes.

Compare prices across multiple booking platforms, as the same property can vary significantly in price depending on the site. Check the hotel's direct website as well, as they sometimes offer better rates, loyalty benefits, or additional perks not available through third-party platforms.

Consider the social atmosphere if you're a solo traveler or enjoy meeting other travelers. Some hostels organize social events, have vibrant common areas, and foster community. Others are quiet and focused on privacy. Choose based on your social preferences and travel goals.

Factor in hidden costs like resort fees, parking charges, cleaning fees for vacation rentals, and local taxes. These can add 20-30% to your quoted price and should be included in your budget calculations.

Book directly with properties for potential advantages. Direct bookings often include free WiFi, breakfast upgrades, early check-in, or late check-out. They also make it easier to request changes or resolve issues directly with the property rather than through a third party.

Trust your instincts when evaluating options. If a property seems too good to be true, has unclear photos, or has concerning review patterns, continue searching. Your accommodation is your home base during your trip, and feeling comfortable and secure there is essential for enjoying your overall travel experience.`,
            followUp: [
              {
                id: 'booking-timing',
                question: '📅 When is the best time to book accommodation?',
                answer: `Timing your accommodation booking strategically can result in significant savings and better availability. For popular destinations during peak tourist seasons, book 2-3 months in advance to secure the best properties at reasonable prices before prime options sell out. During peak periods, the best accommodations at fair prices disappear quickly, and waiting often means either overpaying for remaining premium rooms or settling for subpar options.

Off-season travel offers more flexibility and substantial savings. You can often find excellent deals just 2-4 weeks before your trip, with many properties offering 30-50% discounts below peak rates. Off-season benefits include fewer tourists, more personalized service, and the opportunity to experience destinations with different atmospheres.

The sweet spot for most destinations is 4-8 weeks before travel, balancing early booking discounts with sufficient availability of well-reviewed properties. This timing works well for domestic travel, shoulder season trips, and destinations without major events during your travel dates.

Last-minute bookings within 1-2 weeks of your stay can yield exceptional discounts up to 60%, particularly in business hotels that need to fill empty rooms. However, this strategy carries the risk of limited choices and potential unavailability of your preferred properties. It works best for flexible travelers with backup options.

Weekday rates are typically lower than weekend rates in business-oriented hotels, while leisure destinations often charge more on weekends when most travelers check in. Adjusting your stay days by even one or two nights can reduce costs significantly without changing your overall itinerary.

Non-refundable bookings offer the lowest prices but carry the risk of complete financial loss if plans change. Flexible rates with free cancellation typically cost 20-30% more but provide valuable peace of mind. Consider your travel certainty and potential for changes when choosing between these options.

Monitor prices using tracking tools and alert services that notify you when prices drop for specific properties and dates. Some platforms offer price matching if you find lower rates elsewhere. Setting up alerts for your target properties allows you to book at optimal times without constantly checking rates manually.

Holiday periods, major festivals, school vacation weeks, and special events cause dramatic price surges, often doubling or tripling normal rates. Book 6 months or more in advance during these high-demand periods to secure any availability at reasonable prices. Popular events like Carnival, Oktoberfest, or major sporting events require extremely early planning.

Consider alternative neighborhoods that offer good value. Staying slightly outside the city center or in up-and-coming areas can provide significant savings while still offering convenient access to attractions via public transportation. Research these areas thoroughly for safety and transit connections before booking.

Negotiate directly with smaller properties, especially during off-peak periods. Family-run guesthouses, boutique hotels, and smaller chains may offer discounts for extended stays, cash payment, or direct bookings that aren't advertised on booking platforms. A polite inquiry about better rates can sometimes result in meaningful savings.

Remember that the best time to book balances price, availability, and flexibility. If you find a property you love at a reasonable price with acceptable cancellation terms, booking it provides peace of mind and eliminates the stress of continuing to search while prices might increase.`,
                followUp: [
                  {
                    id: 'location-strategy',
                    question: '📍 How do I choose the best location to stay?',
                    answer: `Location is one of the most critical factors in accommodation selection, as it directly impacts your daily convenience, transportation costs, sightseeing efficiency, and overall travel enjoyment. Start by mapping out the attractions, restaurants, and areas you plan to visit most frequently, then look for accommodations within walking distance or short transit rides from these priority locations.

Central locations typically command premium prices but offer invaluable advantages in saved time and transportation costs. Being able to walk to major attractions means you can return to your accommodation for rest, refreshments, or midday breaks without lengthy transit. This flexibility is especially valuable in extreme weather or when you need to recharge during busy sightseeing days.

Evaluate transportation connectivity from potential neighborhoods. Proximity to metro stations, major bus routes, taxi stands, or bike-sharing stations dramatically increases your mobility and independence. Research the frequency, cost, and operating hours of local transit options to ensure you can reach all areas you want to explore efficiently.

Understand the neighborhood character and atmosphere. Some areas offer vibrant nightlife with bars and entertainment venues, while others provide peaceful residential settings perfect for families or early risers. Cultural heritage zones offer historic charm but may have limited evening options. Commercial centers provide shopping and dining but lack local character. Choose based on your preferences and travel style.

Safety should be a non-negotiable consideration. Research crime statistics, street lighting quality, police presence, and recent traveler experiences in each neighborhood. Solo travelers, families with children, and those arriving late at night should prioritize well-lit, populated areas with good security reputations. Check recent reviews for any safety concerns from previous guests.

Assess the availability of essential services within walking distance. Restaurants, grocery stores, pharmacies, ATMs, and medical facilities should be conveniently accessible. Having these services nearby reduces stress and provides peace of mind, especially for longer stays or if you have specific dietary or medical needs.

Consider noise levels and potential disturbances. Accommodation near busy roads, entertainment districts, construction sites, or railway lines might offer lower rates but could compromise sleep quality. Read recent reviews specifically mentioning noise issues, as this is a common complaint that significantly impacts rest and energy levels.

Calculate the true cost of peripheral locations. While accommodations farther from the center may be cheaper, factor in additional transportation costs, time spent commuting, and potential missed opportunities due to travel time. Sometimes a more expensive central location provides better overall value when all factors are considered.

Use mapping tools to verify locations rather than relying solely on property descriptions. Check actual walking distances to key attractions, examine the neighborhood context, identify nearby landmarks, and understand the real transit options available. Properties sometimes exaggerate their proximity to city centers or major sights.

Consider the time of day you'll be arriving and departing. If you have a late arrival or early departure, proximity to transportation hubs like airports, train stations, or bus terminals becomes important. Some neighborhoods are better connected to transport links than others, affecting your arrival and departure logistics.

Think about your daily rhythm and preferences. Morning people might appreciate neighborhoods with early-opening cafes and peaceful streets. Night owls might prefer areas with evening entertainment and late-night dining options. Families might prioritize parks, playgrounds, and family-friendly restaurants nearby.

Research local events and festivals that might affect your stay. Some neighborhoods become extremely crowded or noisy during festivals, while others might have street closures or limited access. Understanding these events helps you choose a location that enhances rather than disrupts your experience.

Trust your research and instincts when making the final decision. Read multiple sources, look at recent photos, check street view imagery if available, and consider feedback from recent travelers with similar needs. The right location makes your trip infinitely more enjoyable and convenient.`,
                followUp: []
              }
            ]
          },
          {
            id: 'food-budget',
            question: '🍽️ How do I save money on food while traveling?',
            answer: `Food expenses offer one of the best opportunities for savings during travel, as costs can vary dramatically depending on where and how you eat. With some strategic planning, you can enjoy delicious local cuisine without depleting your travel budget.

Street food and local markets are your best friends for affordable, authentic meals. Street vendors and market stalls typically offer the most genuine local flavors at a fraction of restaurant prices. Look for busy stalls with high turnover, as this indicates fresh ingredients and popular, quality food. Street food allows you to sample multiple dishes for the cost of a single restaurant meal.

Eat where locals eat rather than at restaurants targeting tourists. Establishments with menus in the local language, no English translations, and primarily local clientele almost always offer better food at lower prices. These places provide authentic culinary experiences that tourist restaurants simply cannot match. Ask your accommodation staff or local friends for their personal recommendations.

Take advantage of lunch specials and set menus. Many restaurants offer significantly discounted lunch menus compared to their dinner offerings. The same dishes that cost 20-30 dollars at dinner might be available for 10-15 dollars at lunch. Making lunch your main restaurant meal and keeping dinner simple or self-catered can result in substantial savings.

Shop at local grocery stores and markets for self-catering options. Preparing some meals yourself, especially breakfast and occasional dinners, can reduce food costs by 50-70% compared to eating every meal at restaurants. Grocery stores offer insight into local ingredients and food culture, and cooking can be a fun experience, especially when traveling with others.

Book accommodations that include breakfast. A complimentary breakfast saves you 5-15 dollars per person daily and ensures you start your day with a full meal, reducing the need for expensive mid-morning snacks or early lunches. Even a simple breakfast of bread, fruit, and coffee provides energy for morning activities.

Carry a reusable water bottle and refill it throughout the day. Buying bottled water multiple times daily adds up quickly, especially in hot climates where you need to stay hydrated. Many destinations have safe tap water or affordable refill stations. This simple habit saves money and reduces plastic waste.

Avoid restaurants in immediate tourist areas. Establishments right next to major attractions charge premium prices for mediocre food, knowing tourists will pay without exploring further. Walk a few streets away from tourist zones to find better quality at significantly lower prices. The difference in both quality and price is often remarkable.

Share meals when possible. Restaurant portions are often large enough for two people, especially in countries with generous serving sizes. Splitting main courses, appetizers, or desserts between travel companions can cut dining costs by 30-50% while still leaving everyone satisfied.

Take advantage of happy hour specials and early bird discounts. Many restaurants and bars offer discounted food and drinks during specific hours, typically late afternoon to early evening. Planning your dinner during these times allows you to enjoy higher-end establishments at budget-friendly prices.

Learn about local food customs and meal structures. In some cultures, the main meal is at lunchtime with dinner being lighter and cheaper. Understanding these patterns helps you eat more economically while still enjoying the local food culture. Street food, food stalls, and casual local eateries often provide the best value.

Pack snacks for long travel days. Airport food and convenience store prices are exorbitant. Bringing your own snacks for flights, bus journeys, or long train rides saves money and ensures you have something you actually want to eat. This is especially important for early morning departures or late-night arrivals when restaurants are closed.

Use food delivery apps when available. In some destinations, food delivery apps offer discounts and promotions that make restaurant-quality meals cheaper than dining in. This is particularly useful for busy days when you don't have time to seek out restaurants but want something better than street food.

Consider culinary tours or cooking classes as experiences rather than everyday meals. While these have upfront costs, they provide valuable cultural insights, hands-on experiences, and meals you might not otherwise have. They're worth the splurge occasionally for the unique experiences they offer.

Be adventurous but practical. Try local specialties and street foods, but also know when to stick with familiar options if your stomach needs a break. Balancing culinary adventure with practical considerations ensures you enjoy your food experiences without health issues derailing your trip.

Remember that food is one of the greatest pleasures of travel. While saving money is important, don't deprive yourself of memorable culinary experiences. Budget for special meals and local delicacies, as these often become the highlights of your trip. The goal is smart spending, not eating poorly to save a few dollars.`,
            followUp: []
          }
        ]
      },
    ]
  },
  {
    id: 'seasonal-travel',
        question: '🌤️ How do seasons affect travel planning?',
        answer: `Understanding how seasons impact your travel experience is absolutely fundamental to successful trip planning, as weather conditions affect everything from what activities you can enjoy, what clothes you need to pack, where you can comfortably go, how much you will spend, and even whether certain attractions are accessible or closed during your visit.

Summer travel typically brings hot and sunny weather with temperatures often exceeding 35 degrees Celsius in many popular destinations, requiring lightweight, breathable fabrics like cotton and linen that allow air circulation. During summer months you absolutely must pack high-SPF sunscreen, broad-brimmed hats, polarized sunglasses, reusable water bottles, and light scarves that can protect shoulders in religious sites while also providing sun protection. Summer activities are best planned around cooler morning hours before 11 AM and after 4 PM, with midday best reserved for indoor activities.

Monsoon season brings heavy rainfall that transforms landscapes into lush green paradises but also creates challenges including flooded streets, transportation delays, landslides in hilly areas, increased insect activity, and higher humidity levels. During monsoon travel you need waterproof gear including quality rain jackets, sturdy umbrellas, waterproof shoes, quick-dry clothing, and waterproof bags for electronics. Monsoon travel offers significant advantages including dramatically lower accommodation prices with discounts of 30-50%, far fewer tourists, incredibly beautiful green landscapes, and unique atmospheric quality.

Winter travel requires completely different preparation with temperatures potentially dropping below freezing in many destinations, demanding layered clothing systems. Your winter packing list should include thermal base layers, insulating mid-layers like fleece jackets or wool sweaters, waterproof and windproof outer shells, warm accessories like gloves, scarves, and beanies, and insulated waterproof boots. The key is layering multiple thin garments that trap warm air between them rather than one thick layer.

The shoulder seasons of spring and autumn often provide the ideal balance of pleasant weather, manageable crowds, and reasonable prices, with temperatures typically ranging from 15-25 degrees Celsius that allow comfortable exploration throughout the day. These periods are the preferred choice for experienced travelers who have flexibility in when they can travel.

Your clothing packing strategy should follow the principle of versatility and layering, where each item serves multiple purposes and can be combined in different ways for various weather conditions. Footwear decisions require careful thought because comfortable, broken-in walking shoes are perhaps the most important travel item you will bring. Never travel with new shoes that have not been worn extensively before your trip.

Research your destination's specific seasonal patterns rather than relying on general climate information. Some destinations have microclimates, sudden weather changes, or seasonal phenomena like monsoons, hurricanes, or blizzards that require specific preparation. Local weather patterns can vary significantly from regional averages.

Consider seasonal pricing variations. Peak season means higher prices for everything from flights and accommodation to tours and activities, but guarantees good weather and full accessibility. Shoulder season offers better value with still-good weather. Off-season provides the lowest prices but may mean some attractions are closed or weather is challenging.

Plan activities according to seasonal conditions. Some activities are only available during certain seasons: skiing in winter, beach activities in summer, whale watching during migration periods, or festival participation during specific cultural periods. Research the best times for your must-do activities at your destination.

Pack versatile layers that work across temperature ranges. A destination might have 30-degree days and 10-degree nights, or experience sudden weather changes. Having the ability to add or remove layers ensures comfort throughout the day regardless of temperature fluctuations.

Remember that weather is just one factor in seasonal travel. Consider crowds, prices, and special events. A destination with perfect weather but overwhelming crowds and double prices might be less enjoyable than a slightly cooler period with fewer tourists and better value. Balance all factors when choosing your travel dates.`,
        followUp: [
          {
            id: 'layering-technique',
            question: '🧥 How does the layering technique work for travel clothing?',
            answer: `The layering system is a scientifically proven approach to clothing that provides maximum temperature regulation, comfort, and adaptability across varying weather conditions. The principle is that multiple thin layers trap warm air between them far more effectively than a single thick layer, and this system allows you to add or remove layers as temperatures change throughout the day.

The base layer is the foundation of the entire system, and its primary function is moisture management. It must wick sweat away from your skin to outer layers where it can evaporate, preventing the clammy, cold feeling that occurs when moisture stays trapped against your body. Base layers should be made from merino wool which naturally regulates temperature, resists odors, and feels soft against skin, or from synthetic materials like polyester and nylon blends that dry quickly and provide excellent moisture wicking.

The mid layer provides actual insulation by trapping warm air in its fibers or in the space between its weave. Fleece jackets offer excellent warmth-to-weight ratios and quick drying properties. Down vests or jackets provide exceptional warmth for their weight when dry. Wool sweaters offer natural temperature regulation that works even when slightly damp. Choose mid-layers based on expected temperatures and activity levels.

The outer shell layer protects against wind, rain, and snow while allowing moisture vapor from your body to escape through breathable membranes. Options range from simple windbreakers for mild conditions to fully waterproof and breathable jackets with sealed seams for heavy rain or snow exposure. Look for adjustable hoods, ventilation zippers, and a fit that allows room for layers underneath.

Between these main layers you can add or subtract according to conditions. Use lightweight synthetic or down vests as additional mid layers for cold mornings that can be removed as the day warms up. Swap a heavy fleece for a lighter option when moving from cold outdoor environments to heated indoor spaces.

The beauty of the layering system lies in its flexibility. You can wear all layers together in the morning cold, remove the mid layer during afternoon warmth, add the shell layer if rain begins, and put everything back on as temperatures drop in the evening, all without carrying multiple different outfits for different conditions.

For warm weather destinations, the layering principle still applies but with lighter materials. Use a moisture-wicking base layer as your primary garment, a light long-sleeved shirt as protection from sun and insects that can be removed when not needed, and a lightweight windbreaker or rain shell for unexpected showers or air-conditioned spaces.

The materials you choose for each layer matter enormously. Cotton absorbs moisture and stays wet, taking hours to dry and becoming heavy and cold. Synthetic and wool materials dry quickly, maintain insulation even when wet, and pack much smaller than equivalent cotton garments. Avoid cotton for base layers in active travel situations.

Test your layering system before your trip by wearing combinations during similar weather conditions at home. This helps you understand what feels comfortable, what combinations work best for different temperatures, and whether you need to adjust any pieces before relying on them during your actual travels.

Consider the specific activities you'll be doing. Hiking in mountains requires different layering than city sightseeing in mild weather. Active pursuits need more breathable, moisture-wicking materials, while sightseeing allows for more flexibility in fabric choices. Plan your layers around your planned activities.

Remember that layering is not just about warmth. It's about adaptability. A good layering system keeps you comfortable across a wide range of temperatures and conditions, reducing the need for multiple complete outfits and minimizing luggage weight while maximizing versatility.`,
            followUp: []
          },
          {
            id: 'weather-safety',
            question: '⚠️ What weather safety precautions should travelers take?',
            answer: `Weather-related safety is a critical aspect of travel planning that many travelers underestimate until they find themselves facing extreme conditions unprepared. Taking proper precautions before and during your trip can mean the difference between a challenging but manageable situation and a genuinely dangerous emergency.

Before traveling to any destination, research the typical weather patterns for your specific travel dates, including historical temperature ranges, average rainfall amounts, likelihood of extreme weather events like hurricanes, cyclones, or blizzards, and any seasonal weather phenomena that could affect your safety or accessibility. This research helps you pack appropriately and plan activities around weather conditions.

For hot weather destinations, heat-related illnesses including heat exhaustion and heat stroke are serious medical emergencies. Familiarize yourself with symptoms including dizziness, nausea, confusion, rapid heartbeat, and cessation of sweating, which indicates the body has lost its ability to cool itself. Preventing heat-related problems requires staying hydrated by drinking water consistently throughout the day rather than waiting until you feel thirsty, avoiding alcohol and excessive caffeine, taking regular breaks in shaded or air-conditioned areas, and wearing appropriate lightweight, light-colored, loose-fitting clothing.

For cold weather destinations, hypothermia occurs when your body loses heat faster than it can produce it, leading to dangerously low core body temperature. Early warning signs include uncontrollable shivering, confusion, drowsiness, slurred speech, and loss of coordination that require immediate warming measures. Frostbite affects exposed skin and extremities when temperatures drop below freezing, causing numbness, pale or waxy skin, and eventually tissue damage. Prevention requires keeping all skin covered in extreme cold, wearing insulated and waterproof footwear, using hand and foot warmers in extreme conditions, and checking yourself regularly for signs of cold-related injury.

Monsoon and rainy season travel brings risks including flash flooding that can occur with little warning, landslides in hilly or mountainous terrain, waterborne diseases from contaminated water sources, and increased insect-borne illnesses like dengue and malaria that thrive in wet conditions. Check weather forecasts daily during your trip and heede official warnings about severe weather, as many weather-related emergencies develop rapidly.

Have a weather emergency plan that includes knowing the location of your country's embassy or consulate, having emergency contact numbers saved in your phone and written on paper, keeping a small emergency kit with basic supplies, and knowing evacuation routes from your accommodation. This preparation provides peace of mind and practical preparedness for unexpected weather situations.

Travel insurance that specifically covers weather-related trip interruptions, cancellations, and emergencies is invaluable, as extreme weather can force flight cancellations, hotel evacuations, and unexpected extended stays that create significant additional expenses without proper coverage.

Stay informed about weather conditions during your trip through local news, weather apps, and information from your accommodation. Many destinations have early warning systems for severe weather. Heed these warnings and adjust your plans accordingly. Don't ignore evacuation orders or severe weather warnings because you don't want to change your itinerary.

Pack appropriate gear for expected weather conditions, but also prepare for unexpected changes. Weather can be unpredictable, and having emergency gear like a compact emergency blanket, waterproof matches, or a portable shelter can be lifesaving in extreme situations. Better to have it and not need it than need it and not have it.

Know the signs of weather-related illnesses and how to respond. Heat exhaustion, heat stroke, hypothermia, and frostbite all require specific first aid responses. Learn these before you travel so you can recognize symptoms in yourself and others and take appropriate action. When in doubt, seek professional medical help.

Remember that weather is one travel factor you cannot control, but you can prepare for it. Proper preparation, flexibility in your plans, and good judgment keep you safe when weather conditions become challenging. Your safety is more important than sticking to a planned itinerary.`,
            followUp: []
          }
        ]
      },
      {
        id: 'solo-travel',
        question: '🎒 What do I need to know about solo travel?',
        answer: `Solo travel offers unparalleled freedom, personal growth, and authentic cultural experiences, but it requires additional preparation and awareness compared to group travel. The absence of travel companions means you're responsible for all decisions, problem-solving, and your own safety, which can be both empowering and challenging.

Thorough destination research becomes even more critical when traveling alone. Go beyond typical tourist information to understand local customs that might affect solo travelers differently, identify safe neighborhoods for accommodation, learn about areas to avoid, and discover resources specifically available for solo travelers. Research whether your destination is solo-travel friendly, as some cultures and locations are more welcoming to independent travelers than others.

Accommodation selection requires extra consideration for solo travelers. Your lodging serves not just as a place to sleep but as your base for safety, social connection, and comfort. Look for accommodations with common areas, social atmospheres, and good security. Hostels with communal kitchens and organized activities, guesthouses with welcoming hosts, and hotels in safe, central locations are excellent choices. Read recent reviews from other solo travelers to gauge the social environment and safety.

Building social connections requires intentional effort when traveling alone. Unlike group travel where interaction is automatic, solo travelers must actively seek opportunities to meet people. Stay in social accommodations, join group tours and day trips, attend local events and activities, use travel networking apps, and strike up conversations at cafes, markets, and communal dining spaces. Many solo travelers find that they meet more people when alone than when traveling with companions.

Safety planning demands extra diligence. Share your detailed itinerary with family or friends, including accommodation addresses, contact information, and planned activities. Establish regular check-in times and stick to them. Register with your embassy if traveling internationally. Carry copies of important documents separate from originals, and maintain digital copies in secure cloud storage.

Personal security awareness becomes a continuous practice. Stay aware of your surroundings at all times, trust your instincts when situations feel uncomfortable, avoid displaying valuable items openly, and have a plan for safely returning to your accommodation after dark. Learn basic phrases in the local language for emergencies, and save emergency contact numbers in your phone.

Health preparation is particularly important when alone. There's no one to help you navigate healthcare systems, translate medical information, or assist if you become seriously ill. Carry a comprehensive first-aid kit, know how to access medical care at your destination, have travel health insurance that covers medical evacuation, and carry prescription medications with backup supplies in your carry-on luggage.

Managing loneliness is a common challenge for solo travelers. It's normal to feel lonely during solo meals, long transport connections, or quiet evenings. Combat this by scheduling social activities during vulnerable times, maintaining regular video calls with family and friends, finding routines and familiar activities in each destination, and reminding yourself that loneliness is temporary. Many solo travelers find that the independence and personal growth outweigh occasional lonely moments.

Building confidence comes with experience. Start with shorter solo trips in familiar environments before progressing to more challenging destinations. Each successful solo journey builds confidence and capability. You'll develop skills in decision-making, problem-solving, navigation, and self-reliance that transfer to many areas of life.

Budget management requires particular attention. Accommodation costs cannot be shared, and single supplements on tours can increase expenses. Eating solo at restaurants often costs the same as for two people without the benefit of splitting meals. Seek out solo-traveler-friendly options like hostels, street food, self-catering, and free walking tours to manage costs effectively.

Documentation and communication tools are essential. Keep digital copies of all important documents accessible from any device. Use offline maps and translation apps. Maintain multiple communication methods including local SIM cards, WiFi, and emergency contact information. Consider a portable charger to ensure your phone stays powered throughout the day.

Flexibility is both a challenge and benefit of solo travel. You make all decisions independently, which means you can change plans spontaneously without consulting others. This freedom allows you to follow interesting opportunities, adjust your itinerary based on local recommendations, and travel at your own pace without compromise.

Join solo travel groups or forums before and during your trip. These communities provide valuable advice, companionship for specific activities, and emotional support from people who understand the unique aspects of solo travel. Many travelers form lasting friendships through these networks.

Embrace the unique benefits of solo travel. You'll have more opportunities for authentic interactions with locals, complete freedom to follow your interests, and space for self-reflection and personal growth. Many travelers discover capabilities and preferences they didn't know they had when traveling alone.

Stay connected with home through regular communication, but also embrace the opportunity to disconnect and immerse yourself in new experiences. Balance maintaining relationships with being present in your travel experiences. Share highlights with family and friends, but don't feel obligated to document every moment for social media.

Remember that solo travel is a skill that improves with practice. Your first solo trip might feel challenging, but each journey becomes easier and more rewarding. The confidence, independence, and self-awareness gained through solo travel are invaluable life skills that extend far beyond your travels.`,
        followUp: [
          {
            id: 'meeting-people',
            question: '🤝 How do I meet people while traveling solo?',
            answer: `Meeting people while traveling solo enriches your experience, provides safety in numbers, and creates opportunities for shared adventures. While it requires stepping outside your comfort zone, the rewards of travel friendships often extend beyond the journey itself.

Choose social accommodation as your foundation. Hostels with common rooms, communal kitchens, organized activities, and family-style dinners naturally facilitate interaction. Look for hostels with high social ratings in reviews, common areas with comfortable seating, and regular events like walking tours, pub crawls, or game nights. Many hostels now offer coworking spaces that attract digital nomads and remote workers open to socializing.

Join group activities and tours where meeting people happens organically. Walking tours, cooking classes, hiking excursions, day trips, and adventure activities create structured environments for interaction. You're automatically connected to others through shared experiences, and the activity itself provides natural conversation topics. Free walking tours are particularly good for meeting other travelers, as they're social, informative, and usually conclude at a social venue.

Use travel-specific social apps and platforms designed to connect travelers. Apps like Backpackr, Travel Buddies, and various Facebook groups help you find travel companions for specific activities or destinations. Some platforms organize small group experiences that combine solo travelers into temporary social groups. These tools make it easier to find people with similar interests and schedules.

Attend local events and cultural activities. Food festivals, concerts, art exhibitions, markets, and community gatherings attract both locals and travelers open to social interaction. Participating in these events gives you immediate common ground for conversation and exposes you to authentic local culture. Check local event listings, ask accommodation staff, and look for flyers in cafes.

Strike up conversations in everyday situations. Ask for recommendations at cafes, compliment someone on their travel gear, ask about a book someone is reading, or simply offer a friendly greeting in communal spaces. Most travelers are in similar situations and open to conversation. The key is being approachable and taking the first step.

Use co-working spaces and digital nomad hubs if you work remotely. These spaces attract like-minded travelers who often socialize during breaks, lunch, or after-work hours. Many organize social events, workshops, or casual meetups. Even if you're not working, visiting these spaces during social hours can connect you with the traveler community.

Take group transportation on longer journeys. Shared minibuses, overnight trains, and organized tours create natural opportunities for extended conversations with fellow travelers. The shared journey itself provides topics ranging from travel experiences to destination recommendations. These connections sometimes develop into travel friendships that continue throughout your trip.

Be open and approachable through body language. Put away your phone in common areas, make eye contact, smile, and position yourself in ways that invite interaction. Sitting alone in a corner with headphones on signals you don't want to talk. Sitting in common areas with an open posture invites conversation.

Share meals with others when possible. Many hostels organize family-style dinners where guests eat together. Communal dining naturally brings people together. If you're staying in a guesthouse or Airbnb, ask your host about local events or if they know other guests who might want to explore together.

Follow up with people you meet. Exchange contact information before parting ways, as many travel friendships lead to future reunions, mutual visits, or travel recommendations. Add new friends on social media or exchange WhatsApp numbers. These connections often become lasting friendships that enrich your life beyond the trip.

Join day trips and excursions. Many destinations offer group day trips to nearby attractions. These provide structured time with other travelers while exploring interesting places. You'll meet people with similar interests and have shared experiences to bond over.

Volunteer or take classes. Volunteer opportunities, cooking classes, dance lessons, or language exchanges attract travelers interested in similar activities. These structured environments make it easy to meet people while learning something new or giving back to the community.

Be patient and persistent. Not every interaction will lead to a deep friendship, and that's okay. Some conversations will be brief and pleasant, others will develop into travel companions for specific activities, and occasionally you'll meet someone who becomes a lifelong friend. Each interaction teaches you more about connecting with people from diverse backgrounds.

Respect boundaries and cultural differences. Some cultures are more reserved than others, and some travelers prefer solitude. Pay attention to social cues and respect people's space. Not everyone wants to socialize, and that's perfectly fine. Focus on interactions where both parties seem engaged and interested.

Remember that many solo travelers are in the same position as you, wanting to meet people and share experiences. Taking the first step to introduce yourself or join a conversation often leads to rewarding connections. The temporary nature of travel relationships means there's less pressure than in daily life, making it easier to be open and authentic.

Maintain a balance between socializing and solo exploration. Some days you'll want company, other days you'll want solitude. Both are valuable parts of solo travel. Don't force social interaction when you need alone time, but also don't isolate yourself when you're feeling lonely. Listen to your needs and adjust accordingly.

The friendships formed while traveling solo often become some of the most meaningful connections in your life. Shared travel experiences create strong bonds, and the global network of travel friends provides future accommodation, local knowledge, and companionship on future adventures. Be open to these connections, as they're one of the greatest gifts of solo travel.`,
            followUp: []
          },
          {
            id: 'solo-challenges',
            question: '💪 How do I handle solo travel challenges?',
            answer: `Solo travel presents unique challenges that require specific strategies and mindset shifts. While these challenges can feel daunting, overcoming them builds resilience, confidence, and problem-solving skills that benefit all areas of life.

Loneliness is perhaps the most common challenge. It often strikes during solo meals, long transport connections, or quiet evenings. Combat it by scheduling social activities during vulnerable times, maintaining regular video calls with loved ones, finding comforting routines, and accepting loneliness as a temporary feeling rather than a permanent state. Many solo travelers find that the independence and personal growth outweigh occasional lonely moments.

Getting lost or disoriented triggers panic in many solo travelers. Prepare by downloading offline maps before you need them, carrying a written note with your accommodation address in the local language, and staying calm when disoriented. Panic impairs judgment, so take deep breaths and assess the situation logically. Ask for help confidently but humbly, and remember that getting lost often leads to unexpected discoveries.

Illness while alone is particularly difficult without someone to care for you. Prepare by packing a comprehensive health kit, knowing locations of nearby medical facilities, keeping insurance documents accessible, and maintaining backup emergency funds. Learn key phrases for medical situations in the local language. If you become seriously ill, contact your accommodation for assistance and don't hesitate to seek professional medical help.

Theft or loss creates immediate stress without the buffer of companions who might share resources. Respond by immediately canceling cards, filing police reports, contacting insurance, accessing emergency funds, and maintaining composure for clear decision-making. Having digital copies of important documents, multiple payment methods, and emergency cash in separate locations minimizes the impact of theft.

Transportation problems like missed connections or cancellations require quick thinking alone. Stay calm, seek official information immediately, understand your rights regarding rebooking and compensation, and have backup plans and buffer time in your schedule. Travel insurance can cover unexpected accommodation and transportation costs from these situations.

Budget crises happen when spending exceeds plans. Address them immediately by assessing remaining funds, identifying expenses to eliminate, considering cheaper alternatives, and potentially accessing emergency funds or family transfers. Learning from these situations helps you budget more effectively on future trips.

Decision fatigue affects solo travelers who make all decisions independently. Combat it by planning major decisions in advance, building in flexibility for minor choices, and accepting that not every decision will be perfect. Sometimes following your gut or choosing the simplest option is best when tired from decision-making.

Safety concerns feel more acute when alone. Mitigate this through thorough preparation, situational awareness, and trusting your instincts. Research safe areas, avoid risky situations, stay connected with others, and have emergency plans. Many solo travelers find they feel safer than expected when they're prepared and aware.

Language barriers can be isolating and frustrating. Learn basic phrases before your trip, use translation apps, carry a phrasebook, and embrace non-verbal communication. Many gestures and smiles transcend language barriers, and attempting to speak the local language is usually appreciated even if imperfect.

Accommodation issues like noisy neighbors or uncomfortable rooms are more impactful when alone. Address problems promptly with accommodation staff, request changes if needed, and have backup accommodation options saved. Good accommodation makes a huge difference in travel comfort.

Missing home and loved ones is natural, especially on longer trips. Schedule regular video calls, share your experiences through photos and messages, and remind yourself why you're traveling. Many travelers find that the personal growth and experiences gained make the temporary separation worthwhile.

Building resilience is a gradual process. Each challenge you successfully navigate makes you stronger and more confident. Reflect on difficulties overcome, recognize your growth, and apply lessons learned to future situations. The traveler who panics at small problems transforms into a capable, resourceful explorer.

Remember that challenges are temporary and solvable. Most problems have solutions, and help is usually available if you ask. Maintain perspective by remembering that travel problems, while stressful, are rarely life-threatening. Keeping this perspective helps you stay calm and find solutions effectively.

Connect with other solo travelers for support and shared experiences. Online communities, local meetups, and chance encounters with fellow solo travelers provide empathy, advice, and sometimes companionship for specific challenges. Knowing others face similar struggles normalizes your experience.

Celebrate your successes and growth. Each challenge overcome is an achievement worth acknowledging. Solo travel teaches self-reliance, adaptability, problem-solving, and confidence that extends far beyond your trip. These skills become part of who you are, making future travels and life challenges easier to navigate.

Ultimately, the challenges of solo travel are part of what makes it so rewarding. The independence, self-discovery, and personal growth that come from navigating difficulties alone create lasting confidence and capabilities. Many travelers find that solo travel, with all its challenges, becomes the most transformative experience of their lives.`,
            followUp: []
          }
        ]
      },
      {
        id: 'health',
        question: '🏥 How do I prepare for healthy travel?',
        answer: `Health preparation before and during travel is essential for enjoying your trip without illness or medical emergencies disrupting your experience. Proper preparation prevents most travel-related health issues and ensures you can access appropriate care if needed.

Visit a travel health clinic or your healthcare provider 4-6 weeks before departure. This timeframe allows for vaccinations that require multiple doses or time to become effective. Discuss your destination, planned activities, and personal medical history to receive personalized health advice. Some destinations require specific vaccinations for entry, while others recommend vaccines based on regional health risks.

Research vaccination requirements for your destination. Some countries require proof of yellow fever vaccination for entry, especially if arriving from endemic areas. Others recommend hepatitis A and B, typhoid, tetanus, rabies, or Japanese encephalitis vaccines depending on your activities and destination. Ensure routine vaccinations like measles, mumps, rubella are up to date regardless of destination.

Manage prescription medications carefully. Carry sufficient supply for your entire trip plus extra days in case of delays. Keep medications in original pharmacy-labeled containers rather than loose in bags. Maintain copies of prescriptions with generic names, as brand names vary internationally. Divide medications between carry-on and checked luggage so you have access if one bag is lost.

Research malaria prevention if traveling to risk areas. Some destinations require prophylactic medication taken before, during, and after your trip. Combine medication with mosquito avoidance measures: use EPA-approved insect repellent containing DEET or picaridin, sleep under insecticide-treated bed nets, wear long-sleeved clothing during dawn and dusk when mosquitoes are most active, and stay in accommodations with screens or air conditioning.

Prevent traveler's diarrhea, the most common travel illness. Drink only bottled, boiled, or treated water in areas where tap water isn't safe. Avoid ice in beverages. Eat thoroughly cooked food served hot. Avoid raw vegetables and fruits you can't peel yourself. Practice frequent hand hygiene with soap and alcohol-based sanitizers. Pack anti-diarrheal medication and oral rehydration salts as treatment if prevention fails.

Assemble a comprehensive travel health kit. Include pain relievers and fever reducers, antihistamines for allergies and insect bites, anti-diarrheal medication, oral rehydration salts, motion sickness remedies, antiseptic wipes and cream, bandages and blister treatment, sunscreen, insect repellent, and any personal medications. Add supplies for managing pre-existing conditions.

Understand food and water safety principles. In developed countries with good sanitation, tap water is usually safe and food safety standards are high. In developing countries, be more cautious. When in doubt, drink bottled water, eat at busy restaurants with high turnover, avoid raw foods, and peel your own fruits. Street food can be safe if you choose busy stalls with high turnover and observe food handling practices.

Get adequate travel health insurance that covers medical emergencies, hospitalization, medical evacuation, and repatriation. Your regular health insurance likely provides no coverage outside your home country. Medical evacuation alone can cost tens of thousands of dollars. Confirm your policy covers your planned activities, especially if engaging in adventure sports.

Research medical facilities at your destination before you need them. Identify hospitals and clinics near your accommodation, understand the local healthcare system, know whether you need to pay upfront, and find English-speaking providers if possible. Save local emergency numbers and your insurance company's 24-hour assistance hotline.

Manage pre-existing health conditions carefully during travel. Carry a summary of your medical history translated into the local language if possible. Wear a medical alert bracelet for conditions like diabetes or severe allergies. Verify that your medications are legal in destination countries, as some are restricted internationally. Plan your itinerary to accommodate any physical limitations or treatment schedules.

Protect yourself from insect-borne diseases in tropical and subtropical regions. Use insect repellent, wear long sleeves and pants during peak mosquito hours, sleep under bed nets, and stay in screened or air-conditioned accommodations. Research disease risks for your specific destination and take appropriate preventive measures.

Stay hydrated and maintain good nutrition. Travel can disrupt normal eating patterns and increase dehydration risk, especially in hot climates or during physical activity. Drink water regularly throughout the day, eat balanced meals when possible, and pack healthy snacks for long travel days. Good nutrition supports immune function and energy levels.

Get sufficient rest and manage jet lag. Sleep deprivation weakens your immune system and makes you more susceptible to illness. Allow time to adjust to new time zones, maintain reasonable sleep schedules, and don't overschedule your first few days. Rest when your body needs it rather than pushing through exhaustion.

Practice good hygiene throughout your trip. Wash hands frequently with soap and water, especially before eating. Use hand sanitizer when soap isn't available. Avoid touching your face, as this transfers germs. Keep your living space clean, and be cautious in crowded environments where illness spreads easily.

Know the signs of common travel illnesses and when to seek medical help. Dehydration, heat exhaustion, food poisoning, and respiratory infections are common. Understand symptoms that require immediate medical attention: high fever, severe pain, difficulty breathing, persistent vomiting, or signs of serious infection. Don't hesitate to seek professional help when needed.

Prepare for altitude sickness if traveling to high elevations. Ascend gradually when possible, stay hydrated, avoid alcohol and strenuous exercise initially, and recognize symptoms like headache, nausea, and dizziness. Descend if symptoms worsen. Some destinations require medication for altitude prevention.

Protect your skin from sun damage. Use broad-spectrum sunscreen with high SPF, reapply regularly, wear hats and sunglasses, and seek shade during peak sun hours. Sunburn not only causes pain but also increases risk of skin cancer and accelerates aging. In cold environments, protect against windburn and frostbite by covering exposed skin.

Maintain mental health during travel. Travel stress, culture shock, homesickness, and anxiety are normal. Maintain contact with home, establish routines, exercise regularly, eat well, and allow time for rest and reflection. If you experience severe mental health issues, seek professional help. Many destinations have English-speaking mental health professionals.

Remember that prevention is far easier than treatment. Taking time to prepare health-wise before your trip pays enormous dividends in enjoying your travel experience without illness or medical emergencies disrupting your journey. Your health is your most valuable travel asset.`,
    followUp: []
  }
]

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFAQ, setCurrentFAQ] = useState<FAQ | null>(null)
  const [displayedFAQs, setDisplayedFAQs] = useState<FAQ[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'question' | 'answer' | 'options', content: string, points?: string[] }>>([])
  const [hasInitiated, setHasInitiated] = useState(false)
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set())

  const parseAnswer = (answer: string) => {
    const lines = answer.split('\n')
    const points: string[] = []
    let intro = ''
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        points.push(trimmed.replace(/^[•\-]\s*/, ''))
      } else if (trimmed && index < 3) {
        intro += trimmed + ' '
      }
    })
    
    return { intro: intro.trim(), points }
  }

  const showThinking = (faq: FAQ) => {
    const newUsedIds = new Set(usedIds)
    newUsedIds.add(faq.id)
    setUsedIds(newUsedIds)
    setIsThinking(true)
    setCurrentFAQ(faq)
    setChatHistory(prev => [...prev, { type: 'question', content: faq.question }])
    
    setTimeout(() => {
      setIsThinking(false)
      if (faq.answer) {
        const { intro, points } = parseAnswer(faq.answer)
        setChatHistory(prev => [...prev, { 
          type: 'answer', 
          content: intro,
          points: points.length > 0 ? points : undefined
        }])
      }
      if (faq.followUp && faq.followUp.length > 0) {
        setDisplayedFAQs(faq.followUp)
      } else {
        setDisplayedFAQs([])
      }
    }, 1500)
  }

  const handleFAQClick = (faq: FAQ) => {
    showThinking(faq)
  }

  const handleBack = () => {
    setCurrentFAQ(null)
    setDisplayedFAQs(faqData)
    setChatHistory([])
    setHasInitiated(false)
    setIsThinking(false)
    setTimeout(() => {
      initiateChat()
    }, 300)
  }

  const initiateChat = () => {
    if (hasInitiated) return
    setHasInitiated(true)
    const greetingMessage = "Hi! I'm RoamwiseAI, your personal travel assistant. I can help you with destination selection, budget planning, seasonal packing, solo travel guidance, and health preparation. Select a topic below to get started!"
    setChatHistory([{ 
      type: 'answer', 
      content: greetingMessage,
      points: [
        '🌍 Destination Selection & Planning',
        '💰 Budget Management & Money Saving Tips (with accommodation & food follow-ups)',
        '🌤️ Seasonal Travel & Packing Guides',
        '🎒 Solo Travel Guidance',
        '🏥 Health & Safety Preparation'
      ]
    }])
    setDisplayedFAQs(faqData)
  }

  const openChat = () => {
    setIsOpen(true)
    setCurrentFAQ(null)
    setDisplayedFAQs([])
    setChatHistory([])
    setHasInitiated(false)
    setUsedIds(new Set())
    setTimeout(() => {
      initiateChat()
    }, 500)
  }

  const closeChat = () => {
    setIsOpen(false)
    setCurrentFAQ(null)
    setDisplayedFAQs([])
    setChatHistory([])
    setHasInitiated(false)
    setUsedIds(new Set())
  }

  return (
    <>
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
                  {item.points && item.points.length > 0 && (
                    <div className="message-points">
                      {item.points.map((point, i) => (
                        <div key={i} className="point-item">
                          <span className="point-bullet">•</span>
                          <span className="point-text">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
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

            {!isThinking && (currentFAQ || displayedFAQs.length > 0) && (
              <div className="faq-options">
                {currentFAQ && (
                  <button
                    className="faq-button back-button"
                    onClick={handleBack}
                  >
                    ← Back to main topics
                  </button>
                )}
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