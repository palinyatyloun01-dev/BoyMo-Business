export interface Income {
    id: string;
    date: string; // ISO 8601 format
    type: 'pizza' | 'other';
    category: string; // e.g., 'Pizza Sale', 'ເງິນເດືອນ'
    details: string; // e.g., "Large Seafood, 2 Toppings", "ລາຍລະອຽດເພີ່ມເຕີມ..."
    amount: number;
    invoiceUrl?: string;
    createdAt: number; // Unix timestamp
  }
  
  export interface Expense {
    id: string;
    date: string; // ISO 8601 format
    category: string; // e.g., 'ວັດຖຸດິບ'
    description: string;
    amount: number;
    invoiceUrl?: string;
    createdAt: number; // Unix timestamp
  }
  
  export type Transaction = (Income & { txType: 'income' }) | (Expense & { txType: 'expense' });
  