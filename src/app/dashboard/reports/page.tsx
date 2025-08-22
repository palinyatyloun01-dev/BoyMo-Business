
"use client";

import * as React from "react"
import { format, subDays } from "date-fns"
import { Calendar as CalendarIcon, BarChart2, FileSpreadsheet, Loader2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import * as XLSX from "xlsx";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReportsChart } from "@/components/reports-chart"
import { getIncomes, getExpenses } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function ReportsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  })
  const [isExporting, setIsExporting] = React.useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
        const [incomes, expenses] = await Promise.all([getIncomes(), getExpenses()]);

        const allTransactions = [
            ...incomes.map(item => ({
                Date: format(new Date(item.date), "yyyy-MM-dd"),
                Type: "ລາຍຮັບ",
                Category: item.category,
                Details: item.details,
                Amount: item.amount
            })),
            ...expenses.map(item => ({
                Date: format(new Date(item.date), "yyyy-MM-dd"),
                Type: "ລາຍຈ່າຍ",
                Category: item.category,
                Details: item.description,
                Amount: item.amount
            }))
        ];

        // Sort by date
        allTransactions.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

        const worksheet = XLSX.utils.json_to_sheet(allTransactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, "BoMo-Pizza-Report.xlsx");
        
        toast({
            title: "ສຳເລັດ",
            description: "ຂໍ້ມູນຖືກ Export ເປັນໄຟລ໌ Excel ສຳເລັດແລ້ວ."
        });
    } catch (error) {
        console.error("Failed to export to Excel:", error);
        toast({
            variant: "destructive",
            title: "ຜິດພາດ",
            description: "ບໍ່ສາມາດ Export ຂໍ້ມູນໄດ້. ກະລຸນາລອງໃໝ່."
        });
    } finally {
        setIsExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart2 className="h-8 w-8" />
          ລາຍງານ
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>ເລືອກຊ່ວງວັນທີ</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleExport} disabled={isExporting} className="bg-green-700 hover:bg-green-800">
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileSpreadsheet className="mr-2 h-4 w-4" />}
            Export ເປັນ Excel
          </Button>
        </div>
      </div>
      <ReportsChart dateRange={date} />
    </div>
  )
}
