import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { api } from '../services/api';

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionInput {
    title: string;
    amount: number;
    category: string;
    type: string;
}

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions').then((res) =>
            setTransactions(res.data.transactions)
        );
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transactions } = response.data;

        setTransactions((oldState) => [...oldState, transactions]);
    }

    return (
        <TransactionContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export function useTransactions() {
    const context = useContext(TransactionContext);
    return context;
}
