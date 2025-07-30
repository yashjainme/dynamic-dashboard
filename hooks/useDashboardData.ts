import { useState, useEffect } from 'react';
import { generateMockData, MockData } from '@/data/mockData';

export const useDashboardData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MockData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      const interval = setInterval(() => {
        setData(prevData => {
          if (!prevData) return null;
          return {
            ...prevData,
            revenueData: prevData.revenueData.map(item => ({
              ...item,
              revenue: Math.floor(Math.random() * 5000) + 2000,
              users: Math.floor(Math.random() * 1000) + 500,
            }))
          };
        });
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoading, data]);

  return { isLoading, data };
};