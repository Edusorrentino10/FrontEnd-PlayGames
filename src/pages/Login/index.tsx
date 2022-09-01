import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Cadastrar, Container, Email, EsqueceuSenha, LoginButton, LoginContainer, Senha, SubTitle, Title } from './styles';

export const Login = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <LoginContainer>
                <Title>Login</Title>
                <SubTitle>Faça login para continuar.</SubTitle>
                <Email placeholder="Email" type="email"></Email>
                <Senha placeholder="Senha" type="password"></Senha>
                <EsqueceuSenha onClick={() => navigate('/esqueceu-senha')}>Esqueceu a senha?</EsqueceuSenha>
                <Cadastrar onClick={() => navigate('/cadastro')}>Cadastre-se</Cadastrar>
                <LoginButton value="Entrar" type="submit" onClick={(e) =>{ e.preventDefault(); navigate('/eventos') }}></LoginButton>
            </LoginContainer>
        </Container>
    );
}