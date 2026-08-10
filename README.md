# 🌿 PlantPal

A cute, cozy digital garden for tracking the plants you actually grow — tulsi on the balcony, curry leaf on the kitchen sill, the money plant that refuses to die. Built as a frontend-only React portfolio project.

> A cute little digital garden made for an Indian plant lover.

---

## Overview

PlantPal lets you add, edit, and track the plants in your home. It calculates watering schedules, health status, and daily care tasks automatically from your plant data — nothing is hard-coded. Everything is saved to `localStorage`, so your garden survives a refresh.

No backend, no database, no build complexity — just `npm install` and `npm run dev`.

## Features

- **Dashboard** with a warm greeting, hero illustration, live stats, and today's care tasks
- **My Plants** grid with search, filters (All / Healthy / Needs Attention / Needs Water), and sorting (Name / Health / Watering Due)
- **Plant Details** page — a little digital plant journal with a big illustration, health bar, care info, and editable notes
- **Add / Edit Plant** with a validated form (required fields, numeric watering frequency, valid date)
- **Delete Plant** with a confirmation dialog
- **Mark as Watered** — recalculates the next watering date instantly, everywhere in the app
- **Care Schedule** grouping every upcoming task by day (Today, Tomorrow, and beyond)
- **Graceful image fallback** — a soft botanical placeholder with a sprout icon and the plant's name whenever an illustration is missing, so the app looks complete before you've added a single PNG
- **Empty state** with a friendly illustration when the garden has no plants
- Fully responsive: sidebar navigation on desktop, bottom tab bar on mobile
- Persisted entirely in `localStorage` — no backend required

## Tech Stack

- React 18 + Vite
- React Router DOM (client-side routing)
- React Context API (shared plant state — no Redux)
- Plain CSS (custom design system, no Tailwind)
- lucide-react (icons)
- Google Fonts: Fraunces (display) + Nunito Sans (body)

## React Concepts Demonstrated

- **useState** — forms, search, filters, sort, dialogs, notes editing
- **useEffect** — persisting the garden to `localStorage` whenever it changes
- **useMemo** — filtered/sorted plant lists, dashboard statistics, care-task grouping (all derived, never duplicated in state)
- **Context API** — `PlantContext` centralizes `addPlant`, `updatePlant`, `deletePlant`, `waterPlant`, `getPlant`, `updateNotes`
- **React Router** — five routes, `NavLink` active states, `useParams`/`useNavigate`
- **Component composition** — small reusable pieces (`PlantCard`, `PlantImage`, `HealthBar`, `StatCard`, `CareTask`, `PlantForm`, `SearchBar`, `EmptyState`, `ConfirmDialog`) shared across pages
- **Controlled forms** with inline validation and reuse between Add and Edit flows

## Project Structure

```
PlantPal/
├── package.json
├── vite.config.js
├── index.html
├── README.md
│
├── public/
│   └── illustrations/        ← put your PNG illustrations here
│
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── components/
    │   ├── Navbar.jsx         (mobile bottom nav)
    │   ├── Sidebar.jsx        (desktop nav)
    │   ├── PlantCard.jsx
    │   ├── PlantImage.jsx     (image + fallback)
    │   ├── StatCard.jsx
    │   ├── CareTask.jsx
    │   ├── HealthBar.jsx
    │   ├── PlantForm.jsx      (shared by Add + Edit)
    │   ├── SearchBar.jsx
    │   ├── EmptyState.jsx
    │   └── ConfirmDialog.jsx  (delete confirmation)
    │
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Plants.jsx
    │   ├── PlantDetails.jsx
    │   ├── AddPlant.jsx
    │   └── CareSchedule.jsx
    │
    ├── context/
    │   └── PlantContext.jsx
    │
    ├── utils/
    │   ├── storage.js         (localStorage helpers)
    │   └── plantUtils.js      (health/watering calculations)
    │
    ├── data/
    │   └── samplePlants.js    (12 sample Indian household plants)
    │
    └── styles/
        ├── global.css
        ├── dashboard.css
        ├── plants.css
        ├── details.css
        └── forms.css
```

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Adding Your Own Illustrations

The app is fully functional without any images — every plant that's missing an illustration shows a soft botanical placeholder with a sprout icon and its name instead of a broken image.

To add your own artwork, just drop PNG files into:

```
public/illustrations/
```

using these filenames (no code changes needed — they'll appear automatically):

```
tulsi.png
money-plant.png
aloe-vera.png
snake-plant.png
areca-palm.png
hibiscus.png
jasmine.png
curry-leaf.png
mint.png
marigold.png
peace-lily.png
monstera.png
empty-pot.png
watering-can.png
garden-hero.png
```

When you add a new plant through the **Add Plant** form, PlantPal automatically guesses an illustration filename from the plant's name (e.g. "Fiddle Leaf Fig" → `/illustrations/fiddle-leaf-fig.png`) — or you can type your own path in the optional "Illustration filename" field.

## Screenshots

_Add screenshots of the Dashboard, My Plants grid, and Plant Details page here once you've run the app locally._

## Future Improvements

- Weather-aware watering suggestions for outdoor/balcony plants
- Photo journal per plant (multiple images over time)
- Reminders/notifications for overdue care tasks
- Drag-and-drop reordering of plants within a location
- Light/dark theme toggle
- Export/import garden data as JSON

---

Built with 🌿 as a portfolio project.
