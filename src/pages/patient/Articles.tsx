import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articlesMockData } from '../../data/mockData';
import { Search, Calendar, User, Tag } from 'lucide-react';

const PatientArticles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredArticles = articlesMockData.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Artikel Kesehatan</h1>
      </header>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Tag size={12} className="mr-1" />
                  {article.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.summary}</p>
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{article.date}</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to={`/pasien/articles/${article.id}`} 
                  className="btn btn-primary w-full"
                >
                  Baca Artikel
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        
        {filteredArticles.length === 0 && (
          <div className="col-span-full text-center py-10">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-medium text-gray-700 mb-2">Tidak Ada Artikel Ditemukan</h2>
            <p className="text-gray-500">
              Tidak ada artikel yang cocok dengan pencarian Anda. Coba kata kunci lain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientArticles;