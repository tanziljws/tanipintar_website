import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminMapPage = () => {
    const [farmers, setFarmers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFarmers();
    }, []);

    const fetchFarmers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/admin/farmers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFarmers(data);
            } else {
                throw new Error('Failed to fetch farmers data');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Farmers Distribution Management</h2>
                    <Link
                        to="/admin/map/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Farmer
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {farmers.map((farmer) => (
                            <div
                                key={farmer.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-150 ease-in-out"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {farmer.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">{farmer.district}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            farmer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {farmer.status}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Commodity:</span> {farmer.commodity_name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Type:</span> {farmer.commodity_type}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Contact:</span> {farmer.contact}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Location:</span> {farmer.location}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/admin/map/edit/${farmer.id}`}
                                            className="inline-flex items-center px-3 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition duration-150 ease-in-out"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <div className="text-xs text-gray-500">
                                            <div>Lat: {farmer.latitude}</div>
                                            <div>Long: {farmer.longitude}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMapPage;
