
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Search,
  Star,
  Briefcase,
  Book,
  PenTool,
  Target,
  Code,
  Palette,
  Package,
  Megaphone,
  Landmark,
  TrendingUp,
  Users,
  Headset,
  CheckCircle,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_REVIEWS, DUMMY_BLOG_POSTS, JOB_CATEGORIES, LOCATIONS } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import BlogPostCard from '@/components/blog-post-card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import JobCard from '@/components/job-card';

export default function HomePage() {
  const topRecruiters = DUMMY_COMPANIES.slice(0, 12);
  const blogPosts = DUMMY_BLOG_POSTS.slice(0, 3);
  const jobsOfTheDay = DUMMY_JOBS.slice(0, 6);

  const howItWorks = [
    {
      icon: <Book size={32} className="text-primary"/>,
      title: 'Register an account',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <PenTool size={32} className="text-primary"/>,
      title: 'Specify & search your job',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <Target size={32} className="text-primary"/>,
      title: 'Apply for job',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    Code: Code,
    Palette: Palette,
    Package: Package,
    Megaphone: Megaphone,
    Landmark: Landmark,
    TrendingUp: TrendingUp,
    Users: Users,
    Headset: Headset,
  };

  const trustIndicators = [
    { text: '12,430 jobs available' },
    { text: '4,500 companies hiring' },
    { text: '98% candidate satisfaction' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-24">
          <div className="absolute inset-0 bg-hero-glow -z-10"></div>
          <div className="container mx-auto grid max-w-screen-xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-12 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="font-body text-5xl font-extrabold tracking-tight sm:text-6xl !leading-tight">
                Find Work That Moves Your Career Forward
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Clear, calm, no fluff.
              </p>
              <div className="rounded-2xl bg-background p-4 shadow-xl border border-border/50">
                <form className="flex items-center h-[72px]">
                  <div className="flex flex-1 items-center h-full">
                    <Search className="h-5 w-5 text-muted-foreground mx-4" />
                    <Input id="job-title" type="search" placeholder="Job title, keyword..." className="border-none focus-visible:ring-0 h-full text-base" />
                    <Separator orientation="vertical" className="h-8" />
                     <MapPin className="h-5 w-5 text-muted-foreground mx-4" />
                    <Input id="location" type="search" placeholder="City or zip code" className="border-none focus-visible:ring-0 h-full text-base" />
                  </div>
                  <Button type="submit" className="bg-accent-gradient rounded-xl h-[52px] px-6 font-semibold text-base hover:scale-105 transition-transform">
                    Find Jobs
                  </Button>
                </form>
              </div>
              <div className="flex items-center gap-6 pt-4">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              <div className="w-full max-w-md space-y-4">
                <div className="transform -rotate-3 transition-transform hover:rotate-0 hover:scale-105">
                  <JobCard job={DUMMY_JOBS[0]} />
                </div>
                <div className="transform rotate-2 transition-transform hover:rotate-0 hover:scale-105 ml-12">
                   <JobCard job={DUMMY_JOBS[1]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">
                Browse by Category
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Find the job that fits your skills. Over 800 new jobs posted daily.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
              {JOB_CATEGORIES.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Link href="/jobs" key={category.name} className="group block">
                    <div className={cn(
                        "h-full rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
                         category.bgColor
                    )}>
                       <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg mb-2 mx-auto", category.iconBgColor)}>
                          {IconComponent && <IconComponent className={cn("h-6 w-6", category.color)} />}
                        </div>
                        <h3 className={cn("font-semibold text-sm", category.color)}>
                          {category.name}
                        </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Jobs of the day Section */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Featured Jobs</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Search and connect with the right candidates faster.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {jobsOfTheDay.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))}
            </div>
             <div className="mt-12 text-center">
                <Button asChild size="lg" variant="outline">
                    <Link href="/jobs">
                    Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>

         {/* How it works */}
        <section className="py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">How It Works?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Just 3 easy steps to new opportunities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="p-6 md:p-8 text-center bg-background shadow-sm border-border/80">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Recruiters Section */}
        <section className="bg-background py-20 lg:py-24">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Top Recruiters</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Discover your next career move, freelance gig, or internship
              </p>
            </div>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {topRecruiters.map((company) => {
                  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
                  return (
                    <CarouselItem key={company.id} className="pl-4 md:basis-1/3 lg:basis-1/6">
                      <Card className="text-center p-4 h-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1">
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
            </Carousel>
          </div>
        </section>
        
       {/* Testimonials */}
        <section className="py-20 lg:py-24 bg-secondary">
            <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">What Our Customers Say</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Hear from satisfied job seekers and recruiters who found success with JobBox.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {DUMMY_REVIEWS.map((review) => {
                          const userAvatar = PlaceHolderImages.find(img => img.id === review.user.avatar);
                          return (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col bg-background">
                                    <CardContent className="flex-grow p-6">
                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground">"{review.comment}"</p>
                                    </CardContent>
                                    <CardContent className="p-6 bg-secondary/50 border-t">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                                                {userAvatar && <Image src={userAvatar.imageUrl} alt={review.user.name} width={48} height={48} className="object-cover"/>}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{review.user.name}</p>
                                                <p className="text-sm text-muted-foreground">{review.user.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                          );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex"/>
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex"/>
                </Carousel>
            </div>
        </section>

        {/* News and Blog Section */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">News and Blog</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Get the latest news, updates and tips
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
             <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/blog">
                    View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter CTA Section */}
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                New Things Will Always Update Regularly
              </h2>
              <div className="mt-8 flex max-w-md mx-auto">
                <Input type="email" placeholder="Enter Your Email" className="rounded-r-none focus:z-10 text-foreground" />
                <Button type="submit" variant="secondary" className="rounded-l-none">
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
