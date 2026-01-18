import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    coinsPerWorker: '',
    requiredWorkers: '',
    category: '',
    deadline: '',
    submissionInstructions: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalCoins = parseInt(formData.coinsPerWorker) * parseInt(formData.requiredWorkers);
      await api.post('/tasks', {
        ...formData,
        coinsPerWorker: parseInt(formData.coinsPerWorker),
        requiredWorkers: parseInt(formData.requiredWorkers),
        deadline: formData.deadline || undefined,
      });
      toast.success('Task created successfully!');
      navigate('/buyer/my-tasks');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const totalCoins = formData.coinsPerWorker && formData.requiredWorkers
    ? parseInt(formData.coinsPerWorker) * parseInt(formData.requiredWorkers)
    : 0;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Strategic Deployment</h2>
        <p className="text-gray-500 font-medium italic">Create a new task and leverage our global workforce.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100 border border-blue-50 p-10 md:p-16 space-y-10">
        {/* Basic Info Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Campaign Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold"
              required
              maxLength={200}
              placeholder="E.g. High-Quality Website Testing"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Mission Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-medium leading-relaxed"
              required
              maxLength={2000}
              placeholder="Provide a detailed brief of the work protocol..."
            />
          </div>
        </div>

        {/* Visual Assets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Visual Asset URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold"
              placeholder="https://images.com/preview.jpg"
            />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">This will be shown as the task thumbnail</p>
          </div>

          <div className="relative rounded-[2rem] border-2 border-dashed border-gray-200 h-32 flex items-center justify-center overflow-hidden bg-gray-50">
            {formData.image ? (
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-gray-400">
                <svg className="w-8 h-8 mx-auto mb-1 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 0 002-2V6a2 0 00-2-2H6a2 0 00-2 2v12a2 0 002 2z" strokeWidth={2} /></svg>
                <p className="text-[10px] font-black uppercase tracking-widest">Image Preview</p>
              </div>
            )}
          </div>
        </div>

        {/* Financials & Logic */}
        <div className="pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Reward per Unit</label>
              <div className="relative">
                <input
                  type="number"
                  name="coinsPerWorker"
                  value={formData.coinsPerWorker}
                  onChange={handleChange}
                  min="1"
                  className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold"
                  required
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">💰</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Required Force (Workers)</label>
              <div className="relative">
                <input
                  type="number"
                  name="requiredWorkers"
                  value={formData.requiredWorkers}
                  onChange={handleChange}
                  min="1"
                  className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold"
                  required
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">👷</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Investment Projection</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-black">{totalCoins}</span>
                <span className="font-bold opacity-80 underline underline-offset-4 decoration-white/30 truncate">Coins Total</span>
              </div>
              <p className="mt-6 text-sm text-blue-100 font-medium">Funds will be deducted from your business account balance upon deployment.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </div>

        {/* Secondary Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Strategic Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold appearance-none"
            >
              <option value="">Select Domain</option>
              <option value="social_media">Social Ecosystems</option>
              <option value="app_install">Application Growth</option>
              <option value="survey">Market Intel</option>
              <option value="content">Content Engines</option>
              <option value="other">General Operations</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Mission Deadline</label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-bold"
            />
          </div>
        </div>

        <div className="space-y-2 mt-10">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-4">Proof Execution Protocol</label>
          <textarea
            name="submissionInstructions"
            value={formData.submissionInstructions}
            onChange={handleChange}
            rows={4}
            className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-medium leading-relaxed"
            placeholder="What specific evidence must the worker provide?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black py-6 rounded-[2rem] text-xl shadow-2xl shadow-blue-500/30 hover:-translate-y-1 transition-all disabled:opacity-50"
        >
          {loading ? 'Initializing Deployment...' : 'Deploy Task Campaign →'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
