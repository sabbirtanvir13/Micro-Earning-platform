import { NavLink } from 'react-router-dom';

const WorkerSidebar = () => {
  const navItems = [
    { path: '/worker/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/worker/tasks', label: 'Browse Tasks', icon: '📋' },
    { path: '/worker/my-submissions', label: 'My Submissions', icon: '📝' },
    { path: '/worker/earnings', label: 'Earnings', icon: '💰' },
    { path: '/worker/withdraw', label: 'Withdraw', icon: '💸' },
    { path: '/worker/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default WorkerSidebar;
