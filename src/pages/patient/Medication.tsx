import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { patientsMockData } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { PillIcon, CheckCircle, XCircle, Clock, CalendarClock, Info } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock medication schedule for the week
const weeklySchedule = [
  { day: 'Senin', date: '15 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
  { day: 'Selasa', date: '16 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
  { day: 'Rabu', date: '17 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
  { day: 'Kamis', date: '18 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
  { day: 'Jumat', date: '19 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
  { day: 'Sabtu', date: '20 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
  { day: 'Minggu', date: '21 Juli', medications: ['Amlodipine 10mg', 'Lisinopril 20mg'] },
];

const PatientMedication: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('today');
  
  // Find the patient data that matches the logged-in user
  const patientData = patientsMockData.find(p => p.name === user?.name) || patientsMockData[0];
  const todayMedications = patientData.medications;
  
  const [medications, setMedications] = useState(todayMedications);

  // Function to mark medication as taken
  const markAsTaken = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      status: 'taken'
    };
    setMedications(updatedMedications);
    
    toast.success(`${updatedMedications[index].name} ditandai sudah diminum!`, {
      icon: <CheckCircle className="text-green-500" />,
    });
  };
  
  // Function to mark medication as missed
  const markAsMissed = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      status: 'missed'
    };
    setMedications(updatedMedications);
    
    toast.error(`${updatedMedications[index].name} ditandai terlewat.`, {
      icon: <XCircle className="text-red-500" />,
    });
  };
  
  // Show medication details
  const showMedicationInfo = (medication: string) => {
    toast(
      (t) => (
        <div>
          <h3 className="font-medium mb-2">Informasi Obat</h3>
          <p className="text-sm mb-2"><strong>{medication}</strong></p>
          <p className="text-sm text-gray-600">
            Obat ini digunakan untuk menurunkan tekanan darah. Minum dengan segelas penuh air. 
            Dapat diminum dengan atau tanpa makanan.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Efek samping:</strong> Pusing, sakit kepala, atau mual
          </p>
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="mt-3 px-3 py-1 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>
      ),
      {
        duration: 5000,
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
        <h1 className="page-title">Jadwal Pengobatan</h1>
      </header>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'today' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Hari Ini
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'schedule' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Jadwal Mingguan
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'history' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Riwayat
        </button>
      </div>
      
      {/* Today's Medications Tab */}
      {activeTab === 'today' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="space-y-6"
        >
          <div className="flex items-center bg-blue-50 text-blue-700 p-4 rounded-lg">
            <Clock className="mr-2" size={20} />
            <span>Selasa, 16 Juli 2024</span>
          </div>
          
          {/* Morning medications */}
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full mr-2">
                <Clock size={16} className="text-yellow-600" />
              </div>
              Pagi (06:00 - 08:00)
            </h2>
            
            <div className="space-y-4">
              {medications.filter(med => med.schedule === 'Pagi').map((medication, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      medication.status === 'taken' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <PillIcon size={16} className={
                        medication.status === 'taken' ? 'text-green-600' : 'text-gray-500'
                      } />
                    </div>
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-gray-500">{medication.dosage}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Minum dengan segelas air
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => showMedicationInfo(medication.name)}
                      className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"
                      title="Informasi obat"
                    >
                      <Info size={16} />
                    </button>
                    
                    {medication.status === 'taken' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Sudah diminum
                      </span>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => markAsTaken(index)}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          <CheckCircle size={12} className="mr-1" />
                          Sudah
                        </button>
                        <button 
                          onClick={() => markAsMissed(index)}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200"
                        >
                          <XCircle size={12} className="mr-1" />
                          Lewat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Evening medications */}
          <div className="card p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <div className="p-2 bg-indigo-100 rounded-full mr-2">
                <Clock size={16} className="text-indigo-600" />
              </div>
              Malam (18:00 - 20:00)
            </h2>
            
            <div className="space-y-4">
              {medications.filter(med => med.schedule === 'Malam').map((medication, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      medication.status === 'taken' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <PillIcon size={16} className={
                        medication.status === 'taken' ? 'text-green-600' : 'text-gray-500'
                      } />
                    </div>
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-gray-500">{medication.dosage}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Minum sesudah makan
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => showMedicationInfo(medication.name)}
                      className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"
                      title="Informasi obat"
                    >
                      <Info size={16} />
                    </button>
                    
                    {medication.status === 'taken' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Sudah diminum
                      </span>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => markAsTaken(index + medications.filter(med => med.schedule === 'Pagi').length)}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          <CheckCircle size={12} className="mr-1" />
                          Sudah
                        </button>
                        <button 
                          onClick={() => markAsMissed(index + medications.filter(med => med.schedule === 'Pagi').length)}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200"
                        >
                          <XCircle size={12} className="mr-1" />
                          Lewat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Weekly Schedule Tab */}
      {activeTab === 'schedule' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="section-title">Jadwal Mingguan</h2>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarClock size={16} className="mr-1" />
                <span>15 - 21 Juli 2024</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hari
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pagi (06:00 - 08:00)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Malam (18:00 - 20:00)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {weeklySchedule.map((day, index) => (
                    <tr key={index} className={index === 1 ? 'bg-primary-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{day.day}</span>
                          <span className="text-xs text-gray-500">{day.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <PillIcon size={14} className="text-gray-400 mr-2" />
                            <span className="text-sm">Amlodipine 10mg</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <PillIcon size={14} className="text-gray-400 mr-2" />
                            <span className="text-sm">Lisinopril 20mg</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700 flex items-center">
              <Info size={18} className="mr-2" />
              Informasi Penting
            </h3>
            <ul className="mt-2 text-sm text-blue-600 space-y-1 ml-6 list-disc">
              <li>Minumlah obat pada waktu yang sama setiap hari</li>
              <li>Jangan menghentikan pengobatan tanpa berkonsultasi dengan dokter</li>
              <li>Jika Anda lupa minum obat, minum segera saat Anda ingat</li>
              <li>Jika hampir waktunya untuk dosis berikutnya, lewati dosis yang terlewat</li>
            </ul>
          </div>
        </motion.div>
      )}
      
      {/* History Tab */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="card overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="section-title">Riwayat Pengobatan</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Obat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosis
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waktu
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 Juli 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amlodipine</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10mg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pagi</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Diminum
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 Juli 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lisinopril</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20mg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Malam</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Diminum
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14 Juli 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amlodipine</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10mg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pagi</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Diminum
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14 Juli 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lisinopril</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20mg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Malam</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle size={12} className="mr-1" />
                      Terlewat
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13 Juli 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amlodipine</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10mg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pagi</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Diminum
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PatientMedication;