
'use client';

import { Suspense } from 'react';
import CheckoutForm, { CheckoutFormSkeleton } from './_components/checkout-form';


export default function CheckoutPage() {

  return (
      <main className="flex-1 flex flex-col items-center justify-center py-16 md:py-24 bg-secondary">
        <div className="relative z-20 container mx-auto max-w-4xl px-4 md:px-6">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold text-foreground">Complete Your Purchase</h1>
                <p className="mt-2 text-lg text-muted-foreground">You're just one step away from unlocking powerful hiring tools.</p>
            </div>
            <Suspense fallback={<CheckoutFormSkeleton />}>
                <CheckoutForm />
            </Suspense>
        </div>
      </main>
  );
}
