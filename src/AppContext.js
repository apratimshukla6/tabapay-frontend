import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [state, setState] = useState("Initial State");

  // Can add more functions here

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
