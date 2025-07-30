
export interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Paused' | 'Completed';
  budget: number;
  spend: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  users: number;
}

export interface ConversionSource {
  name: string;
  value: number;
  color: string;
}

export interface DailyUsers {
    day: string;
    users: number;
}

export interface MockData {
    campaigns: Campaign[];
    revenueData: RevenueData[];
    conversionSources: ConversionSource[];
    dailyUsers: DailyUsers[];
}


export const generateMockData = (): MockData => {
  const campaigns: Campaign[] = [
    { id: 1, name: 'Summer Sale 2024', status: 'Active', budget: 15000, spend: 12500, clicks: 45000, conversions: 1200, ctr: 2.8, cpc: 0.28 },
    { id: 2, name: 'Brand Awareness Q3', status: 'Active', budget: 25000, spend: 18750, clicks: 67500, conversions: 890, ctr: 3.2, cpc: 0.26 },
    { id: 3, name: 'Holiday Promo', status: 'Paused', budget: 30000, spend: 22000, clicks: 88000, conversions: 2200, ctr: 4.1, cpc: 0.25 },
    { id: 4, name: 'Mobile App Launch', status: 'Active', budget: 20000, spend: 16800, clicks: 56000, conversions: 1680, ctr: 3.5, cpc: 0.30 },
    { id: 5, name: 'Video Campaign', status: 'Completed', budget: 12000, spend: 12000, clicks: 40000, conversions: 800, ctr: 2.5, cpc: 0.30 },
  ];

  const revenueData: RevenueData[] = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: Math.floor(Math.random() * 5000) + 2000,
    users: Math.floor(Math.random() * 1000) + 500,
  }));

  const conversionSources: ConversionSource[] = [
    { name: 'Google Ads', value: 45, color: '#3B82F6' },
    { name: 'Facebook', value: 30, color: '#EF4444' },
    { name: 'Instagram', value: 15, color: '#8B5CF6' },
    { name: 'LinkedIn', value: 10, color: '#10B981' },
  ];

  const dailyUsers: DailyUsers[] = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    users: Math.floor(Math.random() * 3000) + 1000,
  }));

  return { campaigns, revenueData, conversionSources, dailyUsers };
};