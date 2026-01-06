import { Outlet } from 'react-router-dom';
import BuyerSidebar from '../components/buyer/BuyerSidebar';
import BuyerHeader from '../components/buyer/BuyerHeader';

const BuyerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerHeader />
      <div className="flex">
        <BuyerSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BuyerLayout;
