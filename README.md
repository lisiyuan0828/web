# SaaS Pro - Landing Page

A modern, professional landing page for SaaS products built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Beautiful, modern UI/UX design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Lightning-fast performance with Vite
- 🎭 Smooth animations and transitions
- 🎯 Optimized for conversions
- ♿ Accessible components
- 🎨 Customizable with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Hero.jsx        # Hero section
│   │   ├── Features.jsx    # Features showcase
│   │   ├── Testimonials.jsx # Customer testimonials
│   │   ├── Pricing.jsx     # Pricing plans
│   │   ├── CTA.jsx         # Call-to-action
│   │   └── Footer.jsx      # Footer section
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Content

Update the content in each component file to match your product:
- Hero section: `src/components/Hero.jsx`
- Features: `src/components/Features.jsx`
- Pricing plans: `src/components/Pricing.jsx`
- Testimonials: `src/components/Testimonials.jsx`

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## License

MIT License - feel free to use this template for your projects!
