import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { user: authUser, isDemoMode } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: '',
  });

  useEffect(() => {
    // In demo mode, use auth user data directly
    if (isDemoMode && authUser) {
      setUser(authUser);
      setFormData({
        displayName: authUser.name || authUser.displayName || '',
        photoURL: authUser.photoURL || '',
      });
      setLoading(false);
    } else {
      // In development, try to fetch from API
      fetchProfile();
    }
  }, [authUser, isDemoMode]);

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
      if (isDemoMode) {
        // In demo mode, just update local state
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        setIsEditing(false);
        toast.success('Admin profile updated (demo mode)');
      } else {
        const response = await api.put('/auth/profile', formData);
        setUser(response.data.user);
        setIsEditing(false);
        toast.success('Admin profile updated');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header Card */}
      <div className="relative overflow-hidden bg-white rounded-[2.5rem] shadow-2xl shadow-red-100 border border-red-50">
        {/* Cover Gradient */}
        <div className="h-48 bg-gradient-to-r from-red-600 via-rose-600 to-pink-500 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-6 right-6 px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold hover:bg-white/30 transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth={2} /></svg>
            <span>{isEditing ? 'Cancel Edit' : 'Edit Admin Info'}</span>
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
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-500 border-4 border-white rounded-2xl flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-black text-gray-900 mb-1">{user.displayName || 'System Administrator'}</h1>
              <div className="flex items-center space-x-4">
                <span className="flex items-center px-4 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-black uppercase tracking-widest ring-1 ring-red-200">
                  {user.role}
                </span>
                <span className="text-gray-400 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Admin since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="flex space-x-4 pb-2">
              <div className="text-center px-6 py-3 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-tighter">Access Level</p>
                <p className="text-2xl font-black text-red-600">FULL</p>
              </div>
              <div className="text-center px-6 py-3 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-tighter">System Users</p>
                <p className="text-2xl font-black text-blue-500">1,247</p>
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
                { id: 'system', label: 'System Stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsEditing(false) }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-xl shadow-red-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={tab.icon} strokeWidth={2} /></svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Admin Card */}
          <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-[2rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-2">Super Admin</h4>
              <p className="text-red-100 text-sm mb-6 leading-relaxed">Complete system control with full administrative privileges and oversight.</p>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" /></svg>
                Level 10 Access
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
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Admin Settings</h3>
                  <p className="text-gray-500 font-medium">Update administrator information and system settings.</p>
                </div>
                <form onSubmit={handleUpdate} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Admin Name</label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/5 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-400"
                        placeholder="E.g. System Admin"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Profile Image URL</label>
                      <input
                        type="text"
                        value={formData.photoURL}
                        onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/5 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-400"
                        placeholder="https://images.com/admin-avatar.jpg"
                      />
                    </div>
                  </div>
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all active:scale-[0.98]"
                    >
                      Update Admin Profile
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
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Admin Email</p>
                        <p className="text-lg font-bold text-gray-900 break-all">{user.email}</p>
                      </div>
                      <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">System Access Since</p>
                        <p className="text-lg font-bold text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-black text-gray-900">System Overview</h4>
                        <span className="text-xs font-black text-red-600 bg-red-50 px-3 py-1 rounded-full">ADMIN LIVE</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-[2rem] border border-red-100">
                          <p className="text-[10px] font-black text-red-700 uppercase tracking-tighter mb-2">Total Users</p>
                          <p className="text-3xl font-black text-red-800">1,247</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-[2rem] border border-orange-100">
                          <p className="text-[10px] font-black text-orange-700 uppercase tracking-tighter mb-2">Active Tasks</p>
                          <p className="text-3xl font-black text-orange-800">89</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-[2rem] border border-pink-100">
                          <p className="text-[10px] font-black text-pink-700 uppercase tracking-tighter mb-2">System Health</p>
                          <p className="text-3xl font-black text-pink-800">100%</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden">
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-white gap-6">
                        <div>
                          <p className="text-2xl font-black mb-1">System Control</p>
                          <p className="text-gray-400 font-medium">Full administrative access to all platform features and user management.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-red-50 transition-colors whitespace-nowrap">
                          Admin Panel →
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-red-500/20 to-transparent"></div>
                    </div>
                  </div>
                )}

                {activeTab === 'system' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">System Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4">User Analytics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Users</span>
                            <span className="font-bold">1,247</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active Today</span>
                            <span className="font-bold text-green-600">342</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">New This Week</span>
                            <span className="font-bold text-blue-600">28</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4">Task Analytics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Tasks</span>
                            <span className="font-bold">89</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Completed</span>
                            <span className="font-bold text-green-600">67</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pending</span>
                            <span className="font-bold text-orange-600">22</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Security Settings</h3>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600">Extra security for admin accounts</p>
                          </div>
                          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">Enabled</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">Session Timeout</h4>
                            <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
                          </div>
                          <span className="text-gray-700 font-medium">30 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">API Access</h4>
                            <p className="text-sm text-gray-600">System API key management</p>
                          </div>
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">Manage</button>
                        </div>
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

export default AdminProfile;
