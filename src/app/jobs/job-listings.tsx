'use client';

import { useState } from 'react';
import JobCard from '@/components/job-card';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Job } from '@/lib/types';
import JobFilters from '@/components/job-filters';

export default function JobListings({ initialJobs }: { initialJobs: Job[] }) {
  // Filtering logic can be added here using state
  const [jobs, setJobs] = useState(initialJobs);
  const jobCount = jobs.length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold">All Jobs</h1>
          <p className="text-muted-foreground">{jobCount} jobs found</p>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Open job filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Job Filters</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect job.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <JobFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
            <div className="md:col-span-2 xl:grid-cols-3 text-center text-muted-foreground p-8 bg-secondary rounded-lg">
                <p>No jobs found.</p>
            </div>
        )}
      </div>
    </>
  );
}
