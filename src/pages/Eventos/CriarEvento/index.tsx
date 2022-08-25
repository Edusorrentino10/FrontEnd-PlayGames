import { Header } from '../../../components/Header';
import { CadastroContainer, Local, Container, Data, Nome, SignupButton, Title, Vagas, Modalidade, DisplayFlex, Hora } from './styles';
import { useNavigate } from 'react-router-dom';

export const CriarEvento = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <CadastroContainer>
                <Title>Criar Evento</Title>
                <Nome placeholder="Nome" type="text" required />
                <DisplayFlex>
                    <Data type="date" required />
                    <Hora type="time" required />
                </DisplayFlex>
                <Vagas placeholder="Vagas" type="number" required />
                <Local placeholder="Local" type="text" required />
                <Modalidade placeholder="Modalidade" type="text" required />
                <SignupButton value="Criar" type="submit" onClick={(e) => { e.preventDefault(); navigate('/eventos') }}></SignupButton>
            </CadastroContainer>
        </Container>
    )
}