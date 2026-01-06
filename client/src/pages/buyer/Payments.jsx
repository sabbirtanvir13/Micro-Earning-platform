import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Payments = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState('');
  const [coins, setCoins] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    fetchPaymentHistory();
    
    // Check for payment success/cancel
    if (searchParams.get('success') === 'true') {
      toast.success('Payment successful! Coins added to your account.');
      fetchPaymentHistory();
    } else if (searchParams.get('canceled') === 'true') {
      toast.error('Payment was canceled');
    }
  }, [searchParams]);

  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get('/payments/history');
      setPaymentHistory(response.data.payments || []);
    } catch (error) {
      toast.error('Failed to load payment history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || !coins || parseFloat(amount) <= 0 || parseInt(coins) <= 0) {
      toast.error('Please enter valid amount and coins');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/payments/create-intent', {
        amount: parseFloat(amount),
        coins: parseInt(coins),
      });

      // Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error('Failed to create payment session');
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process payment');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Buy Coins</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Purchase Coins</h3>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setCoins(Math.round(parseFloat(e.target.value) * 20).toString());
                }}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coins (20 coins = $1.00)
              </label>
              <input
                type="number"
                min="1"
                value={coins}
                onChange={(e) => {
                  setCoins(e.target.value);
                  setAmount((parseInt(e.target.value) / 20).toFixed(2));
                }}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Pay with Stripe'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          {loadingHistory ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : paymentHistory.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No payment history</p>
          ) : (
            <div className="space-y-2">
              {paymentHistory.map((payment) => (
                <div key={payment._id} className="border rounded p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">+{payment.coins} coins</p>
                      <p className="text-sm text-gray-600">
                        ${payment.amount.toFixed(2)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        payment.status === 'succeeded'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
