'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_USERS, DUMMY_JOBS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function HiredNotification() {
  const { toast } = useToast();

  useEffect(() => {
    const showRandomHiredNotification = () => {
      const randomUser = DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)];
      const randomJob = DUMMY_JOBS[Math.floor(Math.random() * DUMMY_JOBS.length)];
      const userAvatar = PlaceHolderImages.find((img) => img.id === randomUser.avatar);

      toast({
        description: (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={randomUser.name} />}
              <AvatarFallback>{randomUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{`${randomUser.name.split(' ')[0]} was hired!`}</p>
              <p className="text-xs text-muted-foreground">{`For the ${randomJob.title} role.`}</p>
            </div>
          </div>
        ),
      });
    };

    // Show the first notification after a short delay
    const initialTimeout = setTimeout(showRandomHiredNotification, 8000);

    // Then show notifications periodically
    const interval = setInterval(showRandomHiredNotification, 20000); // every 20 seconds

    // Cleanup on unmount
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [toast]);

  return null;
}
