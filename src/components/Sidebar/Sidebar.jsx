import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  UserCheck,
  Video,
  Heart,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";

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
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isOpen
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-105"
                : "text-gray-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-1 rounded-lg transition-all ${
                  isOpen ? "bg-white/20" : "bg-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
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
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-105"
                : "text-gray-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 hover:scale-105 active:scale-95"
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-all ${
                isActive ? "bg-white/20" : "bg-transparent"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{item.label}</span>

            {/* Active Indicator Pulse */}
            {isActive && (
              <span className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Side Active Bar */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-b from-blue-500 to-teal-500 opacity-100 scale-100"
                : "bg-gray-400 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  useEffect(() => {
    const saved = localStorage.getItem("active_sidebar_item");
    if (saved) {
      setActiveItem(saved);
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const match = menuItems.find((item) => path.includes(item.link));
    if (match) {
      setActiveItem(match.id);
      localStorage.setItem("active_sidebar_item", match.id);
    }
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <aside
        className={`fixed left-0 top-0 z-50 h-full glass-effect shadow-2xl transition-all duration-700 ease-in-out ${
          isToggle ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full w-64 relative">
          {/* Animated Background Elements */}
          <div
            className="absolute w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-3xl animate-float pointer-events-none"
            style={{
              top: "10%",
              right: "10%",
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * 0.01
              }px)`,
            }}
          ></div>
          <div
            className="absolute w-40 h-40 bg-teal-300 rounded-full opacity-20 blur-3xl animate-float pointer-events-none"
            style={{
              bottom: "20%",
              left: "10%",
              animationDelay: "1s",
              transform: `translate(${mousePosition.x * -0.01}px, ${
                mousePosition.y * -0.01
              }px)`,
            }}
          ></div>

          {/* Logo Section */}
          <div className="relative z-10 flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 shimmer rounded-xl"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
                    NOVAYA
                  </h1>
                </div>
                <span className="text-xs font-semibold text-gray-500 tracking-wider">
                  HEALTH
                </span>
              </div>
            </div>
            <button
              onClick={() => setIs_Toggle(false)}
              className="lg:hidden p-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5 text-gray-500 hover:text-blue-600 transition-colors" />
            </button>
          </div>

          {/* Quick Stats Card */}
          <div className="relative z-10 mx-4 mt-4 p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl border border-blue-100 shadow-sm animate-slideIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Today's Overview
              </span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <p className="text-xs text-gray-500">Patients</p>
                <p className="text-lg font-bold text-blue-600">1,248</p>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <p className="text-xs text-gray-500">Sessions</p>
                <p className="text-lg font-bold text-teal-600">32</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <ul className="list-none space-y-2">
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-slideIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <SidebarItem
                    item={item}
                    openMain={openMain}
                    setOpenMain={setOpenMain}
                    openNested={openNested}
                    setOpenNested={setOpenNested}
                    activeTab={
                      location.pathname.includes(item.link)
                        ? item.id
                        : activeItem
                    }
                    handleSubClick={handleSubClick}
                    isMain={true}
                  />
                </div>
              ))}
            </ul>
          </nav>

          {/* Bottom Help Card */}
          {/* <div className="relative z-10 m-4 p-4 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl text-white shadow-lg animate-slideIn">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h4 className="font-bold">Need Help?</h4>
            </div>
            <p className="text-xs text-blue-50 mb-3">
              Get support from our team 24/7
            </p>
            <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
              Contact Support
            </button>
          </div> */}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isToggle && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIs_Toggle(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
