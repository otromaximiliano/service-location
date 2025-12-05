import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white">
      <main className="max-w-3xl mx-auto px-6 py-20">

        {/* Header */}
        <header className="mb-20">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wide text-zinc-400 uppercase border border-zinc-800 rounded-full bg-zinc-900/50">
            Microservice
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Argentina Geolocation API
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed font-light max-w-2xl">
            A high-performance, minimalist API for querying Argentinian Provinces, Departments, Municipalities, and Localities.
          </p>
        </header>

        {/* Endpoints */}
        <div className="space-y-20">

          <Section
            title="Search"
            method="GET"
            path="/api/search"
            desc="Fuzzy search for any location by name."
          >
            <Param name="q" type="string" required>Name to search (e.g., 'Cordoba')</Param>
            <CodeBlock>
              curl "http://localhost:3000/api/search?q=Cordoba"
            </CodeBlock>
          </Section>

          <Section
            title="Reverse Geocoding"
            method="GET"
            path="/api/reverse"
            desc="Find the nearest political subdivision for a set of coordinates."
          >
            <Param name="lat" type="float" required>Latitude</Param>
            <Param name="lon" type="float" required>Longitude</Param>
            <CodeBlock>
              curl "http://localhost:3000/api/reverse?lat=-31.4201&lon=-64.1888"
            </CodeBlock>
          </Section>

          <Section
            title="Children"
            method="GET"
            path="/api/children"
            desc="Traverse the hierarchy. Get all localities/departments for a parent ID."
          >
            <Param name="parent_id" type="string" required>Ancestor ID (e.g., '14' for Córdoba)</Param>
            <Param name="category" type="string" optional>Filter (e.g., 'localidad')</Param>
            <CodeBlock>
              curl "http://localhost:3000/api/children?parent_id=14&category=localidad"
            </CodeBlock>
          </Section>

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-900 flex justify-between text-sm text-zinc-600">
          <p>Service Location v1.0</p>
          <p>Powered by Next.js & MongoDB</p>
        </footer>
      </main>
    </div>
  );
}

function Section({ title, method, path, desc, children }: any) {
  return (
    <section className="group">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold text-zinc-100">{title}</h2>
        <div className="font-mono text-sm text-zinc-600 opacity-60 group-hover:opacity-100 transition-opacity">
          {method} {path}
        </div>
      </div>
      <p className="text-zinc-400 mb-8 font-light text-lg">{desc}</p>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/80">
          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 tracking-wider border border-zinc-700">
            {method}
          </span>
          <code className="text-sm font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">{path}</code>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Parameters</h3>
            <div className="space-y-4">
              {children.filter((child: any) => child.type === Param)}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Example Request</h3>
            {children.filter((child: any) => child.type === CodeBlock)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Param({ name, type, required, optional, children }: any) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline text-sm">
      <div className="min-w-[140px] mb-1 sm:mb-0">
        <code className="text-emerald-400 font-medium mr-2 text-base">{name}</code>
        <span className="text-xs text-zinc-600 font-mono">{type}</span>
      </div>
      <div className="flex-1 text-zinc-400 font-light flex items-center flex-wrap">
        <span>{children}</span>
        {required && <span className="ml-2 text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">Required</span>}
        {optional && <span className="ml-2 text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">Optional</span>}
      </div>
    </div>
  );
}

function CodeBlock({ children }: any) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-black rounded-lg p-5 font-mono text-xs text-zinc-300 overflow-x-auto border border-zinc-800 shadow-xl">
        <pre>{children}</pre>
      </div>
    </div>
  );
}
