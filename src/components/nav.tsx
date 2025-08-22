
"use client";

import { Home, DollarSign, ShoppingCart, BarChart2, User, Mail } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDictionary } from '@/contexts/dictionary-context';

export function Nav() {
  const pathname = usePathname();
  const { dictionary } = useDictionary();

  const navItems = [
    { href: '/dashboard', label: dictionary.menu.home, icon: Home },
    { href: '/dashboard/income', label: dictionary.menu.income, icon: DollarSign },
    { href: '/dashboard/expenses', label: dictionary.menu.expenses, icon: ShoppingCart },
    { href: '/dashboard/reports', label: dictionary.menu.reports, icon: BarChart2 },
    { href: '/dashboard/contact', label: dictionary.menu.contact, icon: Mail },
  ];


  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
