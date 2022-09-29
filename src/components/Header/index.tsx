import { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, Equipe, Eventos, Logout, Menu, Perfil, Title } from './styles';

export const Header = () => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    };

    return (
        <Container>
            <Title>Play Games</Title>
            <Menu>
                {auth.user &&
                    <div style={{display:'flex'}}>
                        <Perfil onClick={() => navigate('/perfil')}>Perfil</Perfil>
                        <Equipe onClick={() => navigate('/equipes')}>Equipe</Equipe>
                        <Eventos onClick={() => navigate('/eventos')}>Eventos</Eventos>
                    </div>
                }
                {auth.user &&
                    <Logout onClick={handleLogout}><MdLogout size={18} style={{marginTop:'3px'}}/>Sair</Logout>
                }
            </Menu>
        </Container>
    )
}