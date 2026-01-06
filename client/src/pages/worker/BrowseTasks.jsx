import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/available?page=${page}&limit=10`);
      setTasks(response.data.tasks || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      toast.error('Failed to load tasks');
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>
      {tasks.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No tasks available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {task.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
                    {task.coinsPerWorker} coins
                  </span>
                  <span className="text-gray-500 text-sm">
                    {task.currentWorkers}/{task.requiredWorkers} workers
                  </span>
                </div>
                <Link
                  to={`/worker/tasks/${task._id}`}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.pages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrowseTasks;
