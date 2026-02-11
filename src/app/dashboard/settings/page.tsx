'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Save, Bell, EyeOff, Lock, Trash2 } from "lucide-react";

export default function CandidateSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account, privacy, and notification settings.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@email.com" readOnly disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock /> Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell /> Notification Settings</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="job-alerts">New Job Alerts</Label>
                  <p className="text-xs text-muted-foreground">Receive emails about jobs that match your profile.</p>
                </div>
                <Switch id="job-alerts" defaultChecked />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="app-updates">Application Status Updates</Label>
                  <p className="text-xs text-muted-foreground">Get notified when an employer views or updates your application.</p>
                </div>
                <Switch id="app-updates" defaultChecked />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                 <div>
                  <Label htmlFor="newsletter">Platform Newsletter</Label>
                  <p className="text-xs text-muted-foreground">Receive occasional updates about our platform.</p>
                 </div>
                <Switch id="newsletter" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><EyeOff /> Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="profile-visibility">Profile Visibility</Label>
                             <p className="text-xs text-muted-foreground mt-1">Allow employers to find and view your profile.</p>
                        </div>
                        <Switch id="profile-visibility" defaultChecked/>
                    </div>
                </CardContent>
            </Card>

             <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2"><Trash2 /> Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <Button variant="destructive" className="w-full">Delete My Account</Button>
                </CardContent>
            </Card>

             <Button size="lg" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save All Changes
            </Button>
        </div>
      </div>
    </div>
  );
}
