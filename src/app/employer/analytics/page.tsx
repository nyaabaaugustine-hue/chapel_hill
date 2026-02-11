import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import EmployerAnalytics from '@/components/employer-analytics';

export default function EmployerAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl font-bold">Hiring Analytics</CardTitle>
        <CardDescription>Analyze your hiring funnel and job performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <EmployerAnalytics />
      </CardContent>
    </Card>
  );
}
