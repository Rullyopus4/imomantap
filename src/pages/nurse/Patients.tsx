import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, HeartPulse, Clock, PillIcon } from 'lucide-react';
import { patientsMockData } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const NursePatients: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientsMockData)[0] | null>(null);
  const [reminderMessage, setReminderMessage] = useState('');
  
  // Filter patients assigned to this nurse
  const myPatients = patientsMockData.filter(
    patient => patient.assignedNurse === user?.name
  );
  
  // Further filter based on search query
  const filteredPatients = myPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handlePatientSelect = (patient: (typeof patientsMockData)[0]) => {
    setSelectedPatient(patient);
    setReminderMessage(''); // Clear any previous message
  };
  
  const handleSendReminder = () => {
    if (!reminderMessage.trim()) {
      toast.error('Pesan pengingat tidak boleh kosong');
      return;
    }
    
    toast.success(`Pengingat berhasil dikirim ke ${selectedPatient?.name}`);
    setReminderMessage('');
  };

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Daftar Pasien</h1>
      </header>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Cari pasien..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Patients List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-1/2"
        >
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="section-title">Pasien Saya</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div 
                  key={patient.id} 
                  className={`p-6 hover:bg-gray-50 cursor-pointer ${
                    selectedPatient?.id === patient.id ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {patient.age} tahun • {patient.gender}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.medicationAdherence >= 90 ? 'bg-green-100 text-green-800' :
                        patient.medicationAdherence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {patient.medicationAdherence}% Kepatuhan
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        TD: {patient.bloodPressure}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPatients.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  Tidak ada pasien yang ditemukan
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Patient Detail */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          {selectedPatient ? (
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="section-title">{selectedPatient.name}</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <HeartPulse size={20} className="text-red-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Tekanan Darah</span>
                    </div>
                    <p className="text-xl font-semibold">{selectedPatient.bloodPressure}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock size={20} className="text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Terakhir Periksa</span>
                    </div>
                    <p className="text-xl font-semibold">{selectedPatient.lastCheckup}</p>
                  </div>
                </div>
                
                {/* Medications */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Obat yang Diminum</h3>
                  <div className="space-y-4">
                    {selectedPatient.medications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-primary-100 rounded-md mr-3">
                            <PillIcon size={16} className="text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium">{medication.name}</p>
                            <p className="text-sm text-gray-500">{medication.dosage} • {medication.schedule}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          medication.status === 'taken' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {medication.status === 'taken' ? 'Diminum' : 'Terlewat'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reminder Form */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Kirim Pengingat</h3>
                  <div className="space-y-4">
                    <textarea
                      className="input min-h-24"
                      placeholder="Tulis pesan pengingat di sini..."
                      value={reminderMessage}
                      onChange={(e) => setReminderMessage(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button 
                        className="btn btn-primary flex items-center"
                        onClick={handleSendReminder}
                      >
                        <Send size={16} className="mr-2" />
                        Kirim Pengingat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Pilih Pasien</h3>
              <p className="text-sm text-gray-500">
                Silakan pilih pasien dari daftar untuk melihat detail
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NursePatients;