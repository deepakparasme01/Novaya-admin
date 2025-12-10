import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Animated Background */}
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
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-gradient { animation: gradient 8s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
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
      `}</style>

      <div className="absolute inset-0 animate-gradient"></div>

      {/* Animated Floating Elements */}
      <div
        className="absolute w-32 h-32 bg-blue-300 rounded-full opacity-40 blur-3xl animate-float"
        style={{
          top: '10%',
          right: '15%',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      ></div>
      <div
        className="absolute w-40 h-40 bg-teal-300 rounded-full opacity-40 blur-3xl animate-float"
        style={{
          bottom: '15%',
          left: '10%',
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
        }}
      ></div>
      <div
        className="absolute w-24 h-24 bg-purple-300 rounded-full opacity-30 blur-2xl animate-float"
        style={{
          top: '50%',
          right: '30%',
          animationDelay: '2s',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fadeInUp flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            NOVAYA
          </h1>
          <span className="px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded">
            HEALTH
          </span>
        </div>

        {/* 404 Number with Animated Circle */}
        <div
          className="mb-8 relative animate-fadeInUp"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="relative inline-block">
            {/* Rotating Circle */}
            <div className="absolute inset-0 -m-8">
              <div className="w-full h-full border-4 border-dashed border-blue-300 rounded-full animate-spin-slow"></div>
            </div>
            
            {/* 404 Text */}
            <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 text-transparent bg-clip-text">
              <h2 className="text-[150px] md:text-[200px] font-bold leading-none animate-pulse-glow">
                404
              </h2>
            </div>

            {/* Alert Icon */}
            <div className="absolute -top-4 -right-4 bg-orange-100 rounded-full p-3 animate-bounce-slow">
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div
          className="mb-8 animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off on its own wellness journey. 
            Let's help you find your way back to a healthier path.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp"
          style={{ animationDelay: '0.3s' }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-2 px-6 py-3 bg-black text-white cursor-pointer rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go to Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-900 cursor-pointer border-2 border-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div
          className="glass-effect rounded-2xl p-8 shadow-xl animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Search className="w-5 h-5 text-blue-500" />
            <h4 className="text-lg font-semibold text-gray-900">
              Popular Pages
            </h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Dashboard', icon: '📊', path: '/dashboard' },
              { label: 'Patients', icon: '👥', path: '/patients' },
              { label: 'Therapists', icon: '🩺', path: '/therapists' },
              { label: 'Sessions', icon: '📹', path: '/sessions' },
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigate(link.path)}
                className="group flex flex-col items-center gap-2 cursor-pointer p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl hover:from-blue-100 hover:to-teal-100 transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-200 hover:border-blue-300"
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Icons */}
        <div
          className="mt-12 flex justify-center gap-4 animate-fadeInUp"
          style={{ animationDelay: '0.6s' }}
        >
          {[
            { color: 'green', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', delay: '0s' },
            { color: 'blue', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', delay: '0.2s' },
            { color: 'teal', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', delay: '0.4s' }
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
  );
};

export default NotFound;