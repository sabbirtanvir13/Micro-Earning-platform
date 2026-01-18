import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const BuyerProfile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Buyer Profile</h2>
        <p className="mt-2 text-sm text-gray-600">Manage your business account and view your spending stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-24"></div>
            <div className="px-6 pb-6 mt-[-3rem] flex flex-col items-center">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=random&size=128`}
                alt={user.displayName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">{user.displayName || 'Anonymous'}</h3>
              <p className="text-sm text-blue-600 font-semibold capitalize">{user.role}</p>

              <div className="mt-6 w-full space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Available Coins</span>
                  <span className="font-bold text-gray-900">{user.coins} Coins</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Spent</span>
                  <span className="font-bold text-red-600">{user.totalSpent || 0} Coins</span>
                </div>
                <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info / Edit Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Business Info' : 'Business Information'}
              </h4>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isEditing
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name / Company Name</label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    value={formData.photoURL}
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Business Email</label>
                    <p className="mt-1 text-gray-900 font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Since</label>
                    <p className="mt-1 text-gray-900 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h5 className="text-sm font-bold text-gray-900 mb-4">Account Stats</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                      <p className="text-lg font-bold text-gray-900">{user.totalSpent}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Current Coins</p>
                      <p className="text-lg font-bold text-blue-600">{user.coins}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Account Status</p>
                      <p className={`text-lg font-bold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
