
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

// Hardcoded credentials for demonstration
const CORRECT_PHONE = "02059112974";

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [showPhone, setShowPhone] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone === CORRECT_PHONE) {
      toast({
        title: "ສຳເລັດ",
        description: "ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ.",
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "ຜິດພາດ",
        description: "ເບີໂທບໍ່ຖືກຕ້ອງ. ກະລຸນາລອງໃໝ່.",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center text-center mb-6">
            <Logo className="h-20 w-20 text-primary mb-4" />
            <h1 className="text-3xl font-bold text-primary">BoyMo Pizza</h1>
        </div>
        <Card>
            <CardHeader className="text-center">
                <CardDescription>ກະລຸນາປ້ອນເບີໂທເພື່ອເຂົ້າສູ່ລະບົບ</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2 relative">
                        <Input 
                          id="phone" 
                          type={showPhone ? 'text' : 'password'}
                          placeholder="020xxxxxxxx" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          aria-label="ເບີໂທ"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPhone(!showPhone)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                          aria-label={showPhone ? "ເຊື່ອງເບີໂທ" : "ສະແດງເບີໂທ"}
                        >
                          {showPhone ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        ເຂົ້າສູ່ລະບົບ
                    </Button>
                </form>
            </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm">
          <Link href="/" className="text-primary hover:underline">
            ກັບໄປໜ້າຕ້ອນຮັບ
          </Link>
        </p>
      </div>
    </main>
  );
}
