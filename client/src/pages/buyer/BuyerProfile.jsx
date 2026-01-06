import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const BuyerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <div className="text-gray-900">{user.displayName || 'N/A'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="text-gray-900">{user.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="text-gray-900 capitalize">{user.role}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Balance
            </label>
            <div className="text-2xl font-bold text-blue-600">{user.coins} coins</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Spent
            </label>
            <div className="text-xl font-semibold text-red-600">
              {user.totalSpent} coins
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <div className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
