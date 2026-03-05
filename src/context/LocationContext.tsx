/**
 * Location context — manages the active location across all screens.
 *
 * Uses React Context to share the selected location globally.
 * All screens read from this context via useLocation(),
 * and the LocationPicker writes to it.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_LOCATION, type Location } from '../constants/weather';

interface LocationContextValue {
  location: Location;
  setLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<Location>(DEFAULT_LOCATION);

  const setLocation = useCallback((loc: Location) => {
    setLocationState(loc);
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
