import { useEffect, useRef, useCallback } from 'react';

export const usePolling = (
  callback,
  condition,
  interval = 1000,
  maxAttempts = 150
) => {
  const attemptsRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // If condition is false, stop polling
    if (!condition) {
      attemptsRef.current = 0;
      if (intervalRef.current) {
        console.log('🛑 Polling stopped');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // If condition is true, start polling
    const poll = async () => {
      try {
        await callback();
        attemptsRef.current += 1;

        if (attemptsRef.current >= maxAttempts) {
          console.warn('⚠️ Max polling attempts reached');
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }
      } catch (error) {
        console.error('❌ Polling error:', error);
      }
    };

    // Start polling immediately
    console.log('▶️ Starting polling...');
    poll();
    intervalRef.current = setInterval(poll, interval);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [condition, callback, interval, maxAttempts]);
};
