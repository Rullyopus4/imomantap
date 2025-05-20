import React from 'react';
import { Outlet } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-2xl font-bold text-gray-900">IMO MANTAP</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
        <p>© 2024 IMO MANTAP - Kepatuhan Minum Obat Hipertensi</p>
      </footer>
    </div>
  );
};

export default PublicLayout;