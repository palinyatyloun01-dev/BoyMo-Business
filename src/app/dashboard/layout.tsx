
"use client";

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Nav } from '@/components/nav';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, User, LogOut, Globe, Pizza, Sandwich, IceCream } from 'lucide-react';
import { LANGUAGES, LOGO_OPTIONS } from '@/lib/constants';
import Link from 'next/link';
import { DictionaryProvider, useDictionary } from '@/contexts/dictionary-context';
import { LogoProvider, useLogo } from '@/contexts/logo-context';
import { BackgroundProvider, useBackground } from '@/contexts/background-context';

const iconComponents: { [key: string]: React.ElementType } = {
    Pizza: Pizza,
    Sandwich: Sandwich,
    IceCream: IceCream,
};

function LanguageSwitcher() {
  const { lang, setLang, dictionary } = useDictionary();
  const [selectedLanguage, setSelectedLanguage] = React.useState(LANGUAGES.find(l => l.code === lang));
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setSelectedLanguage(LANGUAGES.find(l => l.code === lang));
  }, [lang]);

  if (!mounted || !dictionary) {
    // Render a placeholder or skeleton while waiting for client-side mount
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-md border bg-background animate-pulse"></div>
            <Button variant="outline" size="icon" className="h-10 w-10 animate-pulse">
                <div className="h-5 w-5 rounded-full bg-muted"></div>
            </Button>
        </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
        {selectedLanguage && (
            <div className="flex items-center justify-center h-10 w-10 rounded-md border bg-background">
                <span className="text-2xl">{selectedLanguage.flag}</span>
            </div>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                    <Globe />
                    <span className="sr-only">{dictionary.language.select}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{dictionary.language.select}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {LANGUAGES.map(langItem => (
                    <DropdownMenuItem key={langItem.code} onClick={() => setLang(langItem.code as 'lo' | 'en' | 'th' | 'zh' | 'vi')}>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{langItem.flag}</span>
                            <span>{langItem.name}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardHome = pathname === '/dashboard';
  const { dictionary } = useDictionary();
  const { background } = useBackground();
  
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !dictionary) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider defaultOpen={false}>
              <Sidebar>
                  <div className="w-full h-full bg-sidebar"></div>
              </Sidebar>
              <SidebarInset>
                  <header className="flex items-center p-2 border-b gap-2 h-[57px]"></header>
                  <main className="p-4 sm:p-6 lg:p-8 flex-1"></main>
              </SidebarInset>
          </SidebarProvider>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
                <Logo className="size-10"/>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden text-left">
                    <h2 className="font-bold text-lg text-primary">BoyMo Pizza</h2>
                    <p className="text-xs text-muted-foreground">Business Manager</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <Nav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset 
        style={{
            backgroundImage: background ? `url(${background})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10" />
        <header className="flex items-center justify-between p-2 border-b gap-2">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                {!isDashboardHome && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">{dictionary.general.back}</span>
                  </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://placehold.co/128x128.png" alt="User" data-ai-hint="pizza chef" />
                        <AvatarFallback>BM</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">BoyMo</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          boymo@pizza.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>{dictionary.profile.title}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/login">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{dictionary.general.logout}</span>
                        </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 flex-1 relative z-0">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <DictionaryProvider>
            <LogoProvider>
                <BackgroundProvider>
                    <DashboardLayoutContent>{children}</DashboardLayoutContent>
                </BackgroundProvider>
            </LogoProvider>
        </DictionaryProvider>
    )
}
