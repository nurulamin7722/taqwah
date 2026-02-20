# Taqwah - Prayer Times Tracker

A beautiful, professional Next.js web application for tracking prayer times based on your location. Built with modern technologies and designed for optimal user experience.

## Features

✨ **Key Features:**
- 🌍 **Automatic Location Detection** - Gets prayer times based on user's device location
- ⏱️ **Live Countdown Timer** - Real-time countdown to next prayer
- 🎨 **Dark Professional Design** - Beautiful UI inspired by modern prayer apps
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🕌 **Islamic Calendar** - Displays both Gregorian and Islamic dates
- 🔗 **Reverse Geocoding** - Shows actual city/country names instead of coordinates
- 🌙 **Multiple Prayer Times** - Display all prayer times including Shor, Sunset, Imsak, and Midnight

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Aladhan Prayer Times API
- **Locationing**: Geolocation API + OpenStreetMap Nominatim

## Prerequisites

- Node.js v16+ (recommended v18+)
- npm or yarn package manager

## Installation

1. **Clone or navigate to the project folder:**
```bash
cd /home/shuzan/Music/taqwah
```

2. **Install dependencies:**
```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
taqwah/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── PrayerTimesDisplay.tsx   # Main prayer times display
│   └── LoadingError.tsx         # Loading and error states
├── hooks/
│   ├── useGeolocation.ts    # Geolocation hook
│   └── usePrayerTimes.ts    # Prayer times API hook
├── utils/
│   └── prayerUtils.ts       # Prayer calculation utilities
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## How It Works

1. **Location Detection**: On page load, the app requests user's location using the browser's Geolocation API
2. **Prayer Times Fetching**: Once coordinates are obtained, it fetches prayer times from Aladhan API for the current date
3. **Location Name Resolution**: Uses OpenStreetMap's Nominatim service to convert coordinates to city/country names
4. **Countdown Display**: Shows live countdown to the next prayer with updates every second
5. **Complete Prayer Times**: Displays all prayer times and additional times like Sunrise, Sunset, and Imsak

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with Geolocation support

## Troubleshooting

### "Please enable location permission"
- Check if your browser has permission to access location
- Some browsers may require HTTPS (except localhost)
- Try enabling location in browser settings

### Prayer times not loading
- Check internet connection
- Verify Aladhan API is accessible
- Check browser console for any errors

## Environment Variables

Currently, no environment variables are required. All services use free, public APIs.

## License

MIT

## Credits

- Prayer times data: [Aladhan API](https://aladhan.com)
- Location data: [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org)
- Designed with ❤️ for the Muslim community
# taqwah
