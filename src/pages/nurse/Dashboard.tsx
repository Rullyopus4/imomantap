import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartPulse, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { patientsMockData } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

// Get patients with low adherence
const lowAdherencePatients = patientsMockData.filter(
  patient => patient.medicationAdherence < 80
);

const NurseDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Filtered patients assigned to this nurse
  const myPatients = patientsMockData.filter(
    patient => patient.assignedNurse === user?.name
  );
  
  const totalPatients = myPatients.length;
  const patientsNeedingAttention = myPatients.filter(
    patient => patient.medicationAdherence < 80
  ).length;

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Dashboard Perawat</h1>
        <Link to="/perawat/patients" className="btn btn-primary">
          Lihat Semua Pasien
        </Link>
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-md">
              <HeartPulse size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Rata-rata Kepatuhan</p>
          <p className="text-3xl font-semibold text-gray-900">
            {Math.round(myPatients.reduce((sum, p) => sum + p.medicationAdherence, 0) / totalPatients)}%
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stats-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-md">
              <Bell size={24} className="text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Perlu Perhatian</p>
          <p className="text-3xl font-semibold text-gray-900">{patientsNeedingAttention}</p>
        </motion.div>
      </div>

      {/* Patients Needing Attention */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card overflow-hidden mb-8"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="section-title">Pasien yang Perlu Perhatian</h2>
          <span className="text-sm font-medium text-red-600 bg-red-50 rounded-full px-2.5 py-0.5">
            {patientsNeedingAttention} Pasien
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          {myPatients
            .filter(patient => patient.medicationAdherence < 80)
            .map((patient) => (
              <div key={patient.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {patient.age} tahun • Tekanan Darah: {patient.bloodPressure}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm mr-2">Kepatuhan:</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${patient.medicationAdherence}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-red-600">
                        {patient.medicationAdherence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Terakhir periksa: {patient.lastCheckup}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="btn btn-primary text-sm px-3 py-1">
                      Kirim Pengingat
                    </button>
                    <button className="btn btn-outline text-sm px-3 py-1">
                      Hubungi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {patientsNeedingAttention === 0 && (
            <div className="p-6 text-center text-gray-500">
              Tidak ada pasien yang memerlukan perhatian saat ini
            </div>
          )}
        </div>
      </motion.div>

      {/* Latest Medication Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="section-title">Status Pengobatan Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pasien
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Obat
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosis
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jadwal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myPatients.flatMap(patient => 
                patient.medications.map((medication, index) => (
                  <tr key={`${patient.id}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{medication.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{medication.dosage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{medication.schedule}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        medication.status === 'taken' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {medication.status === 'taken' ? 'Diminum' : 'Terlewat'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-800 flex items-center justify-end w-full">
                        Detail <ArrowRight size={14} className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default NurseDashboard;