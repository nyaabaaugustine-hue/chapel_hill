'use client';

import PageHero from '@/components/shared/page-hero';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Search,
  Building,
  Briefcase,
  Star,
  GraduationCap,
  LayoutGrid,
  Handshake,
  DollarSign,
  Users,
  MapPin,
  Newspaper,
  Mail,
} from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: Search,
    title: 'Hero Section & Search Bar',
    description: "The first element visitors see. It's designed to immediately capture attention with a strong value proposition ('Find Your Next Job, Faster.') and provides an instant call-to-action with the prominent search bar.",
    value: "This section maximizes user engagement and minimizes bounce rates by guiding users directly to the platform's core function: searching for jobs. The 'trust indicators' below the search bar build immediate credibility.",
  },
  {
    icon: Building,
    title: 'Top Companies Hiring',
    description: "This section acts as powerful social proof. By showcasing well-known and respected companies, we build trust and signal the high quality of opportunities available on the platform.",
    value: "Attracts high-caliber candidates who are looking to work for leading firms. It also creates a network effect, encouraging other top companies to post jobs to be featured alongside their peers.",
  },
  {
    icon: Briefcase,
    title: 'Featured Jobs',
    description: 'A curated list of recent and relevant job postings. The category filter allows users to quickly personalize the listings, making their initial exploration more effective and engaging.',
    value: "Keeps the homepage content fresh and dynamic, encouraging repeat visits. It helps users discover relevant roles immediately, which increases the likelihood of them starting the application process.",
  },
  {
    icon: Star,
    title: 'Why Choose Us?',
    description: "This section clearly articulates our unique value proposition. It directly answers the user's question, 'Why should I use this platform?' with tangible, data-backed benefits like faster hiring, verified employers, and accurate matching.",
    value: 'This is crucial for differentiation in a competitive market. It builds a strong case for why our platform is superior, fostering user trust and encouraging them to commit to creating a profile or posting a job.',
  },
  {
    icon: GraduationCap,
    title: 'Kickstart Your Career (Student Opportunities)',
    description: 'A dedicated area for internships and volunteer positions. This targets the student and recent graduate demographic, providing them with valuable entry points into the professional world.',
    value: 'Broadens our user base by capturing the next generation of professionals early in their careers. It also fulfills a community-building role, enhancing our brand reputation as a platform that supports career growth at all stages.',
  },
  {
    icon: LayoutGrid,
    title: 'Browse by Category',
    description: 'Provides an alternative job discovery path for users who prefer browsing by their field of expertise rather than using specific keywords. It visually showcases the breadth of industries we serve.',
    value: "Improves the user experience by catering to different search behaviors. This ensures more jobs get visibility and helps users explore roles they might not have thought to search for directly.",
  },
  {
    icon: Handshake,
    title: 'For Employers: Hire Top-Tier Talent',
    description: 'A prominent call-to-action specifically for our second key audience: employers. It clearly summarizes the benefits for them, such as accessing a qualified candidate pool and easy job posting.',
    value: "This is a primary driver for the 'supply' side of our marketplace. Attracting more employers leads to more job postings, which in turn attracts more job seekers, creating a virtuous cycle.",
  },
  {
    icon: DollarSign,
    title: 'Flexible Pricing Section',
    description: 'Transparently displays the subscription tiers for employers. This section details the features and costs associated with each plan, from a free entry point to enterprise solutions.',
    value: 'This section is our core monetization engine. By clearly outlining the value at each price point, we enable employers to self-serve and choose the right plan, streamlining our sales process and generating revenue.',
  },
  {
    icon: Users,
    title: 'What Our Users Say (Testimonials)',
    description: 'Features authentic reviews from both job seekers and employers. These testimonials serve as powerful, real-world endorsements of the platform’s effectiveness and reliability.',
    value: 'Social proof is one of the most effective tools for building trust. Positive testimonials significantly increase conversion rates for both new user registrations and employer sign-ups.',
  },
  {
    icon: MapPin,
    title: 'Jobs by Location',
    description: 'Allows users to browse job opportunities based on specific geographic areas. This is a critical search parameter for a large segment of job seekers who are not looking for remote work.',
    value: 'Directly addresses a primary user need, improving the relevance of job search results and enhancing the overall user experience. It also provides valuable, SEO-friendly landing pages for location-based searches.',
  },
  {
    icon: Newspaper,
    title: 'Latest News & Blog',
    description: 'This section showcases articles and insights, positioning Chapel Hill as a thought leader and career resource hub, not just a transactional job board. It provides ongoing value to users.',
    value: 'Drives organic traffic through SEO, builds a loyal community, and keeps users engaged with our brand even when not actively job searching. This fosters long-term user retention.',
  },
  {
    icon: Mail,
    title: 'Job Alerts Subscription',
    description: 'A direct lead-capture tool that encourages users to subscribe to email updates for new job postings. This is a simple but highly effective re-engagement mechanism.',
    value: 'Creates a powerful, low-cost channel to bring users back to the platform. By proactively sending relevant opportunities, we increase the chances of a successful job match and keep our platform top-of-mind.',
  },
];

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, value, index }) => (
    <Card className="flex flex-col animate-in fade-in-up duration-500" style={{ animationDelay: `${index * 100}ms` }}>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <div>
                <h4 className="font-semibold text-muted-foreground">Purpose</h4>
                <p className="text-foreground/90">{description}</p>
            </div>
            <div>
                <h4 className="font-semibold text-muted-foreground">Business Value</h4>
                <p className="text-foreground/90">{value}</p>
            </div>
        </CardContent>
    </Card>
);

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        title="Homepage Feature Showcase"
        subtitle="A strategic breakdown of each component on our homepage, designed to drive user engagement and achieve our business goals."
      />
      <main className="flex-1 py-16 md:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}