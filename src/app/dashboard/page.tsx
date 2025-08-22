
"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, Search, BarChart2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useDictionary } from '@/contexts/dictionary-context';
import { getRecentTransactions, getTodaySummary } from '@/lib/actions';
import type { Transaction } from '@/lib/schema';
import { format } from 'date-fns';


export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const router = useRouter();
  const { dictionary } = useDictionary();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [summary, setSummary] = React.useState({ todayIncome: 0, todayExpense: 0, todayProfit: 0 });
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchData() {
        setIsLoading(true);
        const [fetchedTransactions, fetchedSummary] = await Promise.all([
            getRecentTransactions(),
            getTodaySummary()
        ]);
        setTransactions(fetchedTransactions);
        setSummary(fetchedSummary);
        setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredTransactions = transactions.filter(tx => 
    (tx.txType === 'income' ? tx.details : tx.description).toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRowClick = (transaction: Transaction) => {
    if (transaction.txType === 'income') {
      router.push('/dashboard/income');
    } else if (transaction.txType === 'expense') {
      router.push('/dashboard/expenses');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-lg bg-primary/10">
        <div className="animate-marquee whitespace-nowrap">
          <span className="animate-color-cycle text-2xl font-bold mx-4">
            {dictionary.dashboard.welcomeMessage}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-4 md:items-center">
        <div className="relative w-full col-span-2 md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder={dictionary.dashboard.searchPlaceholder}
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Button asChild className="w-full">
          <Link href="/dashboard/income">
            <TrendingUp className="mr-2 h-5 w-5" />
            {dictionary.dashboard.addIncome}
          </Link>
        </Button>
        <Button asChild variant="destructive" className="w-full">
          <Link href="/dashboard/expenses">
            <TrendingDown className="mr-2 h-5 w-5" />
            {dictionary.dashboard.addExpense}
          </Link>
        </Button>
        <Button asChild className="w-full bg-blue-950 text-white hover:bg-blue-800">
          <Link href="/dashboard/reports">
            <BarChart2 className="mr-2 h-5 w-5" />
            {dictionary.dashboard.reports}
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">{dictionary.dashboard.todaySummary}</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboard.todayIncome}</CardTitle>
              <span className="text-green-500">💰</span>
            </CardHeader>
            <CardContent>
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin"/> : <div className="text-2xl font-bold text-green-600">{summary.todayIncome.toLocaleString()} KIP</div>}
                <p className="text-xs text-muted-foreground">{dictionary.dashboard.incomeFromSales}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboard.todayExpense}</CardTitle>
              <span className="text-red-500">💸</span>
            </CardHeader>
            <CardContent>
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin"/> : <div className="text-2xl font-bold text-red-600">{summary.todayExpense.toLocaleString()} KIP</div>}
              <p className="text-xs text-muted-foreground">{dictionary.dashboard.expenseFromPurchases}</p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-1 col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboard.todayProfit}</CardTitle>
              <span className="text-yellow-500">🏆</span>
            </CardHeader>
            <CardContent>
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin"/> : <div className="text-2xl font-bold">{summary.todayProfit.toLocaleString()} KIP</div>}
              <p className="text-xs text-muted-foreground">{dictionary.dashboard.profitHint}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">{dictionary.dashboard.recentTransactions}</h2>
        <Card>
            <CardHeader>
                <CardTitle>{dictionary.dashboard.latestItems}</CardTitle>
                <CardDescription>{dictionary.dashboard.latestItemsDesc}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{dictionary.general.description}</TableHead>
                            <TableHead className="text-center">{dictionary.general.type}</TableHead>
                            <TableHead className="text-right">{dictionary.general.amount}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                             <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : filteredTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    ບໍ່ມີຂໍ້ມູນທຸລະກຳ
                                </TableCell>
                            </TableRow>
                        ) : filteredTransactions.map((tx) => (
                            <TableRow 
                                key={tx.id} 
                                onClick={() => handleRowClick(tx)}
                                className="cursor-pointer"
                            >
                                <TableCell>
                                    <div className="font-medium">{tx.category}</div>
                                    <div className="text-xs text-muted-foreground">{tx.txType === 'income' ? tx.details : tx.description}</div>
                                    <div className="text-xs text-muted-foreground">{format(new Date(tx.date), "PPP")}</div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={tx.txType === 'income' ? 'default' : 'destructive'}>
                                        {tx.txType === 'income' ? dictionary.general.income : dictionary.general.expense}
                                    </Badge>
                                </TableCell>
                                <TableCell className={`text-right font-medium ${tx.txType === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.amount.toLocaleString()} KIP
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
