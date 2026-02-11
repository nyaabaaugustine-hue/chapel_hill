'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const locations = [
  { name: 'Greater Accra', value: 45, color: 'bg-primary' },
  { name: 'Ashanti', value: 22, color: 'bg-accent' },
  { name: 'Western', value: 12, color: 'bg-chart-3' },
  { name: 'Northern', value: 9, color: 'bg-chart-4' },
  { name: 'Other', value: 12, color: 'bg-muted-foreground' },
];

export default function LocationBreakdown() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>User Location Breakdown</CardTitle>
        <CardDescription>Geographic distribution of users in Ghana.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {locations.map((loc) => (
          <div key={loc.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{loc.name}</span>
              <span className="text-muted-foreground">{loc.value}%</span>
            </div>
            <Progress value={loc.value} indicatorClassName={loc.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
