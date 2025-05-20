import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, LineChart, PillIcon, BookOpen, Home, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (user?.role === 'admin') {
      return [
        { to: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
        { to: '/admin/users', icon: <Users size={20} />, label: 'Pengguna' },
        { to: '/admin/reports', icon: <LineChart size={20} />, label: 'Laporan' },
      ];
    } else if (user?.role === 'nurse') {
      return [
        { to: '/perawat', icon: <Home size={20} />, label: 'Dashboard' },
        { to: '/perawat/patients', icon: <Users size={20} />, label: 'Pasien' },
      ];
    } else {
      return [
        { to: '/pasien', icon: <Home size={20} />, label: 'Dashboard' },
        { to: '/pasien/medication', icon: <PillIcon size={20} />, label: 'Obat' },
        { to: '/pasien/articles', icon: <BookOpen size={20} />, label: 'Artikel' },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">IMO MANTAP</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt="Avatar"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-700 hover:text-primary-600"
            >
              <LogOut size={18} className="mr-1" />
              <span>Keluar</span>
            </button>
          </div>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:flex-shrink-0 bg-white border-r border-gray-200">
          <div className="w-56 flex flex-col h-full">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${location.pathname === link.to
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className={`
                    mr-3 ${location.pathname === link.to ? 'text-primary-600' : 'text-gray-500'}
                  `}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="border-t border-gray-200 p-4">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full text-left text-sm text-gray-700 hover:text-primary-600"
              >
                <LogOut size={18} className="mr-3" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden bg-gray-600 bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          >
            <motion.aside
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 pt-5 pb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-primary-500" />
                  <span className="ml-2 text-lg font-bold text-gray-900">IMO MANTAP</span>
                </div>
                <button 
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={closeMobileMenu}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="px-2 pt-2 pb-3 border-b border-gray-200">
                <div className="flex items-center px-3 py-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt="Avatar"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
              </div>
              
              <nav className="mt-3 px-3 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                      flex items-center px-3 py-3 text-sm font-medium rounded-md mb-1
                      ${location.pathname === link.to
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    onClick={closeMobileMenu}
                  >
                    <span className={`
                      mr-3 ${location.pathname === link.to ? 'text-primary-600' : 'text-gray-500'}
                    `}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="border-t border-gray-200 p-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left text-sm text-gray-700 hover:text-primary-600"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Keluar</span>
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="dashboard-container"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;