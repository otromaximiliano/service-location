# Carwi Minimalist Design System 🎨

Use this reference to replicate the strict, minimalist dark mode design of the Carwi API ecosystem.

## 1. Core Config

### Fonts
- **Primary**: `Poppins` (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 900 (Black)
- **Configuration**:
  ```tsx
  // layout.tsx
  const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
  });
  ```

### Colors (Tailwind)
- **Background**: `#09090b` (Rich Black)
- **Foreground**: `#ededed` (Off-white)
- **Accents**:
  - `zinc-400/500` (Secondary Text)
  - `emerald-400` (Parameter Names)
  - `amber-500` (Warning/Required Badges)

## 2. Layout Structure

- **Container**: `max-w-3xl mx-auto px-6 py-20`
- **Spacing**: Vertical rhythm usually `mb-6`, `mb-20` (large sections), `gap-3`.

## 3. UI Components

### Header
- **Badge**:
  - `text-xs font-medium tracking-wide uppercase`
  - `text-zinc-400 border border-zinc-800 rounded-full bg-zinc-900/50`
  - Padding: `px-3 py-1 mb-6`
- **Title**:
  - `text-6xl font-black tracking-tighter lowercase`
  - **Gradient**: `bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent` (optional)
  - **Highlighted Span**: `text-zinc-500 font-bold`
- **Description**: `text-xl text-zinc-400 font-light leading-relaxed`

### Cards (Sections)
- **Container**:
  - `bg-zinc-900/40 border border-zinc-800 rounded-2xl`
  - `backdrop-blur-sm`
  - **Hover**: `hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300`
- **Card Header**:
  - `border-b border-zinc-800 bg-zinc-900/80 px-6 py-4`
  - **Method Badge**: `bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold text-[10px] uppercase tracking-wider`
- **Content Area**: `p-6 sm:p-8`

### Typography Rules
- **Lowercase Branding**: The brand name "carwi" should always be **lowercase** and **bold/black** weight.
- **Headings**: Usually `text-white` or `text-zinc-100`.
- **Labels**: `text-xs font-bold text-zinc-500 uppercase tracking-widest`

### Code Blocks
- **Bg**: `bg-black`
- **Border**: `border border-zinc-800`
- **Effect**: Add a subtle glow behind using a blurred absolute div:
  ```tsx
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
  ```

## 4. Global CSS
```css
/* globals.css */
body {
  background: #09090b;
  color: #ededed;
}
```
