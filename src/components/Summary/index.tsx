import { Container } from './styles';

import entriesImg from '../../assets/income.svg';
import withdrawImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export const Summary = () => {
    const { transactions } = useTransactions();

    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'deposit') {
                acc.deposits += transaction.amount;
                acc.total += transaction.amount;
            } else {
                acc.withdraws += transaction.amount;
                acc.total -= transaction.amount;
            }
            return acc;
        },
        {
            deposits: 0,
            withdraws: 0,
            total: 0,
        }
    );

    return (
        <Container>
            <div>
                <header>
                    <p>Entries</p>
                    <img src={entriesImg} alt="Entries" />
                </header>
                <strong>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Withdraws</p>
                    <img src={withdrawImg} alt="Withdraws" />
                </header>
                <strong>
                    -{' '}
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="total">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {' '}
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    );
};
