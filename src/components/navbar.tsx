import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPath, setCurrentPath] = useState<string>();
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleIconClick = () => inputRef.current?.focus();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30); // ubah threshold sesuai selera
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 z-50 transition-colors duration-300 border-b w-full
      ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur border-gray-200 dark:border-gray-700"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            MovieFinder
            {isScrolled && <span className="text-red-500">.</span>}
          </span>
        </Link>

        {/* Desktop Right Side */}
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          <ModeToggle />
          <div className="relative w-full max-w-sm md:block hidden ">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
              onClick={handleIconClick}
            />
            <Input
              type="text"
              ref={inputRef}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </div>
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            {isOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Links */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}>
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg 
            bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:bg-transparent 
            dark:bg-gray-800 md:dark:bg-transparent"
          >
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 text-xl font-extrabold hover:text-blue-700 ${
                  location.pathname === "/"
                    ? "text-orange-600 dark:text-orange-600 "
                    : "text-black dark:text-white"
                }`}
              >
                For You
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className={`block py-2 px-3 text-xl   hover:text-blue-700 ${
                  location.pathname === "/movies"
                    ? "text-orange-600 dark:text-orange-600 "
                    : "text-black dark:text-white"
                }`}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 text-xl  hover:text-blue-700 ${
                  location.pathname === "/movies"
                    ? "text-orange-600 dark:text-orange-600 "
                    : "text-black dark:text-white"
                }`}
              >
                TV/Series
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
