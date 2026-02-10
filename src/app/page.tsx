
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase,
  CheckCircle,
  MapPin,
  Search,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');

  const trustIndicators = [
    { text: '12,430 jobs available' },
    { text: '4,500 companies hiring' },
    { text: '98% candidate satisfaction' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl !leading-tight">
                Find Work That Moves Your Career Forward
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                The Easiest Way to Get Your New Job. Each month, more than 3 million job seekers turn to our website in their search for work.
              </p>
               <div className="rounded-lg bg-card p-4 shadow-md border">
                <form className="flex items-center flex-col sm:flex-row gap-4">
                  <div className="flex w-full items-center">
                    <Briefcase className="h-5 w-5 text-muted-foreground mx-3" />
                    <Input id="job-title" type="search" placeholder="Job title, keyword" className="border-none focus-visible:ring-0 text-base" />
                  </div>
                   <Separator orientation="vertical" className="h-8 hidden sm:block" />
                   <div className="flex w-full items-center">
                     <MapPin className="h-5 w-5 text-muted-foreground mx-3" />
                    <Input id="location" type="search" placeholder="City or zip code" className="border-none focus-visible:ring-0 text-base" />
                   </div>
                  <Button type="submit" size="lg" className="font-semibold text-base w-full sm:w-auto">
                    Find Jobs
                  </Button>
                </form>
              </div>
              <div className="flex items-center gap-6 pt-4 flex-wrap">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              {heroImage && 
                <Image src={heroImage.imageUrl} alt={heroImage.description} width={550} height={550} className="rounded-lg shadow-2xl object-cover" data-ai-hint={heroImage.imageHint} priority />
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
