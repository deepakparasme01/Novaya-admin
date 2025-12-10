import React from "react";
import { Search, Bell, LogOut, Menu, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ setIs_Toggle, isToggle }) {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIs_Toggle(!isToggle)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile Dropdown */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@novaya.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              toast.success("Logout Successful!", {
                position: "top-center",
              });
              navigate("/");
              // localStorage.removeItem("novaya_auth");
              // window.location.reload();
            }}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
