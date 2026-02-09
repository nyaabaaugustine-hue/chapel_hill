import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_USERS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, Users, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const pendingModerationCount = 5;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">A high-level view of the platform's activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_JOBS.length}</div>
            <p className="text-xs text-muted-foreground">active job listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_COMPANIES.length}</div>
            <p className="text-xs text-muted-foreground">registered companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_USERS.length}</div>
            <p className="text-xs text-muted-foreground">job seekers and employers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Moderation</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingModerationCount}</div>
            <Link href="/admin/moderation" className="text-xs text-muted-foreground hover:underline">
              Review job posts
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
