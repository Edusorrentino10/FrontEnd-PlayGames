import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Container, Content, ContinueButton, InputEmail, Seta } from './styles';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const EsqueceuSenha = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <Content onSubmit={(e) => { e.preventDefault(); }}>
                <Seta>
                    <AiOutlineArrowLeft style={{cursor:'pointer'}} onClick={ () => { navigate('/'); }} /> <span>Recupere a senha</span>
                </Seta>
                <InputEmail placeholder="Email" type="email" />
                <ContinueButton type="submit" value="Confirmar" />
            </Content>
        </Container>
    )
}