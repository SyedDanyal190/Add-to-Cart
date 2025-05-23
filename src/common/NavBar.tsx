import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store'; // Adjust path if needed

const Navbar: React.FC = () => {
  const userName = "Customer";

  // Get number of items from Redux store
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <nav className="bg-green-800 w-full h-16 fixed top-0 left-0 z-40 shadow">
      <div className="flex items-center justify-between h-full px-4">

        {/* Left Section - App Branding and Welcome */}
        <div className="flex items-center space-x-10">
          <Link
            to="/"
            className="rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            🛒 Cart App
          </Link>

          <span className="text-gray-300 text-sm">
            <h1 className="text-2xl">Welcome, {userName}</h1>
          </span>
        </div>

        {/* Right Section - Cart Link and Log Out */}
        <div className="flex items-center space-x-6 mr-10">
          <Link
            to="/cart"
            className="relative rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            View Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            to="/logOut"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Log Out
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
