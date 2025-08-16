# React Movies List

A modern, responsive web application for browsing movies and TV shows built with React, TypeScript, and Vite. This application fetches data from The Movie Database (TMDB) API to display trending movies, top-rated content, and content organized by genres.

## 🎬 Features

- **Movie & TV Show Browsing**: Browse popular and top-rated movies and TV shows
- **Genre-based Organization**: View content organized by different genres
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Real-time Data**: Fetches live data from TMDB API
- **TypeScript**: Full type safety throughout the application
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Carousel**: Swiper.js
- **Theme Management**: Custom theme provider

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd react-movies-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── navbar.tsx      # Navigation component
│   ├── movie-section.tsx # Movie/TV show section component
│   ├── slider.tsx      # Carousel component
│   └── theme-provider.tsx # Theme management
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   ├── Movie.tsx       # Movies page
│   └── Tv.tsx          # TV shows page
├── types/              # TypeScript type definitions
│   ├── movie.ts        # Movie-related types
│   └── tv.ts           # TV show-related types
├── lib/                # Utility libraries
│   ├── axios.ts        # Axios configuration
│   └── utils.ts        # Utility functions
└── App.tsx             # Main application component
```

## 🎨 Features Overview

### Home Page

- Hero section with featured content
- Quick navigation to movies and TV shows

### Movies Page

- Trending movies section
- Top-rated movies section
- Movies organized by genres (Action, Comedy, Drama, etc.)

### TV Shows Page

- Popular TV shows section
- Top-rated TV shows section
- TV shows organized by genres

### Navigation

- Responsive navbar with theme toggle
- Smooth navigation between pages

## 🔑 API Integration

This application integrates with The Movie Database (TMDB) API to fetch:

- Popular movies and TV shows
- Top-rated content
- Genre information
- Movie/TV show details

## 🎯 Key Components

- **MovieSection**: Displays a collection of movies/TV shows with horizontal scrolling
- **Slider**: Carousel component for featured content
- **Navbar**: Navigation with theme toggle
- **ThemeProvider**: Manages dark/light theme state

## 🛠️ Development

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update routing in `App.tsx` if needed
4. Add TypeScript types in the `types/` directory

### Styling

- Use Tailwind CSS classes for styling
- Follow the existing component patterns
- Maintain responsive design principles

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🌙 Theme Support

- Dark theme (default)
- Light theme
- Theme preference is saved in localStorage
- Smooth transitions between themes

## 📋 About This Project

This is a personal portfolio project showcasing my skills in modern web development. It demonstrates:

- **Frontend Development**: React with TypeScript
- **API Integration**: Working with external APIs (TMDB)
- **UI/UX Design**: Modern, responsive design with dark/light themes
- **State Management**: React hooks and context for theme management
- **Component Architecture**: Reusable, modular components
- **Build Tools**: Vite for fast development and optimized builds

## 🎯 Portfolio Highlights

- **Real-world API Integration**: Demonstrates ability to work with external APIs
- **TypeScript Implementation**: Shows strong typing and code quality practices
- **Responsive Design**: Mobile-first approach with modern CSS
- **Modern React Patterns**: Uses latest React features and best practices
- **Performance Optimization**: Efficient data fetching and component rendering

## 📄 License

This is a personal portfolio project. Feel free to use this code as a reference for your own projects.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Vite](https://vitejs.dev/) for fast build tooling
