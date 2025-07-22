import React, { useState, useEffect, useRef } from 'react';

const Education = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-animation');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) observer.observe(headerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);
  
  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Educational content data
  const educationalContent = [
    {
      id: 1,
      title: 'Teknik Menanam Padi yang Efisien',
      category: 'farming',
      description: 'Panduan lengkap tentang teknik menanam padi yang efisien untuk meningkatkan hasil panen hingga 30%.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
      date: '2025-04-15',
      author: 'Dr. Budi Santoso',
      readTime: '8 menit',
      featured: true
    },
    {
      id: 2,
      title: 'Pertanian Organik: Langkah Demi Langkah',
      category: 'sustainable',
      description: 'Panduan praktis untuk memulai dan mengelola pertanian organik yang berkelanjutan dan ramah lingkungan.',
      image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-04-10',
      author: 'Ani Wijaya, M.Sc',
      readTime: '12 menit',
      featured: true
    },
    {
      id: 3,
      title: 'Analisis Pasar Komoditas Pangan 2025',
      category: 'market',
      description: 'Laporan mendalam tentang tren pasar komoditas pangan di Indonesia dan peluang ekspor untuk petani lokal.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-04-05',
      author: 'Tim Riset TaniPintar',
      readTime: '15 menit',
      featured: false
    },
    {
      id: 4,
      title: 'Cara Menggunakan Sistem Irigasi Tetes',
      category: 'video',
      description: 'Video tutorial tentang cara memasang dan mengoptimalkan sistem irigasi tetes untuk menghemat air.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-03-28',
      author: 'Ir. Dedi Kurniawan',
      readTime: '10 menit video',
      featured: false,
      isVideo: true
    },
    {
      id: 5,
      title: 'Pengendalian Hama Terpadu pada Tanaman Cabai',
      category: 'farming',
      description: 'Strategi efektif untuk mengendalikan hama pada tanaman cabai tanpa mengandalkan pestisida kimia berlebihan.',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-03-22',
      author: 'Dr. Siti Rahayu',
      readTime: '9 menit',
      featured: false
    },
    {
      id: 6,
      title: 'Konservasi Air dalam Pertanian Kering',
      category: 'sustainable',
      description: 'Teknik konservasi air untuk pertanian di daerah dengan curah hujan rendah dan akses air terbatas.',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-03-18',
      author: 'Joko Widodo, M.Sc',
      readTime: '7 menit',
      featured: false
    },
    {
      id: 7,
      title: 'Peluang Ekspor Buah Tropis Indonesia',
      category: 'market',
      description: 'Analisis peluang pasar ekspor untuk buah-buahan tropis Indonesia ke negara-negara Asia Timur dan Eropa.',
      image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-03-12',
      author: 'Tim Riset TaniPintar',
      readTime: '11 menit',
      featured: false
    },
    {
      id: 8,
      title: 'Cara Membuat Pupuk Kompos dari Limbah Pertanian',
      category: 'video',
      description: 'Video tutorial langkah demi langkah untuk mengubah limbah pertanian menjadi pupuk kompos berkualitas tinggi.',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      date: '2025-03-05',
      author: 'Ir. Bambang Sutrisno',
      readTime: '15 menit video',
      featured: false,
      isVideo: true
    }
  ];
  
  // Filter content based on category and search query
  const filteredContent = educationalContent.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Category data
  const categories = [
    { id: 'all', name: 'Semua', icon: '📚' },
    { id: 'farming', name: 'Teknik Bertani', icon: '🌾' },
    { id: 'sustainable', name: 'Pertanian Berkelanjutan', icon: '♻️' },
    { id: 'market', name: 'Wawasan Pasar', icon: '📊' },
    { id: 'video', name: 'Video Tutorial', icon: '🎬' }
  ];
  
  // Featured content
  const featuredContent = educationalContent.filter(item => item.featured);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12" ref={headerRef}>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl relative inline-block">
            <span className="relative z-10 text-gradient">Pusat Edukasi</span>
            <span className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 bg-green-200 opacity-50 rounded-lg transform -rotate-1"></span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Tingkatkan pengetahuan dan keterampilan pertanian Anda dengan berbagai sumber daya edukatif dari para ahli.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari artikel, video, atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 flex items-center ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Featured Content Section (only show if on 'all' tab) */}
        {activeCategory === 'all' && (
          <div className="mb-12" ref={contentRef}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artikel Pilihan</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredContent.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary bg-opacity-70 rounded-full p-4 shadow-lg">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full">
                        {categories.find(cat => cat.id === item.category).name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span>{item.date}</span> • <span>{item.readTime}</span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300">
                        Baca Selengkapnya
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Content Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' 
              ? 'Semua Konten' 
              : `${categories.find(cat => cat.id === activeCategory).name}`}
            {searchQuery && ` - Hasil pencarian untuk "${searchQuery}"`}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada konten ditemukan</h3>
              <p className="mt-2 text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredContent.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary bg-opacity-70 rounded-full p-3 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full">
                        {categories.find(cat => cat.id === item.category).name}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <span>{item.date}</span> • <span>{item.readTime}</span>
                      </div>
                      <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300">
                        Baca
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        

      </div>
    </div>
  );
};

export default Education;
