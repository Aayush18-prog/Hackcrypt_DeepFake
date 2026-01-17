import { useEffect, useRef } from 'react';

export const usePolling = (
  callback,
  condition,
  interval = 2000,
  maxAttempts = 150 // 5 minutes with 2s interval
) => {
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!condition) {
      attemptsRef.current = 0;
      return;
    }

    const poll = async () => {
      try {
        await callback();
        attemptsRef.current += 1;

        if (attemptsRef.current >= maxAttempts) {
          console.warn('Max polling attempts reached');
          return;
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    const pollInterval = setInterval(poll, interval);
    return () => clearInterval(pollInterval);
  }, [condition, callback, interval, maxAttempts]);
};
