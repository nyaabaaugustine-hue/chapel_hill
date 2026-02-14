'use client';

import { Award, Briefcase, Building, CheckCircle } from 'lucide-react';

const activityItems = [
  { icon: Briefcase, metric: '12,430', label: 'Jobs Available' },
  { icon: Building, metric: '4,500', label: 'Companies Hiring' },
  { icon: CheckCircle, metric: '98%', label: 'Candidate Satisfaction' },
  { icon: Award, metric: '320', label: 'Hires This Week' },
];

export default function LiveActivityBar() {
  return (
    <div className="sticky top-[80px] z-40 w-full overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-blue-600 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-purple-700 to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap">
        {/* Render items twice for seamless loop */}
        {[...activityItems, ...activityItems].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-2 py-2 px-8 text-white">
            <div className="rounded-lg bg-white/10 p-1">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-base font-bold">{item.metric}</p>
              <p className="text-xs opacity-80">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
