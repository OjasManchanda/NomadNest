const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1000",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1000",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
    owner: "68f9fa6c7dc2f3eab246d675",
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    owner: "68f9fa6c7dc2f3eab246d675",
  },

  {
    title: "Perla Bungalov",
    description: "Charming mountain-view bungalow in Kartepe with valley views and lake access. Perfect retreat with modern amenities including WiFi, free parking, pets allowed, and TV. Ideal for nature lovers seeking tranquility.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60" },
    price: 1450,
    location: "Kartepe, Kocaeli",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Authentic Beach Architect Villa with Pool",
    description: "Stunning architect-designed beachfront villa featuring private pool and jacuzzi. Includes kitchen, WiFi, dedicated workspace, washing machine, and air conditioning. Perfect luxury getaway.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Kaş, Antalya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Cottages Sataplia",
    description: "Mountain view cottage with workspace and free parking. Pet-friendly accommodation with 40-inch HDTV, kitchen facilities, and WiFi. Great for remote workers and families.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60" },
    price: 950,
    location: "Imereti",
    country: "Georgia",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapanca Breathable Bungalow",
    description: "Luxury bungalow with mountain and valley views plus private pool. Features WiFi, parking, 42-inch HDTV with Netflix. Perfect romantic retreat in nature.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60" },
    price: 1650,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Bungalov Ev 2",
    description: "Modern bungalow with full kitchen, WiFi, and parking. Air-conditioned comfort with TV entertainment and long-term stay options available.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "CasaMia White Suite Treehouse",
    description: "Unique waterfront treehouse with lake and mountain panoramas. Private pool, HDTV, dedicated workspace. Romantic escape with modern luxury amenities.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
    price: 1850,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Ladin Bungalow",
    description: "Garden and mountain view bungalow with pool access. Pet-friendly with kitchen, WiFi, workspace, and parking included for comfortable family stays.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=60" },
    price: 1250,
    location: "Kaş, Antalya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Lavender House",
    description: "Spacious house with WiFi, workspace, parking. Features indoor fireplace, fire pit, BBQ grill. Pet-friendly with long-term options for extended stays.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60" },
    price: 1350,
    location: "Akçalı, Giresun",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Prince's Cabin",
    description: "Cozy cabin with kitchen, WiFi, workspace, and parking. Pet-friendly accommodation with TV, washing machine, dryer. Perfect for digital nomads.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=60" },
    price: 890,
    location: "Đà Lạt, Lâm Đồng",
    country: "Vietnam",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "The Cottage - Private Pool Villa",
    description: "Large villa accommodating 10 guests with private pool. Full kitchen, WiFi, parking, TV, air conditioning, and breakfast included. Long-term stays welcome.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60" },
    price: 3200,
    location: "Bang Kachai, Chanthaburi",
    country: "Thailand",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Hillside Pension Hut with Campfire",
    description: "Mountain view hut with campfire and free firewood. Kitchen facilities, free parking, central AC, shared patio. Perfect for nature enthusiasts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 780,
    location: "Sanoe-myeon, Boeun-gun",
    country: "South Korea",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "A Frame Tiny Cozy Glamp Dharamshala",
    description: "Garden view waterfront glamping with WiFi and parking. Pet-friendly with private patio, garden, dryer. Unique A-frame design for memorable stays.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=60" },
    price: 850,
    location: "Dharmshala, Himachal Pradesh",
    country: "India",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Cabin A Pahimis with Pool",
    description: "Cabin for 8 guests with private outdoor pool. Kitchen, WiFi, workspace, parking, air conditioning. Perfect for family gatherings and group retreats.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60" },
    price: 1950,
    location: "Amadeo, Calabarzon",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Off-Grid Tiny A-Frame House",
    description: "Garden and lake view off-grid A-frame with campsite. Kitchen, WiFi, workspace, free parking for 3 spaces. Adventurous eco-friendly accommodation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1486912500284-6f2462ba07ea?auto=format&fit=crop&w=800&q=60" },
    price: 720,
    location: "Tanay, Calabarzon",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Kızılkaya Bungalow Houses",
    description: "Mountain and garden view bungalow with workspace and parking. Pet-friendly with TV, private patio, crib available. Peaceful family retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
    price: 1180,
    location: "Geyve, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Villa Tuba",
    description: "Courtyard and garden view villa with beach access. Kitchen, WiFi, workspace, TV, washing machine, AC. Ideal beachfront family vacation home.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=60" },
    price: 2400,
    location: "Muratpaşa, Antalya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "VADİ BUNGALOV SAPANCA",
    description: "Garden and mountain view with lake access. Kitchen, WiFi, workspace, free residential garage, private pool, TV, AC. Luxury lakeside retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60" },
    price: 1750,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "AĞVA ÇINARHAN VİLLA GARDEN",
    description: "Courtyard and garden view with beach access. Kitchen, WiFi, workspace, parking, private pool, jacuzzi. Peaceful garden bungalow experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60" },
    price: 1650,
    location: "İstanbul",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Purkinora Bungalow",
    description: "Mountain and resort view waterfront property. Kitchen, WiFi, workspace, parking, TV with Netflix, AC. Scenic mountain retreat with modern comforts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=60" },
    price: 1420,
    location: "Dikkaya, Rize",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Glass Teepee Tiny House by River",
    description: "Riverside tiny house allowing pets. Private patio, garden, indoor fireplace, fire pit. Long-term stays available. Unique architectural gem.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=800&q=60" },
    price: 950,
    location: "Tanay, Calabarzon",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sioni Lake House",
    description: "Garden and lake view with beach access. Kitchen, parking, bath, private patio, garden, luggage drop-off. Serene lakeside escape.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=800&q=60" },
    price: 1280,
    location: "Sioni, Mtskheta-Mtianeti",
    country: "Georgia",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Faith Bay Huts 1",
    description: "Beachfront hut with garage parking. Pet-friendly, air-conditioned. Pack 'n Play crib, breakfast included. Perfect beach escape for families.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=60" },
    price: 920,
    location: "Cabangan, Central Luzon",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapanca Loft Bungalow",
    description: "Garden and mountain view with kitchen, workspace, parking. Pet-friendly with TV, AC, and bath. Modern loft-style bungalow design.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=800&q=60" },
    price: 1550,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Enthralling Escapes Mountain View",
    description: "Mountain view property with kitchen, WiFi, pets allowed. HDTV, bath, fully fenced backyard, luggage drop-off. Himalayan mountain retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Manali, Himachal Pradesh",
    country: "India",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "New Chalets on Farm with Fireplace",
    description: "Farm chalet with kitchen, WiFi, workspace, parking. TV, washing machine, dryer, bath. Indoor fireplace for cozy evenings.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60" },
    price: 1320,
    location: "Bolu",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapancaguldibibugalov",
    description: "Lake and mountain view with beach access. Kitchen, WiFi, workspace, parking, TV, AC. Scenic lakeside bungalow with full amenities.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
    price: 1480,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapanca Bungalife M",
    description: "3-bedroom property with kitchen, garage, private pool and jacuzzi. TV, AC, private patio. Luxury family accommodation with modern touches.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=60" },
    price: 2100,
    location: "Memnuniye, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Bungalows with Private Pools in Nature",
    description: "Lake and garden view with kitchen, WiFi, garage. Private pool and jacuzzi, TV, AC. Intimate nature retreat with luxury amenities.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
    price: 1850,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapancapanoramabungalow1",
    description: "Mountain and valley view with lake access. Kitchen, WiFi, workspace, parking, private pool, jacuzzi, TV, AC. Panoramic vistas guaranteed.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60" },
    price: 1720,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Coconut Tree House Udalo Mindoro",
    description: "Beachfront property with kitchen and pets allowed. Patio, garden, refrigerator. Long-term stays welcome at this tropical paradise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520454974749-612b87refuse8?auto=format&fit=crop&w=800&q=60" },
    price: 780,
    location: "Abra de Ilog, MIMAROPA",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapanca Yura Bungalov with Pool",
    description: "Lake access property with kitchen, WiFi, workspace, parking. Private pool and jacuzzi, TV, AC. Secure heated pool retreat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60" },
    price: 1680,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Glass Teepee Village River Glamping",
    description: "Garden and mountain waterfront views. Free parking, pets allowed, private patio, garden, fire pit. Multiple teepees for groups.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60" },
    price: 1450,
    location: "Tanay, Calabarzon",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Bungalow Holiday Villa Gen",
    description: "Villa with kitchen, WiFi, workspace, parking. Private pool and jacuzzi, TV, washing machine, AC. Complete holiday comfort.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60" },
    price: 1980,
    location: "Kaş, Antalya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Kid and Pet Friendly Tiny House",
    description: "Garden and mountain view with kitchen, WiFi, workspace, parking. Pets allowed, painting available, fenced backyard. Family-friendly design.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=60" },
    price: 920,
    location: "Avanos, Nevşehir",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "SAPANCA ANL HILL BUNGALOW",
    description: "Bay view and city skyline with lake access. Kitchen, WiFi, workspace, parking, private pool, jacuzzi. Hillside luxury accommodation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=60" },
    price: 1590,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "A-Frame of Mind",
    description: "Garden and valley view with kitchen and WiFi. Workspace, parking, pets allowed, security cameras. Charming A-frame in the mountains.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=60" },
    price: 1050,
    location: "Seetla, Uttarakhand",
    country: "India",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Dinosaurs Resort 3BHK AC Cabin",
    description: "Lake and mountain waterfront property. Kitchen, WiFi, workspace, parking, private pool, TV, AC, garden. Unique themed family resort.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60" },
    price: 2250,
    location: "Lonavla, Maharashtra",
    country: "India",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Sapanca Nature Bungalow Suite",
    description: "Mountain and garden view with kitchen, WiFi, parking. Pool and jacuzzi, pets allowed. Nature immersion with modern conveniences.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=60" },
    price: 1620,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Moonshine Sapanca",
    description: "Garden and mountain view with lake access. Kitchen, WiFi, parking, pool, HDTV. Tranquil lakeside retreat for couples and families.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60" },
    price: 1480,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "LOGIN OKINAWA -wood-",
    description: "Resort and ocean view beachfront access. Kitchen, WiFi, parking, pets allowed, TV, bath, garden. Traditional Japanese beach house.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&q=60" },
    price: 2100,
    location: "Onna-son, Okinawa",
    country: "Japan",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Hacienda Paragua",
    description: "Property with pets allowed, indoor fireplace, smoking allowed. Long-term stays welcome. Rustic island charm in tropical paradise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
    price: 1150,
    location: "Coron, MIMAROPA",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Rich Bungalow in Maşukiye",
    description: "Kitchen, WiFi, parking, pets allowed. TV, AC, garden, indoor fireplace. Cozy bungalow in forested mountain setting.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60" },
    price: 1380,
    location: "Kartepe, Kocaeli",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "LAKERS BUNGALOV 3",
    description: "Garden and mountain view with lake access. Kitchen, WiFi, parking, jacuzzi, security cameras. Secure lakeside accommodation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=60" },
    price: 1420,
    location: "Sapanca, Sakarya",
    country: "Turkey",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Cozy Tiny House in Bagac Bataan",
    description: "Garden and lake view beachfront property. Kitchen, WiFi, parking, TV, AC, hair dryer, dryer, patio. Compact coastal comfort.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=60" },
    price: 880,
    location: "Bagac, Central Luzon",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "A Lemon Tree Hut Near Auroville",
    description: "Kitchen, WiFi, workspace, parking, washing machine, garden, luggage drop-off. Peaceful eco-community living near Auroville.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=60" },
    price: 750,
    location: "Bommayapalayam, Tamil Nadu",
    country: "India",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "House in Monterrazas Metro Baguio",
    description: "Mountain view with kitchen, WiFi, workspace, parking. TV, washing machine, dryer, indoor fireplace. Spacious mountain house.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60" },
    price: 1650,
    location: "Baguio, Cordillera",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
  {
    title: "Glamping A-frame Kubo Sunset Hill",
    description: "WiFi, parking, shared backyard, luggage drop-off, fire pit, breakfast. Unique Filipino kubo glamping experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=60" },
    price: 820,
    location: "San Juan, Ilocos Region",
    country: "Philippines",
    owner: "68f9fa6c7dc2f3eab246d675"
  },
];

module.exports = { data: sampleListings };