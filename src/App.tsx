import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminReports from './pages/admin/Reports';
import NurseDashboard from './pages/nurse/Dashboard';
import NursePatients from './pages/nurse/Patients';
import PatientDashboard from './pages/patient/Dashboard';
import PatientMedication from './pages/patient/Medication';
import PatientArticles from './pages/patient/Articles';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import PublicLayout from './components/PublicLayout';
import { useAuth } from './contexts/AuthContext';
import ArticleDetail from './pages/shared/ArticleDetail';

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the document title based on location
    document.title = 'IMO MANTAP - Kepatuhan Minum Obat Hipertensi';
  }, [location]);

  // Helper function to create protected routes based on user role
  const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    if (!allowedRoles.includes(user.role)) {
      // Navigate to appropriate dashboard based on role
      const dashboardPath = 
        user.role === 'admin' ? '/admin' : 
        user.role === 'nurse' ? '/perawat' : 
        '/pasien';
        
      return <Navigate to={dashboardPath} replace />;
    }
    
    return children;
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={!user ? <Login /> : <Navigate to={
            user.role === 'admin' ? '/admin' : 
            user.role === 'nurse' ? '/perawat' : 
            '/pasien'
          } />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* Nurse routes */}
        <Route path="/perawat" element={
          <ProtectedRoute allowedRoles={['nurse']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<NurseDashboard />} />
          <Route path="patients" element={<NursePatients />} />
        </Route>

        {/* Patient routes */}
        <Route path="/pasien" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<PatientDashboard />} />
          <Route path="medication" element={<PatientMedication />} />
          <Route path="articles" element={<PatientArticles />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
        </Route>

        {/* Redirect from root to login or appropriate dashboard */}
        <Route path="/" element={
          !user ? <Navigate to="/login" replace /> : 
          <Navigate to={
            user.role === 'admin' ? '/admin' : 
            user.role === 'nurse' ? '/perawat' : 
            '/pasien'
          } replace />
        } />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;