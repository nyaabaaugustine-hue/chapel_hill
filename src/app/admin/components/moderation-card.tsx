'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Lightbulb, Loader, Shield, XCircle, Briefcase, MapPin, Wallet } from 'lucide-react';
import { runJobModeration } from '@/lib/actions';
import type { ModerateJobPostOutput } from '@/ai/flows/admin-job-moderation';
import { Separator } from '@/components/ui/separator';

type ModerationCardProps = {
  job: Job;
  aiFlagged?: boolean;
};

export default function ModerationCard({ job, aiFlagged = false }: ModerationCardProps) {
  const [moderationResult, setModerationResult] = useState<ModerateJobPostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModerate = async () => {
    setIsLoading(true);
    const result = await runJobModeration({ jobPost: `${job.title}\n\n${job.description}` });
    setModerationResult(result);
    setIsLoading(false);
  };

  return (
    <Card className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left side: Job Details */}
        <div className="md:col-span-2 p-6 space-y-4">
           <CardHeader className="p-0">
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.company.name} - {job.location}</CardDescription>
          </CardHeader>
           <CardContent className="p-0 space-y-4">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Briefcase /><span>{job.type}</span></div>
                    <div className="flex items-center gap-2"><Wallet /><span>{job.salaryRange}</span></div>
                    <div className="flex items-center gap-2"><MapPin /><span>{job.experienceLevel}</span></div>
                </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold text-sm mb-2">Job Description</h4>
                    <p className="text-sm text-muted-foreground line-clamp-6">{job.description}</p>
                 </div>
          </CardContent>
        </div>

        {/* Right side: Moderation Actions */}
        <div className="md:col-span-1 p-6 bg-secondary/50 flex flex-col justify-between space-y-4 border-l">
            <div className="space-y-4">
                <h4 className="font-semibold text-sm">Moderation Status</h4>
                {aiFlagged && !moderationResult && (
                    <Alert variant="destructive">
                        <Shield className="h-4 w-4" />
                        <AlertTitle>AI Flagged</AlertTitle>
                        <AlertDescription>
                            This post may be spam. Please review carefully.
                        </AlertDescription>
                    </Alert>
                )}
                
                {moderationResult && (
                <Alert variant={moderationResult.isSpam ? 'destructive' : 'vibrant'}>
                    {moderationResult.isSpam ? <Shield className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    <AlertTitle>{moderationResult.isSpam ? 'AI Warning' : 'AI Analysis'}</AlertTitle>
                    <AlertDescription>
                    {moderationResult.reason || 'No specific issues found.'}
                    </AlertDescription>
                </Alert>
                )}

                 {!aiFlagged && !moderationResult && (
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Awaiting Review</AlertTitle>
                        <AlertDescription>
                            Run AI moderation or manually approve/reject.
                        </AlertDescription>
                    </Alert>
                )}
            </div>

             <div className="space-y-2">
                <Button onClick={handleModerate} disabled={isLoading} className="w-full">
                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Moderate with AI
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                        <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button className="w-full">
                        <CheckCircle className="mr-2 h-4 w-4" /> Approve
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
}
