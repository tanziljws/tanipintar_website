import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Contact from './pages/Contact';
import Education from './pages/Education';
import Gallery from './pages/Gallery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddEducationContent from './pages/AddEducationContent';
import AddMapMarker from './pages/AddMapMarker';
import AdminEducationPage from './pages/admin/AdminEducationPage';
import AdminMapPage from './pages/admin/AdminMapPage';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peta" element={<MapPage />} />
            <Route path="/edukasi" element={<Education />} />
            <Route path="/galeri" element={<Gallery />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/education"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminEducationPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/map"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminMapPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/education/new"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddEducationContent />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/map/new"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddMapMarker />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
