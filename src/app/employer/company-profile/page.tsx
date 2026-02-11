'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Save, Loader2, Building, Globe } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function CompanyProfilePage() {
    const { toast } = useToast();
    const [logoUrl, setLogoUrl] = useState(PlaceHolderImages.find((img) => img.id === 'company-logo-1')?.imageUrl);
    const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            const currentLogoIndex = PlaceHolderImages.findIndex(p => p.imageUrl === logoUrl && p.id.startsWith('company-logo-'));
            const nextLogoIndex = (currentLogoIndex + 1) % 24; // Assuming 24 company logos
            const nextLogo = PlaceHolderImages.find(p => p.id === `company-logo-${nextLogoIndex + 1}`);
            if (nextLogo) {
                setLogoUrl(nextLogo.imageUrl);
            }
            setIsUploading(false);
            toast({
                title: "Logo Updated",
                description: "Your new company logo has been uploaded.",
                variant: 'vibrant'
            });
        }, 1500);
    };

    const handleSaveChanges = () => {
      toast({
        title: "Changes Saved",
        description: "Your company profile has been updated.",
        variant: "vibrant",
      });
    }

  return (
    <div className="space-y-8">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">Company Profile</CardTitle>
          <CardDescription>This information will be visible on your company page and job listings to attract top talent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            {/* Company Details Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Building className="h-5 w-5" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold">Company Details</h3>
                </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" defaultValue="Innovate Inc." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-website">Website</Label>
                        <Input id="company-website" defaultValue="https://innovateinc.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-description">About Your Company</Label>
                        <Textarea id="company-description" placeholder="Describe your company culture, mission, and values..." rows={8} defaultValue="Innovate Inc. is a leading tech company focused on building next-generation web applications. We are passionate about creating a collaborative and inclusive environment where everyone can thrive." />
                    </div>
                 </div>
            </div>
            
            <Separator />

            {/* Company Branding Section */}
            <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Globe className="h-5 w-5" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold">Company Branding</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1 flex flex-col items-center">
                         {logoUrl && (
                            <div className="flex justify-center mb-4">
                                <Image src={logoUrl} alt="Company Logo" width={128} height={128} className="rounded-lg border p-2 bg-secondary/50" />
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-2">
                         <Label>Company Logo</Label>
                        <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg mt-2">
                            {isUploading ? (
                            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                            ) : (
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            )}
                            <p className="mt-2 text-sm text-muted-foreground">Drag & drop or</p>
                            <Button variant="link" className="p-0 h-auto" onClick={handleLogoUpload} disabled={isUploading}>click to upload</Button>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t bg-secondary/50 px-6 py-4 justify-end">
            <Button size="lg" onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
