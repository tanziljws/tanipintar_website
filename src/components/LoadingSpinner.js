import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '', variant = 'primary' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'border-t-primary',
    white: 'border-t-white',
    gray: 'border-t-gray-600'
  };

  const baseClasses = 'ease-linear rounded-full border-4 border-t-4 border-gray-200';
  
  return (
    <div className={`${className} flex justify-center items-center`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          ${baseClasses} 
          ${variantClasses[variant]}
          animate-spin
        `}
      />
    </div>
  );
};

export const LoadingOverlay = ({ children, loading, className = '' }) => {
  if (!loading) return children;

  return (
    <div className="relative">
      {children}
      <div className={`
        absolute inset-0 bg-white bg-opacity-75 
        flex items-center justify-center
        transition-opacity duration-300
        ${className}
      `}>
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
};

export default LoadingSpinner;