'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save, Loader2, FileText, Eye, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleImageUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
        const randomImage = PlaceHolderImages.find(p => p.id === `blog-post-${Math.floor(Math.random() * 6) + 1}`);
        if(randomImage) {
            setUploadedImageUrl(randomImage.imageUrl);
        }
        setIsUploading(false);
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast({
      title: "Submitting Post...",
      description: "Your post is being sent for review.",
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        variant: 'vibrant',
        title: "Post Submitted!",
        description: "Your post is now pending review from an administrator.",
      });
      router.push('/dashboard/posts');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/dashboard/posts"><ArrowLeft /></Link>
            </Button>
            <div>
              <h1 className="font-headline text-3xl font-bold">Create New Post</h1>
              <p className="text-muted-foreground">Draft your article and submit it for review.</p>
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" type="button">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save & Submit for Review
            </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText /> Article Content</CardTitle>
                    <CardDescription>Write your full article using markdown for formatting.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea id="content" placeholder="Write your full article here..." rows={25} required />
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
            <Card>
                <CardHeader>
                    <CardTitle>Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Post Title</Label>
                        <Input id="title" placeholder="How to Ace Your Next Interview" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" placeholder="A short summary of the post..." rows={4} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="feature-image">Feature Image</Label>
                         <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                            ) : uploadedImageUrl ? (
                                <Image src={uploadedImageUrl} alt="Uploaded preview" width={100} height={60} className="rounded-md object-cover" />
                            ) : (
                                <Upload className="w-8 h-8 text-muted-foreground" />
                            )}
                            <p className="mt-2 text-sm text-muted-foreground">
                                {isUploading ? 'Uploading...' : uploadedImageUrl ? 'Image selected. ' : 'Drag & drop or '}
                                {!uploadedImageUrl && !isUploading && (
                                    <Button variant="link" className="p-0 h-auto" type="button" onClick={handleImageUpload}>click to upload</Button>
                                )}
                                {uploadedImageUrl && !isUploading && (
                                    <Button variant="link" className="p-0 h-auto text-destructive" type="button" onClick={() => setUploadedImageUrl(null)}>Remove</Button>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" placeholder="e.g., React, Career (comma-separated)" />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </form>
  );
}
