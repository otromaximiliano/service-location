# Geolocation Microservice for Argentina 🇦🇷

This service provides geolocation data (Provinces, Departments, Municipalities, Localities) for Argentina using a MongoDB database seeded from GeoRef AR.

## Base URL
Local: `http://localhost:3000`

## Endpoints

### 1. Search Locations
Search for any location by name. This uses a fuzzy text search.

**GET** `/api/search`

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `q` | `string` | Yes | The name to search for (e.g., "Cordoba", "Mar del Plata"). |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "official_id": "14",
      "name": "Córdoba",
      "category": "provincia",
      "location": { "type": "Point", "coordinates": [-64.6, -32.1] }
      // ...
    }
  ]
}
```

### 2. Reverse Geocoding
Find the enclosing or nearest Municipality/Department for a given coordinate. Ideal for auto-detecting user location.

**GET** `/api/reverse`

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `lat` | `float` | Yes | Latitude (e.g., -31.4201). |
| `lon` | `float` | Yes | Longitude (e.g., -64.1888). |

**Response:**
```json
{
  "success": true,
  "data": {
    "official_id": "14014",
    "name": "Capital",
    "category": "departamento",
    "parent": { "id": "14", "name": "Córdoba", "category": "provincia" },
    // ...
  }
}
```

### 3. Get Child Locations
Get a list of locations taking into account a hierarchy (e.g., all Localities in a Province).

**GET** `/api/children`

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `parent_id` | `string` | Yes | The ID of the parent or ancestor (e.g., "14" for Córdoba Province). Matches direct parent OR province. |
| `category` | `string` | No | Filter by category (e.g., "localidad", "municipio"). |

**Example:** Get all localities in Córdoba Province (Deep search)
`/api/children?parent_id=14&category=localidad`

**Response:**
```json
{
  "success": true,
  "data": [
    { "official_id": "14014010", "name": "Córdoba", "category": "localidad", ... },
    { "official_id": "14021020", "name": "Villa Carlos Paz", "category": "localidad", ... },
    // ... sorted by name A-Z
  ]
}
```

## Setup & Running

1. **Install Dependencies**: `npm install`
2. **Configure Env**: Create `.env.local` with `MONGODB_URI`.
3. **Seed Database**: `npx tsx scripts/seed.ts`
4. **Run Server**: `npm run dev`
