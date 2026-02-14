import { FileText, Video, Mail, Handshake } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SectionHeader from './shared/section-header';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: FileText,
    title: 'Create Impactful CVs',
    description: 'Attract top recruiters with a CV that shows your value. Upload existing CV or build one from scratch in minutes!',
    align: 'right',
  },
  {
    icon: Video,
    title: 'Practice For Interviews',
    description: 'Build confidence for your next interview with tailored interview questions, expert tips, and instant mock interview simulations.',
    align: 'right',
  },
  {
    icon: Mail,
    title: 'Generate Tailored Cover Letters',
    description: 'Get custom cover letters matching your experience to any role in seconds, just select your CV and add the job details.',
    align: 'left',
  },
  {
    icon: Handshake,
    title: 'Confidently Negotiate Offers',
    description: 'Secure the best salary & benefits offer by negotiating your worth. Upload your offer, get fair counteroffers, and ready-to-use emails.',
    align: 'left',
  },
];

const FeatureCard = ({ icon: Icon, title, description, align }: typeof features[0]) => (
  <div className={cn(
    'text-foreground',
    align === 'right' ? 'lg:text-right' : 'lg:text-left', 'text-center'
  )}>
    <div className={cn(
      'inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4'
    )}>
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function AiPoweredTools() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'ai-tools-hero');

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Own your career one bold step at a time"
          subtitle="Go from apply to you're hired as our AI-powered tool gives you an advantage in today's competitive job market."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 mt-12">
          <div className="space-y-12">
            <FeatureCard {...features[0]} />
            <FeatureCard {...features[1]} />
          </div>

          <div className="hidden lg:block relative group">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={500}
                height={500}
                className="object-contain w-full aspect-square"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
          
          <div className="lg:hidden flex items-center justify-center relative my-8">
             {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={300}
                height={300}
                className="object-contain w-full max-w-xs aspect-square"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>

          <div className="space-y-12">
            <FeatureCard {...features[2]} />
            <FeatureCard {...features[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
