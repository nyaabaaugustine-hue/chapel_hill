import { DUMMY_JOBS } from '@/lib/data';
import ModerationCard from '@/app/admin/components/moderation-card';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSearch, ShieldCheck, ShieldX, ShieldQuestion } from 'lucide-react';
import React from 'react';

type EmptyStateProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const EmptyState = ({icon, title, description}: EmptyStateProps) => (
     <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-24 rounded-lg border-2 border-dashed bg-secondary/50">
        <div className="h-16 w-16 bg-card rounded-full flex items-center justify-center mb-4 text-muted-foreground">
            {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8" })}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
    </div>
)


export default function ModerationPage() {
    const pendingJobs = DUMMY_JOBS.slice(0, 3);
    const flaggedJobs = DUMMY_JOBS.slice(3, 5);
    const approvedJobs = DUMMY_JOBS.slice(5, 8);
    const rejectedJobs = DUMMY_JOBS.slice(8, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Job Moderation</h1>
        <p className="text-muted-foreground">Review and manage job posts to ensure quality and safety.</p>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="pending">Pending Review ({pendingJobs.length})</TabsTrigger>
            <TabsTrigger value="flagged">AI Flagged ({flaggedJobs.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedJobs.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedJobs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
                {pendingJobs.length > 0 ? (
                    pendingJobs.map((job) => (
                        <ModerationCard key={job.id} job={job} />
                    ))
                ) : (
                    <EmptyState 
                        icon={<FileSearch />}
                        title="No Pending Jobs"
                        description="All jobs have been reviewed. Great work!"
                    />
                )}
            </div>
        </TabsContent>
         <TabsContent value="flagged" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
                 {flaggedJobs.length > 0 ? (
                    flaggedJobs.map((job) => (
                        <ModerationCard key={job.id} job={job} aiFlagged />
                    ))
                ) : (
                     <EmptyState 
                        icon={<ShieldQuestion />}
                        title="No Flagged Jobs"
                        description="The AI has not found any suspicious jobs."
                    />
                )}
            </div>
        </TabsContent>
        <TabsContent value="approved" className="mt-6">
             <div className="grid gap-6 lg:grid-cols-2">
                 {approvedJobs.length > 0 ? (
                    approvedJobs.map((job) => (
                        <ModerationCard key={job.id} job={job} />
                    ))
                ) : (
                     <EmptyState 
                        icon={<ShieldCheck />}
                        title="No Approved Jobs"
                        description="You haven't approved any jobs yet."
                    />
                )}
            </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
             <div className="grid gap-6 lg:grid-cols-2">
                 {rejectedJobs.length > 0 ? (
                    rejectedJobs.map((job) => (
                        <ModerationCard key={job.id} job={job} />
                    ))
                 ) : (
                    <EmptyState 
                        icon={<ShieldX />}
                        title="No Rejected Jobs"
                        description="You haven't rejected any jobs yet."
                    />
                )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
