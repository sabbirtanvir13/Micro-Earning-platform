import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const { selectRole, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if role already selected
  useEffect(() => {
    if (user && user.role) {
      if (user.role === 'worker') navigate('/worker/dashboard');
      else if (user.role === 'buyer') navigate('/buyer/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!selectedRole) {
      toast.error('Please select a protocol to initialize');
      return;
    }

    setLoading(true);
    const result = await selectRole(selectedRole);

    if (result.success) {
      toast.success(`Protocol ${selectedRole.toUpperCase()} initialized!`);
      if (selectedRole === 'worker') {
        navigate('/worker/dashboard');
      } else if (selectedRole === 'buyer') {
        navigate('/buyer/dashboard');
      } else if (selectedRole === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      toast.error(result.error || 'Failed to initialize protocol');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 lg:p-12 font-sansSelection overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-blue-600/5 z-0" />

      <div className="max-w-4xl w-full space-y-12 relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white shadow-sm border border-gray-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            <span>Security Level: Alpha</span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Trajectory</span>
          </h2>
          <p className="text-gray-400 font-medium max-w-sm mx-auto">
            Select your operational protocol to begin interacting with the ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Worker Protocol */}
          <div
            onClick={() => setSelectedRole('worker')}
            className={`group cursor-pointer relative p-8 rounded-[2.5rem] transition-all duration-500 overflow-hidden ${selectedRole === 'worker'
              ? 'bg-white shadow-2xl shadow-indigo-200 border-2 border-indigo-600 scale-[1.02]'
              : 'bg-white/40 hover:bg-white border-2 border-transparent hover:border-gray-200 shadow-xl'
              }`}
          >
            <div className="relative z-10 space-y-6">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-colors ${selectedRole === 'worker' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                }`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2} /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Worker</h3>
                <p className="text-gray-500 font-medium text-sm mt-1">Execute micro-tasks and scale your capital.</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-full inline-block border border-emerald-100 uppercase tracking-widest leading-none">
                +10 Initial Credits
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>

          {/* Buyer Protocol */}
          <div
            onClick={() => setSelectedRole('buyer')}
            className={`group cursor-pointer relative p-8 rounded-[2.5rem] transition-all duration-500 overflow-hidden ${selectedRole === 'buyer'
              ? 'bg-white shadow-2xl shadow-blue-200 border-2 border-blue-600 scale-[1.02]'
              : 'bg-white/40 hover:bg-white border-2 border-transparent hover:border-gray-200 shadow-xl'
              }`}
          >
            <div className="relative z-10 space-y-6">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-colors ${selectedRole === 'buyer' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeWidth={2} /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Buyer</h3>
                <p className="text-gray-500 font-medium text-sm mt-1">Deploy tasks and leverage global intelligence.</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-full inline-block border border-emerald-100 uppercase tracking-widest leading-none">
                +50 Initial Credits
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-10 pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedRole}
            className="w-full max-w-sm bg-gray-900 text-white font-black py-6 rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Activate Protocol</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2.5} /></svg>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            Access Administrative Command?
          </button>
        </div>
      </div>

      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </div>
  );
};

export default RoleSelection;
