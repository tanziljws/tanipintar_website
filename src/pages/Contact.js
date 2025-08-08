import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formFocus, setFormFocus] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  
  const [activeAccordion, setActiveAccordion] = useState(null);
  const contactSectionRef = useRef(null);
  const faqRef = useRef(null);

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

    if (contactSectionRef.current) observer.observe(contactSectionRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      if (contactSectionRef.current) observer.unobserve(contactSectionRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleFocus = (name) => {
    setFormFocus(prev => ({
      ...prev,
      [name]: true
    }));
  };
  
  const handleBlur = (name) => {
    setFormFocus(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    
    // Show success message with animation instead of alert
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };
  
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Contact information
  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: 'Jl. Raya Tajur, Kp. Buntar RT.02/RW.08, Kel. Muara Sari, Kec. Bogor Selatan',
      link: 'https://maps.app.goo.gl/CKgTDBmcXLPumZ8w9'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: '+62 859-3971-1150',
      link: 'https://api.whatsapp.com/send/?phone=6285939711150&text&type=phone_number&app_absent=0'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: 'tanipintar01@gmail.com',
      link: 'mailto:tanipintar01@gmail.com'
    }
  ];
  
  // Social media icons
  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      link: '#'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      link: 'https://www.instagram.com/tanipintar_?igsh=MW55cmdpbjF4YnAxbQ=='
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      link: '#'
    }
  ];
  
  const faqs = [
    {
      question: 'Bagaimana cara mendaftar sebagai petani di TaniPintar?',
      answer: 'Untuk mendaftar sebagai petani, Anda perlu menginstall aplikasi TaniPintar lalu daftar di Aplikasi. Setelah itu, Anda dapat mengisi profil Anda dengan informasi yang diperlukan seperti nama, lokasi, dan jenis tanaman yang Anda tanam. Tim kami akan memverifikasi pendaftaran Anda sebelum profil Anda ditampilkan di peta sebaran.',
    },
    {
      question: 'Apakah aplikasi ini gratis untuk digunakan?',
      answer: 'Ya, TaniPintar dapat digunakan secara gratis baik oleh petani maupun masyarakat umum. Kami berkomitmen untuk menyediakan akses yang mudah dan terjangkau untuk semua pengguna.',
    },
    {
      question: 'Bagaimana cara menghubungi petani melalui aplikasi ini?',
      answer: 'Anda dapat menggunakan formulir kontak di halaman ini untuk mengirim pesan kepada tim kami.',
    },
    {
      question: 'Wilayah mana saja yang sudah tercakup dalam aplikasi TaniPintar?',
      answer: 'Saat ini, TaniPintar baru mencakup wilayah Jawa Barat, tepatnya di Bogor. Kami terus berupaya untuk memperluas jangkauan ke seluruh wilayah Indonesia.',
    },
  ];
  
  // Logo component
  const LogoImage = () => (
    <img src={require('../assets/images/logo.png')} alt="TaniPintar Logo" className="w-full h-full object-contain" />
  );

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl relative inline-block">
            <span className="relative z-10 text-gradient">Hubungi Kami</span>
            <span className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 bg-green-200 opacity-50 rounded-lg transform -rotate-1"></span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami dengan pertanyaan atau saran Anda.
          </p>
        </div>
        
        {/* Main Contact Section */}
        <div className="rounded-2xl overflow-hidden shadow-xl bg-white mb-16" ref={contactSectionRef}>
          <div className="bg-primary bg-opacity-90 p-6 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <LogoImage />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Hubungi Kami</h2>
            <p className="max-w-md text-sm sm:text-base">Kami siap membantu Anda. Silakan isi formulir di bawah ini dan kami akan segera menghubungi Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Contact Information Column */}
            <div className="p-5 sm:p-8 lg:p-10 lg:col-span-2 bg-gray-50">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Informasi Kontak</h3>
                  <div className="space-y-4 sm:space-y-6">
                    {contactInfo.map((item, index) => (
                      <a 
                        key={index} 
                        href={item.link} 
                        className="flex items-start space-x-3 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <div className="text-gray-600 text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                          {item.text}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Ikuti Kami</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a 
                        key={index} 
                        href={social.link} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">{social.name}</span>
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 sm:mt-10 relative h-32 sm:h-40 md:h-60 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LogoImage />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form Column */}
            <div className="p-5 sm:p-8 lg:p-10 lg:col-span-3 relative">
              {isSubmitted && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-90 rounded-lg transition-all duration-500 animate-fadeIn">
                  <div className="text-center p-8 bg-green-50 rounded-lg shadow-lg transform transition-all duration-500 animate-scaleIn">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-green-800">Pesan Terkirim!</h3>
                    <p className="text-green-600 mt-2">Terima kasih! Kami akan segera menghubungi Anda.</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium transition-all duration-300 ${formFocus.name ? 'text-primary transform -translate-y-1' : 'text-gray-700'}`}>
                    Nama Lengkap
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      autoComplete="name"
                      placeholder="Masukkan nama lengkap Anda"
                      className="py-2 sm:py-3 px-3 sm:px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      required
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${formFocus.name ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium transition-all duration-300 ${formFocus.email ? 'text-primary transform -translate-y-1' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      autoComplete="email"
                      placeholder="Masukkan alamat email Anda"
                      className="py-2 sm:py-3 px-3 sm:px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      required
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${formFocus.email ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium transition-all duration-300 ${formFocus.subject ? 'text-primary transform -translate-y-1' : 'text-gray-700'}`}>
                    Subjek
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={() => handleBlur('subject')}
                      placeholder="Masukkan subjek pesan Anda"
                      className="py-2 sm:py-3 px-3 sm:px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      required
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${formFocus.subject ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium transition-all duration-300 ${formFocus.message ? 'text-primary transform -translate-y-1' : 'text-gray-700'}`}>
                    Pesan
                  </label>
                  <div className="mt-1 relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      rows={4}
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="py-2 sm:py-3 px-3 sm:px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      required
                    ></textarea>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${formFocus.message ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent rounded-lg shadow-md text-sm sm:text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span>Kirim Pesan</span>
                    <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16" ref={faqRef}>
          <div className="bg-primary bg-opacity-90 p-6 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <LogoImage />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Pertanyaan Umum (FAQ)</h2>
            <p className="max-w-md text-sm sm:text-base">Temukan jawaban untuk pertanyaan yang sering diajukan tentang TaniPintar.</p>
          </div>
          
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="overflow-hidden py-3">
                  <dt 
                    className="text-base sm:text-lg py-2 sm:py-3 cursor-pointer flex justify-between items-center font-medium" 
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-medium text-gray-900 hover:text-primary transition-colors duration-300">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      <svg 
                        className={`h-6 w-6 transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180 text-primary' : 'text-gray-500'}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </dt>
                  <dd 
                    className={`text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === index ? 'max-h-96 opacity-100 py-2 sm:py-3' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
