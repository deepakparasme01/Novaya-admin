import React from 'react';
import { 
  Users, 
  TrendingUp,
  Clock,
  DollarSign,
  Activity,
  Video,
  MoreVertical,
  Plus,
  Filter,
  Eye,
  Edit,
  Mail,
  Brain,
  Smile
} from 'lucide-react';

export default function Dashboard() {
  // Static Data
  const stats = [
    { 
      label: 'Total Patients', 
      value: '1,248', 
      change: '+12%', 
      trend: 'up', 
      icon: Users, 
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Today\'s Sessions', 
      value: '32', 
      change: '+5%', 
      trend: 'up', 
      icon: Video, 
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Pending Appointments', 
      value: '18', 
      change: '-3%', 
      trend: 'down', 
      icon: Clock, 
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    { 
      label: 'Revenue (MTD)', 
      value: '$45,890', 
      change: '+18%', 
      trend: 'up', 
      icon: DollarSign, 
      color: 'teal',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    }
  ];

  const upcomingSessions = [
    { id: 1, patient: 'Sarah Johnson', therapist: 'Dr. Emily Chen', time: '10:00 AM', type: 'Individual Therapy', status: 'confirmed' },
    { id: 2, patient: 'Michael Brown', therapist: 'Dr. Robert Smith', time: '11:30 AM', type: 'Couple Therapy', status: 'confirmed' },
    { id: 3, patient: 'Emma Wilson', therapist: 'Dr. Lisa Anderson', time: '02:00 PM', type: 'Mental Health', status: 'pending' },
    { id: 4, patient: 'James Davis', therapist: 'Dr. Emily Chen', time: '03:30 PM', type: 'Life Coaching', status: 'confirmed' },
    { id: 5, patient: 'Olivia Martinez', therapist: 'Dr. Mark Johnson', time: '04:00 PM', type: 'Family Therapy', status: 'pending' }
  ];

  const recentPatients = [
    { id: 1, name: 'Alice Cooper', email: 'alice@email.com', phone: '+1 234-567-8900', lastVisit: '2 days ago', status: 'active', condition: 'Anxiety' },
    { id: 2, name: 'Bob Martin', email: 'bob@email.com', phone: '+1 234-567-8901', lastVisit: '1 week ago', status: 'active', condition: 'Depression' },
    { id: 3, name: 'Carol White', email: 'carol@email.com', phone: '+1 234-567-8902', lastVisit: '3 days ago', status: 'inactive', condition: 'PTSD' },
    { id: 4, name: 'David Lee', email: 'david@email.com', phone: '+1 234-567-8903', lastVisit: 'Today', status: 'active', condition: 'Stress' }
  ];

  const therapists = [
    { id: 1, name: 'Dr. Emily Chen', specialty: 'Clinical Psychology', patients: 45, rating: 4.9, availability: 'Available' },
    { id: 2, name: 'Dr. Robert Smith', specialty: 'Couple Therapy', patients: 38, rating: 4.8, availability: 'Busy' },
    { id: 3, name: 'Dr. Lisa Anderson', specialty: 'Mental Health', patients: 52, rating: 4.9, availability: 'Available' },
    { id: 4, name: 'Dr. Mark Johnson', specialty: 'Family Therapy', patients: 41, rating: 4.7, availability: 'Available' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Dashboard Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-slideIn border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts and Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Patient Activity</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded-lg">Week</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Month</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Year</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-teal-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Therapy Sessions</span>
                </div>
                <span className="text-sm font-bold text-blue-600">156</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smile className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Happy Patients</span>
                </div>
                <span className="text-sm font-bold text-green-600">92%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Avg. Session</span>
                </div>
                <span className="text-sm font-bold text-orange-600">48min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-gray-700">Growth Rate</span>
                </div>
                <span className="text-sm font-bold text-teal-600">+24%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions & Recent Patients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {session.patient.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{session.patient}</p>
                      <p className="text-xs text-gray-500">{session.therapist} • {session.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{session.time}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      session.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Patients</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">{patient.condition} • {patient.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      patient.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></span>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Therapists */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Therapist Team</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Therapist
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Specialty</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patients</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {therapists.map((therapist) => (
                  <tr key={therapist.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {therapist.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{therapist.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{therapist.specialty}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{therapist.patients}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">{therapist.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        therapist.availability === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {therapist.availability}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded transition">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}