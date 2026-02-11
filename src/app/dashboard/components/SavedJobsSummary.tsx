
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DUMMY_JOBS } from '@/lib/data';
import { ArrowRight, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SavedJobsSummary() {
  const savedJobs = DUMMY_JOBS.filter((job, index) => [3, 4, 6, 8, 10].includes(index));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="flex items-center gap-2"><Bookmark /> Saved Jobs</CardTitle>
            <CardDescription>Jobs you are keeping an eye on.</CardDescription>
        </div>
         <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/applications">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {savedJobs.slice(0, 3).map(job => {
             const logo = PlaceHolderImages.find((p) => p.id === job.company.logo);
            return (
             <div key={job.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-secondary/50 transition-colors">
                {logo && 
                    <div className="bg-background rounded-md p-1 border">
                        <Image src={logo.imageUrl} alt={job.company.name} width={32} height={32} />
                    </div>
                }
                <div className="flex-1">
                    <Link href={`/jobs/${job.id}`} className="font-semibold text-sm hover:text-primary leading-tight line-clamp-1">{job.title}</Link>
                    <p className="text-xs text-muted-foreground">{job.company.name}</p>
                </div>
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/jobs/${job.id}`}>View</Link>
                </Button>
            </div>
           )
        })}
      </CardContent>
    </Card>
  );
}
