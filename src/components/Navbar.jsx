import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { FaHotel } from "react-icons/fa";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-200"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 h-16">
        {/* Logo */}
        <Link to="/">
          <h1 className="flex items-center gap-3 text-xl font-bold font-poppins">
            <FaHotel className="text-2xl text-blue-500" />
            <span>Hotel Booking</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="relative group px-2 py-1 text-gray-200 hover:text-white transition-colors"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          <button
            className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => navigate("/owner")}
          >
            Dashboard
          </button>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <img
            src={assets.searchIcon}
            alt="search"
            className="h-6 invert hover:invert-0 transition-all duration-300 cursor-pointer"
          />
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            src={assets.menuIcon}
            alt="menu"
            className="h-5 cursor-pointer invert"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close-menu" className="h-6" />
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}

        {user ? (
          <button
            className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => navigate("/owner")}
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={openSignIn}
            className="px-8 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
