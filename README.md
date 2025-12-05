# Carwi Location API 🇦🇷

A high-performance API for inquiring about Provinces, Departments, Municipalities, and Localities in Argentina.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB (Native Driver)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup Environment**:
   Create `.env.local` and add your MongoDB connection string:
   ```env
   MONGODB_URI="your_mongodb_connection_string"
   ```

3. **Seed Database**:
   Populate the database with official data from GeoRef AR:
   ```bash
   npx tsx scripts/seed.ts
   ```

4. **Run Development Server**:
   ```bash
   pnpm dev
   ```

## Documentation

Visit `http://localhost:3000` for interactive API documentation and usage examples.
