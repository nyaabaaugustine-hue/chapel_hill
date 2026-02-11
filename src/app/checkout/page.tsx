'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import CheckoutForm from './_components/checkout-form';

export default function CheckoutPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 relative flex flex-col items-center justify-center py-16 md:py-24">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto max-w-4xl px-4 md:px-6">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold text-white">Complete Your Purchase</h1>
                <p className="mt-2 text-lg text-gray-200">You're just one step away from unlocking powerful hiring tools.</p>
            </div>
            <Suspense fallback={
                <div className="text-center text-white">
                    <p>Loading checkout...</p>
                </div>
            }>
                <CheckoutForm />
            </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
