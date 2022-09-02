import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Header';
import { Container, Content, ContinueButton, InputDescricao, InputEmail, Seta } from './styles';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const CriarEquipe = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Header />
            <Content onSubmit={(e) => { e.preventDefault(); }}>
                <Seta>
                    <AiOutlineArrowLeft style={{cursor:'pointer'}} onClick={ () => { navigate('/equipes'); }} /> <span>Crie sua equipe</span>
                </Seta>
                <InputEmail placeholder="Nome" type="text" />
                <InputDescricao placeholder="Descrição" />
                <ContinueButton type="submit" value="Cadastrar Equipe" />
            </Content>
        </Container>
    )
}