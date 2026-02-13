'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PartyPopper } from 'lucide-react';

// Small, self-contained data to avoid pulling in the entire data.ts file
const hiredExamples = [
  { name: 'Kofi Mensah', job: 'Senior React Developer', avatarId: 'avatar-2' },
  { name: 'Ama Serwaa', job: 'UX/UI Designer', avatarId: 'avatar-1' },
  { name: 'Yaw Adjei', job: 'Product Manager', avatarId: 'avatar-4' },
  { name: 'Esi Owusu', job: 'Data Scientist', avatarId: 'avatar-5' },
];

export default function HiredNotification() {
  const { toast } = useToast();

  useEffect(() => {
    const showRandomHiredNotification = () => {
      const example = hiredExamples[Math.floor(Math.random() * hiredExamples.length)];
      const userAvatar = PlaceHolderImages.find((img) => img.id === example.avatarId);

      toast({
        variant: 'vibrant',
        description: (
          <div className="flex items-center gap-4">
            <PartyPopper className="h-8 w-8 shrink-0 text-yellow-300" />
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white/50">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={example.name} />}
                <AvatarFallback>{example.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{`${example.name.split(' ')[0]} was hired!`} 🇬🇭</p>
                <p>{`For the ${example.job} role.`}</p>
              </div>
            </div>
          </div>
        ),
      });
    };

    const interval = setInterval(showRandomHiredNotification, 30000); 

    return () => {
      clearInterval(interval);
    };
  }, [toast]);

  return null;
}
