import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';

// Public pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import RoleSelection from './pages/public/RoleSelection';

// Worker pages
import WorkerLayout from './layouts/WorkerLayout';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import BrowseTasks from './pages/worker/BrowseTasks';
import TaskDetail from './pages/worker/TaskDetail';
import MySubmissions from './pages/worker/MySubmissions';
import Earnings from './pages/worker/Earnings';
import Withdraw from './pages/worker/Withdraw';
import WorkerProfile from './pages/worker/WorkerProfile';

// Buyer pages
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import CreateTask from './pages/buyer/CreateTask';
import MyTasks from './pages/buyer/MyTasks';
import BuyerTaskDetail from './pages/buyer/TaskDetail';
import Payments from './pages/buyer/Payments';
import BuyerProfile from './pages/buyer/BuyerProfile';

// Admin pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWithdrawals from './pages/admin/Withdrawals';
import AdminAllTasks from './pages/admin/AllTasks';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/select-role"
            element={
              <ProtectedRoute>
                <RoleSelection />
              </ProtectedRoute>
            }
          />

          {/* Worker Routes */}
          <Route
            path="/worker"
            element={
              <RoleRoute allowedRoles={['worker']}>
                <WorkerLayout />
              </RoleRoute>
            }
          >
            <Route path="dashboard" element={<WorkerDashboard />} />
            <Route path="tasks" element={<BrowseTasks />} />
            <Route path="tasks/:id" element={<TaskDetail />} />
            <Route path="my-submissions" element={<MySubmissions />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="profile" element={<WorkerProfile />} />
          </Route>

          {/* Buyer Routes */}
          <Route
            path="/buyer"
            element={
              <RoleRoute allowedRoles={['buyer']}>
                <BuyerLayout />
              </RoleRoute>
            }
          >
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="tasks/:id" element={<BuyerTaskDetail />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<BuyerProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminLayout />
              </RoleRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="withdrawals" element={<AdminWithdrawals />} />
            <Route path="tasks" element={<AdminAllTasks />} />
            <Route path="submissions" element={<div className="p-6"><h2 className="text-2xl font-bold">Submissions</h2><p className="text-gray-600 mt-4">Submission management coming soon...</p></div>} />
            <Route path="users" element={<div className="p-6"><h2 className="text-2xl font-bold">Users</h2><p className="text-gray-600 mt-4">User management coming soon...</p></div>} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
