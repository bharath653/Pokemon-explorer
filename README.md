🧩 Pokemon Explorer – Next.js Assignment
A responsive and visually appealing Pokémon Explorer web application built using Next.js. It fetches data from the PokeAPI, displays a searchable list of Pokémon, and allows users to view detailed information on each one.

🚀 Tech Stack
Framework: Next.js

Language: TypeScript (optional in your case)

Styling: TailwindCSS

API: PokeAPI

Package Manager: Yarn

📦 Installation
Make sure you have Node.js (v20.19.3 or later) installed.

1. Install Yarn (if not already installed)
npm install -g yarn
2. Install dependencies
yarn
3. Start the development server
yarn dev

The app should now be running at http://localhost:3000

📂 Folder Structure (Important Files)

├── pages/
│   ├── index.tsx               # Homepage
│   ├── _app.tsx                # Global app component
│   └── pokemon/[id].tsx        # Dynamic route for Pokemon details
├── components/                 # Reusable UI components
├── apis/                       # API utility functions
├── public/                     # Static assets (optional SVGs, etc.)
├── styles/                     # Global styles

 Features
🔍 Search Pokémons by name

📄 Detailed view with image, stats, types, abilities, and moves

🚦 Server-side rendering (SSR) for detail pages

⚡ Optimized performance

💄 Responsive design using TailwindCSS

📝 Requirements Covered (from Assignment)
 Homepage with list and search

 Pokémon detail page via dynamic route

 SSR implementation

 Clean and styled UI

🛠 Recommended
Node.js version: 20.19.3

Package manager: Yarn

📬 Contact
bharathn653@gmail.com