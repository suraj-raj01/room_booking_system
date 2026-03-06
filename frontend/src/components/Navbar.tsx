import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow">

      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">

        {/* Logo */}
        <h1 className="font-bold text-lg md:text-xl">
          Room Booking
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {/* Rooms Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoomOpen(!roomOpen)}
              className="hover:text-gray-300"
            >
              Rooms ▾
            </button>

            {roomOpen && (
              <div className="absolute bg-white text-black mt-2 rounded-xs shadow w-40">

                <Link
                  to="/dashboard/all-rooms"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  All Rooms
                </Link>

                <Link
                  to="/dashboard/available-rooms"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Available Rooms
                </Link>

              </div>
            )}
          </div>

          <Link to="/bookings" className="hover:text-gray-300">
            My Bookings
          </Link>

          <Link
            to="/login"
            className="bg-red-500 px-3 py-1 rounded-xs hover:bg-red-600"
          >
            Logout
          </Link>

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">

          <div>
            <button
              onClick={() => setRoomOpen(!roomOpen)}
              className="w-full text-left"
            >
              Rooms
            </button>

            {roomOpen && (
              <div className="pl-4 mt-1 space-y-1">

                <Link
                  to="/dashboard/all-rooms"
                  className="block text-gray-300"
                >
                  All Rooms
                </Link>

                <Link
                  to="/dashboard/available-rooms"
                  className="block text-gray-300"
                >
                  Available Rooms
                </Link>

              </div>
            )}
          </div>

          <Link to="/bookings" className="block">
            My Bookings
          </Link>

          <Link
            to="/login"
            className="block rounded-xs text-red-400"
          >
            Logout
          </Link>

        </div>
      )}

    </nav>
  );
};

export default Navbar;