import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LogoProvider } from '@/contexts/logo-context';

export const metadata: Metadata = {
  title: 'BoyMo Business',
  description: 'ແອັບບັນທຶກລາຍຮັບ-ລາຍຈ່າຍ ສຳລັບຮ້ານ BoyMo Pizza',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Phetsarath+OT:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LogoProvider>
          {children}
        </LogoProvider>
        <Toaster />
      </body>
    </html>
  );
}
