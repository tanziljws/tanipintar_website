import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', animation = 'wave' }) => {
  const baseClass = 'bg-gray-200';
  const animationClass = animation === 'wave' ? 'animate-pulse' : 'animate-shimmer';
  
  switch (variant) {
    case 'text':
      return (
        <div className={`${baseClass} ${animationClass} h-4 rounded ${className}`}></div>
      );
    case 'circular':
      return (
        <div className={`${baseClass} ${animationClass} rounded-full ${className}`}></div>
      );
    case 'rectangular':
    default:
      return (
        <div className={`${baseClass} ${animationClass} rounded-md ${className}`}></div>
      );
  }
};

export const CardSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <Skeleton className="h-40 w-full mb-4" />
    <Skeleton variant="text" className="w-3/4 mb-2" />
    <Skeleton variant="text" className="w-1/2" />
  </div>
);

export const ListSkeleton = ({ rows = 3 }) => (
  <div className="space-y-4">
    {Array(rows).fill(0).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1">
          <Skeleton variant="text" className="w-3/4 mb-2" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
