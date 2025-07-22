import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminEducationPage = () => {
    const [educationContent, setEducationContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEducationContent();
    }, []);

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
            } else {
                throw new Error('Failed to fetch education content');
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
                    <h2 className="text-2xl font-semibold text-gray-800">Education Content Management</h2>
                    <Link
                        to="/admin/education/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Content
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
                                            Edit
                                        </Link>
                                        <span className="text-sm text-gray-500">Category: {content.category}</span>
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

export default AdminEducationPage;
