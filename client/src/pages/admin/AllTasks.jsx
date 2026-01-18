import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminAllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tasks/available?limit=1000&status=all');
            setTasks(response.data.tasks || []);
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            open: 'bg-green-100 text-green-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    const filteredTasks = tasks.filter(task => {
        const matchesFilter = filter === 'all' || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: tasks.length,
        open: tasks.filter(t => t.status === 'open').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
                    <p className="text-gray-600 mt-1">Manage and monitor all platform tasks</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                    <div className="text-sm text-gray-600">Total Tasks</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                    <div className="text-sm text-green-600">Open</div>
                    <div className="text-2xl font-bold text-green-700">{stats.open}</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                    <div className="text-sm text-blue-600">In Progress</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.inProgress}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <div className="text-sm text-gray-600">Completed</div>
                    <div className="text-2xl font-bold text-gray-700">{stats.completed}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('open')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'open'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Open
                        </button>
                        <button
                            onClick={() => setFilter('in_progress')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'in_progress'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            In Progress
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'completed'
                                    ? 'bg-gray-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Task
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Reward
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Workers
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTasks.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-gray-600 font-medium">No tasks found</p>
                                            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="font-medium text-gray-900">{task.title}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-1">{task.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                                                {task.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-green-600">{task.coinsPerWorker} coins</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <span className="font-medium">{task.currentWorkers}</span>
                                                <span className="text-gray-500">/{task.requiredWorkers}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div
                                                    className="bg-blue-600 h-1.5 rounded-full"
                                                    style={{ width: `${(task.currentWorkers / task.requiredWorkers) * 100}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(task.status)}`}>
                                                {task.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/admin/tasks/${task._id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Results Count */}
            {filteredTasks.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                    Showing {filteredTasks.length} of {tasks.length} tasks
                </div>
            )}
        </div>
    );
};

export default AdminAllTasks;
