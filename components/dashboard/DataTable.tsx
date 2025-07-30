import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { DataTableSkeleton } from '@/components/skeletons/Skeletons';
import { useDataTable } from '@/hooks/useDataTable';
import { Campaign } from '@/data/mockData';

interface DataTableProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const DataTable = ({ campaigns, isLoading }: DataTableProps) => {
    const {
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
        exportToCSV
    } = useDataTable(campaigns);

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const itemsPerPage = 3;

  const columns: { key: keyof Campaign; label: string }[] = [
    { key: 'name', label: 'Campaign' },
    { key: 'status', label: 'Status' },
    { key: 'budget', label: 'Budget' },
    { key: 'spend', label: 'Spend' },
    { key: 'clicks', label: 'Clicks' },
    { key: 'conversions', label: 'Conversions' },
    { key: 'ctr', label: 'CTR %' },
    { key: 'cpc', label: 'CPC' }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Monitor your active campaigns and their metrics</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map(({ key, label }) => (
                  <th key={key} className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(key)}
                      className="font-medium hover:bg-muted"
                    >
                      {label}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium">{campaign.name}</td>
                  <td className="p-4">
                    <Badge variant={
                      campaign.status === 'Active' ? 'default' :
                      campaign.status === 'Paused' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="p-4">${campaign.budget.toLocaleString()}</td>
                  <td className="p-4">${campaign.spend.toLocaleString()}</td>
                  <td className="p-4">{campaign.clicks.toLocaleString()}</td>
                  <td className="p-4">{campaign.conversions.toLocaleString()}</td>
                  <td className="p-4">{campaign.ctr}%</td>
                  <td className="p-4">${campaign.cpc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <p className="text-sm text-muted-foreground order-last sm:order-first">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedCampaigns.length)} of {sortedCampaigns.length} campaigns
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-2">Previous</span>
              </Button>
              <span className="text-sm font-medium px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 sm:ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;