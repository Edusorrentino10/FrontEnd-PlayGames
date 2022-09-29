import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from '../../../components/Header';
import { AuthContext } from '../../../contexts/AuthContext';
import { Cadastrar, Container, Email, EsqueceuSenha, LoginButton, LoginContainer, Senha, SubTitle, Title } from './styles';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, isSigningIn } = useContext(AuthContext);

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (email !== '' && password !== '') {
                const response = await signIn({ email, password });
                if (response === true) {
                    navigate('/eventos')
                    return true;
                }
            }
            toast.error(`Dados incorretos.`)
        } catch (err) {
            console.log('🚀 ~ file: index.tsx ~ handleSignIn ~ err', err)
        }
    };

    return (
        <Container>
            <Header />
            <LoginContainer onSubmit={(e) => handleSignIn(e)}>
                <Title>Login</Title>
                <SubTitle>Faça login para continuar.</SubTitle>
                <Email placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                <Senha placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />
                <EsqueceuSenha onClick={() => navigate('/esqueceu-senha')}>Esqueceu a senha?</EsqueceuSenha>
                <Cadastrar onClick={() => navigate('/cadastro')}>Cadastre-se</Cadastrar>
                <LoginButton value="Entrar" type="submit" disabled={isSigningIn} />
            </LoginContainer>
            <ToastContainer autoClose={3500} />
        </Container>
    );
}