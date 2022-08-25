import { Header } from '../../components/Header';
import { CadastroContainer, ConfirmarSenha, Container, Email, Nome, Senha, SignupButton, SubTitle, Title } from './styles';
import { useNavigate } from 'react-router-dom';

export const Cadastro = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <CadastroContainer>
                <Title>Cadastro</Title>
                <SubTitle>Já registrado? Faça login <span onClick={() => navigate('/')}>aqui.</span></SubTitle>
                <Nome placeholder="Nome" type="text"></Nome>
                <Email placeholder="Email" type="email"></Email>
                <Senha placeholder="Senha" type="password"></Senha>
                <ConfirmarSenha placeholder="Confirmar senha" type="password"></ConfirmarSenha>
                <SignupButton value="Cadastrar" type="submit" onClick={(e) =>{ e.preventDefault(); navigate('/eventos') }}></SignupButton>
            </CadastroContainer>
        </Container>
    )
}