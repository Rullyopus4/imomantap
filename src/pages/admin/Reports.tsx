import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { patientsMockData, bloodPressureData } from '../../data/mockData';
import { Calendar, Download } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminReports: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  
  // Calculate average adherence
  const avgAdherence = Math.round(
    patientsMockData.reduce((sum, patient) => sum + patient.medicationAdherence, 0) / patientsMockData.length
  );
  
  // Blood pressure chart options
  const bpOptions = {
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
        title: {
          display: true,
          text: 'Tekanan Darah (mmHg)',
        },
      },
    },
  };
  
  // Adherence by age group data
  const adherenceByAge = {
    labels: ['40-49', '50-59', '60-69', '70+'],
    datasets: [
      {
        label: 'Kepatuhan (%)',
        data: [85, 78, 65, 60],
        backgroundColor: 'rgba(56, 189, 248, 0.6)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 1,
      },
    ],
  };
  
  // Adherence by age chart options
  const ageOptions = {
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
        max: 100,
        title: {
          display: true,
          text: 'Kepatuhan (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Kelompok Usia',
        },
      },
    },
  };

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Laporan Kepatuhan</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border rounded-md">
            <button 
              className={`px-3 py-1.5 text-sm font-medium ${reportPeriod === 'weekly' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setReportPeriod('weekly')}
            >
              Mingguan
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium ${reportPeriod === 'monthly' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setReportPeriod('monthly')}
            >
              Bulanan
            </button>
          </div>
          <button className="btn btn-outline flex items-center">
            <Download size={16} className="mr-2" />
            Ekspor
          </button>
        </div>
      </header>
      
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Calendar size={16} className="mr-1" />
        <span>
          Periode: {reportPeriod === 'weekly' ? '7 - 13 Juli 2024' : 'Juli 2024'}
        </span>
      </div>
      
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8"
      >
        <h2 className="section-title mb-4">Ringkasan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-gray-500 mb-1">Total Pasien</p>
            <p className="text-2xl font-semibold">{patientsMockData.length}</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-gray-500 mb-1">Rata-rata Kepatuhan</p>
            <p className="text-2xl font-semibold">{avgAdherence}%</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-gray-500 mb-1">Pasien Kepatuhan Tinggi</p>
            <p className="text-2xl font-semibold">
              {patientsMockData.filter(p => p.medicationAdherence >= 80).length}
            </p>
          </div>
          
          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-gray-500 mb-1">Pasien Kepatuhan Rendah</p>
            <p className="text-2xl font-semibold">
              {patientsMockData.filter(p => p.medicationAdherence < 80).length}
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h2 className="section-title mb-4">Tren Tekanan Darah</h2>
          <div className="h-72">
            <Line options={bpOptions} data={bloodPressureData} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="section-title mb-4">Kepatuhan Berdasarkan Usia</h2>
          <div className="h-72">
            <Bar options={ageOptions} data={adherenceByAge} />
          </div>
        </motion.div>
      </div>
      
      {/* Patient Adherence Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="section-title">Detail Kepatuhan Pasien</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pasien
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tekanan Darah Terakhir
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tingkat Kepatuhan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pemeriksaan Terakhir
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
                    <div className="flex items-center">
                      <div 
                        className="w-full bg-gray-200 rounded-full h-2.5"
                      >
                        <div 
                          className={`h-2.5 rounded-full ${
                            patient.medicationAdherence >= 90 ? 'bg-green-500' :
                            patient.medicationAdherence >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${patient.medicationAdherence}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{patient.medicationAdherence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.lastCheckup}
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

export default AdminReports;