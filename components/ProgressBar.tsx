
import React from 'react';
import { useLoading } from '../context/LoadingContext';

const ProgressBar: React.FC = () => {
  const { isLoading, stopLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="progress-bar"
      onAnimationEnd={stopLoading}
      role="progressbar"
      aria-valuetext="Loading page..."
      aria-busy="true"
    />
  );
};

export default ProgressBar;