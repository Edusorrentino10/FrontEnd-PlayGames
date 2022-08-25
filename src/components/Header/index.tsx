import { Container, Equipe, Eventos, Menu, Perfil, Title } from './styles';

export const Header = () => {
    return (
        <Container>
            <Title>Play Games</Title>
            <Menu>
                <Perfil>Perfil</Perfil>
                <Equipe>Equipe</Equipe>
                <Eventos>Eventos</Eventos>
            </Menu>
        </Container>
    )
}