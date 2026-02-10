import Image from 'next/image';
import Link from 'next/link';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  return (
    <Card className="flex h-full flex-col bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border hover:-translate-y-1.5">
      <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex items-start gap-4">
              {companyLogo && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary p-1 border">
                      <Image
                          src={companyLogo.imageUrl}
                          alt={`${job.company.name} logo`}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain rounded-full"
                      />
                  </div>
              )}
              <div className="flex-1">
                  <Link href={`/jobs/${job.id}`} className="group">
                    <h3 className="font-semibold text-foreground group-hover:text-primary text-lg">{job.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{job.company.name}</p>
              </div>
          </div>

          <div className="my-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-sm font-normal">{job.location}</Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-sm font-normal">{job.type}</Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-sm font-normal">{job.experienceLevel}</Badge>
          </div>
          
          <div className="flex-grow"></div>

          <div className="flex items-center justify-between mt-auto">
              <p className="font-semibold text-primary">{job.salaryRange}</p>
              <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 hover:text-primary rounded-lg">
                  <Link href={`/jobs/${job.id}`}>
                    Apply
                  </Link>
              </Button>
          </div>
      </CardContent>
    </Card>
  );
}
