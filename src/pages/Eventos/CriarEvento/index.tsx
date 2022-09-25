import { Header } from '../../../components/Header';
import { CadastroContainer, Local, Container, Data, Nome, SignupButton, Title, Vagas, Modalidade, DisplayFlex, Hora, Descricao } from './styles';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../../services/api';

export const CriarEvento = () => {


    const [events, setEvents] = useState([])
    const [nome, setNome] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    const [vagas, setVagas] = useState('')
    const [local, setLocal] = useState('')
    const [descricao, setDescricao] = useState('')


    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.post('/events', {
            // nome,
            // data,
            // hora,
            // vagas,
            // local,
            // descricao

            //id: "asdsae2o13290",
            name: nome,
            description: descricao,
            teamsLimit: parseInt(vagas),
            date: new Date(data),
            //createdAt: data,
            //pdatedAt: data
        });
        setEvents(response.data);
        console.log(events);
        //navigate('/eventos')
    }

    return (
        <Container>
            <Header />
            <CadastroContainer onSubmit={handleSubmit}>
                <Title>Criar Evento</Title>
                <Nome placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <DisplayFlex>
                    <Data type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                    <Hora type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
                </DisplayFlex>
                <Vagas placeholder="Vagas" type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} required />
                <Local placeholder="Local" type="text" value={local} onChange={(e) => setLocal(e.target.value)} required />
                <Descricao placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                {/*<Modalidade placeholder="Modalidade" type="text" required /> */}
                <SignupButton value="Criar" type="submit"></SignupButton>
            </CadastroContainer>
        </Container>
    )
}