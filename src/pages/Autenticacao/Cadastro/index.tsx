import { Header } from '../../../components/Header';
import { CadastroContainer, ConfirmarSenha, Container, Email, Nome, Senha, SignupButton, SubTitle, Title } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useState } from 'react';

export const Cadastro = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateUser = async () => {
        const response = await api.post('/users', {
            name,
            email,
            password,
          });
          console.log(response)
          if (response.status === 201) {
            navigate('/');
          } else {
            alert('Insira os dados corretamente');
          }
        
    };

    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <CadastroContainer>
                <Title>Cadastro</Title>
                <SubTitle>Já registrado? Faça login <span onClick={() => navigate('/')}>aqui.</span></SubTitle>
                <Nome  onChange={(e) => setName(e.target.value)} placeholder="Nome" type="text"></Nome>
                <Email onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"></Email>
                <Senha onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password"></Senha>
                <ConfirmarSenha placeholder="Confirmar senha" type="password"></ConfirmarSenha>
                <SignupButton value="Cadastrar" type="button" onClick={handleCreateUser}></SignupButton>
            </CadastroContainer>
        </Container>
    )
}