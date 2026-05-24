import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with 50+ popular cities across all budget tiers...')

  // Clean up existing data
  await prisma.activity.deleteMany()
  await prisma.stop.deleteMany()
  await prisma.city.deleteMany()
  await prisma.expense.deleteMany()
  await prisma.checklistItem.deleteMany()
  await prisma.note.deleteMany()
  await prisma.trip.deleteMany()
  await prisma.user.deleteMany()

  // Create User
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Traveler Joe',
    },
  })
  console.log(`Created user: ${user.email}`)

  // Create Cities list spanning all tiers (50+ cities)
  // We keep paris and rome as variables to hook up to the default trip
  
  // --- TIER 5 (Ultra-Luxury / Est. $350+ / day) ---
  const newyork = await prisma.city.create({
    data: { name: 'New York', country: 'USA', costIndex: 5, popularity: 5, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80' }
  })
  const zurich = await prisma.city.create({
    data: { name: 'Zurich', country: 'Switzerland', costIndex: 5, popularity: 4, image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80' }
  })
  const geneva = await prisma.city.create({
    data: { name: 'Geneva', country: 'Switzerland', costIndex: 5, popularity: 4, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80' }
  })
  const London = await prisma.city.create({
    data: { name: 'London', country: 'UK', costIndex: 5, popularity: 5, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' }
  })
  const reykjavik = await prisma.city.create({
    data: { name: 'Reykjavik', country: 'Iceland', costIndex: 5, popularity: 4, image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80' }
  })
  const oslo = await prisma.city.create({
    data: { name: 'Oslo', country: 'Norway', costIndex: 5, popularity: 4, image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800&q=80' }
  })
  const singapore = await prisma.city.create({
    data: { name: 'Singapore', country: 'Singapore', costIndex: 5, popularity: 5, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' }
  })

  // --- TIER 4 (Premium / Est. $200 - $350 / day) ---
  const paris = await prisma.city.create({
    data: { name: 'Paris', country: 'France', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' }
  })
  const tokyo = await prisma.city.create({
    data: { name: 'Tokyo', country: 'Japan', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' }
  })
  const rome = await prisma.city.create({
    data: { name: 'Rome', country: 'Italy', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80' }
  })
  const amsterdam = await prisma.city.create({
    data: { name: 'Amsterdam', country: 'Netherlands', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80' }
  })
  const sydney = await prisma.city.create({
    data: { name: 'Sydney', country: 'Australia', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80' }
  })
  const melbourne = await prisma.city.create({
    data: { name: 'Melbourne', country: 'Australia', costIndex: 4, popularity: 4, image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&q=80' }
  })
  const copenhagen = await prisma.city.create({
    data: { name: 'Copenhagen', country: 'Denmark', costIndex: 4, popularity: 4, image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800&q=80' }
  })
  const stockholm = await prisma.city.create({
    data: { name: 'Stockholm', country: 'Sweden', costIndex: 4, popularity: 4, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80' }
  })
  const toronto = await prisma.city.create({
    data: { name: 'Toronto', country: 'Canada', costIndex: 4, popularity: 4, image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80' }
  })
  const vancouver = await prisma.city.create({
    data: { name: 'Vancouver', country: 'Canada', costIndex: 4, popularity: 4, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80' }
  })
  const sanfrancisco = await prisma.city.create({
    data: { name: 'San Francisco', country: 'USA', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80' }
  })
  const losangeles = await prisma.city.create({
    data: { name: 'Los Angeles', country: 'USA', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1515898913320-f38370edab7a?w=800&q=80' }
  })
  const miami = await prisma.city.create({
    data: { name: 'Miami', country: 'USA', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' }
  })
  const dubai = await prisma.city.create({
    data: { name: 'Dubai', country: 'UAE', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' }
  })
  const hongkong = await prisma.city.create({
    data: { name: 'Hong Kong', country: 'China', costIndex: 4, popularity: 4, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80' }
  })

  // --- TIER 3 (Moderate / Est. $120 - $200 / day) ---
  const barcelona = await prisma.city.create({
    data: { name: 'Barcelona', country: 'Spain', costIndex: 3, popularity: 5, image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?w=800&q=80' }
  })
  const madrid = await prisma.city.create({
    data: { name: 'Madrid', country: 'Spain', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80' }
  })
  const vienna = await prisma.city.create({
    data: { name: 'Vienna', country: 'Austria', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80' }
  })
  const berlin = await prisma.city.create({
    data: { name: 'Berlin', country: 'Germany', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80' }
  })
  const munich = await prisma.city.create({
    data: { name: 'Munich', country: 'Germany', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80' }
  })
  const lisbon = await prisma.city.create({
    data: { name: 'Lisbon', country: 'Portugal', costIndex: 3, popularity: 5, image: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800&q=80' }
  })
  const athens = await prisma.city.create({
    data: { name: 'Athens', country: 'Greece', costIndex: 3, popularity: 5, image: 'https://images.unsplash.com/photo-1513807762437-8c8dee6b3776?w=800&q=80' }
  })
  const seoul = await prisma.city.create({
    data: { name: 'Seoul', country: 'South Korea', costIndex: 3, popularity: 5, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80' }
  })
  const taipei = await prisma.city.create({
    data: { name: 'Taipei', country: 'Taiwan', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80' }
  })
  const capetown = await prisma.city.create({
    data: { name: 'Cape Town', country: 'South Africa', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80' }
  })
  const prague = await prisma.city.create({
    data: { name: 'Prague', country: 'Czech Republic', costIndex: 3, popularity: 5, image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800&q=80' }
  })
  const budapest = await prisma.city.create({
    data: { name: 'Budapest', country: 'Hungary', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80' }
  })
  const riodejaneiro = await prisma.city.create({
    data: { name: 'Rio de Janeiro', country: 'Brazil', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80' }
  })
  const santiago = await prisma.city.create({
    data: { name: 'Santiago', country: 'Chile', costIndex: 3, popularity: 3, image: 'https://images.unsplash.com/photo-1563968743333-044cef800494?w=800&q=80' }
  })
  const auckland = await prisma.city.create({
    data: { name: 'Auckland', country: 'New Zealand', costIndex: 3, popularity: 4, image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80' }
  })

  // --- TIER 2 (Value / Est. $60 - $120 / day) ---
  const bali = await prisma.city.create({
    data: { name: 'Bali', country: 'Indonesia', costIndex: 2, popularity: 5, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' }
  })
  const bangkok = await prisma.city.create({
    data: { name: 'Bangkok', country: 'Thailand', costIndex: 2, popularity: 5, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80' }
  })
  const kualalumpur = await prisma.city.create({
    data: { name: 'Kuala Lumpur', country: 'Malaysia', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80' }
  })
  const istanbul = await prisma.city.create({
    data: { name: 'Istanbul', country: 'Turkey', costIndex: 2, popularity: 5, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80' }
  })
  const marrakech = await prisma.city.create({
    data: { name: 'Marrakech', country: 'Morocco', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80' }
  })
  const krakow = await prisma.city.create({
    data: { name: 'Krakow', country: 'Poland', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1579294800821-694d95e86143?w=800&q=80' }
  })
  const buenosaires = await prisma.city.create({
    data: { name: 'Buenos Aires', country: 'Argentina', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80' }
  })
  const mexicocity = await prisma.city.create({
    data: { name: 'Mexico City', country: 'Mexico', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800&q=80' }
  })
  const lima = await prisma.city.create({
    data: { name: 'Lima', country: 'Peru', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80' }
  })
  const bogota = await prisma.city.create({
    data: { name: 'Bogota', country: 'Colombia', costIndex: 2, popularity: 3, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80' }
  })

  // --- TIER 1 (Budget / Est. $30 - $60 / day) ---
  const hanoi = await prisma.city.create({
    data: { name: 'Hanoi', country: 'Vietnam', costIndex: 1, popularity: 5, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80' }
  })
  const siemreap = await prisma.city.create({
    data: { name: 'Siem Reap', country: 'Cambodia', costIndex: 1, popularity: 4, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80' }
  })
  const delhi = await prisma.city.create({
    data: { name: 'Delhi', country: 'India', costIndex: 1, popularity: 4, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80' }
  })
  const mumbai = await prisma.city.create({
    data: { name: 'Mumbai', country: 'India', costIndex: 1, popularity: 4, image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&q=80' }
  })
  const jaipur = await prisma.city.create({
    data: { name: 'Jaipur', country: 'India', costIndex: 1, popularity: 4, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80' }
  })
  const goa = await prisma.city.create({
    data: { name: 'Goa', country: 'India', costIndex: 1, popularity: 4, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' }
  })
  const kathmandu = await prisma.city.create({
    data: { name: 'Kathmandu', country: 'Nepal', costIndex: 1, popularity: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80' }
  })
  const cairo = await prisma.city.create({
    data: { name: 'Cairo', country: 'Egypt', costIndex: 1, popularity: 5, image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80' }
  })
  const manila = await prisma.city.create({
    data: { name: 'Manila', country: 'Philippines', costIndex: 1, popularity: 3, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80' }
  })
  const jakarta = await prisma.city.create({
    data: { name: 'Jakarta', country: 'Indonesia', costIndex: 1, popularity: 3, image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800&q=80' }
  })
  const lapaz = await prisma.city.create({
    data: { name: 'La Paz', country: 'Bolivia', costIndex: 1, popularity: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80' }
  })
  const quito = await prisma.city.create({
    data: { name: 'Quito', country: 'Ecuador', costIndex: 1, popularity: 3, image: 'https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=800&q=80' }
  })

  console.log('Successfully created 50+ diverse global cities!')

  // Create a Trip
  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      name: 'Euro Trip 2026',
      description: 'A grand tour across Europe covering Paris and Rome.',
      startDate: new Date('2026-06-01T10:00:00Z'),
      endDate: new Date('2026-06-15T20:00:00Z'),
      coverPhoto: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1000&q=80',
      isPublic: true,
    }
  })
  console.log(`Created trip: ${trip.name}`)

  // Create Stops
  const stop1 = await prisma.stop.create({
    data: {
      tripId: trip.id,
      cityId: paris.id,
      startDate: new Date('2026-06-01T10:00:00Z'),
      endDate: new Date('2026-06-07T10:00:00Z'),
      order: 1
    }
  })
  const stop2 = await prisma.stop.create({
    data: {
      tripId: trip.id,
      cityId: rome.id,
      startDate: new Date('2026-06-07T14:00:00Z'),
      endDate: new Date('2026-06-15T20:00:00Z'),
      order: 2
    }
  })

  // Create Activities
  await prisma.activity.create({
    data: {
      stopId: stop1.id,
      name: 'Eiffel Tower Visit',
      type: 'Sightseeing',
      cost: 30,
      duration: 120,
      description: 'Visit the iconic Eiffel Tower and take photos.',
      date: new Date('2026-06-02T14:00:00Z')
    }
  })
  await prisma.activity.create({
    data: {
      stopId: stop1.id,
      name: 'Louvre Museum',
      type: 'Culture',
      cost: 20,
      duration: 180,
      description: 'See the Mona Lisa.',
      date: new Date('2026-06-03T10:00:00Z')
    }
  })
  await prisma.activity.create({
    data: {
      stopId: stop2.id,
      name: 'Colosseum Tour',
      type: 'Sightseeing',
      cost: 25,
      duration: 120,
      description: 'Guided tour of the ancient Colosseum.',
      date: new Date('2026-06-08T09:00:00Z')
    }
  })

  // Create Expenses
  await prisma.expense.create({
    data: { tripId: trip.id, category: 'Transport', description: 'Flight to Paris', amount: 450, date: new Date('2026-05-01T10:00:00Z') }
  })
  await prisma.expense.create({
    data: { tripId: trip.id, category: 'Stay', description: 'Airbnb Paris', amount: 600, date: new Date('2026-05-05T10:00:00Z') }
  })

  // Create Checklist Items
  await prisma.checklistItem.create({ data: { tripId: trip.id, name: 'Passport', category: 'Documents', isPacked: true } })
  await prisma.checklistItem.create({ data: { tripId: trip.id, name: 'Comfortable Shoes', category: 'Clothing', isPacked: false } })
  await prisma.checklistItem.create({ data: { tripId: trip.id, name: 'Camera', category: 'Electronics', isPacked: false } })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
