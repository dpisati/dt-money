import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dp money" />
                <button onClick={onOpenNewTransactionModal} type="button">
                    New transaction
                </button>
            </Content>
        </Container>
    );
};
