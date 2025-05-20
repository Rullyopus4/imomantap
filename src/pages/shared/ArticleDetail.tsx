import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import { articlesMockData } from '../../data/mockData';
import toast from 'react-hot-toast';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(articlesMockData.find(a => a.id === id));
  
  useEffect(() => {
    // Scroll to top when article changes
    window.scrollTo(0, 0);
    
    // Set article from mock data
    setArticle(articlesMockData.find(a => a.id === id));
  }, [id]);
  
  if (!article) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Maaf, artikel yang Anda cari tidak tersedia.</p>
        <Link to="/pasien/articles" className="btn btn-primary">
          Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    toast.success('Link artikel berhasil disalin!');
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/pasien/articles" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Kembali ke Daftar Artikel</span>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden mb-6"
      >
        <div className="w-full h-64 md:h-80 relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Tag size={12} className="mr-1" />
                {article.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{article.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-6 text-sm text-gray-500">
            <div className="flex items-center mr-4 mb-2">
              <User size={16} className="mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center mb-2">
              <Calendar size={16} className="mr-1" />
              <span>{article.date}</span>
            </div>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bagikan Artikel</h3>
                <p className="text-sm text-gray-600">
                  Bantu teman dan keluarga Anda yang mungkin membutuhkan informasi ini
                </p>
              </div>
              <button 
                onClick={handleShare}
                className="btn btn-outline flex items-center"
              >
                <Share2 size={16} className="mr-2" />
                Bagikan
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Related Articles */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Artikel Terkait</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articlesMockData
            .filter(a => a.id !== id)
            .slice(0, 3)
            .map((relatedArticle, index) => (
              <motion.div
                key={relatedArticle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <img 
                  src={relatedArticle.image} 
                  alt={relatedArticle.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex justify-end mt-2">
                    <Link 
                      to={`/pasien/articles/${relatedArticle.id}`}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Baca selengkapnya
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;