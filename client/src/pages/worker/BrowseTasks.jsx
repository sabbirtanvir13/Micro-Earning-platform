import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  // URL Params state
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    fetchTasks();
  }, [page, q, category, sort]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 9,
        q,
        category,
        sort,
      });
      // Filter out empty params
      if (!q) params.delete('q');
      if (!category) params.delete('category');

      const response = await api.get(`/tasks/available?${params.toString()}`);
      setTasks(response.data.tasks || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');

    setSearchParams(prev => {
      prev.set('q', query);
      prev.set('page', 1); // Reset to page 1 on search
      return prev;
    });
  };

  const handleFilterChange = (key, value) => {
    setSearchParams(prev => {
      if (value) prev.set(key, value);
      else prev.delete(key);
      prev.set('page', 1);
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage);
      return prev;
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Find Tasks</h2>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full md:w-auto">
          <input
            type="text"
            name="search"
            defaultValue={q}
            placeholder="Search tasks..."
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-medium">Filter by:</span>
          <select
            value={category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="social_media">Social Media</option>
            <option value="app_install">App Install</option>
            <option value="survey">Survey</option>
            <option value="content">Content Writing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-medium">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="coins_high">Coins: High to Low</option>
            <option value="coins_low">Coins: Low to High</option>
          </select>
        </div>

        {(q || category || sort !== 'newest') && (
          <button
            onClick={() => setSearchParams({})}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {task.category || 'General'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 line-clamp-1" title={task.title}>{task.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {task.description}
                </p>

                <div className="border-t pt-4 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Reward</span>
                      <span className="font-bold text-green-600 text-lg">{task.coinsPerWorker} coins</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-gray-500">Availability</span>
                      <span className={`font-semibold ${task.currentWorkers >= task.requiredWorkers ? 'text-red-500' : 'text-blue-600'}`}>
                        {task.requiredWorkers - task.currentWorkers} spots left
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/worker/tasks/${task._id}`}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-700">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= pagination.pages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
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
