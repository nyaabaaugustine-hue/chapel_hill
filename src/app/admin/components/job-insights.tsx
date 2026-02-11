'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Eye, FileText, Briefcase, Wallet } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const insights = [
    { icon: <FileText/>, title: 'Most Applied Job', value: 'Senior React Developer', meta: '342 Applications' },
    { icon: <Eye/>, title: 'Most Viewed Job', value: 'Full-stack Engineer', meta: '2.1k Views' },
    { icon: <Briefcase/>, title: 'Top Category', value: 'Software Development', meta: '450 Listings' },
    { icon: <Wallet/>, title: 'Average Salary', value: 'GH₵115k/year', meta: 'Across all jobs' },
]

const expiringJobs = [
    { title: 'Data Scientist', company: 'DataDriven', expires: 'in 2 days' },
    { title: 'Marketing Lead', company: 'Zenith Media', expires: 'in 3 days' },
    { title: 'Junior Dev', company: 'Innovate Inc.', expires: 'in 5 days' },
]

export default function JobInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Market Insights</CardTitle>
        <CardDescription>Key statistics from your job board.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map(insight => (
                <div key={insight.title} className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3 text-muted-foreground mb-1">
                        {insight.icon}
                        <p className="text-sm font-medium">{insight.title}</p>
                    </div>
                    <p className="text-lg font-bold">{insight.value}</p>
                    <p className="text-xs text-muted-foreground">{insight.meta}</p>
                </div>
            ))}
        </div>
        <Separator />
         <div>
            <h4 className="font-semibold mb-3">Jobs Expiring Soon</h4>
            <div className="space-y-3">
                {expiringJobs.map(job => (
                    <div key={job.title} className="flex items-center justify-between text-sm">
                        <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="destructive" className="font-mono text-xs">{job.expires}</Badge>
                    </div>
                ))}
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
