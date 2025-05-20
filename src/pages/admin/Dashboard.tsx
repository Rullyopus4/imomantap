import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, PillIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { patientsMockData } from '../../data/mockData';

// Components
import AdherenceChart from '../../components/charts/AdherenceChart';

const AdminDashboard: React.FC = () => {
  // Calculate statistics
  const totalPatients = patientsMockData.length;
  const avgAdherence = Math.round(
    patientsMockData.reduce((sum, patient) => sum + patient.medicationAdherence, 0) / totalPatients
  );
  const patientsBelowTarget = patientsMockData.filter(
    patient => patient.medicationAdherence < 80
  ).length;

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Dashboard Admin</h1>
        <div className="flex space-x-3">
          <Link to="/admin/reports" className="btn btn-outline">
            Lihat Laporan Lengkap
          </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-md">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Pasien</p>
          <p className="text-3xl font-semibold text-gray-900">{totalPatients}</p>
          <div className="mt-2">
            <Link to="/admin/users" className="text-sm text-green-600 flex items-center hover:underline">
              Kelola Pasien <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-md">
              <Activity size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Rata-rata Kepatuhan</p>
          <p className="text-3xl font-semibold text-gray-900">{avgAdherence}%</p>
          <div className="mt-2">
            <span className={`text-sm ${avgAdherence >= 80 ? 'text-green-600' : 'text-orange-500'}`}>
              {avgAdherence >= 80 ? 'Baik' : 'Perlu Perhatian'}
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-md">
              <PillIcon size={24} className="text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Pasien di Bawah Target</p>
          <p className="text-3xl font-semibold text-gray-900">{patientsBelowTarget}</p>
          <div className="mt-2">
            <Link to="/admin/reports" className="text-sm text-orange-600 flex items-center hover:underline">
              Lihat Detail <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6 mb-8"
      >
        <h2 className="section-title mb-4">Tren Kepatuhan Minum Obat</h2>
        <div className="h-80">
          <AdherenceChart />
        </div>
      </motion.div>

      {/* Recent Patients Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="section-title">Pasien Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tekanan Darah
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kepatuhan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perawat
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patientsMockData.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.age} tahun</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.bloodPressure}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.medicationAdherence >= 90 ? 'bg-green-100 text-green-800' :
                      patient.medicationAdherence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {patient.medicationAdherence}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.assignedNurse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;