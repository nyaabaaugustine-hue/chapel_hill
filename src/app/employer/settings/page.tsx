'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, CreditCard, Bell, UserPlus, Download, PlusCircle } from 'lucide-react';
import { DUMMY_USERS } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const teamMembers = DUMMY_USERS.slice(1, 4).map(u => ({ ...u, role: 'Hiring Manager' }));

const transactions = [
    { id: 'inv_1', amount: 'GH₵500', date: 'May 15, 2024', status: 'Paid', description: 'Pro Plan Subscription' },
    { id: 'inv_2', amount: 'GH₵500', date: 'April 15, 2024', status: 'Paid', description: 'Pro Plan Subscription' },
    { id: 'inv_3', amount: 'GH₵150', date: 'April 10, 2024', status: 'Paid', description: 'Featured Job Post' },
    { id: 'inv_4', amount: 'GH₵500', date: 'March 15, 2024', status: 'Paid', description: 'Pro Plan Subscription' },
];


export default function EmployerSettingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'billing';

  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your employer account and notification preferences.</p>
      </div>

       <Tabs value={tab} defaultValue={tab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="profile"><Building className="mr-2"/> Company Profile</TabsTrigger>
            <TabsTrigger value="team"><Users className="mr-2"/> Team</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="mr-2"/> Billing</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2"/> Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>This information is visible to candidates on your company page and job listings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-muted-foreground">Manage your main company profile, including name, logo, description, and website.</p>
                     <Button asChild>
                         <Link href="/employer/company-profile">Edit Company Profile</Link>
                     </Button>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="team">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>Manage who has access to this employer account.</CardDescription>
                    </div>
                    <Button><UserPlus className="mr-2"/> Invite Member</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="billing">
            <Card>
                <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your plan, payment methods, and view your billing history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Current Plan Card */}
                    <Card className="bg-primary/10 border-primary/20">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Badge variant="outline" className="text-primary border-primary bg-background">Pro Plan</Badge>
                                </CardTitle>
                                <CardDescription className="text-primary/80 mt-1">Your current subscription</CardDescription>
                            </div>
                            <Button asChild variant="outline" className="bg-background">
                                <Link href="/pricing">Change Plan</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-bold">GH₵500</p>
                                <p className="text-muted-foreground">/ month</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">Your plan renews on June 15, 2024.</p>
                        </CardContent>
                    </Card>

                    {/* Payment Method & History */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Payment Method */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Payment Method</h3>
                            <Card>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">Visa ending in 4242</p>
                                            <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Update</Button>
                                </CardContent>
                            </Card>
                            <Button variant="outline" className="w-full">
                                <PlusCircle className="mr-2"/> Add New Payment Method
                            </Button>
                        </div>
                        {/* Billing History */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Billing History</h3>
                            <Card>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead className="text-right">Date</TableHead>
                                                <TableHead><span className="sr-only">Download</span></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {transactions.map(txn => (
                                                <TableRow key={txn.id}>
                                                    <TableCell className="font-medium">{txn.description}</TableCell>
                                                    <TableCell>{txn.amount}</TableCell>
                                                    <TableCell className="text-right">{txn.date}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how you receive notifications from the platform.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                        <Label htmlFor="new-applicant">New Applicant Alert</Label>
                        <p className="text-xs text-muted-foreground">Receive an email for every new application to your jobs.</p>
                        </div>
                        <Switch id="new-applicant" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                        <Label htmlFor="weekly-summary">Weekly Applicant Summary</Label>
                        <p className="text-xs text-muted-foreground">Get a weekly digest of all new applicants.</p>
                        </div>
                        <Switch id="weekly-summary" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                        <Label htmlFor="message-alert">New Message Alert</Label>
                        <p className="text-xs text-muted-foreground">Get notified when a candidate sends you a message.</p>
                        </div>
                        <Switch id="message-alert" defaultChecked />
                    </div>
                 </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
