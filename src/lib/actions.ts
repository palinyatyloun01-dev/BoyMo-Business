
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, query, orderBy, where, Timestamp, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import type { Income, Expense, Transaction } from './schema';
import { subDays, startOfDay, endOfDay } from 'date-fns';

// ====== Income Actions ======

export async function addIncome(formData: Omit<Income, 'id' | 'createdAt' >) {
  try {
    const newIncome = {
      ...formData,
      id: uuidv4(),
      createdAt: Date.now(),
    };
    await addDoc(collection(db, 'incomes'), newIncome);
    revalidatePath('/dashboard/income');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error adding income:', error);
    return { success: false, error: 'Failed to add income.' };
  }
}

export async function getIncomes(): Promise<Income[]> {
    try {
        const q = query(collection(db, 'incomes'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Income);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        return [];
    }
}

export async function deleteIncome(id: string) {
    try {
        const q = query(collection(db, 'incomes'), where('id', '==', id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            await deleteDoc(doc(db, 'incomes', docId));
            revalidatePath('/dashboard/income');
            revalidatePath('/dashboard');
            return { success: true };
        }
         return { success: false, error: 'Income not found' };
    } catch (error) {
        console.error('Error deleting income:', error);
        return { success: false, error: 'Failed to delete income.' };
    }
}


// ====== Expense Actions ======

export async function addExpense(formData: Omit<Expense, 'id' | 'createdAt'>) {
    try {
        const newExpense = {
        ...formData,
        id: uuidv4(),
        createdAt: Date.now(),
        };
        await addDoc(collection(db, 'expenses'), newExpense);
        revalidatePath('/dashboard/expenses');
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error adding expense:', error);
        return { success: false, error: 'Failed to add expense.' };
    }
}

export async function getExpenses(): Promise<Expense[]> {
    try {
        const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Expense);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return [];
    }
}

export async function deleteExpense(id: string) {
    try {
        const q = query(collection(db, 'expenses'), where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            await deleteDoc(doc(db, 'expenses', docId));
            revalidatePath('/dashboard/expenses');
            revalidatePath('/dashboard');
            return { success: true };
        }
        return { success: false, error: 'Expense not found' };
    } catch (error) {
        console.error('Error deleting expense:', error);
        return { success: false, error: 'Failed to delete expense.' };
    }
}

// ====== Transaction Actions ======

export async function getRecentTransactions(): Promise<Transaction[]> {
    const incomes = (await getIncomes()).map(i => ({ ...i, txType: 'income' as const }));
    const expenses = (await getExpenses()).map(e => ({ ...e, txType: 'expense' as const }));

    const allTransactions = [...incomes, ...expenses];
    allTransactions.sort((a, b) => b.createdAt - a.createdAt);
    
    return allTransactions;
}


export async function getTodaySummary() {
    const todayStart = startOfDay(new Date()).toISOString();
    
    const incomesSnapshot = await getDocs(query(collection(db, 'incomes'), where('date', '>=', todayStart)));
    const todayIncome = incomesSnapshot.docs.reduce((sum, doc) => sum + (doc.data() as Income).amount, 0);

    const expensesSnapshot = await getDocs(query(collection(db, 'expenses'), where('date', '>=', todayStart)));
    const todayExpense = expensesSnapshot.docs.reduce((sum, doc) => sum + (doc.data() as Expense).amount, 0);

    const todayProfit = todayIncome - todayExpense;

    return {
        todayIncome,
        todayExpense,
        todayProfit,
    };
}
