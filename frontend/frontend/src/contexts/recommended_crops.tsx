import React from 'react';

import { useState, useContext, createContext } from 'react';

import { CropRecommendation } from './types';

interface RecommendedCropsContextType {
  fetchRecommendedCrops: (lat: number, lon: number) => Promise<void>;
  recommendedCrops: CropRecommendation[];
}

const RecommendedCropsContext = createContext<
  RecommendedCropsContextType | undefined
>(undefined);

export const RecommendedCropsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [recommendedCrops, setRecommendedCrops] = useState<
    CropRecommendation[]
  >([]);

  const fetchRecommendedCrops = async (lat: number, lon: number) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecommendedCrops(data);
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <RecommendedCropsContext.Provider
      value={{
        fetchRecommendedCrops,
        recommendedCrops,
      }}
    >
      {children}
    </RecommendedCropsContext.Provider>
  );
};

export const useRecommended = () => {
  const context = React.useContext(RecommendedCropsContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
