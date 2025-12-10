import React, { useState, createContext, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Calendar, MessageSquare, 
  FileText, Settings, UserCheck, Video, Heart, 
  ChevronDown, X, Menu, LogOut 
} from "lucide-react";

export const LayoutContext = createContext();

// Recursive Sidebar Item Component
const SidebarItem = ({
  item,
  openMain,
  setOpenMain,
  openNested,
  setOpenNested,
  activeTab,
  handleSubClick,
  isMain = false,
}) => {
  const isOpen = isMain ? openMain === item.id : openNested[item.id] || false;

  const handleClick = () => {
    if (item.dropdown) {
      if (isMain) {
        setOpenMain(isOpen ? null : item.id);
      } else {
        setOpenNested((prev) => ({
          ...prev,
          [item.id]: !isOpen,
        }));
      }
    } else {
      handleSubClick(item.id, item.link);
    }
  };

  const Icon = item.icon;
  const isActive = activeTab === item.id;

  return (
    <li className="relative group">
      {item.dropdown ? (
        <div>
          <button
            onClick={handleClick}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
              isOpen
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && item.subItems && (
            <ul className="ml-6 mt-2 space-y-1">
              {item.subItems.map((subItem) => (
                <SidebarItem
                  key={subItem.id}
                  item={subItem}
                  openMain={openMain}
                  setOpenMain={setOpenMain}
                  openNested={openNested}
                  setOpenNested={setOpenNested}
                  activeTab={activeTab}
                  handleSubClick={handleSubClick}
                  isMain={false}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-all relative ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>

          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-b from-blue-500 to-teal-500 opacity-100"
                : "bg-gray-400 opacity-0 group-hover:opacity-100"
            }`}
          ></div>
        </>
      )}
    </li>
  );
};

// Sidebar Component
function Sidebar({ setIs_Toggle, isToggle }) {
  const [openMain, setOpenMain] = useState(null);
  const [openNested, setOpenNested] = useState({});
  const [activeItem, setActiveItem] = useState("dashboard");

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
      dropdown: false,
    },
    {
      id: "patients",
      label: "Patients",
      icon: Users,
      link: "/patients",
      dropdown: false,
    },
    {
      id: "therapists",
      label: "Therapists",
      icon: UserCheck,
      link: "/therapists",
      dropdown: false,
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      link: "/appointments",
      dropdown: false,
    },
    {
      id: "sessions",
      label: "Sessions",
      icon: Video,
      link: "/sessions",
      dropdown: false,
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      link: "/messages",
      dropdown: false,
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      link: "/reports",
      dropdown: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      link: "/settings",
      dropdown: false,
    },
  ];

  const handleSubClick = (id, link) => {
    navigate(link);
    localStorage.setItem("active_sidebar_item", id);
    setActiveItem(id);
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-700 ease-in-out ${
          isToggle ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full w-64">
          {/* Logo */}
          <div className="flex items-center justify-between p-4  border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">NOVAYA</h1>
                <span className="text-xs text-gray-500">HEALTH</span>
              </div>
            </div>
            <button onClick={() => setIs_Toggle(false)} className="lg:hidden">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <ul className="list-none space-y-1">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  openMain={openMain}
                  setOpenMain={setOpenMain}
                  openNested={openNested}
                  setOpenNested={setOpenNested}
                  activeTab={location.pathname.includes(item.link) ? item.id : activeItem}
                  handleSubClick={handleSubClick}
                  isMain={true}
                />
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                AD
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">admin@novaya.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isToggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIs_Toggle(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;


