'use client';

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Initialize state to false on the server and for the first client render
  // This ensures server and client initial render match.
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkDevice(); // Set the actual value on the client
    window.addEventListener('resize', checkDevice); // Listen for changes

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  return isMobile;
}
