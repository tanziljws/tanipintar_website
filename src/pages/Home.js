import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Animation for counting up stats
  const [counts, setCounts] = useState({
    users: 0,
    farmers: 0,
    registrations: 0,
    commodities: 0
  });
  
  const targetCounts = {
    users: 5336,
    farmers: 10766,
    registrations: 10036,
    commodities: 125
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
            
            // Start animation for stats when they come into view
            if (entry.target.id === 'stats-section') {
              animateStats();
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) observer.observe(statsRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);
  
  const animateStats = () => {
    const duration = 2000; // ms
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      const progress = currentStep / steps;
      
      setCounts({
        users: Math.floor(targetCounts.users * progress),
        farmers: Math.floor(targetCounts.farmers * progress),
        registrations: Math.floor(targetCounts.registrations * progress),
        commodities: Math.floor(targetCounts.commodities * progress)
      });
      
      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, stepTime);
  };
  const stats = [
    { id: 1, name: 'Pengguna Terdaftar', value: counts.users.toString(), icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) },
    { id: 2, name: 'Jumlah Pengguna Petani', value: counts.farmers.toString(), icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ) },
    { id: 3, name: 'Pendaftar Pengguna', value: counts.registrations.toString(), icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ) },
    { id: 4, name: 'Komoditas Beragam', value: counts.commodities.toString(), icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ) },
  ];

  const features = [
    {
      name: 'Pemetaan Petani',
      description: 'Temukan lokasi petani terdekat dengan mudah melalui peta interaktif.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      name: 'Informasi Komoditas',
      description: 'Akses informasi lengkap tentang berbagai komoditas pertanian yang tersedia.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: 'Koneksi Langsung',
      description: 'Hubungi petani secara langsung untuk memenuhi kebutuhan hasil pertanian Anda.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      name: 'Edukasi Pertanian',
      description: 'Dapatkan informasi dan pengetahuan terbaru tentang praktik pertanian modern.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-700 min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt="Pertanian"
          />
          <div className="absolute inset-0 bg-green-700 opacity-60" aria-hidden="true"></div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto py-12 px-4 sm:py-20 md:py-24 lg:py-32 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up max-w-lg mx-auto lg:max-w-none">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 text-center lg:text-left">
              <span className="block opacity-0 animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                Jadilah penentu kemajuan
              </span>
              <span className="block opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
                pertanian masa depan melalui
              </span>
              <span className="block opacity-0 animate-fade-in-up" style={{animationDelay: '0.9s', animationFillMode: 'forwards'}}>
                inovasi dan teknologi digital.
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up text-center lg:text-left" style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
              Aplikasi publik untuk mendekatkan petani dan masyarakat demi ketahanan pangan.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 opacity-0 animate-fade-in-up" style={{animationDelay: '1.5s', animationFillMode: 'forwards'}}>
              <Link
                to="/peta"
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-transform duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                Lihat Peta
              </Link>
              <Link
                to="/kontak"
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-lg text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-transform duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats-section" ref={statsRef} className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Statistik TaniPintar</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4">Bergabunglah dengan ribuan pengguna yang telah memanfaatkan platform kami</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className={`bg-white overflow-hidden shadow-md sm:shadow-lg rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${isVisible['stats-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(stat.id - 1) * 150}ms` }}
              >
                <div className="px-3 py-4 sm:px-4 sm:py-5">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 rounded-full bg-primary-light bg-opacity-20">
                      {stat.icon}
                    </div>
                  </div>
                  <dt className="text-center text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="mt-1 sm:mt-2 text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary">{stat.value}</dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about-section" ref={aboutRef} className="bg-gray-50 py-12 sm:py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className={`transition-all duration-1000 transform ${isVisible['about-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center lg:text-left text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-600">
                Apa itu TaniPintar?
              </h2>
              <p className="mt-4 max-w-3xl text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                TaniPintar adalah platform inovatif yang menghubungkan petani dengan masyarakat umum, pembeli, dan pemerintah untuk membangun ekosistem pertanian yang lebih baik dan berkelanjutan.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  {
                    text: 'Membantu petani memasarkan hasil pertanian mereka secara lebih luas',
                    icon: (
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  {
                    text: 'Menyediakan akses langsung bagi masyarakat untuk mendapatkan produk pertanian segar',
                    icon: (
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    text: 'Mendukung pemerintah dalam memetakan dan mengembangkan potensi pertanian daerah',
                    icon: (
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex-shrink-0 p-3 bg-primary-light bg-opacity-20 rounded-full">
                      {item.icon}
                    </div>
                    <p className="ml-4 text-base text-gray-600 self-center">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 md:mt-10 lg:mt-0 transition-all duration-1000 transform ${isVisible['about-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}">
              <div className="relative">
                <img
                  className="rounded-2xl shadow-2xl w-full object-cover h-[500px] transition-transform duration-500 hover:scale-[1.02]"
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="Petani menggunakan teknologi"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary rounded-lg p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <p className="text-white font-bold text-lg">Teknologi untuk Pertanian Masa Depan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Mobile App Showcase Section */}
      <div id="features-section" ref={featuresRef} className="bg-white py-12 sm:py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 transform ${isVisible['features-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-primary-light text-primary text-xs sm:text-sm font-semibold py-1 px-3 rounded-full mb-3">Mobile App</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 sm:tracking-tight">
              TaniPintar di Genggaman Anda
            </h2>
            <p className="max-w-2xl mt-3 sm:mt-5 mx-auto text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              Akses fitur pertanian pintar melalui Aplikasi Mobile yang terintegrasi dengan IoT
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-green-50 rounded-3xl opacity-10 transform -skew-y-6"></div>
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`transition-all duration-1000 transform px-8 sm:px-12 ${isVisible['features-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Monitoring Real-time</h4>
                        <p className="mt-2 text-gray-600">Pantau kondisi lahan dan tanaman Anda kapan saja, hanya dengan melalui smartphone</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Integrasi IoT</h4>
                        <p className="mt-2 text-gray-600">Terhubung dengan sensor-sensor pintar untuk data akurat tentang kelembaban, nutrisi, dan kondisi tanah</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Asisten Virtual Cerdas</h4>
                        <p className="mt-2 text-gray-600">Membantu menjawab pertanyaan dan mendampingi petani kapan saja.</p>
                      </div>
                    </div>

                    <div className="mt-10">
                      <a
                        href="#download"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-primary hover:bg-primary-dark transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Aplikasi
                      </a>
                    </div>
                  </div>
                </div>

                <div className={`relative lg:ml-12 transition-all duration-1000 transform ${isVisible['features-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="relative w-full max-w-md mx-auto">
                    {/* Decorative gradient blur */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 rounded-[2.5rem] blur-xl opacity-30 animate-pulse"></div>
                    
                    {/* App screenshots with floating effect */}
                    <div className="relative space-y-4">
                      <div className="relative">
                        <img
                          className="w-48 sm:w-56 mx-auto transform translate-x-8 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 object-contain h-auto"
                          src="/assets/images/kelolalahan.png"
                          alt="TaniPintar Mobile App - Kelola Lahan"
                        />
                      </div>
                      <div className="relative">
                        <img
                          className="w-48 sm:w-56 mx-auto transform -translate-x-8 -translate-y-4 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 object-contain h-auto"
                          src="/assets/images/onboard.png"
                          alt="TaniPintar Mobile App - Splash Screen"
                        />
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="cta-section" ref={ctaRef} className="bg-gradient-to-r from-primary to-green-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-60 h-48 sm:h-60 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className={`transition-all duration-1000 transform ${isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 text-center lg:text-left">
                <span className="block mb-2">Siap untuk bergabung?</span>
                <span className="block text-green-100">Mulai gunakan TaniPintar sekarang.</span>
              </h2>
              <p className="text-base sm:text-lg text-white text-opacity-90 mb-6 sm:mb-8 text-center lg:text-left">
                Jadilah bagian dari revolusi pertanian digital Indonesia dan bantu petani lokal meningkatkan produktivitas mereka.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/peta"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Lihat Peta
                </Link>
                <Link
                  to="/kontak"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Hubungi Kami
                </Link>
              </div>
            </div>
            <div className={`mt-12 lg:mt-0 transition-all duration-1000 transform ${isVisible['cta-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      title: 'Petani Terdaftar',
                      value: '10,766+',
                      icon: (
                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Komoditas',
                      value: '125+',
                      icon: (
                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )
                    },
                    {
                      title: 'Provinsi',
                      value: '5+',
                      icon: (
                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Transaksi',
                      value: '1,250+',
                      icon: (
                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white bg-opacity-10 p-3 sm:p-4 rounded-xl hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                        <div className="mb-2 sm:mb-0 sm:mr-3">{item.icon}</div>
                        <div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">{item.title}</h3>
                          <p className="text-xl sm:text-2xl font-bold text-white mt-1">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
