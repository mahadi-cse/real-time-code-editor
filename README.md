# Real-Time Code Editor

A collaborative code editor project currently focused on the **frontend application**.

> ⚠️ **Backend status:** The backend/realtime server is not available in this repository right now. This README documents the current frontend implementation and how to run it.

## Project Status

- ✅ Frontend app is implemented with React + TypeScript + Vite
- ✅ Home flow for creating/joining a room is available
- ✅ Editor page layout and connected-clients UI are available
- ⏳ Realtime collaboration/socket integration is not yet connected in this repo

## Repository Structure

```text
real-time-code-editor/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Clients.tsx
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   └── Editorpage.tsx
    │   ├── App.tsx
    │   ├── App.css
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## Frontend Features (Current)

### 1) Home Page (`/`)

- Enter **Room ID** and **Username**
- Create a new room ID using UUID
- Join room action routes to `/editor/:id`
- Toast notifications for success/error states

### 2) Editor Page (`/editor/:id`)

- Sidebar layout for connected participants
- Client avatar + username display component
- Placeholder editor area ready for realtime editor integration

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 7
- **Routing:** React Router DOM
- **Notifications:** react-hot-toast
- **Avatar UI:** react-avatar
- **Utilities:** uuid
- **Linting:** ESLint + typescript-eslint

## Getting Started (Frontend)

### Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm (comes with Node)

### Installation

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open the local Vite URL shown in terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Available Scripts

Inside `frontend/package.json`:

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript build + Vite production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks

## Routing Overview

- `/` → `Home`
- `/editor/:id` → `Editorpage`

## Current Limitations

Because backend services are currently unavailable in this repository:

- No live socket connection
- No shared code synchronization across users
- No persisted room/session management

## Next Backend Integration Checklist

When backend is added, wire the frontend with:

- Socket connection lifecycle (`connect`, `disconnect`, reconnect handling)
- Room join/leave events
- Realtime code change broadcasting
- Connected users sync and presence updates
- Error handling and reconnect UX

## Notes

- The existing `frontend/README.md` is the default Vite template and can be replaced later.
- This root `README.md` is intended for GitHub repository landing page visibility.

---

If you want, I can also replace `frontend/README.md` with a shorter frontend-specific developer README to keep both docs consistent.
