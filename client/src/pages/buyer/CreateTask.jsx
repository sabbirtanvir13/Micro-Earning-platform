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
    <div>
      <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-3xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
            required
            maxLength={2000}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coins per Worker *
            </label>
            <input
              type="number"
              name="coinsPerWorker"
              value={formData.coinsPerWorker}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Workers *
            </label>
            <input
              type="number"
              name="requiredWorkers"
              value={formData.requiredWorkers}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {totalCoins > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-blue-800">
              <strong>Total coins needed:</strong> {totalCoins} coins
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Data Entry, Research, Design"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deadline (optional)
          </label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Submission Instructions
          </label>
          <textarea
            name="submissionInstructions"
            value={formData.submissionInstructions}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Provide specific instructions for workers..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
