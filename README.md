# User Management System

A Next.js + TypeScript CRUD app for managing users from a single dashboard. You can add, search, edit, and delete users, with using local data storage of "users.json" file.

## Features

- Add new users with form validation
- Search users by name or email
- Edit existing users inline
- Delete users with confirmation
- Prevent duplicate email entries
- Show alerts for validation and duplicate checks
- Persist data through Next.js Route Handlers
- Covered by Vitest and React Testing Library tests

## Tech Stack

- Next.js
- React
- TypeScript
- Vitest
- React Testing Library
- Node `fs` for file-based persistence

## Project Structure

- `app/page.tsx` - main user management dashboard
- `app/layout.tsx` - shared root layout and navigation
- `app/api/users/route.tsx` - `GET` and `POST` user endpoints
- `app/api/users/[id]/route.tsx` - `PUT` and `DELETE` user endpoints
- `app/components/` - forms, modals, validation helpers, and user list UI
- `app/tests/` - unit and API route tests
- `data/users.json` - local JSON storage used by the API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run tests

```bash
npm run test
```

### 4. Build for production

```bash
npm run build
```

### 5. Start the production server

```bash
npm run start
```

## API Endpoints

- `GET /api/users` - returns all users
- `POST /api/users` - adds a new user
- `PUT /api/users/:id` - updates a user by id
- `DELETE /api/users/:id` - deletes a user by id

## Data Notes

- User records are stored in `data/users.json`
- The app reads and writes this file directly through the API routes
- If you reset the JSON file, the dashboard will load that data on the next refresh

## Testing

The project includes tests for:

- API routes
- Add user form behavior
- Edit and delete flows
- Validation helpers
- Duplicate user checks
- User list and modal components

Run them with:

```bash
npm run test
```

## Notes

- This project uses the Next.js App Router
- Route handlers live inside the `app/api` directory
- The UI is centered around a single user-management workspace with quick actions, search, and list controls
