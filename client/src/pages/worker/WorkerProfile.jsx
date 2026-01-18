import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const WorkerProfile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
      setFormData({
        displayName: response.data.user.displayName || '',
        photoURL: response.data.user.photoURL || '',
      });
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/auth/profile', formData);
      setUser(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header Card */}
      <div className="relative overflow-hidden bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-indigo-50">
        {/* Cover Gradient */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-6 right-6 px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold hover:bg-white/30 transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth={2} /></svg>
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        <div className="px-10 pb-10">
          <div className="flex flex-col md:flex-row items-end -mt-16 space-y-4 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=random&size=200`}
                alt={user.displayName}
                className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl object-cover bg-white group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white rounded-2xl flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-black text-gray-900 mb-1">{user.displayName || 'Unnamed User'}</h1>
              <div className="flex items-center space-x-4">
                <span className="flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-black uppercase tracking-widest ring-1 ring-indigo-200">
                  {user.role}
                </span>
                <span className="text-gray-400 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="flex space-x-4 pb-2">
              <div className="text-center px-6 py-3 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-tighter">Balance</p>
                <p className="text-2xl font-black text-indigo-600">{user.coins}</p>
              </div>
              <div className="text-center px-6 py-3 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-tighter">Earnings</p>
                <p className="text-2xl font-black text-green-600">{user.totalEarned}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Tabs */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-4 shadow-xl shadow-gray-200/50 border border-gray-100">
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { id: 'stats', label: 'Detailed Stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsEditing(false) }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={tab.icon} strokeWidth={2} /></svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Status Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-2">Verified Status</h4>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Your account is fully verified and eligible for premium payouts.</p>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd" /></svg>
                Level 1 Verified
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 min-h-[500px]">
            {isEditing ? (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <div className="mb-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Refine Identity</h3>
                  <p className="text-gray-500 font-medium">Update your public profile and avatar information.</p>
                </div>
                <form onSubmit={handleUpdate} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Public Display Name</label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none font-bold"
                        placeholder="E.g. J. Maverick"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Avatar Source URL</label>
                      <input
                        type="text"
                        value={formData.photoURL}
                        onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none font-bold"
                        placeholder="https://images.com/your-photo.jpg"
                      />
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">We recommend 512x512 squared images</p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl hover:shadow-indigo-500/30 transition-all active:scale-[0.98]"
                    >
                      Synchronize Profile
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="animate-in slide-in-from-left-4 duration-500 h-full">
                {activeTab === 'overview' && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Registered Email</p>
                        <p className="text-lg font-bold text-gray-900 break-all">{user.email}</p>
                      </div>
                      <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Member Since</p>
                        <p className="text-lg font-bold text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-black text-gray-900">Performance Index</h4>
                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">REAL-TIME</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2rem] border border-green-100">
                          <p className="text-[10px] font-black text-green-700 uppercase tracking-tighter mb-2">Task Efficiency</p>
                          <p className="text-3xl font-black text-green-800">98%</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border border-blue-100">
                          <p className="text-[10px] font-black text-blue-700 uppercase tracking-tighter mb-2">Average Rating</p>
                          <p className="text-3xl font-black text-blue-800">4.9</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-[2rem] border border-purple-100">
                          <p className="text-[10px] font-black text-purple-700 uppercase tracking-tighter mb-2">Level Rank</p>
                          <p className="text-3xl font-black text-purple-800">Expert</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden">
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-white gap-6">
                        <div>
                          <p className="text-2xl font-black mb-1">Scale Your Business</p>
                          <p className="text-gray-400 font-medium">Post tasks and get high-quality micro-results from workers worldwide.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-indigo-50 transition-colors whitespace-nowrap">
                          Start as Buyer →
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
                    </div>
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" strokeWidth={2} /><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" strokeWidth={2} /></svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Analytics Coming Soon</h4>
                    <p className="text-gray-500 max-w-sm">We are preparing a powerful breakdown of your weekly earnings and submission patterns.</p>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div className="p-8 bg-red-50 rounded-[2rem] border border-red-100 flex items-start space-x-6">
                      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-red-900">Password Encryption Active</h4>
                        <p className="text-red-700 font-medium">Your credentials are protected with industry-standard bcrypt hashing.</p>
                      </div>
                    </div>
                    <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-6">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth={2} /></svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-900">Verified Worker Badge</h4>
                        <p className="text-blue-700 font-medium">Verified workers have higher priority for high-reward tasks.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
