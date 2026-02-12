'use client';

import React, { useState, useMemo } from 'react';
import { DUMMY_JOBS } from '@/lib/data';
import type { Job } from '@/lib/types';
import ModerationCard from '@/app/admin/components/moderation-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, ShieldCheck, ShieldX, ShieldQuestion, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type ModerationStatus = 'pending' | 'flagged' | 'approved' | 'rejected';
type JobWithModStatus = Job & { moderationStatus: ModerationStatus };

type JobListProps = {
  jobs: Job[];
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
  title: string;
};

const JobList = ({ jobs, selectedJob, onSelectJob, title }: JobListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title} ({jobs.length})</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ScrollArea className="h-[676px]">
        <div className="space-y-1 p-2">
          {jobs.map(job => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={cn(
                "w-full text-left p-3 rounded-lg hover:bg-muted transition-colors border-l-4",
                selectedJob?.id === job.id ? "bg-primary/10 border-primary" : "border-transparent"
              )}
            >
              <p className="font-semibold truncate">{job.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building className="h-3 w-3" />
                <span>{job.company.name}</span>
              </div>
            </button>
          ))}
          {jobs.length === 0 && <p className="p-4 text-sm text-center text-muted-foreground">No jobs in this category.</p>}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

export default function ModerationPage() {
    const { toast } = useToast();
    const [jobs, setJobs] = useState<JobWithModStatus[]>(() => 
        DUMMY_JOBS.map((job, i) => {
            if (i < 5) return { ...job, moderationStatus: 'pending' };
            if (i >= 5 && i < 7) return { ...job, moderationStatus: 'flagged' };
            if (i >= 7 && i < 10) return { ...job, moderationStatus: 'approved' };
            return { ...job, moderationStatus: 'rejected' };
        })
    );

    const pendingJobs = useMemo(() => jobs.filter(j => j.moderationStatus === 'pending'), [jobs]);
    const flaggedJobs = useMemo(() => jobs.filter(j => j.moderationStatus === 'flagged'), [jobs]);
    const approvedJobs = useMemo(() => jobs.filter(j => j.moderationStatus === 'approved'), [jobs]);
    const rejectedJobs = useMemo(() => jobs.filter(j => j.moderationStatus === 'rejected'), [jobs]);
    
    const [selectedPendingJob, setSelectedPendingJob] = useState<Job | null>(pendingJobs[0] || null);
    const [selectedFlaggedJob, setSelectedFlaggedJob] = useState<Job | null>(flaggedJobs[0] || null);
    const [selectedApprovedJob, setSelectedApprovedJob] = useState<Job | null>(approvedJobs[0] || null);
    const [selectedRejectedJob, setSelectedRejectedJob] = useState<Job | null>(rejectedJobs[0] || null);
    
    const handleStatusChange = (jobId: string, status: ModerationStatus) => {
        setJobs(prevJobs => prevJobs.map(j => j.id === jobId ? { ...j, moderationStatus: status } : j));
    };

    const handleApprove = (jobId: string) => {
        handleStatusChange(jobId, 'approved');
        toast({ title: "Job Approved", description: "The job is now public.", variant: 'vibrant' });
    };

    const handleReject = (jobId: string) => {
        handleStatusChange(jobId, 'rejected');
        toast({ title: "Job Rejected", description: "The job has been moved to the rejected queue.", variant: 'destructive' });
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Job Moderation</h1>
        <p className="text-muted-foreground">Review and manage job posts to ensure quality and safety.</p>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="pending"><ShieldQuestion className="mr-2 text-primary"/> Pending Review</TabsTrigger>
            <TabsTrigger value="flagged"><FileSearch className="mr-2 text-chart-3"/> AI Flagged</TabsTrigger>
            <TabsTrigger value="approved"><ShieldCheck className="mr-2 text-accent"/> Approved</TabsTrigger>
            <TabsTrigger value="rejected"><ShieldX className="mr-2 text-destructive"/> Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <JobList jobs={pendingJobs} selectedJob={selectedPendingJob} onSelectJob={setSelectedPendingJob} title="Pending Queue" />
                </div>
                <div className="lg:col-span-2">
                    {selectedPendingJob ? (
                         <ModerationCard key={selectedPendingJob.id} job={selectedPendingJob} onApprove={handleApprove} onReject={handleReject} />
                    ) : (
                        <Card className="h-full flex items-center justify-center min-h-[676px]">
                            <p className="text-muted-foreground">Select a job to review.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
         <TabsContent value="flagged">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                     <JobList jobs={flaggedJobs} selectedJob={selectedFlaggedJob} onSelectJob={setSelectedFlaggedJob} title="Flagged Queue" />
                </div>
                <div className="lg:col-span-2">
                    {selectedFlaggedJob ? (
                        <ModerationCard key={selectedFlaggedJob.id} job={selectedFlaggedJob} aiFlagged onApprove={handleApprove} onReject={handleReject} />
                    ) : (
                         <Card className="h-full flex items-center justify-center min-h-[676px]">
                            <p className="text-muted-foreground">No flagged jobs to review.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="approved">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                     <JobList jobs={approvedJobs} selectedJob={selectedApprovedJob} onSelectJob={setSelectedApprovedJob} title="Approved Jobs" />
                </div>
                <div className="lg:col-span-2">
                    {selectedApprovedJob ? (
                        <ModerationCard key={selectedApprovedJob.id} job={selectedApprovedJob} onApprove={handleApprove} onReject={handleReject} />
                    ) : (
                         <Card className="h-full flex items-center justify-center min-h-[676px]">
                            <p className="text-muted-foreground">No approved jobs to display.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="rejected">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <JobList jobs={rejectedJobs} selectedJob={selectedRejectedJob} onSelectJob={setSelectedRejectedJob} title="Rejected Jobs" />
                </div>
                <div className="lg:col-span-2">
                     {selectedRejectedJob ? (
                        <ModerationCard key={selectedRejectedJob.id} job={selectedRejectedJob} onApprove={handleApprove} onReject={handleReject}/>
                    ) : (
                         <Card className="h-full flex items-center justify-center min-h-[676px]">
                            <p className="text-muted-foreground">No rejected jobs to display.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
