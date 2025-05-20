import React from 'react';
import { Link } from 'react-router-dom';
import { FrownIcon, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <FrownIcon size={64} className="text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center"
      >
        <Home size={18} className="mr-2" />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;