import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { AlterarFoto, AlterarInformacoes, AlterarSenha, Column, Container, Content, Email, ExcluirPerfil, Foto, GerenciarEventos, Nome, Title, SegundoContent } from './styles';
import { BsFillPersonFill } from 'react-icons/bs';




export const Perfil = () => {

    const navigate = useNavigate();

    const [perfilUsuario, setPerfilUsuario] = useState([])
    const auth = useContext(AuthContext);

    useEffect(() => {
        const getPerfil = async () => {
            const response = await api.get(`/users/me/${auth.user.id}`);
            setPerfilUsuario(response.data);
        }
        getPerfil();
    }, [])
    console.log(auth.user)
    console.log(perfilUsuario);

    

    return (
        <Container>
            <Header />
            <Title>Perfil</Title>
            <Content>
                <Column>
                    <BsFillPersonFill size={60} />
                </Column>
                <Column>
                    <Nome><strong>Nome: </strong>{auth.user.name}</Nome>
                    <Email><strong>Email: </strong>{auth.user.email}</Email>
                </Column>
            </Content>
            <SegundoContent>
                <AlterarInformacoes onClick={() => navigate('/configuracoes')}>Alterar Informações</AlterarInformacoes>
                {/* <AlterarSenha>Alterar Senha</AlterarSenha>
            <ExcluirPerfil>Excluir Perfil</ExcluirPerfil> */}
            </SegundoContent>
        </Container>
    )
}