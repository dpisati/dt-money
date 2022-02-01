import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { TransactionsTable } from './components/Transactionstable';
import { GlobalStyle } from './styles/global';
import { createServer, Model } from 'miragejs';
import Modal from 'react-modal';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

createServer({
    models: {
        transactions: Model,
    },

    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'Webdev Freelance',
                    type: 'deposit',
                    category: 'Dev',
                    amount: 6000,
                    createdAt: new Date('2022-01-13 09:00:00'),
                },
                {
                    id: 2,
                    title: 'Rent',
                    type: 'withdraw',
                    category: 'Bills',
                    amount: 400,
                    createdAt: new Date('2022-01-18 06:00:00'),
                },
            ],
        });
    },
    routes() {
        this.namespace = 'api';
        this.get('/transactions', () => {
            return this.schema.all('transactions');
        });

        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody);
            return schema.create('transactions', data);
        });
    },
});

export const App = () => {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }
    return (
        <TransactionProvider>
            <GlobalStyle />
            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />

            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <Dashboard />
            <TransactionsTable />
        </TransactionProvider>
    );
};
