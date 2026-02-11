
'use client';

import { useState } from 'react';
import { DUMMY_USERS } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => roleFilter === 'all' || user.role.toLowerCase().replace(/ /g, '-') === roleFilter);

  const uniqueRoles = [...new Set(DUMMY_USERS.map(user => user.role))];

  const getRoleBadgeClass = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (['developer', 'engineer', 'scientist', 'devops'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
    }
    if (['manager', 'lead', 'ceo', 'director'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
    }
    if (['design', 'architect', 'actress'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-5/10 text-chart-5 border-chart-5/20';
    }
    if (['market', 'sale'].some(term => lowerRole.includes(term))) {
      return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
     if (['analyst', 'research', 'qa', 'accountant', 'student', 'intern', 'lecturer'].some(term => lowerRole.includes(term))) {
        return 'bg-accent/10 text-accent border-accent/20';
    }
    return 'bg-secondary text-secondary-foreground';
  };


  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all users on the platform.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by name or email..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
             <div className="flex gap-4">
                 <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {uniqueRoles.map(role => (
                            <SelectItem key={role} value={role.toLowerCase().replace(/ /g, '-')}>{role}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const avatar = PlaceHolderImages.find((p) => p.id === user.avatar);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {avatar && <AvatarImage src={avatar.imageUrl} />}
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                         <p className="font-medium">{user.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-medium", getRoleBadgeClass(user.role))}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-accent/50 bg-accent/10 text-accent">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/75 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                        </span>
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                           <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Ban User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
               {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No users found.
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

