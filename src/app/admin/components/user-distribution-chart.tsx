'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'Employers', value: 400, fill: 'var(--color-employers)' },
  { name: 'Job Seekers', value: 2434, fill: 'var(--color-seekers)' },
  { name: 'Admins', value: 5, fill: 'var(--color-admins)' },
];

const chartConfig = {
  users: {
    label: 'Users',
  },
  employers: {
    label: 'Employers',
    color: 'hsl(var(--primary))',
  },
  seekers: {
    label: 'Job Seekers',
    color: 'hsl(var(--accent))',
  },
  admins: {
    label: 'Admins',
    color: 'hsl(var(--chart-3))',
  },
};

export default function UserDistributionChart() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>User Role Distribution</CardTitle>
        <CardDescription>Breakdown of user roles on the platform.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
              >
                 {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend
                content={({ payload }) => {
                  return (
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center pt-4">
                      {payload?.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center gap-2 text-xs">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          {entry.value}
                        </li>
                      ))}
                    </ul>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
