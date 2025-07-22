import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="fixed w-full z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/admin/dashboard" className="flex items-center group">
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="ml-2 text-xl font-bold text-green-600 transition-colors duration-300 group-hover:text-green-700">
                                    Admin Panel
                                </span>
                            </Link>

                            <div className="hidden md:flex md:items-center md:ml-10 md:space-x-4">
                                <Link 
                                    to="/admin/dashboard" 
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        location.pathname === '/admin/dashboard' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    to="/admin/education" 
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        location.pathname === '/admin/education' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                >
                                    Education
                                </Link>
                                <Link 
                                    to="/admin/map" 
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        location.pathname === '/admin/map' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                >
                                    Map
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center mr-2">
                                <span className="text-sm font-medium text-gray-600">Welcome, Admin</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 shadow-lg hover:shadow-red-500/50 transition-all duration-200 ease-in-out relative"
                            >
                                <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/0 transition-colors duration-200"></div>
                                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                <span className="sr-only">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="pt-16">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
