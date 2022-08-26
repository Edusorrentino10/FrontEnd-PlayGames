import { useNavigate } from 'react-router-dom';
import { Container, Equipe, Eventos, Menu, Perfil, Title } from './styles';

export const Header = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Title>Play Games</Title>
            <Menu>
                <Perfil onClick={() => navigate('/perfil')}>Perfil</Perfil>
                <Equipe>Equipe</Equipe>
                <Eventos onClick={() => navigate('/eventos')}>Eventos</Eventos>
            </Menu>
        </Container>
    )
}