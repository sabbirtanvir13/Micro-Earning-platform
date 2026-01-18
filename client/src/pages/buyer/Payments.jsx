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
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Financial Ecosystem</h2>
          <p className="text-gray-500 font-medium">Acquire coins to power your task deployments and campaign growth.</p>
        </div>
        <div className="flex items-center space-x-1 text-[10px] font-black text-gray-300 uppercase tracking-widest">
          <span>Treasury</span>
          <span className="text-blue-600">/</span>
          <span>Ledger</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Purchase Section */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100 border border-blue-50 p-10 md:p-12">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5} /></svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Buy Credits</h3>
            </div>

            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Deployment Capital (USD)</label>
                <div className="relative group">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setCoins(Math.round(parseFloat(e.target.value) * 20).toString());
                    }}
                    className="w-full pl-10 pr-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold"
                    required
                    placeholder="0.00"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Equivalent Coins</label>
                <div className="relative group">
                  <input
                    type="number"
                    min="1"
                    value={coins}
                    onChange={(e) => {
                      setCoins(e.target.value);
                      setAmount((parseInt(e.target.value) / 20).toFixed(2));
                    }}
                    className="w-full pl-10 pr-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-black text-blue-600"
                    required
                    placeholder="0"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">💰</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">Fixed Rate: 20 Coins per $1.00 USD</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black py-6 rounded-[2rem] text-xl shadow-2xl shadow-blue-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                    <span>Initialize Payment →</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-gray-100 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 transition-all cursor-default overflow-hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
              <div className="flex space-x-4">
                <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50 overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-10 border-b border-gray-50">
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Payment Ledger</h3>
              <p className="text-gray-400 font-medium text-sm">Detailed history of your financial transactions.</p>
            </div>

            <div className="flex-grow">
              {loadingHistory ? (
                <div className="flex items-center justify-center h-full py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : paymentHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 px-10 text-center">
                  <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth={2} /></svg>
                  </div>
                  <p className="text-xl font-black text-gray-900 uppercase tracking-tighter">No History Detected</p>
                  <p className="text-gray-400 font-medium italic">Make your first purchase to activate the treasury ledger.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {paymentHistory.map((payment) => (
                    <div key={payment._id} className="p-8 hover:bg-blue-50/30 transition-all group flex items-center justify-between gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-lg transition-all">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeWidth={2.5} /></svg>
                        </div>
                        <div>
                          <p className="text-xl font-black text-gray-900">+{payment.coins} <span className="text-xs uppercase text-blue-600">Coins</span></p>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Investment: ${payment.amount.toFixed(2)} USD</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${payment.status === 'succeeded' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                            payment.status === 'pending' ? 'bg-amber-50 text-amber-700 ring-amber-200' :
                              'bg-red-50 text-red-700 ring-red-200'
                          }`}>
                          {payment.status}
                        </span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-10 border-t border-gray-50 bg-gray-50/30">
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[1.5rem] text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-200 hover:text-blue-400 transition-all">
                Request Detailed CSV Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
