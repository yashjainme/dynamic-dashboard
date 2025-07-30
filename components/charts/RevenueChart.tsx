import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartSkeleton } from '@/components/skeletons/Skeletons';
import { RevenueData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom Tooltip for a more polished look
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 rounded-lg shadow-lg" style={{
                background: 'hsla(var(--card-foreground) / 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsla(var(--border) / 0.2)'
            }}>
                <p className="text-sm font-bold text-popover-foreground">{`Date: ${label}`}</p>
                <p className="text-sm text-popover-foreground">{`Revenue: $${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};


interface RevenueChartProps {
    data: RevenueData[];
    isLoading: boolean;
}

const RevenueChart = ({ data, isLoading }: RevenueChartProps) => {
    if (isLoading) {
        return <ChartSkeleton />;
    }

    return (
        <Card className="p-4 md:p-6">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Revenue Trend</CardTitle>
                <CardDescription>Daily revenue over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart 
                        data={data}
                        margin={{
                            top: 10,
                            right: 15,
                            left: -15,
                            bottom: 0,
                        }}
                    >
                        {/* Define the gradient for the area fill and line stroke */}
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        
                        <XAxis 
                            dataKey="date" 
                            stroke="currentColor"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="currentColor"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${Number(value) / 1000}K`}
                        />
                        
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            activeDot={{ 
                                r: 8, 
                                fill: '#3B82F6', 
                                stroke: 'hsl(var(--background))', 
                                strokeWidth: 2,
                                style: { filter: 'drop-shadow(0 0 5px #3B82F6)' } 
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;












