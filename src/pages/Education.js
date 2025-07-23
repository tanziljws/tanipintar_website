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
