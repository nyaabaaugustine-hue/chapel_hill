'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import Logo from '@/components/shared/logo';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 grid h-16 grid-cols-3 items-center border-b bg-background/95 px-4 backdrop-blur-sm md:hidden">
      <div className="justify-self-start">
        <SidebarTrigger />
      </div>
      <div className="justify-self-center">
        <Logo />
      </div>
    </header>
  );
}
