import React from 'react';

const Gallery = () => {
    const galleryItems = [
        {
            id: 1,
            title: 'Implementasi TaniPintar',
            description: 'Pemasangan sensor IoT TaniPintar untuk monitoring lahan pertanian',
            imageUrl: '/assets/iot/satu.jpg'
        },
        {
            id: 2,
            title: 'Perangkat TaniPintar di Lapangan',
            description: 'Penerapan teknologi IoT TaniPintar pada area perkebunan',
            imageUrl: '/assets/iot/tiga.jpg'
        },
        {
            id: 3,
            title: 'Perangkat TaniPintar di Lapangan',
            description: 'Penerapan teknologi IoT TaniPintar pada area pertanian',
            imageUrl: '/assets/iot/dua.jpg'
        }
    ];

    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl relative inline-block">
                        <span className="relative z-10 text-gradient">Pusat Galeri</span>
                        <span className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 bg-green-200 opacity-50 rounded-lg transform -rotate-1"></span>
                    </h1>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                        Contoh dokumentasi pemasangan dan implementasi TaniPintar di berbagai lokasi pertanian.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
