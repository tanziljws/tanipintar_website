import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('terbaru');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodityType, setSelectedCommodityType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(true);
  const [farmers, setFarmers] = useState([]);
  const [districtDistribution, setDistrictDistribution] = useState([]);
  const [error, setError] = useState(null);
  
  // Fetch farmers data from API
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/farmers');
        if (!response.ok) {
          throw new Error('Failed to fetch farmers data');
        }
        const data = await response.json();
        setFarmers(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching farmers:', err);
        setError('Failed to load farmers data. Using fallback data.');
        // Fallback to sample data if API fails
        setFarmers([

    {
      id: 1,
      name: 'Budi Santoso',
      position: [-6.2088, 106.8456], // Jakarta
      commodity: 'padi',
      commodityName: 'Padi Ciherang',
      location: 'Jakarta Selatan, DKI Jakarta',
      district: 'Jakarta Selatan',
      status: 'Siap Panen',
      contact: '08123456789',
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Organik'
    },
    {
      id: 2,
      name: 'Ani Wijaya',
      position: [-6.9932, 110.4203], // Semarang
      commodity: 'jagung',
      commodityName: 'Jagung Manis',
      location: 'Semarang, Jawa Tengah',
      district: 'Semarang',
      status: 'Masa Tanam',
      contact: '08234567890',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Non-Organik'
    },
    {
      id: 3,
      name: 'Dedi Kurniawan',
      position: [-7.7971, 110.3688], // Yogyakarta
      commodity: 'sayur',
      commodityName: 'Bayam Hijau',
      location: 'Sleman, DI Yogyakarta',
      district: 'Sleman',
      status: 'Siap Panen',
      contact: '08345678901',
      image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Organik'
    },
    {
      id: 4,
      name: 'Siti Rahayu',
      position: [-6.9147, 107.6098], // Bandung
      commodity: 'buah',
      commodityName: 'Mangga Harum Manis',
      location: 'Bandung, Jawa Barat',
      district: 'Bandung',
      status: 'Perawatan',
      contact: '08456789012',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Non-Organik'
    },
    {
      id: 5,
      name: 'Joko Widodo',
      position: [-7.2575, 112.7521], // Surabaya
      commodity: 'padi',
      commodityName: 'Padi IR64',
      location: 'Surabaya, Jawa Timur',
      district: 'Surabaya',
      status: 'Siap Panen',
      contact: '08567890123',
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'Organik'
    },
        ]);
        setIsLoading(false);
      }
    };

    const fetchDistrictDistribution = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/farmers/distribution');
        if (!response.ok) {
          throw new Error('Failed to fetch district distribution data');
        }
        const data = await response.json();
        setDistrictDistribution(data);
      } catch (err) {
        console.error('Error fetching district distribution:', err);
        // We'll calculate from farmers data as fallback
      }
    };

    fetchFarmers();
    fetchDistrictDistribution();
  }, []);

  // Get unique districts
  const districts = [...new Set(farmers.map(f => f.district))];
  
  // Get unique commodity types
  const commodityTypes = [...new Set(farmers.map(f => f.commodity))];
  
  // Get unique categories
  const categories = [...new Set(farmers.map(f => f.category))];

  // Apply filters
  let filteredFarmers = farmers;
  
  if (activeFilter !== 'all') {
    filteredFarmers = filteredFarmers.filter(farmer => farmer.commodity === activeFilter);
  }
  
  if (selectedDistrict) {
    filteredFarmers = filteredFarmers.filter(farmer => farmer.district === selectedDistrict);
  }
  
  if (selectedCommodityType) {
    filteredFarmers = filteredFarmers.filter(farmer => farmer.commodity === selectedCommodityType);
  }
  
  if (selectedCategories.length > 0) {
    filteredFarmers = filteredFarmers.filter(farmer => selectedCategories.includes(farmer.category));
  }
  
  // Apply sorting
  if (sortOption === 'name-asc') {
    filteredFarmers = [...filteredFarmers].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    filteredFarmers = [...filteredFarmers].sort((a, b) => b.name.localeCompare(a.name));
  }

  // Count farmers by commodity
  const farmerCounts = {
    all: farmers.length,
    padi: farmers.filter(f => f.commodity === 'padi').length,
    jagung: farmers.filter(f => f.commodity === 'jagung').length,
    sayur: farmers.filter(f => f.commodity === 'sayur').length,
    buah: farmers.filter(f => f.commodity === 'buah').length,
  };
  
  // Prepare district data for chart - use API data if available, otherwise calculate from farmers data
  const districtCounts = {};
  
  if (districtDistribution.length > 0) {
    // Use data from API
    districtDistribution.forEach(item => {
      districtCounts[item.district] = parseInt(item.count);
    });
  } else {
    // Calculate from farmers data as fallback
    districts.forEach(district => {
      districtCounts[district] = farmers.filter(f => f.district === district).length;
    });
  }
  
  // Prepare data for the district distribution chart
  const districtChartData = {
    labels: Object.keys(districtCounts),
    datasets: [
      {
        label: 'Jumlah Petani',
        data: Object.values(districtCounts),
        backgroundColor: 'rgba(21, 128, 61, 0.8)',
        borderColor: 'rgba(21, 128, 61, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sebaran Petani Per-Kabupaten/Kota',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };
  
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const resetFilters = () => {
    setActiveFilter('all');
    setSortOption('default');
    setSelectedDistrict('');
    setSelectedCommodityType('');
    setSelectedCategories([]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Peta Sebaran
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Filter Section */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Filter</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Urutkan</label>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  >
                    <option value="terbaru">Urutan Terbaru</option>
                    <option value="name-asc">Nama (A-Z)</option>
                    <option value="name-desc">Nama (Z-A)</option>
                    <option value="terdekat">Terdekat</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dinas Teknis / Kecamatan</label>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  >
                    <option value="">Semua Kecamatan</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Komoditas</label>
                <div className="relative">
                  <select
                    value={selectedCommodityType}
                    onChange={(e) => setSelectedCommodityType(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  >
                    <option value="">Semua Jenis</option>
                    {commodityTypes.map((type, index) => (
                      <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      id={`category-${index}`}
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${index}`} className="ml-2 block text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200"
                >
                  Reset
                </button>
                <button
                  onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 500); }}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </div>
          
          {/* Map, Chart and Gallery Section */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Peta</h2>
                <button 
                  onClick={() => setShowGallery(!showGallery)}
                  className="bg-primary text-white hover:bg-primary-dark text-sm font-medium flex items-center px-3 py-1 rounded-md transition-colors duration-300"
                >
                  {showGallery ? 'Sembunyikan Galeri' : 'Tampilkan Galeri'}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showGallery ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                  </svg>
                </button>
              </div>
              
              {/* Map Container */}
              <div className="h-[300px] sm:h-[350px] md:h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden relative mb-4 sm:mb-6">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <MapContainer 
                    center={[-2.5489, 118.0149]} // Center of Indonesia
                    zoom={5}
                    maxBounds={[[-11.0, 95.0], [6.0, 141.0]]} // Restrict to Indonesia's bounds 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredFarmers.map((farmer) => (
                      <Marker key={farmer.id} position={farmer.position}>
                        <Popup>
                          <div className="p-2 w-64">
                            <h3 className="font-bold text-lg">{farmer.name}</h3>
                            <p className="text-sm text-gray-600">{farmer.location}</p>
                            <div className="mt-2">
                              <p className="flex items-center"><span className="mr-1">🌾</span> <span className="font-semibold">Komoditas:</span> {farmer.commodityName}</p>
                              <p className="flex items-center"><span className="mr-1">📦</span> <span className="font-semibold">Status:</span> {farmer.status}</p>
                              <p className="flex items-center"><span className="mr-1">📞</span> <span className="font-semibold">Kontak:</span> {farmer.contact}</p>
                            </div>
                            <button className="mt-3 w-full bg-primary text-white py-1 px-3 rounded-md text-sm hover:bg-primary-dark transition-colors duration-300">
                              Hubungi Petani
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
              
              {/* Farmer Distribution Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Infografis Data</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="h-[350px] w-full">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <Bar data={districtChartData} options={chartOptions} />
                  )}
                </div>
              </div>
              
              {/* Gallery Section */}
              {showGallery && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Galeri Komoditas</h2>
                    <div className="flex items-center">
                      {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary mr-2"></div>}
                      <p className="text-sm text-gray-500 bg-green-50 px-2 py-1 rounded-md">Menampilkan {filteredFarmers.length} dari {farmers.length} komoditas</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredFarmers.map((farmer) => (
                      <div key={farmer.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="h-48 w-full overflow-hidden">
                          <img 
                            src={farmer.image} 
                            alt={farmer.commodityName} 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1 flex items-center"><span className="mr-2">🌾</span>{farmer.commodityName}</h3>
                          <p className="text-sm text-gray-600 mb-2 flex items-center"><span className="mr-2">👨‍🌾</span>Asal Petani: {farmer.name}</p>
                          <p className="text-sm text-gray-600 mb-2">Luas lahan: 2.5 ha</p>
                          <p className="text-sm text-gray-600 mb-2">Estimasi hasil: 5 ton</p>
                          <div className="border-t border-gray-100 pt-2 mt-2">
                            <p className="text-sm font-medium flex items-center"><span className="mr-2">📦</span>Status: <span className="text-primary ml-1">{farmer.status}</span></p>
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
    </div>
  );
};

export default MapPage;
