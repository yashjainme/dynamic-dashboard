import { useState, useMemo } from 'react';
import { Campaign } from '@/data/mockData';

type SortOrder = 'asc' | 'desc';

export const useDataTable = (campaigns: Campaign[]) => {
  const [sortBy, setSortBy] = useState<keyof Campaign>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const itemsPerPage = 3;

  const filteredCampaigns = useMemo(() => campaigns
    .filter(campaign => 
      (filterStatus === 'All' || campaign.status === filterStatus) &&
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [campaigns, filterStatus, searchTerm]);

  const sortedCampaigns = useMemo(() => [...filteredCampaigns].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const order = sortOrder === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * order;
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * order;
    }
    return 0;
  }), [filteredCampaigns, sortBy, sortOrder]);

  const paginatedCampaigns = useMemo(() => sortedCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ), [sortedCampaigns, currentPage]);

  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);

  const handleSort = (column: keyof Campaign) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const exportToCSV = () => {
    const headers = ['Campaign', 'Status', 'Budget', 'Spend', 'Clicks', 'Conversions', 'CTR', 'CPC'];
    const csvData = [
      headers.join(','),
      ...sortedCampaigns.map(campaign => 
        [campaign.name, campaign.status, campaign.budget, campaign.spend, 
         campaign.clicks, campaign.conversions, campaign.ctr, campaign.cpc].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaigns-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    paginatedCampaigns,
    totalPages,
    currentPage,
    setCurrentPage,
    sortedCampaigns,
    handleSort,
    setFilterStatus,
    filterStatus,
    setSearchTerm,
    searchTerm,
    exportToCSV,
  };
};
