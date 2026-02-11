'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Building, UserX, FileWarning } from 'lucide-react';

const moderationItems = [
    { title: "Jobs pending approval", count: 5, icon: <FileWarning/>, href: "/admin/moderation" },
    { title: "Companies pending verification", count: 2, icon: <Building/>, href: "/admin/users" },
    { title: "Reported listings", count: 1, icon: <UserX/>, href: "/admin/moderation" },
];

export default function ModerationCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Center</CardTitle>
        <CardDescription>Quick actions for platform integrity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {moderationItems.map(item => (
            <div key={item.title} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="text-muted-foreground">{item.icon}</div>
                    <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.count} items</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
