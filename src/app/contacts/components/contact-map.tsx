import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactMap() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'contact-map');

  return (
    <Card className="shadow-lg overflow-hidden">
      {mapImage && (
        <div className="relative aspect-[16/6]">
          <Image
            src={mapImage.imageUrl}
            alt="Our Location"
            fill
            className="object-cover"
            data-ai-hint={mapImage.imageHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
           <div className="absolute bottom-4 left-4">
                <h3 className="font-headline text-2xl font-bold text-white">Find Us Here</h3>
                <p className="text-gray-200 text-sm">123 Job Seeker Lane, Accra, Ghana</p>
           </div>
        </div>
      )}
    </Card>
  );
}
    