/**
 * Countdown timer hook for the auto-refresh indicator.
 *
 * Returns the remaining seconds until the next auto-refresh,
 * ticking down every second from the last data fetch time.
 */

import { useState, useEffect, useCallback } from 'react';
import { AUTO_REFRESH_INTERVAL_MS } from '../constants/weather';

const INTERVAL_SECONDS = AUTO_REFRESH_INTERVAL_MS / 1000;

export function useRefreshTimer(fetchedAt: number | undefined) {
  const calcRemaining = useCallback(() => {
    if (!fetchedAt) return INTERVAL_SECONDS;
    const elapsed = (Date.now() - fetchedAt) / 1000;
    return Math.max(0, Math.ceil(INTERVAL_SECONDS - elapsed));
  }, [fetchedAt]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    setRemaining(calcRemaining());
    const interval = setInterval(() => {
      setRemaining(calcRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [calcRemaining]);

  return {
    remaining,
    total: INTERVAL_SECONDS,
    progress: remaining / INTERVAL_SECONDS,
  };
}
