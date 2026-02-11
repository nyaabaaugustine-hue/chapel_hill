'use client';

import { useState } from 'react';
import { DUMMY_BLOG_POSTS } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DUMMY_BLOG_POSTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage all blog posts on the platform.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by title or author..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => {
                const authorAvatar = PlaceHolderImages.find((img) => img.id === post.author.avatar);
                return (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} />}
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author.name}</span>
                       </div>
                    </TableCell>
                    <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                    <TableCell><Badge>Published</Badge></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild><Link href={`/blog/${post.slug}`}>View Post</Link></DropdownMenuItem>
                          <DropdownMenuItem>Edit Post</DropdownMenuItem>
                           <DropdownMenuItem>Unpublish</DropdownMenuItem>
                           <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Post</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )})}
               {filteredPosts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
