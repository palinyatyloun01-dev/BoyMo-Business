
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { Upload, Trash2, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, formatISO, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { addExpense, getExpenses, deleteExpense } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import type { Expense } from '@/lib/schema';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function ExpensePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();

  const fetchExpenses = async () => {
    setIsLoading(true);
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchExpenses();
  }, []);

  const resetForm = () => {
    // A simple way to reset the form. For more complex scenarios, consider react-hook-form.
    const form = document.querySelector('form');
    form?.reset();
    setDate(new Date());
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const expenseData: Omit<Expense, 'id' | 'createdAt'> = {
        date: date ? formatISO(startOfDay(date)) : formatISO(startOfDay(new Date())),
        category: formData.get('expense-category') as string,
        description: formData.get('expense-details') as string,
        amount: Number(formData.get('expense-amount') as string),
    };

    const result = await addExpense(expenseData);
    if (result.success) {
        toast({ title: 'ສຳເລັດ', description: 'ບັນທຶກລາຍຈ່າຍສຳເລັດແລ້ວ.' });
        fetchExpenses();
        resetForm();
    } else {
        toast({ variant: 'destructive', title: 'ຜິດພາດ', description: result.error });
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteExpense(id);
    if (result.success) {
      toast({ title: 'ສຳເລັດ', description: 'ລຶບລາຍການລາຍຈ່າຍສຳເລັດແລ້ວ.' });
      fetchExpenses();
    } else {
      toast({ variant: 'destructive', title: 'ຜິດພາດ', description: result.error });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>ເພີ່ມລາຍຈ່າຍໃໝ່</CardTitle>
                <CardDescription>ກະລຸນາປ້ອນລາຍລະອຽດລາຍຈ່າຍຂອງທ່ານ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="expense-date">ວັນທີ</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>ເລືອກວັນທີ</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expense-category">ປະເພດລາຍຈ່າຍ</Label>
                    <Select name="expense-category" required>
                        <SelectTrigger id="expense-category">
                            <SelectValue placeholder="ເລືອກປະເພດລາຍຈ່າຍ" />
                        </SelectTrigger>
                        <SelectContent>
                            {EXPENSE_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expense-amount">ຈຳນວນເງິນ (KIP)</Label>
                    <Input id="expense-amount" name="expense-amount" type="number" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expense-details">ລາຍລະອຽດ</Label>
                    <Textarea id="expense-details" name="expense-details" placeholder="ລາຍລະອຽດເພີ່ມເຕີມກ່ຽວກັບລາຍຈ່າຍ..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expense-invoice">ໃບບິນ (ຖ້າມີ)</Label>
                    <Input id="expense-invoice" type="file" disabled />
                    <Button variant="outline" className="w-full mt-2" disabled><Upload className="mr-2 h-4 w-4" /> ອັບໂຫຼດ</Button>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>ຍົກເລີກ</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    ບັນທຶກ
                </Button>
            </CardFooter>
        </Card>
        </form>

        <Card>
            <CardHeader>
                <CardTitle>ລາຍການລາຍຈ່າຍຫຼ້າສຸດ</CardTitle>
                <CardDescription>ລາຍການລາຍຈ່າຍທີ່ທ່ານໄດ້ບັນທຶກໄວ້.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ລາຍລະອຽດ</TableHead>
                            <TableHead>ປະເພດ</TableHead>
                            <TableHead className="text-right">ຈຳນວນເງິນ</TableHead>
                            <TableHead className="text-center">ຈັດການ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                             <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : expenses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    ບໍ່ມີຂໍ້ມູນລາຍຈ່າຍ
                                </TableCell>
                            </TableRow>
                        ) : expenses.map((ex) => (
                            <TableRow key={ex.id}>
                                <TableCell>
                                    <div className="font-medium">{ex.description || 'ບໍ່ມີລາຍລະອຽດ'}</div>
                                    <div className="text-xs text-muted-foreground">{format(new Date(ex.date), "PPP")}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{ex.category}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium text-red-600">
                                    {ex.amount.toLocaleString()} KIP
                                </TableCell>
                                <TableCell className="text-center">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>ທ່ານແນ່ໃຈບໍ່?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                        ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້. ຂໍ້ມູນລາຍຈ່າຍນີ້ຈະຖືກລຶບອອກຈາກລະບົບຢ່າງຖາວອນ.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(ex.id)}>ຢືນຢັນ</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
