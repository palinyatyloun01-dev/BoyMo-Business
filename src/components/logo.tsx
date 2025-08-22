
"use client";

import { cn } from '@/lib/utils';
import { Pizza, Sandwich, IceCream } from 'lucide-react';
import type { SVGProps } from 'react';
import { useLogo } from '@/contexts/logo-context';

const iconComponents: { [key: string]: React.ElementType } = {
  Pizza: Pizza,
  Sandwich: Sandwich,
  IceCream: IceCream,
};

export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { logo, logoType, customLogo } = useLogo();
  const LogoIcon = iconComponents[logo] || Pizza;

  return (
    <div className={cn("flex items-center justify-center size-12 rounded-full bg-primary/10", props.className)}>
        {logoType === 'custom' && customLogo ? (
            <img src={customLogo} alt="Custom Logo" className="size-full object-cover rounded-full" />
        ) : (
            <LogoIcon className="size-6 text-primary" />
        )}
    </div>
  );
}
