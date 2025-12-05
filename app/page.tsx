import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-8">
      <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <header className="bg-blue-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Geolocation Microservice 🇦🇷</h1>
          <p className="text-blue-100 text-lg">
            API for Argentina's Provinces, Departments, Municipalities, and Localities.
          </p>
        </header>

        <div className="p-8 space-y-12">

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">📌 Base URL</h2>
            <code className="bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-md block w-full">
              http://localhost:3000
            </code>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">🚀 Endpoints</h2>

            {/* GET /api/search */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">GET</span>
                <code className="text-lg font-mono">/api/search</code>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Search for any location by name using fuzzy text search.
              </p>

              <h3 className="font-semibold mb-2">Parameters</h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                <li><code className="font-bold text-blue-600">q</code> (string, required): The name to search (e.g., "Cordoba").</li>
              </ul>

              <h3 className="font-semibold mb-2">Example</h3>
              <div className="bg-black text-gray-300 p-4 rounded-md overflow-x-auto text-sm">
                <code>curl "http://localhost:3000/api/search?q=Cordoba"</code>
              </div>
            </div>

            {/* GET /api/reverse */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">GET</span>
                <code className="text-lg font-mono">/api/reverse</code>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Find the nearest Municipality or Department for a coordinate.
              </p>

              <h3 className="font-semibold mb-2">Parameters</h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                <li><code className="font-bold text-blue-600">lat</code> (float, required): Latitude (e.g., -31.4201).</li>
                <li><code className="font-bold text-blue-600">lon</code> (float, required): Longitude (e.g., -64.1888).</li>
              </ul>

              <h3 className="font-semibold mb-2">Example</h3>
              <div className="bg-black text-gray-300 p-4 rounded-md overflow-x-auto text-sm">
                <code>curl "http://localhost:3000/api/reverse?lat=-31.4201&lon=-64.1888"</code>
              </div>
            </div>

            {/* GET /api/children */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">GET</span>
                <code className="text-lg font-mono">/api/children</code>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Get child locations (e.g., all Localities in a Province). Supports deep hierarchy search.
              </p>

              <h3 className="font-semibold mb-2">Parameters</h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                <li><code className="font-bold text-blue-600">parent_id</code> (string, required): ID of the ancestor (e.g., "14" for Córdoba).</li>
                <li><code className="font-bold text-blue-600">category</code> (string, optional): Filter by category (e.g., "localidad").</li>
              </ul>

              <h3 className="font-semibold mb-2">Example</h3>
              <div className="bg-black text-gray-300 p-4 rounded-md overflow-x-auto text-sm">
                <code>curl "http://localhost:3000/api/children?parent_id=14&category=localidad"</code>
              </div>
            </div>

          </section>

          <footer className="text-center text-gray-500 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="mb-2">Powered by MongoDB & Next.js</p>
            <p className="text-sm">Data source: GeoRef AR</p>
          </footer>

        </div>
      </main>
    </div>
  );
}
