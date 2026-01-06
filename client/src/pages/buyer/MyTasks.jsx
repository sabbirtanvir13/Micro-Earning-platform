import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const fetchTasks = async () => {
    try {
      const query = statusFilter ? `?status=${statusFilter}` : '';
      const response = await api.get(`/tasks/buyer/my-tasks${query}`);
      setTasks(response.data.tasks || []);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      open: 'bg-green-100 text-green-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {tasks.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">No tasks found.</p>
          <Link
            to="/buyer/create-task"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create your first task →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${getStatusBadge(
                    task.status
                  )}`}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>{task.coinsPerWorker} coins per worker</span>
                  <span>
                    {task.currentWorkers}/{task.requiredWorkers} workers
                  </span>
                </div>
                <Link
                  to={`/buyer/tasks/${task._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
