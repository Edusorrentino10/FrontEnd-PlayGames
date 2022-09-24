import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Header';
import { Container, Content, ContinueButton, InputDescricao, InputEmail, Seta } from './styles';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FormEvent, useState } from 'react';
import { api } from '../../../services/api';

export const CriarEquipe = () => {

    const navigate = useNavigate();


    const [equipes, setEquipes] = useState([])
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.post('/teams', {
            name: nome,
            description: descricao,
        });
        setEquipes(response.data);
        console.log(equipes);
        navigate('/equipes')
    }

    return (
        <Container>
            <Header />
            <Content onSubmit={handleSubmit}>
                <Seta>
                    <AiOutlineArrowLeft style={{cursor:'pointer'}} onClick={ () => { navigate('/equipes'); }} /> <span>Crie sua equipe</span>
                </Seta>
                <InputEmail placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <InputDescricao placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <ContinueButton type="submit" value="Cadastrar Equipe" />
            </Content>
        </Container>
    )
}