

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  Users,
  Star,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_BLOG_POSTS } from '@/lib/data';
import JobCard from '@/components/job-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import BlogPostCard from '@/components/blog-post-card';


export default function HomePage() {
  const heroBanner1 = PlaceHolderImages.find((img) => img.id === 'hero-banner-1');
  const heroBanner2 = PlaceHolderImages.find((img) => img.id === 'hero-banner-2');
  const jobsByLocationImage = PlaceHolderImages.find((img) => img.id === 'chart-image');

  const jobsOfTheDay = DUMMY_JOBS.slice(0, 8);

  const jobCategories = [
    { name: 'Human Resource', imageId: 'category-human-resource', jobCount: 10 },
    { name: 'Content Writer', imageId: 'category-content-writer', jobCount: 29 },
    { name: 'Marketing & Sale', imageId: 'category-marketing-sale', jobCount: 9 },
    { name: 'Finance', imageId: 'category-finance', jobCount: 9 },
    { name: 'Management', imageId: 'category-management', jobCount: 6 },
    { name: 'Market Research', imageId: 'category-market-research', jobCount: 7 },
    { name: 'Customer Help', imageId: 'category-customer-help', jobCount: 4 },
    { name: 'Software', imageId: 'category-software', jobCount: 4 },
  ];
  
  const topRecruiters = DUMMY_COMPANIES.slice(0, 12);
  const blogPosts = DUMMY_BLOG_POSTS.slice(0, 3);
  
  const locations = [
    { name: 'Paris, France', companies: 3, jobs: 5 },
    { name: 'London, England', companies: 4, jobs: 3 },
    { name: 'New York, USA', companies: 3, jobs: 4 },
    { name: 'New York, Holland', companies: 3, jobs: 5 },
    { name: 'Copenhagen, Denmark', companies: 4, jobs: 9 },
    { name: 'Berlin, Germany', companies: 3, jobs: 3 },
  ];

  const categoryPairs = [];
  for (let i = 0; i < jobCategories.length; i += 2) {
      categoryPairs.push(jobCategories.slice(i, i + 2));
  }


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full bg-secondary py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  The Easiest Way to Get Your New Job
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Each month, more than 3 million job seekers turn to website in their search for work, making over
                  140,000 applications every single day.
                </p>
                <div className="rounded-lg bg-card p-4 shadow-md">
                  <form className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="search" placeholder="Job title, keyword..." className="w-full pl-10" />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="search" placeholder="City, state, or zip code" className="w-full pl-10" />
                    </div>
                    <Button type="submit" className="w-full">
                      Find Jobs
                    </Button>
                  </form>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Popular Searches:</span>
                  <Badge variant="outline">Design</Badge>
                  <Badge variant="outline">Development</Badge>
                  <Badge variant="outline">Manager</Badge>
                  <Badge variant="outline">Senior</Badge>
                </div>
              </div>
              <div className="relative hidden items-center justify-center md:flex">
                <div className="grid grid-cols-2 gap-4">
                  {heroBanner1 && (
                    <Image
                      src={heroBanner1.imageUrl}
                      alt={heroBanner1.description}
                      width={250}
                      height={250}
                      className="rounded-xl object-cover shadow-lg"
                      data-ai-hint={heroBanner1.imageHint}
                    />
                  )}
                  <div className="h-full w-full"></div>
                  <div className="h-full w-full"></div>
                  {heroBanner2 && (
                    <Image
                      src={heroBanner2.imageUrl}
                      alt={heroBanner2.description}
                      width={250}
                      height={250}
                      className="rounded-xl object-cover shadow-lg"
                      data-ai-hint={heroBanner2.imageHint}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Browse by category</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Find the job that’s perfect for you. about 800+ new jobs everyday
              </p>
            </div>
             <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {categoryPairs.map((pair, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                        <div className="flex flex-col gap-4">
                            {pair.map(category => {
                                const categoryImage = PlaceHolderImages.find((img) => img.id === category.imageId);
                                return (
                                    <Link href="/jobs" key={category.name} className="block">
                                        <Card className="group p-4 flex items-center gap-4 transition-all hover:shadow-lg hover:border-primary">
                                            {categoryImage ? (
                                              <Image
                                                src={categoryImage.imageUrl}
                                                alt={category.name}
                                                width={48}
                                                height={48}
                                                className="rounded-lg object-cover h-12 w-12"
                                                data-ai-hint={categoryImage.imageHint}
                                              />
                                            ) : (
                                              <div className="h-12 w-12 rounded-lg bg-muted flex-shrink-0" />
                                            )}
                                            <div>
                                            <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {category.jobCount} Jobs Available
                                            </p>
                                            </div>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
            </Carousel>
          </div>
        </section>

        {/* Hiring Banner Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-8 rounded-lg bg-primary/10 p-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="font-headline text-3xl font-bold text-foreground">We are HIRING</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Let’s Work Together & Explore Opportunities
                </p>
              </div>
              <div className="text-left md:text-right">
                <Button size="lg" asChild>
                  <Link href="/employer/jobs/new">
                    Post a Job <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Jobs of the day Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Jobs of the day</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Search and connect with the right candidates faster.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {jobsOfTheDay.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/jobs">
                  Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Top Recruiters Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Top Recruiters</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Discover your next career move, freelance gig, or internship
              </p>
            </div>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {topRecruiters.map((company) => {
                  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
                  return (
                    <CarouselItem key={company.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                      <Card className="text-center p-4 h-full flex flex-col items-center justify-center">
                        {companyLogo &&
                          <Image
                            src={companyLogo.imageUrl}
                            alt={`${company.name} logo`}
                            width={64}
                            height={64}
                            className="mb-4 rounded-full"
                          />
                        }
                        <Link href={`/companies/${company.id}`}>
                          <h3 className="font-semibold hover:text-primary">{company.name}</h3>
                        </Link>
                       <div className="flex justify-center items-center my-2">
                          {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < company.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                          ))}
                       </div>
                      <p className="text-sm text-muted-foreground">{company.location}</p>
                      <Button variant="outline" size="sm" asChild className="mt-2">
                          <Link href={`/companies/${company.id}`}>{company.activeJobs} Jobs</Link>
                      </Button>
                    </Card>
                  </CarouselItem>
                )})}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
            </Carousel>
          </div>
        </section>

        {/* Jobs by Location Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {jobsByLocationImage && (
                  <Image
                    src={jobsByLocationImage.imageUrl}
                    alt={jobsByLocationImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint={jobsByLocationImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h2 className="font-headline text-3xl font-bold">Jobs by Location</h2>
                <p className="text-muted-foreground mt-2">Find your favourite jobs and get the benefits of yourself</p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {locations.map((loc) => (
                    <Link href="/jobs" key={loc.name}>
                      <div
                        className="rounded-lg border bg-card p-4 hover:shadow-md hover:border-primary transition-all"
                      >
                        <h3 className="font-semibold">{loc.name}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{loc.companies} companies</span>
                          <span>{loc.jobs} jobs</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News and Blog Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">News and Blog</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Get the latest news, updates and tips
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                New Things Will Always Update Regularly
              </h2>
              <div className="mt-8 flex max-w-md mx-auto">
                <Input type="email" placeholder="Enter Your Email" className="rounded-r-none focus:z-10" />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
