'use client';

import { DUMMY_BLOG_POSTS } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import BlogPostCard from './blog-post-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';
import { useEffect, useState } from 'react';

export default function LatestNews() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
        setLatestPosts(DUMMY_BLOG_POSTS.filter(p => p.status === 'Published').slice(0, 3));
        setIsLoading(false);
    }, 500);
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-secondary">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Our News and Stories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore articles, tips, and insights to help you grow your career and stay ahead.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full aspect-[3/2]" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                   <div className="mt-4 pt-4 border-t flex items-center justify-between">
                     <Skeleton className="h-4 w-16" />
                     <Skeleton className="h-10 w-10 rounded-full" />
                   </div>
                </CardContent>
              </Card>
            ))
          ) : (
            latestPosts?.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${200 + index * 100}ms` }}>
                <BlogPostCard post={post} />
              </div>
            ))
          )}
        </div>
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
            <Button asChild size="lg" variant="outline">
                <Link href="/blog">
                    Show More
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
