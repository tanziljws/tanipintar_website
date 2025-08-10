import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }

    // Start animation from 0
    setCount(0);
    
    const startTime = Date.now();
    const endValue = numericValue;
    
    animationRef.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = endValue * easeOutQuart;
      
      setCount(Number(currentValue.toFixed(decimals)));
      
      if (progress >= 1) {
        setCount(endValue);
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    }, 16); // ~60fps

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [value, duration, decimals]);

  return <span>{count}</span>;
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [organicFilter, setOrganicFilter] = useState('all');
  const [harvestPeriod, setHarvestPeriod] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [viewMode, setViewMode] = useState('map'); // 'map', 'table', 'analytics'
  
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
            province: 'DKI Jakarta',
      status: 'Siap Panen',
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Organik',
            harvestDate: '2025-07-12',
            estYieldTon: 18.4,
            landArea: 2.5,
            organic: true
    },
    {
      id: 2,
      name: 'Ani Wijaya',
      position: [-6.9932, 110.4203], // Semarang
      commodity: 'jagung',
      commodityName: 'Jagung Manis',
      location: 'Semarang, Jawa Tengah',
      district: 'Semarang',
            province: 'Jawa Tengah',
      status: 'Masa Tanam',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Non-Organik',
            harvestDate: '2025-06-28',
            estYieldTon: 9.2,
            landArea: 1.8,
            organic: false
    },
    {
      id: 3,
      name: 'Dedi Kurniawan',
      position: [-7.7971, 110.3688], // Yogyakarta
      commodity: 'sayur',
      commodityName: 'Bayam Hijau',
      location: 'Sleman, DI Yogyakarta',
      district: 'Sleman',
            province: 'DI Yogyakarta',
      status: 'Siap Panen',
      image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Organik',
            harvestDate: '2025-07-03',
            estYieldTon: 4.1,
            landArea: 0.8,
            organic: true
    },
    {
      id: 4,
      name: 'Siti Rahayu',
      position: [-6.9147, 107.6098], // Bandung
      commodity: 'buah',
      commodityName: 'Mangga Harum Manis',
      location: 'Bandung, Jawa Barat',
      district: 'Bandung',
            province: 'Jawa Barat',
      status: 'Perawatan',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Non-Organik',
            harvestDate: '2025-08-01',
            estYieldTon: 6.7,
            landArea: 1.2,
            organic: false
    },
    {
      id: 5,
      name: 'Joko Widodo',
      position: [-7.2575, 112.7521], // Surabaya
      commodity: 'padi',
      commodityName: 'Padi IR64',
      location: 'Surabaya, Jawa Timur',
      district: 'Surabaya',
            province: 'Jawa Timur',
      status: 'Siap Panen',
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'Organik',
            harvestDate: '2025-05-18',
            estYieldTon: 14.3,
            landArea: 3.0,
            organic: true
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

  // Get unique districts, provinces, commodity types, and categories
  const districts = [...new Set(farmers.map(f => f.district))];
  const provinces = [...new Set(farmers.map(f => f.province))];
  const commodityTypes = [...new Set(farmers.map(f => f.commodity))];
  const categories = [...new Set(farmers.map(f => f.category))];

  // Apply filters
  let filteredFarmers = farmers;
  
  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredFarmers = filteredFarmers.filter(farmer => 
      farmer.name.toLowerCase().includes(query) ||
      farmer.commodityName.toLowerCase().includes(query) ||
      farmer.province.toLowerCase().includes(query) ||
      farmer.district.toLowerCase().includes(query)
    );
  }
  
  // Province filter
  if (selectedProvince !== 'all') {
    filteredFarmers = filteredFarmers.filter(farmer => farmer.province === selectedProvince);
  }
  
  // Commodity type filter
  if (selectedCommodityType) {
    filteredFarmers = filteredFarmers.filter(farmer => farmer.commodity === selectedCommodityType);
  }
  
  // Category filter
  if (selectedCategories.length > 0) {
    filteredFarmers = filteredFarmers.filter(farmer => selectedCategories.includes(farmer.category));
  }
  
  // Organic filter
  if (organicFilter !== 'all') {
    const isOrganic = organicFilter === 'organic';
    filteredFarmers = filteredFarmers.filter(farmer => farmer.organic === isOrganic);
  }
  
  // Apply sorting
  if (sortOption === 'name-asc') {
    filteredFarmers = [...filteredFarmers].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    filteredFarmers = [...filteredFarmers].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'harvest-date') {
    filteredFarmers = [...filteredFarmers].sort((a, b) => new Date(a.harvestDate) - new Date(b.harvestDate));
  }

  // Calculate KPIs
  const kpi = {
    totalTon: Number(filteredFarmers.reduce((acc, f) => acc + (f.estYieldTon || 0), 0).toFixed(1)),
    organicShare: filteredFarmers.length === 0 ? 0 : Math.round((filteredFarmers.filter(f => f.organic).length / filteredFarmers.length) * 100),
    provinces: new Set(filteredFarmers.map(f => f.province)).size,
    totalFarmers: filteredFarmers.length,
    avgYield: filteredFarmers.length === 0 ? 0 : Number((filteredFarmers.reduce((acc, f) => acc + (f.estYieldTon || 0), 0) / filteredFarmers.length).toFixed(1)),
    totalLandArea: Number(filteredFarmers.reduce((acc, f) => acc + (f.landArea || 0), 0).toFixed(1)),
    avgLandArea: filteredFarmers.length === 0 ? 0 : Number((filteredFarmers.reduce((acc, f) => acc + (f.landArea || 0), 0) / filteredFarmers.length).toFixed(1))
  };

  // Calculate monthly harvest data
  const monthlyData = useMemo(() => {
    const buckets = new Map();
    for (const farmer of filteredFarmers) {
      if (farmer.harvestDate) {
        const date = new Date(farmer.harvestDate);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        buckets.set(key, (buckets.get(key) || 0) + (farmer.estYieldTon || 0));
      }
    }
    const sorted = Array.from(buckets.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, ton]) => ({ month, ton: Number(ton.toFixed(1)) }));
    return sorted.length ? sorted : [{ month: "—", ton: 0 }];
  }, [filteredFarmers]);

  // Calculate trend analysis
  const trendAnalysis = useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) {
      return {
        monthlyTrends: [],
        averageTrend: '0.0',
        isGrowing: false
      };
    }

    const monthlyTrends = monthlyData.map((item, index) => ({
      month: item.month,
      ton: item.ton,
      trend: index > 0 && monthlyData[index - 1].ton > 0 
        ? ((item.ton - monthlyData[index - 1].ton) / monthlyData[index - 1].ton * 100).toFixed(1) 
        : 0
    }));
    
    const avgTrend = monthlyTrends.length > 1 
      ? monthlyTrends.slice(1).reduce((acc, item) => acc + parseFloat(item.trend || 0), 0) / (monthlyTrends.length - 1)
      : 0;
    
    return {
      monthlyTrends,
      averageTrend: avgTrend.toFixed(1),
      isGrowing: avgTrend > 0
    };
  }, [monthlyData]);

  // Calculate commodity performance
  const commodityPerformance = useMemo(() => {
    const performance = commodityTypes.map(type => {
      const typeFarmers = filteredFarmers.filter(f => f.commodity === type);
      const totalYield = typeFarmers.reduce((acc, f) => acc + (f.estYieldTon || 0), 0);
      const avgYield = typeFarmers.length > 0 ? totalYield / typeFarmers.length : 0;
      const organicCount = typeFarmers.filter(f => f.organic).length;
      
      return {
        type,
        count: typeFarmers.length,
        totalYield: Number(totalYield.toFixed(1)),
        avgYield: Number(avgYield.toFixed(1)),
        organicPercentage: typeFarmers.length > 0 ? Math.round((organicCount / typeFarmers.length) * 100) : 0
      };
    });
    
    return performance.sort((a, b) => b.totalYield - a.totalYield);
  }, [filteredFarmers, commodityTypes]);

  // Prepare district data for chart
  const districtChartData = useMemo(() => {
  const districtCounts = {};
  
  if (districtDistribution.length > 0) {
    districtDistribution.forEach(item => {
      districtCounts[item.district] = parseInt(item.count);
    });
  } else {
    districts.forEach(district => {
        districtCounts[district] = filteredFarmers.filter(f => f.district === district).length;
    });
  }
  
    return {
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
  }, [districtDistribution, districts, filteredFarmers]);
  
  // Monthly harvest chart data
  const monthlyChartData = useMemo(() => ({
    labels: monthlyData.map(item => {
      if (item.month === "—") return item.month;
      const [year, month] = item.month.split('-');
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }),
    datasets: [
      {
        label: 'Estimasi Panen (ton)',
        data: monthlyData.map(item => item.ton),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }), [monthlyData]);
  
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

  const monthlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estimasi Panen per Bulan',
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
          precision: 1
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
    setSortOption('terbaru');
    setSelectedDistrict('');
    setSelectedCommodityType('');
    setSelectedCategories([]);
    setSearchQuery('');
    setSelectedProvince('all');
    setOrganicFilter('all');
    setHarvestPeriod('all');
  };

  // Export functionality
  const exportData = (format) => {
    const data = filteredFarmers.map(farmer => ({
      'Nama Petani': farmer.name,
      'Komoditas': farmer.commodityName,
      'Provinsi': farmer.province,
      'Kabupaten/Kota': farmer.district,
      'Status': farmer.status,
      'Kategori': farmer.category,
      'Estimasi Panen (ton)': farmer.estYieldTon,
      'Luas Lahan (ha)': farmer.landArea,
      'Tanggal Panen': new Date(farmer.harvestDate).toLocaleDateString('id-ID'),
      'Koordinat': `${farmer.position[0]}, ${farmer.position[1]}`
    }));

    if (format === 'csv') {
      const headers = Object.keys(data[0]).join(',');
      const csvContent = [headers, ...data.map(row => Object.values(row).join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `peta-sebaran-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `peta-sebaran-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
  };

  // Generate trend chart data
  const trendChartData = useMemo(() => ({
    labels: trendAnalysis.monthlyTrends.map(item => {
      if (item.month === "—") return item.month;
      const [year, month] = item.month.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }),
    datasets: [
      {
        label: 'Estimasi Panen (ton)',
        data: trendAnalysis.monthlyTrends.map(item => item.ton),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }), [trendAnalysis]);

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tren Estimasi Panen',
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
          precision: 1
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl relative inline-block">
            <span className="relative z-10 text-gradient">Peta Sebaran</span>
            <span className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 bg-green-200 opacity-50 rounded-lg transform -rotate-1"></span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Visualisasi sebaran petani dan komoditas pertanian di Indonesia dengan data real-time dan interaktif.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Estimasi Panen</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter key={`totalTon-${kpi.totalTon}`} value={kpi.totalTon} decimals={1} /> ton
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Proporsi Organik</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter key={`organicShare-${kpi.organicShare}`} value={kpi.organicShare} decimals={0} />%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sebaran Provinsi</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter key={`provinces-${kpi.provinces}`} value={kpi.provinces} decimals={0} />
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Petani</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter key={`totalFarmers-${kpi.totalFarmers}`} value={kpi.totalFarmers} decimals={0} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Luas Lahan</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter key={`totalLandArea-${kpi.totalLandArea}`} value={kpi.totalLandArea} decimals={1} /> ha
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rata-rata Panen</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter key={`avgYield-${kpi.avgYield}`} value={kpi.avgYield} decimals={1} /> ton
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tren Pertumbuhan</p>
                <p className={`text-2xl font-bold ${trendAnalysis.isGrowing ? 'text-green-600' : 'text-red-600'}`}>
                  <AnimatedCounter key={`trend-${trendAnalysis.averageTrend}`} value={parseFloat(trendAnalysis.averageTrend) || 0} decimals={1} />%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Enhanced Filter Section */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
                  <p className="xsm text-gray-500 mt-1">Sesuaikan pencarian</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  Pintar
                </span>
              </div>
              
              {/* Search */}
              <div className="mb-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari komoditas, provinsi, dll."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md transition-colors duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Province Filter */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md transition-colors duration-200"
                >
                  <option value="all">Semua Provinsi</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              
              {/* District Filter */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten/Kota</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md transition-colors duration-200"
                >
                  <option value="">Semua Kabupaten/Kota</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              
              {/* Commodity Type Filter */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Komoditas</label>
                <select
                  value={selectedCommodityType}
                  onChange={(e) => setSelectedCommodityType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md transition-colors duration-200"
                >
                  <option value="">Semua Jenis</option>
                  {commodityTypes.map((type, index) => (
                    <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              {/* Organic Filter */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Metode Budidaya</label>
                <div className="space-y-2">
                  <label className="relative flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="organic"
                      value="all"
                      checked={organicFilter === 'all'}
                      onChange={(e) => setOrganicFilter(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                      organicFilter === 'all' 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {organicFilter === 'all' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Semua</span>
                  </label>
                  <label className="relative flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="organic"
                      value="organic"
                      checked={organicFilter === 'organic'}
                      onChange={(e) => setOrganicFilter(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                      organicFilter === 'organic' 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {organicFilter === 'organic' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Organik</span>
                  </label>
                  <label className="relative flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="organic"
                      value="non-organic"
                      checked={organicFilter === 'non-organic'}
                      onChange={(e) => setOrganicFilter(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                      organicFilter === 'non-organic' 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {organicFilter === 'non-organic' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Non-Organik</span>
                  </label>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <label key={index} className="relative flex items-center cursor-pointer group">
                      <input
                        id={`category-${index}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                        selectedCategories.includes(category)
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 group-hover:border-green-400'
                      }`}>
                        {selectedCategories.includes(category) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md transition-colors duration-200"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="name-asc">Nama (A-Z)</option>
                  <option value="name-desc">Nama (Z-A)</option>
                  <option value="harvest-date">Tanggal Panen</option>
                </select>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 500); }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                  </svg>
                  Terapkan Filter
                </button>
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Reset Semua
                </button>
              </div>
            </div>
          </div>
          
          {/* Map, Chart and Gallery Section */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Peta Sebaran</h2>
                  <p className="text-sm text-gray-600">Marker menunjukkan lokasi komoditas yang lolos filter</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {filteredFarmers.length} titik
                  </span>
                  <button 
                    onClick={() => setShowGallery(!showGallery)}
                    className="bg-primary text-white hover:bg-primary-dark text-sm font-medium flex items-center px-3 py-1 rounded-md transition-colors duration-300"
                  >
                    {showGallery ? 'Sembunyikan Galeri' : 'Tampilkan Galeri'}
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showGallery ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                    </svg>
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowExportModal(!showExportModal)}
                      className="bg-gray-600 text-white hover:bg-gray-700 text-sm font-medium flex items-center px-3 py-1 rounded-md transition-colors duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Export
                    </button>
                    {showExportModal && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => { exportData('csv'); setShowExportModal(false); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Export ke CSV
                          </button>
                          <button
                            onClick={() => { exportData('json'); setShowExportModal(false); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Export ke JSON
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                          <div className="p-1 w-28 max-w-xs">
                            {/* Name & Status */}
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-xs text-gray-900 truncate">{farmer.name}</h3>
                              <span className={`px-1 py-0.5 text-xs font-medium rounded ${
                                farmer.organic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {farmer.organic ? 'O' : 'N'}
                              </span>
                            </div>

                            {/* Commodity */}
                            <div className="mb-1">
                              <h4 className="font-semibold text-xs text-gray-900 truncate">
                                {farmer.commodityName}
                              </h4>
                            </div>

                            {/* Key Data */}
                            <div className="grid grid-cols-2 gap-1 text-xs mb-1">
                              <div className="bg-blue-50 p-0.5 rounded">
                                <p className="text-blue-600 text-xs">Lahan</p>
                                <p className="font-medium text-blue-900">{farmer.landArea} ha</p>
                              </div>
                              <div className="bg-green-50 p-0.5 rounded">
                                <p className="text-green-600 text-xs">Panen</p>
                                <p className="font-medium text-green-900">{farmer.estYieldTon} t</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-0.5">
                              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-0.5 px-1 rounded text-xs font-medium transition-colors duration-200">
                                Hubungi
                              </button>
                              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-0.5 px-1 rounded text-xs font-medium transition-colors duration-200">
                                Detail
                              </button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
              
              {/* Charts Section - Collapsible */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Analisis & Grafik</h2>
                  <button 
                    onClick={() => setViewMode(viewMode === 'analytics' ? 'map' : 'analytics')}
                    className="bg-green-600 text-white hover:bg-green-700 text-sm font-medium flex items-center px-3 py-1 rounded-md transition-colors duration-300"
                  >
                    {viewMode === 'analytics' ? 'Sembunyikan Grafik' : 'Tampilkan Grafik'}
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={viewMode === 'analytics' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                    </svg>
                  </button>
                </div>
                
                {viewMode === 'analytics' && (
                  <div className="space-y-6">
                    {/* Farmer Distribution Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Infografis Data</h3>
                      <div className="h-[300px] w-full">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <Bar data={districtChartData} options={chartOptions} />
                  )}
                </div>
              </div>
              
                    {/* Monthly Harvest Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Estimasi Panen Per Bulan</h3>
                      <div className="h-[300px] w-full">
                        {isLoading ? (
                          <div className="h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                          </div>
                        ) : (
                          <Bar data={monthlyChartData} options={monthlyChartOptions} />
                        )}
                      </div>
                    </div>
                    
                    {/* Trend Analysis Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Analisis Tren Panen</h3>
                      <div className="h-[300px] w-full">
                        {isLoading ? (
                          <div className="h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                          </div>
                        ) : (
                          <Line data={trendChartData} options={trendChartOptions} />
                        )}
                      </div>
                    </div>
                    
                    {/* Commodity Performance Analysis */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Analisis Performa Komoditas</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komoditas</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Petani</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Panen (ton)</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rata-rata (ton)</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organik (%)</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {commodityPerformance.map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{item.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalYield}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.avgYield}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.organicPercentage}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Gallery Section - Professional Layout */}
              {showGallery && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mt-8">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Galeri Komoditas</h2>
                        <p className="text-gray-600 mt-1">Koleksi visual komoditas pertanian dari berbagai daerah</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isLoading && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-200 border-t-green-600"></div>
                            <span>Memuat...</span>
                          </div>
                        )}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">
                            {filteredFarmers.length} dari {farmers.length} komoditas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredFarmers.map((farmer) => (
                        <div key={farmer.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-200 transition-all duration-300 hover:transform hover:-translate-y-1 flex flex-col h-[360px]">
                          <div className="relative h-40 overflow-hidden">
                            <img 
                              src={farmer.image} 
                              alt={farmer.commodityName} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-3 left-3">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
                                farmer.organic ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                              }`}>
                                {farmer.organic ? 'Organik' : 'Non-Organik'}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm ${
                                farmer.status === 'Siap Panen' ? 'text-green-700' :
                                farmer.status === 'Masa Tanam' ? 'text-yellow-700' :
                                'text-blue-700'
                              }`}>
                                {farmer.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="mb-2">
                              <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors duration-300 line-clamp-1">
                                {farmer.commodityName}
                              </h3>
                              <p className="text-sm text-gray-600 font-medium line-clamp-1">{farmer.name}</p>
                            </div>
                            
                            <div className="space-y-2 mt-auto">
                              <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span className="truncate">{farmer.location}</span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                                <div className="text-center">
                                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Luas Lahan</p>
                                  <p className="text-base font-bold text-gray-900 mt-1">{farmer.landArea} ha</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Estimasi Panen</p>
                                  <p className="text-base font-bold text-green-600 mt-1">{farmer.estYieldTon} ton</p>
                                </div>
                              </div>
                              
                              <div className="pt-3 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500 truncate max-w-[60%]">
                                    {farmer.province}
                                  </span>
                                  <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 flex-shrink-0">
                                    Detail
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Empty State */}
                    {filteredFarmers.length === 0 && (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada komoditas ditemukan</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Coba ubah filter pencarian atau pilih kategori yang berbeda untuk melihat komoditas yang tersedia.
                        </p>
                        <button 
                          onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                          Reset Filter
                        </button>
                      </div>
                    )}
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
