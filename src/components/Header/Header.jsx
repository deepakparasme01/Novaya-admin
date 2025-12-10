import React, { useState } from "react";
import { Search, Bell, LogOut, Menu, ChevronDown, X, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ setIs_Toggle, isToggle }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, text: "New appointment request", time: "5 min ago", unread: true },
    { id: 2, text: "Session completed with Sarah", time: "1 hour ago", unread: true },
    { id: 3, text: "New message from Dr. Chen", time: "2 hours ago", unread: false },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Menu Toggle Button */}
            <button
              onClick={() => setIs_Toggle(!isToggle)}
              className="group relative p-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <div className={`transition-all duration-500 ${isToggle ? 'rotate-0' : 'rotate-180'}`}>
                {isToggle ? (
                  <X className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                )}
              </div>
            </button>

            {/* Logo - Shows when sidebar is closed */}
            <div className={`flex items-center gap-2 transition-all duration-700 ${
              isToggle ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse-glow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                <h1 className="text-xl font-bold text-gray-900">NOVAYA</h1>
                <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs font-semibold rounded shadow-sm">
                  HEALTH
                </span>
              </div>
            </div>

            {/* Page Title - Shows when sidebar is open */}
            <div className={`transition-all duration-700 ${
              isToggle ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            }`}>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
                Dashboard
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Welcome back, 
                <span className="font-semibold text-gray-700">Admin</span>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md group">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-48"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 glass-effect rounded-xl shadow-2xl border border-gray-200 animate-slideDown z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 flex items-center justify-between">
                      Notifications
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {notifications.filter(n => n.unread).length} new
                      </span>
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 transition-all cursor-pointer ${
                          notif.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-900 font-medium">{notif.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow">
                  AD
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@novaya.com</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                  showProfileMenu ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 glass-effect rounded-xl shadow-2xl border border-gray-200 animate-slideDown z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        AD
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500">admin@novaya.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 cursor-pointer px-4 py-2 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 rounded-lg transition-all">
                      <span className="text-sm text-gray-700">My Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 cursor-pointer px-4 py-2 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 rounded-lg transition-all">
                      <span className="text-sm text-gray-700">Settings</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                toast.success("Logout Successful!", {
                  position: "top-center",
                });
                navigate("/");
              }}
              className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white cursor-pointer rounded-full font-medium shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfileMenu) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        ></div>
      )}
    </>
  );
}

export default Header;