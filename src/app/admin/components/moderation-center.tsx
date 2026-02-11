'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, UserX, FileWarning } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const moderationItems = [
    { title: "Jobs pending approval", count: 5, icon: <FileWarning/>, href: "/admin/moderation", color: 'yellow' },
    { title: "Companies pending verification", count: 2, icon: <Building/>, href: "/admin/users", color: 'blue' },
    { title: "Reported listings", count: 1, icon: <UserX/>, href: "/admin/moderation", color: 'red' },
];

const colorClasses = {
    yellow: { text: 'text-yellow-500' },
    blue: { text: 'text-blue-500' },
    red: { text: 'text-red-500' },
}

export default function ModerationCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Center</CardTitle>
        <CardDescription>Quick actions for platform integrity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {moderationItems.map(item => {
            const colors = colorClasses[item.color as keyof typeof colorClasses] || colorClasses.yellow;
            return (
                <div key={item.title} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className={colors.text}>
                            {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                        </div>
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.count} items</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                    </div>
                </div>
            )
        })}
      </CardContent>
    </Card>
  );
}
