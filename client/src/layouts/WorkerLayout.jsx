import { Outlet } from 'react-router-dom';
import WorkerSidebar from '../components/worker/WorkerSidebar';
import WorkerHeader from '../components/worker/WorkerHeader';

const WorkerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <WorkerHeader />
      <div className="flex">
        <WorkerSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;
