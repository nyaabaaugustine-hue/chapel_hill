'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, PlusCircle, Save, FileText, ListChecks, MessageSquareQuote, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function NewJobPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = (title: string, description?: string) => {
    toast({
      title: title,
      description: description || "This feature is for demonstration purposes.",
      variant: 'vibrant',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    handleAction("Publishing Job...", "Your job is being submitted for review.");

    setTimeout(() => {
        setIsSubmitting(false);
        handleAction("Job Published!", "Your new job is now live.");
        router.push('/employer/jobs');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Fill out the details below to find your next great hire.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6">
            {/* Job Details Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                  <h2 className="font-headline text-xl font-bold flex items-center gap-3"><FileText className="h-6 w-6 text-primary" /> Job Details</h2>
                  <p className="text-muted-foreground">Provide the fundamental details about the job opening.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g., Senior React Developer" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., San Francisco, CA or Remote" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select required>
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salary-range">Salary Range</Label>
                  <Input id="salary-range" placeholder="e.g., GH₵120k - GH₵160k" required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select required>
                    <SelectTrigger id="experience-level">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry-level</SelectItem>
                      <SelectItem value="mid">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior-level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Description & Skills Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                  <h2 className="font-headline text-xl font-bold flex items-center gap-3"><ListChecks className="h-6 w-6 text-primary" /> Description & Skills</h2>
                  <p className="text-muted-foreground">Be detailed and clear to attract the best talent for the role.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Job Description</Label>
                <Textarea id="description" placeholder="Describe the role, responsibilities, and qualifications..." rows={10} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input id="skills" placeholder="e.g., React, TypeScript, Next.js (comma-separated)" required/>
                <p className="text-xs text-muted-foreground">Separate skills with a comma.</p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Screening Questions Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                  <h2 className="font-headline text-xl font-bold flex items-center gap-3"><MessageSquareQuote className="h-6 w-6 text-primary" /> Screening Questions</h2>
                  <p className="text-muted-foreground">Add questions to help you filter and qualify applicants automatically.</p>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-secondary/50">
                <div className="flex-1 space-y-1">
                  <Label htmlFor="question1">What is your expected salary?</Label>
                  <p className="text-xs text-muted-foreground">Helps filter candidates based on budget.</p>
                </div>
                <Checkbox id="question1" checked />
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-secondary/50">
                <div className="flex-1 space-y-1">
                  <Label htmlFor="question2">Are you authorized to work in the specified location?</Label>
                  <p className="text-xs text-muted-foreground">Important for legal and logistical reasons.</p>
                </div>
                <Checkbox id="question2" checked />
              </div>
              <Button variant="outline" type="button" onClick={() => handleAction('Feature not implemented', 'This would open a dialog to add a custom question.')}><PlusCircle className="mr-2 h-4 w-4" /> Add Custom Question</Button>
            </div>
          </CardContent>

          <CardFooter className="p-6 bg-secondary/50 border-t justify-end gap-4">
            <Button variant="outline" size="lg" type="button" onClick={() => handleAction('Generating Preview...', 'This would open the job details in a new tab.')}><Eye className="mr-2 h-4 w-4" /> Preview</Button>
            <Button type="submit" size="lg" className="bg-accent-gradient" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save & Publish
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
