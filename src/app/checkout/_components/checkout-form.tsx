
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { tiers } from '@/components/pricing-grid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const planId = searchParams.get('plan');
  const billingCycle = searchParams.get('billing') as 'monthly' | 'yearly' | null;

  const selectedTier = tiers.find(t => t.id === planId);

  useEffect(() => {
    if (!selectedTier || !billingCycle) {
      // Redirect if plan is invalid or missing
      router.push('/pricing');
    }
  }, [selectedTier, billingCycle, router]);

  const getPrice = () => {
    if (!selectedTier || !billingCycle || typeof selectedTier.price.monthly !== 'number' || typeof selectedTier.price.yearly !== 'number') {
      return 0;
    }
    return billingCycle === 'yearly' ? selectedTier.price.yearly : selectedTier.price.monthly;
  };
  
  const price = getPrice();
  
  const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false);
        const reference = `mock_ref_${Date.now()}`;
        if (price === 0) {
           toast({
            title: 'Setup Complete!',
            description: `Your ${selectedTier?.name} plan is now active.`,
            variant: 'vibrant'
           });
        } else {
            toast({
                title: 'Payment Successful!',
                description: `Your transaction reference: ${reference}. Welcome to ${selectedTier?.name}!`,
                variant: 'vibrant'
            });
        }
        router.push('/employer');
      }, 2000);
  }

  if (!selectedTier || !billingCycle) {
    return (
        <Card>
            <CardContent className="p-10 text-center">
                <p>Loading your plan...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card className="bg-secondary/30">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>You are subscribing to the following plan:</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="p-6 rounded-lg border-2 border-primary bg-primary/10">
                        <h3 className="font-headline text-2xl font-bold text-primary">{selectedTier.name} Plan</h3>
                        <p className="text-4xl font-bold mt-2">
                           GH₵{price}
                           <span className="text-lg font-normal text-muted-foreground">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                        </p>
                    </div>
                     <ul className="space-y-3">
                        {selectedTier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard /> Payment Details</CardTitle>
                <CardDescription>Securely complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          placeholder="Enter your full name" 
                          required 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@example.com" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                     <div className="text-xs text-muted-foreground text-center pt-2">
                        This is a simulated payment for demo purposes.
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent-gradient" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 animate-spin" /> : (price > 0 ? `Pay GH₵${price} Now` : 'Complete Setup')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
