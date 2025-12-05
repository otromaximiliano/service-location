# carwi location api 🇦🇷

![Carwi Location API](https://img.shields.io/badge/Carwi-Location%20API-black?style=for-the-badge&logo=vercel)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

The official microservice for managing and querying geolocation data across the **[carwi.autos](https://www.carwi.autos)** ecosystem. This API provides high-performance access to Argentina's Provinces, Departments, Municipalities, and Localities.

## 🚀 Features

- **Fuzzy Search**: Find any location by name with typo tolerance.
- **Reverse Geocoding**: Determine the nearest political subdivision from simple latitude/longitude coordinates.
- **Deep Hierarchy**: Retrieve all child locations for any parent entity (e.g., get all localities in a specific province).
- **Fast & Scalable**: Built on Next.js API Routes and optimized MongoDB geospatial indexes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Native Driver)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Source**: [GeoRef AR](https://datos.gob.ar/)

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/carwi-autos/service-location.git
   cd service-location
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/service-location?retryWrites=true&w=majority"
   ```

4. **Seed the Database**
   Populate your MongoDB instance with the official data from the Argentine government:
   ```bash
   npx tsx scripts/seed.ts
   ```

5. **Run the Server**
   ```bash
   pnpm dev
   ```
   The API will be available at `http://localhost:3000`.

## 📖 API Documentation

The project includes a self-documenting landing page. Once running, visit `http://localhost:3000` to see interactive documentation and usage examples.

### Core Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/search?q=...` | Search for locations by name. |
| `GET` | `/api/reverse?lat=...&lon=...` | Find location by coordinates. |
| `GET` | `/api/children?parent_id=...` | List child locations (e.g., Localities of a Province). |

## 📄 License

This project is proprietary software belonging to **Carwi**.

---

<p align="center">
  Built with ❤️ for <a href="https://www.carwi.autos">carwi.autos</a>
</p>
