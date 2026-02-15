'use client';

import { usePathname } from 'next/navigation';
import LiveActivityBar from '@/components/live-activity-bar';

export default function ConditionalLiveActivityBar() {
  const pathname = usePathname();

  // Do not show on any dashboard pages
  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer');

  if (isDashboardPage) {
    return null;
  }

  return <LiveActivityBar />;
}
