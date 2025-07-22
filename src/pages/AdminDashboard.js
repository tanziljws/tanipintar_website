import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('education');
    const [educationContent, setEducationContent] = useState([]);
    const [mapMarkers, setMapMarkers] = useState([]);
    const navigate = useNavigate();

    const fetchEducationContent = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/admin/education', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEducationContent(data);
            }
        } catch (error) {
            console.error('Error fetching education content:', error);
        }
    };

    const fetchMapMarkers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/admin/map-markers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setMapMarkers(data);
            }
        } catch (error) {
            console.error('Error fetching map markers:', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'education') {
            fetchEducationContent();
        } else {
            fetchMapMarkers();
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-6">
                        <div className="bg-white rounded-lg shadow">
                            <nav className="flex">
                                <button
                                    className={`${
                                        activeTab === 'education'
                                            ? 'bg-green-50 border-green-500 text-green-700'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    } flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm rounded-tl-lg transition duration-150 ease-in-out flex items-center justify-center space-x-2`}
                                    onClick={() => setActiveTab('education')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                    </svg>
                                    <span>Education Content</span>
                                </button>
                                <button
                                    className={`${
                                        activeTab === 'map'
                                            ? 'bg-green-50 border-green-500 text-green-700'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    } flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm rounded-tr-lg transition duration-150 ease-in-out flex items-center justify-center space-x-2`}
                                    onClick={() => setActiveTab('map')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                    </svg>
                                    <span>Map Markers</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-4">
                        {activeTab === 'education' ? (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Education Content Management</h2>
                                    <Link
                                        to="/admin/education/new"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add New Education Content
                                    </Link>
                                </div>
                                <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {educationContent.map((content) => (
                                        <div
                                            key={content.id}
                                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-150 ease-in-out"
                                        >
                                            <div className="p-5">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {content.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {content.description || 'No description available'}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <Link
                                                        to={`/admin/education/edit/${content.id}`}
                                                        className="inline-flex items-center px-3 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition duration-150 ease-in-out"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                        Edit Content
                                                    </Link>
                                                    <span className="text-sm text-gray-500">ID: {content.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Map Markers Management</h2>
                                    <Link
                                        to="/admin/map/new"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add New Map Marker
                                    </Link>
                                </div>
                                <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {mapMarkers.map((marker) => (
                                        <div
                                            key={marker.id}
                                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-150 ease-in-out"
                                        >
                                            <div className="p-5">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            {marker.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-2">
                                                            Type: {marker.marker_type}
                                                        </p>
                                                        <p className="text-gray-500 text-sm mb-4">
                                                            Location: {marker.location || 'No location specified'}
                                                        </p>
                                                    </div>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <Link
                                                        to={`/admin/map/edit/${marker.id}`}
                                                        className="inline-flex items-center px-3 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition duration-150 ease-in-out"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                        Edit Marker
                                                    </Link>
                                                    <span className="text-sm text-gray-500">ID: {marker.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
