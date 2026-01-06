import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.task);
      setSubmission(response.data.userSubmission);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/worker/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post('/submissions', {
        taskId: id,
        submissionText,
      });
      toast.success('Submission created successfully!');
      navigate('/worker/my-submissions');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
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
        onClick={() => navigate('/worker/tasks')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Tasks
      </button>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        {task.image && (
          <img src={task.image} alt={task.title} className="mb-4 rounded-lg max-w-full" />
        )}
        <div className="mb-4">
          <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
        </div>
        <div className="flex space-x-4 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
            {task.coinsPerWorker} coins
          </span>
          <span className="text-gray-600 text-sm">
            {task.currentWorkers}/{task.requiredWorkers} workers
          </span>
          <span className="text-gray-600 text-sm capitalize">Status: {task.status}</span>
        </div>
        {task.submissionInstructions && (
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">Submission Instructions:</h3>
            <p className="text-gray-700">{task.submissionInstructions}</p>
          </div>
        )}

        {submission ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-yellow-800">
              You have already submitted for this task. Status: {submission.status}
            </p>
          </div>
        ) : task.status === 'open' || task.status === 'in_progress' ? (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Submission
              </label>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your submission here..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !submissionText.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-600">This task is no longer accepting submissions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
