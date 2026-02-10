import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function Header() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find a Job' },
    { href: '/companies', label: 'Companies' },
    { href: '/dashboard', label: 'Candidates' },
    { href: '#', label: 'Pages' },
    { href: '/blog', label: 'Blog' },
  ];

  const pagesLinks = [
    { href: '#', label: 'Reset Password' },
    { href: '/login', label: 'Sign in' },
    { href: '/register', label: 'Register' },
    { href: '#', label: 'Contact Us' },
    { href: '#', label: 'Pricing Plan' },
    { href: '#', label: 'About Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) =>
              link.label === 'Pages' ? (
                <DropdownMenu key="pages-dropdown">
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none">
                    Pages <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {pagesLinks.map((pageLink) => (
                      <DropdownMenuItem key={pageLink.href + pageLink.label} asChild>
                        <Link href={pageLink.href}>{pageLink.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105 hover:bg-primary/90">
            <Link href="/register">Register</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex h-full flex-col gap-6 p-6">
              <Link href="/">
                <Logo />
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.label === 'Pages' ? (
                    <Collapsible key="pages-collapsible">
                      <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-medium text-muted-foreground transition-colors hover:text-primary [&[data-state=open]>svg]:rotate-180">
                        Pages <ChevronDown className="h-5 w-5 transition-transform" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 flex flex-col gap-2 pl-4">
                          {pagesLinks.map((pageLink) => (
                            <Link key={pageLink.href + pageLink.label} href={pageLink.href} className="text-base font-medium text-muted-foreground transition-colors hover:text-primary">
                                {pageLink.label}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                 <Button asChild className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm">
                    <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
