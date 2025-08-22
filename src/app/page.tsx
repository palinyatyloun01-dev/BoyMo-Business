
'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <Logo className="h-24 w-24 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-primary">BoyMo Pizza</h1>
        <p className="max-w-md text-lg text-foreground/80">
          ແອັບບັນທຶກລາຍຮັບ-ລາຍຈ່າຍ
        </p>

        <div className="w-full max-w-xs space-y-4 pt-8">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ຮ້ານ BoyMo Pizza</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            ແອັບນີ້ໃຊ້ງານໄດ້ສະເພາະເຈົ້າຂອງຮ້ານ BoyMo Pizza ເທົ່ານັ້ນ.
          </p>
        </div>
      </div>
    </main>
  );
}
