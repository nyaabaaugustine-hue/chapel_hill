
'use client';

import { Suspense } from 'react';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import CheckoutForm from './_components/checkout-form';

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Complete Your Purchase"
        subtitle="You're just one step away from unlocking powerful hiring tools."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <Suspense fallback={<div>Loading...</div>}>
                <CheckoutForm />
            </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
