import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const routeNames = {
        peta: 'Peta Sebaran',
        edukasi: 'Edukasi',
        galeri: 'Galeri',
        kontak: 'Kontak',
        admin: 'Admin',
        dashboard: 'Dashboard',
        map: 'Peta',
        'education': 'Edukasi',
        new: 'Tambah Baru'
    };

    return (
        <nav className="bg-white border-b" aria-label="Breadcrumb">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-12">
                    <ol className="flex items-center space-x-2 text-sm">
                        <li>
                            <div>
                                <Link to="/" className="text-primary hover:text-primary-dark transition-colors duration-200">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span className="sr-only">Home</span>
                                </Link>
                            </div>
                        </li>
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={name}>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {!isLast ? (
                                            <Link
                                                to={routeTo}
                                                className="ml-2 text-gray-500 hover:text-primary transition-colors duration-200"
                                            >
                                                {routeNames[name] || name}
                                            </Link>
                                        ) : (
                                            <span className="ml-2 text-gray-700 font-medium">
                                                {routeNames[name] || name}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </nav>
    );
};

export default Breadcrumb;
