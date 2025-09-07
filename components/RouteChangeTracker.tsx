
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

const RouteChangeTracker: React.FC = () => {
  const { startLoading } = useLoading();
  const location = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    // Don't show progress bar on the initial page load
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    startLoading();
  }, [location.pathname]);

  return null; // This component does not render anything
};

export default RouteChangeTracker;