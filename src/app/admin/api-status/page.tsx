import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Server, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type ApiStatus = 'Operational' | 'Degraded Performance' | 'Outage';

type ApiMetric = {
  name: string;
  status: ApiStatus;
  uptime: string;
  responseTime: string;
};

const internalApis: ApiMetric[] = [
  { name: 'Authentication Service', status: 'Operational', uptime: '99.99%', responseTime: '52ms' },
  { name: 'Job Management API', status: 'Operational', uptime: '99.98%', responseTime: '85ms' },
  { name: 'AI Services (Genkit)', status: 'Degraded Performance', uptime: '99.50%', responseTime: '450ms' },
  { name: 'Database (Firestore)', status: 'Operational', uptime: '99.99%', responseTime: '12ms' },
];

const externalApis: ApiMetric[] = [
  { name: 'Firebase', status: 'Operational', uptime: '99.99%', responseTime: 'N/A' },
  { name: 'Stripe API', status: 'Operational', uptime: '99.99%', responseTime: '120ms' },
  { name: 'Google Maps API', status: 'Outage', uptime: '98.20%', responseTime: '2500ms' },
  { name: 'Postmark API (Email)', status: 'Operational', uptime: '99.99%', responseTime: '75ms' },
];

const StatusBadge = ({ status }: { status: ApiStatus }) => {
  const statusConfig = {
    Operational: {
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      text: 'Operational'
    },
    'Degraded Performance': {
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      text: 'Degraded'
    },
    Outage: {
      icon: <XCircle className="h-4 w-4" />,
      color: 'bg-destructive/10 text-destructive border-destructive/20',
      text: 'Outage'
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn('gap-2 font-medium', config.color)}>
      {config.icon}
      <span>{config.text}</span>
    </Badge>
  );
};


const ApiStatusTable = ({ apis }: { apis: ApiMetric[] }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Uptime</TableHead>
                <TableHead className="text-right">Response</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {apis.map(api => (
                <TableRow key={api.name}>
                    <TableCell className="font-semibold">{api.name}</TableCell>
                    <TableCell>
                        <StatusBadge status={api.status} />
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">{api.uptime}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">{api.responseTime}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function AdminApiStatusPage() {
  const allApis = [...internalApis, ...externalApis];
  const hasOutage = allApis.some(api => api.status === 'Outage');
  const hasDegraded = allApis.some(api => api.status === 'Degraded Performance');

  const overallStatus: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  } = (() => {
    if (hasOutage) {
      return {
        title: 'Major Outage Detected',
        description: `At least one system is currently experiencing an outage.`,
        icon: <XCircle className="h-8 w-8" />,
        color: 'bg-destructive/10 text-destructive',
      };
    }
    if (hasDegraded) {
      return {
        title: 'Degraded Performance',
        description: 'Some systems are experiencing slower than normal response times.',
        icon: <AlertTriangle className="h-8 w-8" />,
        color: 'bg-yellow-500/10 text-yellow-600',
      };
    }
    return {
      title: 'All Systems Operational',
      description: 'All internal and external services are running smoothly.',
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'bg-emerald-500/10 text-emerald-600',
    };
  })();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">API Status</h1>
        <p className="text-muted-foreground">Monitor the health of internal systems and external services.</p>
      </div>

       <Card>
        <CardContent className="p-6">
            <div className={cn("p-6 rounded-lg flex items-center gap-4", overallStatus.color)}>
                {overallStatus.icon}
                <div>
                    <h3 className="font-bold text-lg">{overallStatus.title}</h3>
                    <p className="text-sm">{overallStatus.description}</p>
                </div>
            </div>
        </CardContent>
       </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Server /> Internal Systems
                </CardTitle>
                <CardDescription>Health of your platform's core microservices.</CardDescription>
            </CardHeader>
            <CardContent>
                <ApiStatusTable apis={internalApis} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Cloud /> External Services
                </CardTitle>
                <CardDescription>Status of third-party APIs your platform relies on.</CardDescription>
            </CardHeader>
            <CardContent>
                <ApiStatusTable apis={externalApis} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
