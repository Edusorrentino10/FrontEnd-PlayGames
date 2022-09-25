import { Header } from '../../../components/Header';
import { CadastroContainer, ConfirmarSenha, Container, Email, Nome, Senha, SignupButton, SubTitle, Title } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const Cadastro = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const response = await api.post('/users', {
        name,
        email,
        password,
      });
      console.log(response)
      navigate('/');
    }
    else {
      toast.error(`As senhas não conferem.`);
    }
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Header />
      <CadastroContainer onSubmit={handleCreateUser}>
        <Title>Cadastro</Title>
        <SubTitle>Já registrado? Faça login <span onClick={() => navigate('/')}>aqui.</span></SubTitle>
        <Nome onChange={(e) => setName(e.target.value)} placeholder="Nome" type="text" required></Nome>
        <Email onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required></Email>
        <Senha onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" minLength={8} required></Senha>
        <ConfirmarSenha onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar senha" type="password" required></ConfirmarSenha>
        <SignupButton value="Cadastrar" type="submit"></SignupButton>
      </CadastroContainer>
      <ToastContainer autoClose={3500} />
    </Container>
  )
}