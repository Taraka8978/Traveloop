import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

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

  // Create Cities
  const paris = await prisma.city.create({
    data: { name: 'Paris', country: 'France', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' }
  })
  const tokyo = await prisma.city.create({
    data: { name: 'Tokyo', country: 'Japan', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' }
  })
  const bali = await prisma.city.create({
    data: { name: 'Bali', country: 'Indonesia', costIndex: 2, popularity: 4, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' }
  })
  const newyork = await prisma.city.create({
    data: { name: 'New York', country: 'USA', costIndex: 5, popularity: 5, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80' }
  })
  const rome = await prisma.city.create({
    data: { name: 'Rome', country: 'Italy', costIndex: 4, popularity: 5, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80' }
  })
  console.log('Created cities')

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

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
