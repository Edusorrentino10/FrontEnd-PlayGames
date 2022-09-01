import { Header } from '../../components/Header';
import { AlterarFoto, AlterarInformacoes, AlterarSenha, Column, Container, Content, Email, ExcluirPerfil, Foto, GerenciarEventos, Nome, Title, SegundoContent } from './styles';




export const Perfil = () => {


    
    return (
    <Container>
        <Header />
        <Title>Perfil</Title>
        <Content>
            <Column>
                <Foto src="https://blogdojuca.uol.com.br/files/2022/04/img_1197.jpg" type="image"></Foto>
                <AlterarFoto type="file" accept="image/png, image/jpg, image/gif, image/jpeg" />
            </Column>
            <Column>
                <Nome><strong>Nome:</strong> Germán Ezequiel Cano Recalde</Nome>
                <Email><strong>Email:</strong> canoL14@gmail.com</Email>
            </Column>
        </Content>
        <SegundoContent>
            <AlterarInformacoes>Alterar Informações</AlterarInformacoes>
            {/* <AlterarSenha>Alterar Senha</AlterarSenha>
            <ExcluirPerfil>Excluir Perfil</ExcluirPerfil> */}
            <GerenciarEventos>Gerenciar Eventos</GerenciarEventos>
        </SegundoContent>
    </Container>
)}