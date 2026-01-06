import { NavLink } from 'react-router-dom';

const BuyerSidebar = () => {
  const navItems = [
    { path: '/buyer/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/buyer/create-task', label: 'Create Task', icon: '➕' },
    { path: '/buyer/my-tasks', label: 'My Tasks', icon: '📋' },
    { path: '/buyer/payments', label: 'Payments', icon: '💳' },
    { path: '/buyer/profile', label: 'Profile', icon: '👤' },
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

export default BuyerSidebar;
