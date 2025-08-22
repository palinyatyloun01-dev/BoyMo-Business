
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PIZZA_SIZES, PIZZA_TOPPINGS, PIZZA_PRICES, EXTRA_CHEESE_PRICE, PIZZA_FLAVORS, OTHER_INCOME_CATEGORIES } from '@/lib/constants';
import { PlusCircle, Trash2, Upload, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, formatISO, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { addIncome, getIncomes, deleteIncome } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import type { Income } from '@/lib/schema';
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

type PizzaFlavorItem = {
  id: number;
  value: string;
};

export default function IncomePage() {
  const [incomes, setIncomes] = React.useState<Income[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();

  const fetchIncomes = async () => {
    setIsLoading(true);
    const fetchedIncomes = await getIncomes();
    setIncomes(fetchedIncomes);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchIncomes();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await deleteIncome(id);
    if (result.success) {
      toast({ title: 'ສຳເລັດ', description: 'ລຶບລາຍການລາຍຮັບສຳເລັດແລ້ວ.' });
      fetchIncomes();
    } else {
      toast({ variant: 'destructive', title: 'ຜິດພາດ', description: result.error });
    }
  };

  const resetAllForms = () => {
    // This is a simple way to reset forms. For complex forms, react-hook-form is recommended.
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    setPizzaSize('');
    setPizzaTopping('');
    setExtraCheese(false);
    setPizzaFlavors([{ id: 1, value: '' }]);
    setDate(new Date());
  }

  const handlePizzaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const actualAmount = Number(formData.get('actual-amount') as string);
    const flavors = pizzaFlavors.map(f => f.value).filter(Boolean).join(', ');
    const sizeName = PIZZA_SIZES.find(s => s.id === pizzaSize)?.name || '';
    const toppingName = PIZZA_TOPPINGS.find(t => t.id === pizzaTopping)?.name || '';

    const incomeData: Omit<Income, 'id' | 'createdAt'> = {
      date: date ? formatISO(startOfDay(date)) : formatISO(startOfDay(new Date())),
      type: 'pizza',
      category: 'ການຂາຍພິຊຊ່າ',
      details: `ຂະໜາດ ${sizeName}, ໜ້າ ${toppingName}, ລົດຊາດ: ${flavors}${extraCheese ? ', ເພີ່ມຊີສ' : ''}`,
      amount: actualAmount > 0 ? actualAmount : totalPrice,
    };
    
    const result = await addIncome(incomeData);
    if (result.success) {
        toast({ title: 'ສຳເລັດ', description: 'ບັນທຶກລາຍຮັບສຳເລັດແລ້ວ.' });
        fetchIncomes();
        resetAllForms();
    } else {
        toast({ variant: 'destructive', title: 'ຜິດພາດ', description: result.error });
    }
    setIsSubmitting(false);
  }

  const handleOtherIncomeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const incomeData: Omit<Income, 'id' | 'createdAt'> = {
      date: date ? formatISO(startOfDay(date)) : formatISO(startOfDay(new Date())),
      type: 'other',
      category: formData.get('other-income-category') as string,
      details: formData.get('other-income-details') as string,
      amount: Number(formData.get('other-income-amount') as string),
    };

    const result = await addIncome(incomeData);
    if (result.success) {
        toast({ title: 'ສຳເລັດ', description: 'ບັນທຶກລາຍຮັບສຳເລັດແລ້ວ.' });
        fetchIncomes();
        resetAllForms();
    } else {
        toast({ variant: 'destructive', title: 'ຜິດພາດ', description: result.error });
    }
    setIsSubmitting(false);
  }

  const [pizzaSize, setPizzaSize] = React.useState<string>('');
  const [pizzaTopping, setPizzaTopping] = React.useState<string>('');
  const [extraCheese, setExtraCheese] = React.useState<boolean>(false);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [pizzaFlavors, setPizzaFlavors] = React.useState<PizzaFlavorItem[]>([{ id: 1, value: '' }]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    if (pizzaSize && pizzaTopping) {
      let price = PIZZA_PRICES[pizzaSize]?.[pizzaTopping] ?? 0;
      if (extraCheese) {
        price += EXTRA_CHEESE_PRICE;
      }
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [pizzaSize, pizzaTopping, extraCheese]);

  const addFlavor = () => {
    setPizzaFlavors([...pizzaFlavors, { id: Date.now(), value: '' }]);
  };

  const removeFlavor = (id: number) => {
    if (pizzaFlavors.length > 1) {
      setPizzaFlavors(pizzaFlavors.filter(flavor => flavor.id !== id));
    }
  };

  const handleFlavorChange = (id: number, value: string) => {
    setPizzaFlavors(pizzaFlavors.map(flavor => flavor.id === id ? { ...flavor, value } : flavor));
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <Tabs defaultValue="pizza">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pizza">ຂາຍພິຊຊ່າ</TabsTrigger>
                <TabsTrigger value="other">ລາຍຮັບອື່ນໆ</TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
                <form onSubmit={handlePizzaSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>ລາຍຮັບຈາກການຂາຍພິຊຊ່າ</CardTitle>
                        <CardDescription>ກະລຸນາປ້ອນລາຍລະອຽດການຂາຍ</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="income-date">ວັນທີ</Label>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="pizza-size">ຂະໜາດ</Label>
                                <Select onValueChange={setPizzaSize} value={pizzaSize} name="pizza-size" required>
                                    <SelectTrigger id="pizza-size">
                                        <SelectValue placeholder="ເລືອກຂະໜາດພິຊຊ່າ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PIZZA_SIZES.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pizza-topping">ໜ້າພິຊຊ່າ</Label>
                                <Select onValueChange={setPizzaTopping} value={pizzaTopping} name="pizza-topping" required>
                                    <SelectTrigger id="pizza-topping">
                                        <SelectValue placeholder="ເລືອກໜ້າພິຊຊ່າ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PIZZA_TOPPINGS.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label>ລາຍການໜ້າພິຊຊ່າ</Label>
                            {pizzaFlavors.map((flavorItem, index) => (
                                <div key={flavorItem.id} className="flex items-center gap-2">
                                    <Select
                                      value={flavorItem.value}
                                      onValueChange={(value) => handleFlavorChange(flavorItem.id, value)}
                                      name={`pizza-flavor-${index}`}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="ເລືອກລາຍການໜ້າພິຊຊ່າ" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PIZZA_FLAVORS.map(flavor => <SelectItem key={flavor} value={flavor}>{flavor}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFlavor(flavorItem.id)}
                                        disabled={pizzaFlavors.length === 1}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addFlavor}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                ເພີ່ມໜ້າພິຊຊ່າ
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="extra-cheese" name="extra-cheese" checked={extraCheese} onCheckedChange={(checked) => setExtraCheese(checked as boolean)} />
                            <label htmlFor="extra-cheese" className="text-sm font-medium leading-none">
                                ເພີ່ມຊີສ (+{EXTRA_CHEESE_PRICE.toLocaleString()} KIP)
                            </label>
                        </div>
                        <div className="space-y-2">
                            <Label>ລາຄາລວມ</Label>
                            <div className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()} KIP</div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="actual-amount">ຈຳນວນເງິນທີ່ໄດ້ຮັບຕົວຈິງ (KIP)</Label>
                            <Input id="actual-amount" name="actual-amount" type="number" placeholder="ປ້ອນຈຳນວນເງິນທີ່ໄດ້ຮັບ" defaultValue={totalPrice > 0 ? totalPrice : ''} required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={resetAllForms} disabled={isSubmitting}>ຍົກເລີກ</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            ບັນທຶກ
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </TabsContent>
            <TabsContent value="other">
                 <form onSubmit={handleOtherIncomeSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>ລາຍຮັບຈາກແຫຼ່ງອື່ນ</CardTitle>
                        <CardDescription>ປ້ອນລາຍຮັບທີ່ບໍ່ແມ່ນການຂາຍພິຊຊ່າ</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="other-income-date">ວັນທີ</Label>
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
                            <Label htmlFor="other-income-category">ປະເພດລາຍຮັບ</Label>
                            <Select name="other-income-category" required>
                                <SelectTrigger id="other-income-category">
                                    <SelectValue placeholder="ເລືອກປະເພດລາຍຮັບ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {OTHER_INCOME_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="other-income-amount">ຈຳນວນເງິນ (KIP)</Label>
                            <Input id="other-income-amount" name="other-income-amount" type="number" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="other-income-details">ລາຍລະອຽດ</Label>
                            <Textarea id="other-income-details" name="other-income-details" placeholder="ລາຍລະອຽດເພີ່ມເຕີມ..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="other-income-invoice">ໃບບິນ (ຖ້າມີ)</Label>
                            <Input id="other-income-invoice" type="file" disabled />
                            <Button type="button" variant="outline" className="w-full mt-2" disabled><Upload className="mr-2 h-4 w-4" /> ອັບໂຫຼດ</Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={resetAllForms} disabled={isSubmitting}>ຍົກເລີກ</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            ບັນທຶກ
                        </Button>
                    </CardFooter>
                </Card>
                </form>
            </TabsContent>
        </Tabs>
        
        <Card>
            <CardHeader>
                <CardTitle>ລາຍການລາຍຮັບຫຼ້າສຸດ</CardTitle>
                <CardDescription>ລາຍການລາຍຮັບທີ່ທ່ານໄດ້ບັນທຶກໄວ້.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ລາຍລະອຽດ</TableHead>
                            <TableHead className="text-right">ຈຳນວນເງິນ</TableHead>
                            <TableHead className="text-center">ຈັດການ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : incomes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    ບໍ່ມີຂໍ້ມູນລາຍຮັບ
                                </TableCell>
                            </TableRow>
                        ) : incomes.map((inc) => (
                            <TableRow key={inc.id}>
                                <TableCell>
                                    <div className="font-medium">{inc.category}</div>
                                    <div className="text-xs text-muted-foreground">{inc.details}</div>
                                    <div className="text-xs text-muted-foreground">{format(new Date(inc.date), "PPP")}</div>
                                </TableCell>
                                <TableCell className="text-right font-medium text-green-600">
                                    {inc.amount.toLocaleString()} KIP
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
                                            ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້. ຂໍ້ມູນລາຍຮັບນີ້ຈະຖືກລຶບອອກຈາກລະບົບຢ່າງຖາວອນ.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(inc.id)}>ຢືນຢັນ</AlertDialogAction>
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
