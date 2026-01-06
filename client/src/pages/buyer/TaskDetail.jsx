import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
    fetchSubmissions();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.task);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/buyer/my-tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await api.get(`/submissions/task/${id}`);
      setSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error('Failed to load submissions');
    }
  };

  const handleApprove = async (submissionId) => {
    try {
      await api.patch(`/submissions/${submissionId}/approve`);
      toast.success('Submission approved!');
      fetchSubmissions();
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve');
    }
  };

  const handleReject = async (submissionId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      await api.patch(`/submissions/${submissionId}/reject`, { rejectionReason: reason });
      toast.success('Submission rejected');
      fetchSubmissions();
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div>
      <button
        onClick={() => navigate('/buyer/my-tasks')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Tasks
      </button>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        {task.image && (
          <img src={task.image} alt={task.title} className="mb-4 rounded-lg max-w-full" />
        )}
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{task.description}</p>
        <div className="flex space-x-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
            {task.coinsPerWorker} coins per worker
          </span>
          <span className="text-gray-600 text-sm">
            {task.currentWorkers}/{task.requiredWorkers} workers
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Submissions ({submissions.length})</h3>
        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">
                      {submission.workerId?.displayName || 'Worker'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(submission.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      submission.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : submission.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {submission.submissionText}
                </p>
                {submission.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(submission._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(submission._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {submission.status === 'rejected' && submission.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
                    <p className="text-red-800 text-sm">
                      <strong>Rejection Reason:</strong> {submission.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
