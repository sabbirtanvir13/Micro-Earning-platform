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
            <div
              key={task._id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Task Thumbnail */}
                <div className="md:w-48 h-48 md:h-auto overflow-hidden relative">
                  <img
                    src={task.image || `https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80`}
                    alt={task.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors"></div>
                </div>

                <div className="flex-1 p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div className="max-w-xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadge(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Created {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{task.title}</h3>
                      <p className="text-gray-500 font-medium text-sm line-clamp-1">{task.description}</p>
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Total Investment</p>
                      <p className="text-2xl font-black text-blue-600">{(task.coinsPerWorker * task.requiredWorkers)} <span className="text-xs">Coins</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100 gap-6">
                    <div className="flex space-x-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Per Worker</span>
                        <span className="font-bold text-gray-900">{task.coinsPerWorker} Coins</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Growth</span>
                        <span className="font-bold text-gray-900">{task.currentWorkers} / {task.requiredWorkers} Fulfilled</span>
                      </div>
                      <div className="hidden md:flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completion</span>
                        <div className="w-24 bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full transition-all duration-1000"
                            style={{ width: `${(task.currentWorkers / task.requiredWorkers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/buyer/tasks/${task._id}`}
                      className="w-full md:w-auto px-8 py-3 bg-gray-50 text-gray-900 font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all text-center group-hover:bg-blue-600 group-hover:text-white shadow-lg shadow-gray-200/50 group-hover:shadow-blue-500/30"
                    >
                      Management Panel →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
