import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <Badge variant="outline" className={cn('gap-2', config.color)}>
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
                <TableHead>90-Day Uptime</TableHead>
                <TableHead>Avg. Response (ms)</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {apis.map(api => (
                <TableRow key={api.name}>
                    <TableCell className="font-semibold">{api.name}</TableCell>
                    <TableCell>
                        <StatusBadge status={api.status} />
                    </TableCell>
                    <TableCell>{api.uptime}</TableCell>
                    <TableCell>{api.responseTime}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function AdminApiStatusPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">API Status</h1>
        <p className="text-muted-foreground">Monitor the health of external and internal APIs.</p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Overall Status</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-6 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center gap-4">
                <CheckCircle className="h-8 w-8" />
                <div>
                    <h3 className="font-bold text-lg">All Systems Operational</h3>
                    <p className="text-sm">With the exception of minor external API issues.</p>
                </div>
            </div>
        </CardContent>
       </Card>

      <Card>
        <CardHeader>
            <CardTitle>Internal Systems</CardTitle>
            <CardDescription>Health of your platform's core microservices.</CardDescription>
        </CardHeader>
        <CardContent>
            <ApiStatusTable apis={internalApis} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>External Services</CardTitle>
            <CardDescription>Status of third-party APIs your platform relies on.</CardDescription>
        </CardHeader>
        <CardContent>
            <ApiStatusTable apis={externalApis} />
        </CardContent>
      </Card>
    </div>
  );
}
