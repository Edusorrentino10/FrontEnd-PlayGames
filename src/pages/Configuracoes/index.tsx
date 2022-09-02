import { Header } from '../../components/Header';
import { AlterarEmail, AlterarNome, AlterarSenha, Container, Content, InputEmail, InputNome, InputSenha, Title } from './styles';

export const Configuracoes = () => {

    return (
        <Container>
            <Header />
            <Title>Configurações da Conta</Title>
            <Content>
                <form style={{marginRight: '0.4rem'}} >
                    <InputEmail value="" placeholder="cassiocapucho@outlook.com" type="email" />
                    <AlterarEmail onClick={(e) => { e.preventDefault(); }}>Alterar Email</AlterarEmail>
                </form>
                <form >
                    <InputSenha placeholder="*********" type="password" />
                    <AlterarSenha onClick={(e) => { e.preventDefault(); }} >Alterar Senha</AlterarSenha>
                </form>
                <form >
                    <InputNome placeholder="Cassio Capucho" type="text" />
                    <AlterarNome onClick={(e) => { e.preventDefault(); }} >Alterar Nome</AlterarNome>
                </form>
            </Content>
        </Container>
    )
}
