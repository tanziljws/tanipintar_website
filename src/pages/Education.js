import React, { useState, useEffect, useRef } from 'react';

const Education = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
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
    
    const headerElement = headerRef.current;
    const contentElement = contentRef.current;
    
    if (headerElement) observer.observe(headerElement);
    if (contentElement) observer.observe(contentElement);
    
    return () => {
      if (headerElement) observer.unobserve(headerElement);
      if (contentElement) observer.unobserve(contentElement);
    };
  }, []);
  
  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // State for education content
  const [educationalContent, setEducationalContent] = useState([]);

  // Fetch education content
  useEffect(() => {
    const fetchEducationContent = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/education');
        if (!response.ok) {
          throw new Error('Failed to fetch education content');
        }
        const data = await response.json();
        setEducationalContent(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchEducationContent();
  }, []);
  
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
    { id: 'all', name: 'Semua', color: 'bg-gray-500' },
    { id: 'farming', name: 'Teknik Bertani', color: 'bg-green-500' },
    { id: 'sustainable', name: 'Pertanian Berkelanjutan', color: 'bg-blue-500' },
    { id: 'market', name: 'Wawasan Pasar', color: 'bg-purple-500' },
    { id: 'video', name: 'Video Tutorial', color: 'bg-red-500' }
  ];
  
  // Featured content
  const featuredContent = educationalContent.filter(item => item.featured);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 lg:px-8">
        
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
        
        {/* Modern Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="Cari artikel, video, atau topik pertanian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-4 text-gray-700 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-300 group-hover:border-gray-300"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="w-6 h-6 text-gray-400 group-focus-within:text-green-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Featured Content Section */}
        {activeCategory === 'all' && featuredContent.length > 0 && (
          <div className="mb-12" ref={contentRef}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Artikel Pilihan</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {featuredContent.length} artikel
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredContent.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setSelectedContent(item)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-white text-xs font-bold uppercase rounded-full ${categories.find(cat => cat.id === item.category)?.color}`}>
                        {categories.find(cat => cat.id === item.category)?.name}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-white bg-opacity-90 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {item.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{item.date}</span>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                        Baca Artikel
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' 
                ? 'Semua Konten Edukasi' 
                : `${categories.find(cat => cat.id === activeCategory)?.name}`}
            </h2>
            {searchQuery && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredContent.length} hasil untuk "{searchQuery}"
              </span>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-green-500 opacity-20"></div>
              </div>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada konten ditemukan</h3>
              <p className="text-gray-500 mb-6">Coba ubah filter atau kata kunci pencarian Anda.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setSelectedContent(item)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-white text-xs font-bold uppercase rounded-full ${categories.find(cat => cat.id === item.category)?.color}`}>
                        {categories.find(cat => cat.id === item.category)?.name}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-white bg-opacity-90 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {item.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{item.date}</span>
                      </div>
                      <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                        Baca
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Content Detail Modal */}
        {selectedContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedContent.image} 
                  alt={selectedContent.title} 
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button 
                  onClick={() => setSelectedContent(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 text-white text-xs font-bold uppercase rounded-full ${categories.find(cat => cat.id === selectedContent.category)?.color}`}>
                    {categories.find(cat => cat.id === selectedContent.category)?.name}
                  </span>
                  <span className="text-sm text-gray-500">{selectedContent.date}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{selectedContent.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedContent.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{selectedContent.description}</p>
                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                    Baca Selengkapnya
                  </button>
                  <button 
                    onClick={() => setSelectedContent(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
