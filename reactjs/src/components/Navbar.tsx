import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata?.user_name || user?.email;

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <NavLink to="/" className="font-mono text-xl font-bold text-white">
            forum<span className="text-purple-500">.app</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                `text-gray-300 hover:text-white transition-colors ${isActive ? "text-purple-500 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/create"
                  className={({ isActive }: { isActive: boolean }) =>
                    `text-gray-300 hover:text-white transition-colors ${isActive ? "text-purple-500 font-semibold" : ""
                    }`
                  }
                >
                  Create Post
                </NavLink>
                <NavLink
                  to="/community/create"
                  className={({ isActive }: { isActive: boolean }) =>
                    `text-gray-300 hover:text-white transition-colors ${isActive ? "text-purple-500 font-semibold" : ""
                    }`
                  }
                >
                  Create Community
                </NavLink>

              </>
            )}
            <NavLink
              to="/communities"
              className={({ isActive }: { isActive: boolean }) =>
                `text-gray-300 hover:text-white transition-colors ${isActive ? "text-purple-500 font-semibold" : ""
                }`
              }
            >
              Communities
            </NavLink>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user?.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-300">{displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-red-500 text-sm font-semibold px-4 py-2 rounded cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="bg-blue-500 text-sm font-semibold px-4 py-2 rounded cursor-pointer"
              >
                Sign in with GitHub
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.9)] px-2 pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-purple-500 font-semibold" : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`
            }
          >
            Home
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/create"
                className={({ isActive }: { isActive: boolean }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-purple-500 font-semibold" : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`
                }
              >
                Create Post
              </NavLink>
              <NavLink
                to="/community/create"
                className={({ isActive }: { isActive: boolean }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-purple-500 font-semibold" : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`
                }
              >
                Create Community
              </NavLink>
            </>
          )}
          <NavLink
            to="/communities"
            className={({ isActive }: { isActive: boolean }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-purple-500 font-semibold" : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`
            }
          >
            Communities
          </NavLink>
        </div>
      )}
    </nav>
  );
};
