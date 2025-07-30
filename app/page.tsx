'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TrendingUp, Users, Target, DollarSign, LucideIcon } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import Header from '@/components/dashboard/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import RevenueChart from '@/components/charts/RevenueChart';
import DailyUsersChart from '@/components/charts/DailyUsersChart';
import ConversionSourcesChart from '@/components/charts/ConversionSourcesChart';
import DataTable from '@/components/dashboard/DataTable';

interface Metric {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
}


const randomInRange = (min: any, max: any, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
};

// Helper function to format numbers
const formatNumber = (num: any, prefix = '', suffix = '') => {
  if (num >= 1000000) {
    return `${prefix}${(num / 1000000).toFixed(1)}M${suffix}`;
  } else if (num >= 1000) {
    return `${prefix}${(num / 1000).toFixed(1)}K${suffix}`;
  }
  return `${prefix}${num}${suffix}`;
};

// Base configuration for metrics
const BASE_METRICS_CONFIG = [
  { 
    title: 'Total Revenue', 
    baseValue: 847000, 
    range: { min: 750000, max: 950000 }, 
    prefix: '$', 
    icon: DollarSign 
  },
  { 
    title: 'Active Users', 
    baseValue: 24600, 
    range: { min: 22000, max: 28000 }, 
    prefix: '', 
    suffix: '',
    icon: Users 
  },
  { 
    title: 'Conversions', 
    baseValue: 4892, 
    range: { min: 4200, max: 5800 }, 
    prefix: '', 
    suffix: '',
    icon: Target 
  },
  { 
    title: 'Growth Rate', 
    baseValue: 23.1, 
    range: { min: 18, max: 28 }, 
    prefix: '', 
    suffix: '%',
    icon: TrendingUp 
  },
];

const ADmyBRANDDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [metricsConfig, setMetricsConfig] = useState<Metric[]>([]);
  const { isLoading, data } = useDashboardData();

  // Function to generate new metrics data
  const generateNewMetrics = useCallback((): Metric[] => {
    return BASE_METRICS_CONFIG.map(metric => {
      const newValue = randomInRange(metric.range.min, metric.range.max, 
        metric.suffix === '%' ? 1 : 0);
      const change = randomInRange(-15, 20, 1);
      
      let formattedValue;
      if (metric.title === 'Total Revenue') {
        formattedValue = formatNumber(newValue, '$');
      } else if (metric.title === 'Active Users') {
        formattedValue = formatNumber(newValue);
      } else if (metric.suffix === '%') {
        formattedValue = `${newValue}%`;
      } else {
        formattedValue = newValue.toLocaleString();
      }

      return {
        title: metric.title,
        value: formattedValue,
        change: change,
        icon: metric.icon
      };
    });
  }, []);

  // Initialize metrics on component mount
  useEffect(() => {
    setMetricsConfig(generateNewMetrics());
  }, [generateNewMetrics]);

  // Set up interval to update metrics every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricsConfig(generateNewMetrics());
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [generateNewMetrics]);

  // Memoize data extractions to prevent unnecessary recalculations
  const chartData = useMemo(() => ({
    revenueData: data?.revenueData || [],
    dailyUsers: data?.dailyUsers || [],
    conversionSources: data?.conversionSources || [],
    campaigns: data?.campaigns || []
  }), [data]);

  useEffect(() => {
    setIsHydrated(true);
    
    // Check for saved theme preference or default to system preference
    const savedTheme = false; // localStorage not available in artifacts
    let initialTheme = false;
    
    if (savedTheme) {
      initialTheme = savedTheme === 'dark';
    } else {
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    setIsDarkMode(initialTheme);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const root = document.documentElement;
    
    root.classList.toggle('dark', isDarkMode);
    // localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Not available in artifacts
  }, [isDarkMode, isHydrated]);

  // Use useCallback to prevent unnecessary re-renders of child components
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsConfig.map((metric, index) => (
            <MetricCard 
              key={`${metric.title}-${index}`}
              {...metric} 
              isLoading={isLoading} 
            />
          ))}
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart isLoading={isLoading} data={chartData.revenueData} />
          <DailyUsersChart isLoading={isLoading} data={chartData.dailyUsers} />
        </section>

        {/* Data Table & Sources Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ConversionSourcesChart 
              isLoading={isLoading} 
              data={chartData.conversionSources} 
            />
          </div>
          <div className="lg:col-span-2">
            <DataTable 
              campaigns={chartData.campaigns} 
              isLoading={isLoading} 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(ADmyBRANDDashboard);