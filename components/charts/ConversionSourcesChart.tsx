import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartSkeleton } from '@/components/skeletons/Skeletons';
import { ConversionSource } from '@/data/mockData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ConversionSourcesChartProps {
    data: ConversionSource[];
    isLoading: boolean;
}


const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        console.log(payload)
        return (
            <div className="p-3 rounded-lg shadow-lg" style={{
                background: 'hsla(var(--card-foreground) / 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsla(var(--border) / 0.2)'
            }}>
                
                <p className="text-sm text-popover-foreground">{`${payload[0].name}: ${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const ConversionSourcesChart = ({ data, isLoading }: ConversionSourcesChartProps) => {
    if (isLoading) {
        return <ChartSkeleton />;
    }

    return (
        <Card className="p-6">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-lg">Conversion Sources</CardTitle>
                <CardDescription>Traffic sources breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                             <Tooltip content={<CustomTooltip />}  />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                        {data.map((source, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: source.color }}
                                    ></div>
                                    <span className="text-sm font-medium">{source.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ConversionSourcesChart;