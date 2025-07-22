import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMapMarker = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        district: '',
        location: '',
        latitude: '',
        longitude: '',
        commodity_type: '',
        commodity_name: '',
        status: 'active',
        category: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/admin/farmers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add farmer data');
            }

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-6">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Farmer Location</h2>
                    
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Farmer Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    required
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                District
                            </label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                required
                                value={formData.district}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Detailed Address
                            </label>
                            <textarea
                                id="location"
                                name="location"
                                required
                                rows={3}
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    id="latitude"
                                    name="latitude"
                                    required
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    id="longitude"
                                    name="longitude"
                                    required
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="commodity_type" className="block text-sm font-medium text-gray-700">
                                    Commodity Type
                                </label>
                                <select
                                    id="commodity_type"
                                    name="commodity_type"
                                    required
                                    value={formData.commodity_type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Select type</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="grains">Grains</option>
                                    <option value="livestock">Livestock</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="commodity_name" className="block text-sm font-medium text-gray-700">
                                    Commodity Name
                                </label>
                                <input
                                    type="text"
                                    id="commodity_name"
                                    name="commodity_name"
                                    required
                                    value={formData.commodity_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="">Select category</option>
                                <option value="small">Small Scale</option>
                                <option value="medium">Medium Scale</option>
                                <option value="large">Large Scale</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/dashboard')}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Saving...' : 'Save Farmer Data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMapMarker;
