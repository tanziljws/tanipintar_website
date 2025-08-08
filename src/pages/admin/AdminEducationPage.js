import React, { useState, useEffect } from 'react';

const AdminEducationPage = () => {
    const [educationContent, setEducationContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: '',
        category: 'farming',
        author: '',
        read_time: '',
        featured: false,
        is_video: false
    });

    useEffect(() => {
        fetchEducationContent();
    }, []);

    const fetchEducationContent = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/education', {
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

    const handleCreateContent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/education', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create content');
            }

            await fetchEducationContent();
            setShowModal(false);
            setFormData({
                title: '',
                content: '',
                image_url: '',
                category: 'farming',
                author: '',
                read_time: '',
                featured: false,
                is_video: false
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateContent = async (e) => {
        e.preventDefault();
        try {
            // Make sure we have the ID
            if (!selectedContent?.id) {
                throw new Error('No content ID found');
            }

            const response = await fetch(`http://localhost:3001/api/education/${selectedContent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    image_url: formData.image_url,
                    category: formData.category,
                    author: formData.author,
                    read_time: formData.read_time,
                    featured: formData.featured,
                    is_video: formData.is_video
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update content');
            }

            await fetchEducationContent();
            setShowModal(false);
            setSelectedContent(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteContent = async (id) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/education/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete content');
                }

                await fetchEducationContent();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Education Content Management</h2>
                    <button
                        onClick={() => {
                            setSelectedContent(null);
                            setFormData({
                                title: '',
                                content: '',
                                image_url: '',
                                category: 'farming',
                                author: '',
                                read_time: '',
                                featured: false,
                                is_video: false
                            });
                            setShowModal(true);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Content
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                        {error}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {educationContent.map((content) => (
                            <div key={content.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={content.image_url || content.image}
                                    alt={content.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{content.content || content.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{content.category}</span>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedContent(content);
                                                    setFormData({
                                                        title: content.title,
                                                        content: content.content || content.description,
                                                        image_url: content.image_url || content.image,
                                                        category: content.category,
                                                        author: content.author,
                                                        read_time: content.read_time || content.readTime,
                                                        featured: content.featured || false,
                                                        is_video: content.is_video || content.isVideo || false
                                                    });
                                                    setShowModal(true);
                                                }}
                                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteContent(content.id)}
                                                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto py-10">
                        <div className="bg-white rounded-lg p-8 w-full max-w-3xl mx-4 my-auto">
                            <h2 className="text-xl font-bold mb-6">
                                {selectedContent ? 'Edit Content' : 'Add New Content'}
                            </h2>
                            <form onSubmit={selectedContent ? handleUpdateContent : handleCreateContent}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 h-40"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                        <input
                                            type="url"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                                        >
                                            <option value="Teknik Bertani">Teknik Bertani</option>
                                            <option value="Pertanian Berkelanjutan">Pertanian Berkelanjutan</option>
                                            <option value="Wawasan Pasar">Wawasan Pasar</option>
                                            <option value="Video Tutorial">Video Tutorial</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                                        <input
                                            type="text"
                                            value={formData.read_time}
                                            onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                            placeholder="e.g., 5 menit"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={formData.featured}
                                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <span>Featured</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_video}
                                                onChange={(e) => setFormData({ ...formData, is_video: e.target.checked })}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <span>Is Video</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        {selectedContent ? 'Update Content' : 'Add Content'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEducationPage;
