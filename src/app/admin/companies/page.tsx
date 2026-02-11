'use client';

import { useState } from 'react';
import { DUMMY_COMPANIES } from '@/lib/data';
import type { Company } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import Image from 'next/image';
import Link from 'next/link';

type CompanyWithStatus = Company & { status: 'Verified' | 'Pending' };

export default function AdminCompaniesPage() {
  const companiesWithStatus: CompanyWithStatus[] = DUMMY_COMPANIES.map((company, index) => ({
    ...company,
    status: index % 4 === 0 ? 'Pending' : 'Verified',
  }));

  const [companies, setCompanies] = useState<CompanyWithStatus[]>(companiesWithStatus);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies
    .filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Company Management</h1>
          <p className="text-muted-foreground">Manage all companies on the platform.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Company
        </Button>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by company name..." 
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
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => {
                const logo = PlaceHolderImages.find((p) => p.id === company.logo);
                return (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                         {logo && (
                          <Image
                            src={logo.imageUrl}
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        )}
                        <p className="font-medium">{company.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.activeJobs}</TableCell>
                    <TableCell>
                      <Badge variant={company.status === 'Verified' ? 'default' : 'secondary'}>{company.status}</Badge>
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
                          <DropdownMenuItem asChild><Link href={`/companies/${company.id}`}>View Profile</Link></DropdownMenuItem>
                          <DropdownMenuItem>Edit Company</DropdownMenuItem>
                           {company.status === 'Pending' && <DropdownMenuItem>Verify Company</DropdownMenuItem>}
                           <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Company</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
               {filteredCompanies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No companies found.
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
