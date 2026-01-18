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

  const [withdrawals, setWithdrawals] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    fetchUserCoins();
    fetchWithdrawalHistory();
  }, []);

  const fetchUserCoins = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserCoins(response.data.user.coins || 0);
    } catch (error) {
      toast.error('Failed to load balance');
    }
  };

  const fetchWithdrawalHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await api.get('/withdrawals/worker/my-withdrawals');
      setWithdrawals(response.data.withdrawals || []);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoadingHistory(false);
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
      fetchWithdrawalHistory();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit withdrawal');
    } finally {
      setLoading(false);
    }
  };

  const amount = coins ? (parseInt(coins) / 20).toFixed(2) : '0.00';

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Liquid Liquidation</h2>
          <p className="text-gray-500 font-medium">Convert your earned coins into real-world currency through secure channels.</p>
        </div>
        <div className="flex items-center space-x-1 text-[10px] font-black text-gray-300 uppercase tracking-widest">
          <span>Treasury</span>
          <span className="text-indigo-600">/</span>
          <span>Liquidation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Withdrawal Form */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 border border-indigo-50 p-10 md:p-12">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth={2} /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">Withdraw Funds</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Balance: {userCoins} Coins</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Coins to Liquidate</label>
                <div className="relative group">
                  <input
                    type="number"
                    min="200"
                    max={userCoins}
                    value={coins}
                    onChange={(e) => setCoins(e.target.value)}
                    className="w-full pl-10 pr-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none font-black text-indigo-600"
                    required
                    placeholder="Min. 200"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">💰</span>
                </div>
                {coins && (
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">Estimating Value: ${amount} USD</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Destination Channel</label>
                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold appearance-none"
                  >
                    <option value="paypal">Global PayPal Transfer</option>
                    <option value="bank">Direct Bank Remittance</option>
                    <option value="crypto">Blockchain Asset Wallet</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth={2.5} /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">
                  {paymentMethod === 'paypal' ? 'PayPal Identity (Email)' : paymentMethod === 'bank' ? 'Account Designation' : 'Encrypted Wallet Key'}
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
                  className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all outline-none font-bold"
                  required
                  placeholder={paymentMethod === 'paypal' ? 'Enter email address' : 'Enter target details'}
                />
              </div>

              <button
                type="submit"
                disabled={loading || parseInt(coins) < 200}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-black py-6 rounded-[2rem] text-xl shadow-2xl shadow-indigo-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Confirm Withdrawal →</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Liquidation Ledger</h3>
                <p className="text-gray-400 font-medium text-sm">Real-time tracking of your outgoing fund requests.</p>
              </div>
            </div>

            <div className="flex-grow">
              {loadingHistory ? (
                <div className="flex items-center justify-center h-full py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : withdrawals.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 px-10 text-center">
                  <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                  </div>
                  <p className="text-xl font-black text-gray-900 uppercase tracking-tighter">No Outgoing Traffic</p>
                  <p className="text-gray-400 font-medium italic">All liquidation requests will be logged here.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {withdrawals.map((withdrawal) => (
                    <div key={withdrawal._id} className="p-8 hover:bg-indigo-50/30 transition-all group flex items-center justify-between gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-lg transition-all">
                          {withdrawal.paymentMethod === 'paypal' ? (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.067 8.178c-.652 3.667-3.064 5.333-6.19 5.333H11.5l-.8 4.414H8.383l1.833-10.155C10.4 6.273 11.333 4.5 14.5 4.5c1.467 0 2.567.4 3.3.933.733.533 1.167 1.333 1.167 2.433 0 .111-.002.216-.006.312h.001c-.004.1.004.2-.016.3-.23 1.29-.82 2.766-1.516 3.656zm-11.634 9.1l-.333 2.155H5.8l1.325-7.303 3.667-.222-.889 4.914h.022L9.2 16.4l-.767.878z" /></svg>
                          ) : withdrawal.paymentMethod === 'bank' ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 10h18M7 10v8M11 10v8M15 10v8M20 21H4a1 1 0 01-1-1v-1h18v1a1 1 0 01-1 1zM12 3L2 10h20L12 3z" strokeWidth={2} /></svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                          )}
                        </div>
                        <div>
                          <p className="text-xl font-black text-gray-900">-${withdrawal.coins} <span className="text-xs uppercase text-indigo-600">Coins</span></p>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Realization: ${withdrawal.amount.toFixed(2)} USD</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${withdrawal.status === 'processed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                          withdrawal.status === 'approved' ? 'bg-indigo-50 text-indigo-700 ring-indigo-200' :
                            withdrawal.status === 'pending' ? 'bg-amber-50 text-amber-700 ring-amber-200' :
                              'bg-red-50 text-red-700 ring-red-200'
                          }`}>
                          {withdrawal.status}
                        </span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3">
                          {new Date(withdrawal.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {paymentMethod === 'bank' && (
              <div className="p-10 border-t border-gray-50 bg-indigo-50/10">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} /></svg>
                  Remittance Notice
                </p>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Direct bank transfers may require up to 3 business days for final verification and liquidity settlement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
