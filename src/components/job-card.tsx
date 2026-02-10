import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';

import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  const isHourly = job.salaryRange.includes('/hr');
  const salary = isHourly ? job.salaryRange.replace('/hr', '') : job.salaryRange;
  const period = isHourly ? 'Hourly' : 'yearly';

  return (
    <Card className="flex h-full flex-col p-6 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border">
      <CardHeader className="flex flex-row items-start gap-4 p-0">
          {companyLogo && (
              <Link href={`/companies/${job.company.id}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary p-1 border">
                      <Image
                          src={companyLogo.imageUrl}
                          alt={`${job.company.name} logo`}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                      />
                  </div>
              </Link>
          )}
          <div className="flex-1">
              <Link href={`/companies/${job.company.id}`} className="hover:text-primary font-semibold text-lg">
                {job.company.name}
              </Link>
              <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0 mt-4">
            <Link href={`/jobs/${job.id}`} className="group">
              <h3 className="font-semibold text-foreground group-hover:text-primary text-xl leading-tight">{job.title}</h3>
            </Link>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
             <Badge variant="outline" className="rounded-full">{job.type}</Badge>
             <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
             </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-3 line-clamp-3 flex-grow">{job.description}</p>

      </CardContent>
       <CardFooter className="p-0 mt-4 flex items-center justify-between">
            <div className="text-lg">
                <span className="font-bold text-primary">{salary}</span>
                <span className="text-sm text-muted-foreground font-normal">/{period}</span>
            </div>
            <Button asChild className="rounded-lg transform transition-transform hover:scale-105">
                <Link href={`/jobs/${job.id}`}>
                  Apply
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
