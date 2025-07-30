import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MetricCardSkeleton } from '@/components/skeletons/Skeletons';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  isLoading: boolean;
}

const MetricCard = ({ title, value, change, icon: Icon, isLoading }: MetricCardProps) => {
  if (isLoading) return <MetricCardSkeleton />;
  
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            <Badge variant={change >= 0 ? "default" : "destructive"} className="text-xs">
              {change >= 0 ? '+' : ''}{change}%
            </Badge>
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
