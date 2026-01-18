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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="group bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={task.image || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80`}
                    alt={task.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                      {task.category || 'General'}
                    </span>
                    <span className="text-[10px] font-bold opacity-80 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-lg">
                      {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1" title={task.title}>
                    {task.title}
                  </h3>

                  <p className="text-gray-500 font-medium text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {task.description}
                  </p>

                  <div className="pt-6 border-t border-gray-100 mt-auto">
                    <div className="flex justify-between items-end mb-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Reward Amount</p>
                        <p className="text-2xl font-black text-emerald-600">{task.coinsPerWorker} <span className="text-xs uppercase">Coins</span></p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Availability</p>
                        <p className={`text-sm font-black ${task.requiredWorkers - task.currentWorkers <= 5 ? 'text-red-500' : 'text-indigo-600'}`}>
                          {task.requiredWorkers - task.currentWorkers} spots left
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/worker/tasks/${task._id}`}
                      className="block w-full py-4 bg-gray-50 text-gray-900 font-black rounded-2xl hover:bg-indigo-600 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 transition-all text-center group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      View Opportunities →
                    </Link>
                  </div>
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
