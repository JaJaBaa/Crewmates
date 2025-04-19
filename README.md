# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Crewmates

Crewmates is a web application that allows you to build and manage your dream team of characters. Create, update, view, and delete custom crewmates with unique attributes.

## Features

- Create new crewmates with custom names, roles, and attributes
- View all your crewmates in a gallery
- See detailed information about each crewmate
- Edit existing crewmates to update their information
- Delete crewmates from your collection
- Responsive design that works on mobile and desktop

## Technologies Used

- React
- React Router
- Supabase (for database)
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd crewmates
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:

   ```
   VITE_SUPABASE_KEY=your-supabase-anon-key
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Database Setup

This application uses Supabase as the database. You'll need to create a table called `crewmates` with the following columns:

- id (uuid, primary key)
- name (text, not null)
- role (text, not null)
- speed (text, not null, default 'medium')
- strength (text, not null, default 'medium')
- intelligence (text, not null, default 'medium')
- created_at (timestamp with time zone, not null, default now())

SQL to create the table:

```sql
CREATE TABLE crewmates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  speed TEXT NOT NULL DEFAULT 'medium',
  strength TEXT NOT NULL DEFAULT 'medium',
  intelligence TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Locally preview the production build

## License

This project is licensed under the MIT License.
