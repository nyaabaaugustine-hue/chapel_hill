'use client';

import dynamic from 'next/dynamic';

const AISupportWidget = dynamic(() => import('@/components/ai-support-widget'), {
  ssr: false,
});


export default function DynamicWidgetsWrapper() {
  return (
    <>
        <AISupportWidget />
    </>
  );
}
