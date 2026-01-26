# 🎨 CSS & TailwindCSS Class Reference

Complete breakdown of all styling used in the website.

---

## 🌈 Custom CSS Classes

### Gradient Utilities
```css
.gradient-text
/* Blue to cyan text gradient - used in hero headline */
```

```css
.gradient-bg-primary
/* Blue to cyan background gradient */
```

```css
.gradient-bg-secondary
/* Purple to pink background gradient */
```

```css
.gradient-bg-success
/* Green to teal background gradient */
```

### Interactive Effects
```css
.card-hover
/* Scale + shadow on hover - for cards */
```

```css
.glass-effect
/* Frosted glass/backdrop blur effect */
```

```css
.section-light
/* Light gradient section background */
```

### Animations
```css
.animate-fade-in-up
/* Content fades in from bottom (0.6s) */
```

```css
.animate-float
/* Floating animation, infinite loop (3s) */
```

---

## 🎯 TailwindCSS Patterns Used

### Layout
```
max-w-7xl mx-auto          → Centered container, max 1280px
px-4 sm:px-6 lg:px-8      → Responsive padding
py-20                      → Vertical section padding
```

### Grid Systems
```
grid md:grid-cols-3 gap-8         → 3 column grid on desktop
grid md:grid-cols-2 lg:grid-cols-4 → Responsive 4 column grid
```

### Flexbox
```
flex justify-between items-center   → Space between, centered
flex flex-col sm:flex-row gap-4    → Responsive flex direction
```

### Typography
```
text-5xl md:text-6xl lg:text-7xl   → Responsive huge text
text-xl md:text-2xl                → Responsive large text
font-bold                          → Bold weight
```

### Colors
```
bg-blue-600          → Solid blue background
text-gray-900        → Dark gray text
border-blue-600      → Blue border
```

### Gradients
```
bg-gradient-to-br from-slate-50 to-blue-50  → Subtle section gradient
bg-gradient-to-br from-blue-50 to-cyan-50   → Card gradient
bg-gradient-to-r from-blue-600 to-cyan-600  → Text gradient
```

### Shadows & Effects
```
shadow-lg            → Large shadow
shadow-xl            → Extra large shadow
hover:shadow-2xl     → 2XL shadow on hover
backdrop-blur-md     → Medium backdrop blur (glass effect)
```

### Border & Radius
```
rounded-lg           → 0.5rem border radius
rounded-xl           → 0.75rem border radius
rounded-2xl          → 1rem border radius
rounded-full         → Fully round (circles)
border-2             → 2px border
border-t-4           → 4px top border
```

### Spacing
```
mb-4, mb-6, mb-8     → Bottom margins
mt-2, mt-4           → Top margins
p-6, p-8             → Padding
space-x-8            → Horizontal spacing between children
space-y-2            → Vertical spacing between children
gap-4, gap-8         → Grid/flex gap
```

### Positioning
```
fixed top-0 w-full z-50   → Fixed navbar at top
relative                   → Relative positioning
absolute                   → Absolute positioning
```

### Hover States
```
hover:bg-blue-700      → Darker blue on hover
hover:text-blue-600    → Blue text on hover
hover:shadow-xl        → Larger shadow on hover
hover:scale-105        → Slight scale up on hover
hover:underline        → Underline on hover
```

### Transitions
```
transition              → Default transition (150ms)
transition-all          → Transition all properties
duration-300            → 300ms duration
```

### Responsive Display
```
hidden md:flex         → Hidden on mobile, flex on desktop
flex-col sm:flex-row   → Column on mobile, row on desktop
```

---

## 🖼️ Component-Specific Styling

### Navigation Bar
```jsx
className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50"
// Fixed, semi-transparent white, backdrop blur, shadow, always on top
```

### Hero Headline
```jsx
className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900"
// Responsive huge text, bold, dark gray
```

### Primary Button
```jsx
className="inline-flex items-center px-8 py-4 bg-blue-600 text-white 
           rounded-lg font-semibold hover:bg-blue-700 transition 
           shadow-lg hover:shadow-xl"
// Blue button with hover darkening and shadow growth
```

### Secondary Button
```jsx
className="inline-flex items-center px-8 py-4 bg-white text-blue-600 
           rounded-lg font-semibold hover:bg-gray-50 transition 
           shadow-lg hover:shadow-xl border-2 border-blue-600"
// White button with blue border and text
```

### Feature Card
```jsx
className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 
           rounded-2xl shadow-lg hover:shadow-xl transition"
// Gradient background, large padding, rounded, shadow with hover effect
```

### Methodology Card
```jsx
className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl 
           transition border-t-4 border-red-500"
// White card with colored top border accent
```

### Team Card
```jsx
className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 
           rounded-2xl shadow-lg hover:shadow-xl transition text-center"
// Gradient card, centered content, shadows
```

### Icon Badge (Team)
```jsx
className="bg-blue-600 w-24 h-24 rounded-full flex items-center 
           justify-center mx-auto mb-4"
// Circular colored background for icons
```

### Sector Card
```jsx
className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
// Simple white card with hover shadow
```

### Footer
```jsx
className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
// Dark background, white text, responsive padding
```

---

## 📐 Spacing System

```
Padding Scale:
p-4  → 1rem (16px)
p-6  → 1.5rem (24px)
p-8  → 2rem (32px)

Section Padding:
py-20 → 5rem (80px) top and bottom

Container Max Width:
max-w-7xl → 80rem (1280px)
max-w-4xl → 56rem (896px)
max-w-3xl → 48rem (768px)
```

---

## 🎨 Color Palette Used

### Primary Blues
- `blue-50` → #eff6ff (lightest)
- `blue-100` → #dbeafe
- `blue-400` → #60a5fa
- `blue-600` → #2563eb (brand primary)
- `blue-700` → #1d4ed8 (hover state)

### Accent Colors
- `cyan-600` → #0891b2 (gradient accent)
- `purple-600` → #9333ea
- `green-600` → #16a34a
- `red-500` → #ef4444

### Neutrals
- `white` → #ffffff
- `gray-50` → #f9fafb
- `gray-400` → #9ca3af
- `gray-600` → #4b5563
- `gray-700` → #374151
- `gray-900` → #111827 (darkest)

---

## 🔧 Responsive Breakpoints

```
Mobile:     < 640px    (default)
sm:         ≥ 640px    (small tablets)
md:         ≥ 768px    (tablets)
lg:         ≥ 1024px   (laptops)
xl:         ≥ 1280px   (desktops)
2xl:        ≥ 1536px   (large screens)
```

---

## ⚡ Performance Optimizations

1. **TailwindCSS Purge** - Unused classes removed in production
2. **Minimal Custom CSS** - Leveraging Tailwind utilities
3. **No Heavy Dependencies** - Only Lucide icons
4. **Vite Build** - Fast bundling and tree-shaking
5. **Responsive Images** - SVG icons scale perfectly

---

## 🎯 Usage Examples

### Creating a New Card
```jsx
<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
  <YourIcon className="h-12 w-12 text-blue-600 mb-4" />
  <h3 className="text-2xl font-bold text-gray-900 mb-3">Title</h3>
  <p className="text-gray-600">Description text</p>
</div>
```

### Creating a Button
```jsx
<button className="px-8 py-4 bg-blue-600 text-white rounded-lg 
                   font-semibold hover:bg-blue-700 transition">
  Click Me
</button>
```

### Creating a Section
```jsx
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Your content */}
  </div>
</section>
```

---

**All CSS is live and hot-reloading in your dev environment!** 🚀
