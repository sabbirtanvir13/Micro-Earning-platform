import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Withdraw = () => {
  const [coins, setCoins] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paymentDetails, setPaymentDetails] = useState({
    email: '',
    accountNumber: '',
    walletAddress: '',
  });
  const [userCoins, setUserCoins] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserCoins();
  }, []);

  const fetchUserCoins = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserCoins(response.data.user.coins || 0);
    } catch (error) {
      toast.error('Failed to load balance');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(coins) < 200) {
      toast.error('Minimum withdrawal is 200 coins');
      return;
    }

    if (parseInt(coins) > userCoins) {
      toast.error('Insufficient coins');
      return;
    }

    setLoading(true);
    try {
      await api.post('/withdrawals', {
        coins: parseInt(coins),
        paymentMethod,
        paymentDetails,
      });
      toast.success('Withdrawal request submitted successfully!');
      setCoins('');
      setPaymentDetails({ email: '', accountNumber: '', walletAddress: '' });
      fetchUserCoins();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit withdrawal');
    } finally {
      setLoading(false);
    }
  };

  const amount = coins ? (parseInt(coins) / 20).toFixed(2) : '0.00';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Request Withdrawal</h2>
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <div className="mb-6">
          <div className="text-gray-600 text-sm mb-2">Available Coins</div>
          <div className="text-3xl font-bold text-blue-600">{userCoins} coins</div>
          <div className="text-gray-500 text-sm mt-2">
            Minimum withdrawal: 200 coins (${(200 / 20).toFixed(2)})
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coins to Withdraw
            </label>
            <input
              type="number"
              min="200"
              max={userCoins}
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {coins && (
              <div className="mt-2 text-sm text-gray-600">
                Amount: ${amount} (20 coins = $1.00)
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {paymentMethod === 'paypal' && 'PayPal Email'}
              {paymentMethod === 'bank' && 'Account Number'}
              {paymentMethod === 'crypto' && 'Wallet Address'}
            </label>
            <input
              type="text"
              value={
                paymentMethod === 'paypal'
                  ? paymentDetails.email
                  : paymentMethod === 'bank'
                  ? paymentDetails.accountNumber
                  : paymentDetails.walletAddress
              }
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  [paymentMethod === 'paypal'
                    ? 'email'
                    : paymentMethod === 'bank'
                    ? 'accountNumber'
                    : 'walletAddress']: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || parseInt(coins) < 200}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Withdrawal Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
