# ✈️ Traveloop — Personalized Travel Planning Made Easy

Traveloop is a highly personalized, intelligent, and collaborative travel planning platform designed to transform the way individuals dream, design, and organize multi-city travel journeys. Built as an interactive and responsive full-stack web application, Traveloop simplifies the complexity of planning stop durations, managing travel items, exploring popular global destinations, and tracking travel budgets in real-time.

---

## ✨ Key Features

*   **🗺️ Interactive Itinerary Builder:** Plan multi-city stops, manage dates, arrange ordering, and design your dream timeline seamlessly.
*   **🌍 Explore Destinations Hub:** A curated collection of **54 popular global cities** across all 7 continents. Filter instantly by **Budget Tiers** (from backpacker-friendly to ultra-luxury), sort by popularity, and search in real-time.
*   **💰 Real-Time Budget & Expense Tracker:** Log travel costs dynamically. Features a sleek glassmorphic modal and instant visual breakdowns by categories (Transport, Stay, Meal, Activity, Other).
*   **📊 Dynamic Profile Statistics:** A customized profile dashboard that programmatically computes stats directly from your relational SQLite database:
    *   *Trips Planned:* Total count of personal itineraries.
    *   *Cities Visited:* Unique count of travel stops completed.
    *   *Total Budget:* Total amount of tracked expenses.
*   **🔒 Secure JWT Authentication:** Custom cookie-based authentication ensuring secure, private workspaces.
*   **🔗 Public Sharing:** Create public itineraries that can be shared via read-only views with anyone.
*   **🎨 Premium Glassmorphic Design:** A state-of-the-art UI system using customized Vanilla CSS Modules, rich HSL palettes, smooth micro-animations, and full dark-mode responsive layouts.

---

## 🛠️ Technology Stack

*   **Frontend & Server Components:** Next.js (App Router, Turbopack, React 19)
*   **Database & Schema Modeling:** SQLite with Prisma ORM (v5)
*   **Styling:** Custom Vanilla CSS Modules (Glassmorphism, transitions, scale animations)
*   **Utility Icons:** Lucide React
*   **Session Management:** JWT Token-based Auth via `jose` and HTTP-only cookies

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Installation
Clone the repository, navigate into the directory, and install dependencies:
```bash
npm install
```

### 3. Database Initialization & Seeding
Set up your local SQLite database, apply the schema migrations, and seed it with the **54 global popular destinations, test user, and sample trip**:
```bash
# Push the Prisma schema to SQLite
npx prisma db push

# Seed the database
npx prisma db seed
```

### 4. Running the App
Boot up the development instance using Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to begin exploring!

---

## 🔑 Hackathon Presentation Credentials
Skip the sign-up process and present the app instantly with our pre-populated sample trip (**Euro Trip 2026**), stops, and mock expenses:
*   **Email:** `test@example.com`
*   **Password:** `password123`
