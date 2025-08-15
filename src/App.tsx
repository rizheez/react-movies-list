import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

import Home from "@/pages/Home";
import Movie from "@/pages/Movie";
import Tv from "@/pages/Tv";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          {/* <Route path="/movie/:id" element={MovieDetail} />  */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
