import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartSkeleton } from '@/components/skeletons/Skeletons';
import { DailyUsers } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom Tooltip for a more polished look
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 rounded-lg shadow-lg" style={{
                background: 'hsla(var(--card-foreground) / 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsla(var(--border) / 0.2)'
            }}>
                <p className="text-sm font-bold text-popover-foreground">{`Day: ${label}`}</p>
                <p className="text-sm text-popover-foreground">{`Users: ${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

interface DailyUsersChartProps {
    data: DailyUsers[];
    isLoading: boolean;
}

const DailyUsersChart = ({ data, isLoading }: DailyUsersChartProps) => {
    if (isLoading) {
        return <ChartSkeleton />;
    }

    return (
        <Card className="p-4 md:p-6">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Daily Users</CardTitle>
                <CardDescription>User activity by day of week</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                        data={data}
                        margin={{
                            top: 10,
                            right: 15,
                            left: -15,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
                        <XAxis 
                            dataKey="day" 
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
                            tickFormatter={(value) => `${Number(value) / 1000}K`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} /> {/* <--- Add or modify this line */}
                        <Bar 
                            dataKey="users" 
                            fill="#10B981" 
                            radius={[4, 4, 0, 0]} 
                            
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default DailyUsersChart;