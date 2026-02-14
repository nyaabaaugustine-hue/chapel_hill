
import JobFilters from '@/components/job-filters';
import PageHero from '@/components/shared/page-hero';
import { DUMMY_JOBS } from '@/lib/data';
import JobListings from './job-listings';

export default function JobSearchPage() {
  const jobs = DUMMY_JOBS;
  const jobCount = jobs.length;

  return (
    <>
      <PageHero
        title="Find Your Next Opportunity"
        subtitle={`Browse through ${jobCount} open positions to find your perfect match.`}
      />
      <main className="flex flex-1 bg-secondary/30">
        <aside className="hidden w-80 border-r bg-background p-4 lg:block">
          <div className="sticky top-24">
            <JobFilters />
          </div>
        </aside>
        <div className="flex-1 p-4 lg:p-6">
            <JobListings initialJobs={jobs} />
        </div>
      </main>
    </>
  );
}
