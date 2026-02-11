'use client';

import { useState, useEffect } from 'react';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Eye, Save, FileText, ListChecks, MessageSquareQuote, Users, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const JobCardSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <Separator />
        <div className="flex justify-between items-center pt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-8" />
        </div>
         <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
        </div>
         <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
);

const EmployerJobCard = ({ job }: { job: Job }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [postedAt, setPostedAt] = useState<string | null>(null);
  const applicantCount = DUMMY_APPLICANTS.filter(app => app.jobId === job.id).length;

  useEffect(() => {
    const getJobStatus = (postedDate: string) => {
      const daysSincePosted = (new Date().getTime() - new Date(postedDate).getTime()) / (1000 * 3600 * 24);
      return daysSincePosted > 30 ? 'Expired' : 'Active';
    };
    
    setStatus(getJobStatus(job.postedDate));
    setPostedAt(formatDistanceToNow(new Date(job.postedDate), { addSuffix: true }));
  }, [job.postedDate]);

  if (status === null || postedAt === null) {
    return <JobCardSkeleton />;
  }

  const statusBadgeClass = status === 'Active' 
    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
    : 'bg-destructive/10 text-destructive border-destructive/20';

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg leading-tight hover:text-primary"><Link href={`/jobs/${job.id}`}>{job.title}</Link></CardTitle>
                <CardDescription className="pt-1">{job.company.name}</CardDescription>
            </div>
            <Badge variant="outline" className={cn('font-semibold', statusBadgeClass)}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-0">
        <Separator />
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Applicants</span>
            <span className="font-semibold">{applicantCount}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</span>
            <span className="font-semibold">{job.location}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> Posted</span>
            <span className="font-semibold">{postedAt}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild><Link href={`/jobs/${job.id}`}>View Listing</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/employer/applicants">View Applicants</Link></DropdownMenuItem>
              <DropdownMenuItem>Edit Job</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Archive Job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default function EmployerJobsPage() {
  // Demo employer is "Innovate Inc." which has id '1'
  const employerJobs = DUMMY_JOBS.filter(job => job.company.id === '1');
  
  const [jobs] = useState<Job[]>(employerJobs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">My Job Listings</h1>
          <p className="text-muted-foreground">Manage all jobs you have posted.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent-gradient">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post a New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-headline text-2xl font-bold">Post a New Job</span>
                </div>
              </DialogTitle>
              <DialogDescription>
                Fill out the details below to find your next great hire.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details"><FileText className="mr-2" />Job Details</TabsTrigger>
                <TabsTrigger value="description"><ListChecks className="mr-2" />Description</TabsTrigger>
                <TabsTrigger value="screening"><MessageSquareQuote className="mr-2" />Screening</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="e.g., Senior React Developer" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., San Francisco, CA or Remote" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-type">Job Type</Label>
                      <Select>
                        <SelectTrigger id="job-type">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="salary-range">Salary Range</Label>
                      <Input id="salary-range" placeholder="e.g., GH₵120k - GH₵160k" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience-level">Experience Level</Label>
                      <Select>
                        <SelectTrigger id="experience-level">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry-level</SelectItem>
                          <SelectItem value="mid">Mid-level</SelectItem>
                          <SelectItem value="senior">Senior-level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="description">
                <div className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" placeholder="Describe the role, responsibilities, and qualifications..." rows={10} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input id="skills" placeholder="e.g., React, TypeScript, Next.js (comma-separated)" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="screening">
                <div className="space-y-4 pt-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Label htmlFor="question1" className="flex-1">What is your expected salary?</Label>
                    <Checkbox id="question1" checked/>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Label htmlFor="question2" className="flex-1">Are you authorized to work in the specified location?</Label>
                    <Checkbox id="question2" checked/>
                  </div>
                  <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Custom Question</Button>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="justify-end gap-4 border-t pt-6 mt-6">
              <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
              <Button size="lg" className="bg-accent-gradient"><Save className="mr-2 h-4 w-4" /> Save & Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by job title..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <EmployerJobCard key={job.id} job={job} />
        ))}
      </div>

       {filteredJobs.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">No jobs found.</p>
              </CardContent>
          </Card>
        )}
    </div>
  );
}
