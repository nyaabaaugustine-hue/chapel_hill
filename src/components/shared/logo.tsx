import { School } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <School className="h-7 w-7 text-primary" />
      {!iconOnly && (
        <span className="font-headline text-2xl font-bold text-foreground">Chapel Hill</span>
      )}
    </div>
  );
}
