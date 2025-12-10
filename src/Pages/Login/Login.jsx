import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const staticEmail = "super@admin.com";
    const staticPassword = "12345678";

    setTimeout(() => {
      if (email === staticEmail && password === staticPassword) {
        toast.success("Login Successful!", {
          position: "top-center",
        });

        navigate("/dashboard");
      } else {
        toast.error("Invalid Email or Password!", {
          position: "top-center",
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 animate-gradient"></div>

      <style>{`
        @keyframes gradient {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient { animation: gradient 8s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .input-focus {
          transition: all 0.3s ease;
        }
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* Right Side - Image & Message */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-100 via-blue-50 to-teal-50 items-center justify-center p-12 relative overflow-hidden">
        {/* Animated Decorative Elements */}
        <div
          className="absolute w-32 h-32 bg-blue-300 rounded-full opacity-40 blur-3xl animate-float"
          style={{
            top: "20%",
            right: "20%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        ></div>
        <div
          className="absolute w-40 h-40 bg-teal-300 rounded-full opacity-40 blur-3xl animate-float"
          style={{
            bottom: "20%",
            left: "20%",
            animationDelay: "1s",
            transform: `translate(${mousePosition.x * -0.02}px, ${
              mousePosition.y * -0.02
            }px)`,
          }}
        ></div>
        <div
          className="absolute w-24 h-24 bg-purple-300 rounded-full opacity-30 blur-2xl animate-float"
          style={{
            top: "50%",
            left: "10%",
            animationDelay: "2s",
          }}
        ></div>

        <div className="relative z-10 max-w-md text-center animate-fadeInUp">
          {/* Animated Image Placeholder */}
          <div className="mb-8 mx-auto w-64 h-64 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
            <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center relative z-10">
              <svg
                className="w-32 h-32 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <h3
            className="text-3xl font-bold text-gray-800 mb-4 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Your Safe Space Starts Here
          </h3>
          <p
            className="text-lg text-gray-600 leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Whether you're seeking personal growth, professional coaching, or
            mental health training, we're here to support your journey—at your
            pace, on your terms.
          </p>

          {/* Animated Decorative Icons */}
          <div
            className="mt-8 flex justify-center gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              {
                color: "green",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                delay: "0s",
              },
              {
                color: "blue",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                delay: "0.2s",
              },
              {
                color: "teal",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                delay: "0.4s",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center animate-float hover:scale-110 transition-transform cursor-pointer`}
                style={{ animationDelay: item.delay }}
              >
                <svg
                  className={`w-6 h-6 text-${item.color}-600`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white relative z-10">
        <div className="w-full max-w-md">
          {/* Logo with Sparkle Effect */}
          <div className="mb-8 animate-fadeInUp">
            <div className="flex items-center gap-2 mb-2 group">
              <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              <h1
                className="text-3xl font-bold text-gray-900 transition-all group-hover:text-blue-600"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                NOVAYA
              </h1>
              <span className="px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded hover:bg-blue-600 transition-colors cursor-default">
                HEALTH
              </span>
            </div>
          </div>

          {/* Welcome Text */}
          <div
            className="mb-8 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to continue your wellness journey
            </p>
          </div>

          {/* Login Form */}
          <div
            className="space-y-6 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-hover:text-blue-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-hover:text-blue-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none input-focus"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition hover:scale-110"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-full font-semibold cursor-pointer hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 relative overflow-hidden group disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Additional Info with Fade Effect */}
            <div
              className="text-center text-sm text-gray-500 pt-4 opacity-0 animate-fadeInUp"
              style={{ animationDelay: "0.5s", opacity: 1 }}
            >
              <p className="flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure & encrypted connection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
