'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Server, Zap, Database, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const metrics = [
  { name: 'API Response Time', value: '85ms', status: 'Operational', icon: <Zap /> },
  { name: 'Server Uptime', value: '99.98%', status: 'Operational', icon: <Server /> },
  { name: 'Database Usage', value: '62%', status: 'Operational', icon: <Database /> },
  { name: 'Storage Used', value: '78%', status: 'High', icon: <HardDrive /> },
];

export default function SystemHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'High':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health & Performance</CardTitle>
        <CardDescription>Live metrics for platform infrastructure.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="text-muted-foreground">{metric.icon}</div>
                <div>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                </div>
            </div>
            <Badge variant="outline" className={getStatusColor(metric.status)}>{metric.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
