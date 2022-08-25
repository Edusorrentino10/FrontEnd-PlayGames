import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const MostrarEvento = () => {

    const navigate = useNavigate();

    const listaEventos = [{
        nome: 'PROZAO',
        horario: '18:00',
        data: '18/09',
        local: 'PS4',
        modalidade: 'FIFA',
        vagas: 11,
    },
    {
        nome: 'CORUJAO',
        horario: '21:00',
        data: '18/09',
        local: 'Arena Porco',
        modalidade: 'Futebol',
        vagas: 11,
    },
    {
        nome: 'CS 5X5',
        horario: '22:00',
        data: '18/09',
        local: 'PC',
        modalidade: 'Counter Strike',
        vagas: 5,
    },
    ];


    return (
        <Container>
            <Header></Header>
            <Content>
                <Title>Eventos</Title>
                <CriarEventoButton onClick={() => navigate('/criar-evento')} type="submit" value="Criar Evento" />
            </Content>
            <EventosContent>
                {listaEventos.map(evento =>
                    <Evento>
                        <DisplayFlex>
                            <NomeEvento>{evento.nome}</NomeEvento>
                            <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento> 
                        </DisplayFlex>
                        <LocalEvento>{evento.local}</LocalEvento>
                        <ModalidadeEvento>{evento.modalidade} <GiSoccerBall style={{ marginLeft: '1rem' }} /></ModalidadeEvento>
                        <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                    </Evento>
                )}
            </EventosContent>
        </Container>
    )
}