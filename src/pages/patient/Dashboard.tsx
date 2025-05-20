import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PillIcon, BookOpen, User, Calendar, Bell, ArrowRight } from 'lucide-react';
import { adherenceData, patientsMockData, articlesMockData } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

// Chart imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Find the patient data that matches the logged-in user
  const patientData = patientsMockData.find(p => p.name === user?.name) || patientsMockData[0];
  
  // Get today's medications
  const todayMedications = patientData.medications;
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return value === 1 ? 'Ya' : value === 0 ? 'Tidak' : value;
          }
        },
        max: 1
      },
    },
  };

  const showMedicationReminder = () => {
    toast(
      (t) => (
        <div className="flex items-start">
          <div className="bg-primary-100 p-2 rounded-full mr-3">
            <PillIcon size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium">Waktunya minum obat!</h3>
            <p className="text-sm text-gray-600 mt-1">Jangan lupa minum Amlodipine 10mg</p>
            <div className="mt-3 flex space-x-2">
              <button 
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 bg-primary-500 text-white text-sm rounded-md hover:bg-primary-600"
              >
                Sudah Minum
              </button>
              <button 
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
              >
                Nanti
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 10000,
        style: {
          maxWidth: '400px',
          padding: '16px',
        },
      }
    );
  };

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Dashboard Pasien</h1>
        <button
          onClick={showMedicationReminder}
          className="btn btn-outline flex items-center"
        >
          <Bell size={16} className="mr-2" />
          Tampilkan Pengingat
        </button>
      </header>

      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8 bg-gradient-to-r from-primary-50 to-secondary-50"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Selamat Datang, {user?.name}</h2>
            <p className="text-gray-600">Bagaimana kabar Anda hari ini? Jangan lupa minum obat sesuai jadwal!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/pasien/medication" className="btn btn-primary">
              Lihat Jadwal Obat
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Health Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="section-title">Status Kesehatan</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Tekanan Darah</span>
                    <User size={18} className="text-gray-500" />
                  </div>
                  <p className="text-2xl font-semibold">{patientData.bloodPressure}</p>
                  <p className="text-sm text-gray-500 mt-1">Terakhir diukur: {patientData.lastCheckup}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Kepatuhan Obat</span>
                    <PillIcon size={18} className="text-gray-500" />
                  </div>
                  <p className="text-2xl font-semibold">{patientData.medicationAdherence}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        patientData.medicationAdherence >= 90 ? 'bg-green-500' :
                        patientData.medicationAdherence >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${patientData.medicationAdherence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-3">Kepatuhan Seminggu Terakhir</h3>
              <div className="h-60">
                <Bar options={options} data={adherenceData.weekly} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Today's Medications */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="section-title">Obat Hari Ini</h2>
              <Calendar size={18} className="text-gray-500" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayMedications.map((medication, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      medication.status === 'taken' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <PillIcon size={16} className={
                        medication.status === 'taken' ? 'text-green-600' : 'text-gray-500'
                      } />
                    </div>
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-gray-500">{medication.dosage} • {medication.schedule}</p>
                      {medication.status === 'taken' ? (
                        <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Sudah diminum
                        </span>
                      ) : (
                        <button className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                          Tandai sudah diminum
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/pasien/medication"
                  className="text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center"
                >
                  Lihat semua jadwal <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Health Articles Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card overflow-hidden mt-6"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="section-title">Artikel Kesehatan</h2>
              <BookOpen size={18} className="text-gray-500" />
            </div>
            <div className="p-6">
              {articlesMockData.slice(0, 1).map(article => (
                <div key={article.id} className="mb-4">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{article.summary.substring(0, 100)}...</p>
                  <Link 
                    to={`/pasien/articles/${article.id}`}
                    className="inline-block mt-3 text-primary-600 text-sm font-medium hover:text-primary-700"
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              ))}
              
              <div className="mt-2">
                <Link 
                  to="/pasien/articles"
                  className="text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center"
                >
                  Lihat semua artikel <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;