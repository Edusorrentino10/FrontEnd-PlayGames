import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, FilterEvents, FilterOptions, FutebolFilter, VoleiFilter, FifaFilter, CSFilter } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';

export const MostrarEvento = () => {

    const navigate = useNavigate();

    const listaEventos = [{
        nome: 'PROZAO',
        horario: '18:00',
        data: '18/09',
        local: 'PC',
        modalidade: 'FIFA',
        vagas: 11,
    },
    {
        nome: 'FutePorco',
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
        modalidade: 'Counter-Strike',
        vagas: 5,
    },
    {
        nome: 'Voleizin',
        horario: '16:00',
        data: '03/09',
        local: 'Miami',
        modalidade: 'Volei',
        vagas: 12,
    }
    ];


    const [openFilter, setOpenFilter] = useState(false);
    const [futebolSelected, setFutebolSelected] = useState(false);
    const [voleiSelected, setVoleiSelected] = useState(false);
    const [fifaSelected, setFifaSelected] = useState(false);
    const [csSelected, setCsSelected] = useState(false);
    const handleFilter = () => {
        setOpenFilter(!openFilter);
    }


    return (
        <Container>
            <Header />
            <Content>
                <Title>Eventos</Title>
                <CriarEventoButton onClick={() => navigate('/criar-evento')} type="submit" value="Criar Evento" />

                <FilterEvents isActive={openFilter} onClick={handleFilter} >Filtrar<MdArrowDropDown style={{ transform: openFilter ? 'rotate(180deg)' : '' }} /></FilterEvents>
                <FilterOptions isActive={openFilter}>
                    <FutebolFilter isActive={futebolSelected} onClick={() => setFutebolSelected(!futebolSelected)}>Futebol</FutebolFilter>
                    <VoleiFilter isActive={voleiSelected} onClick={() => setVoleiSelected(!voleiSelected)}>Volei</VoleiFilter >
                    <FifaFilter isActive={fifaSelected} onClick={() => setFifaSelected(!fifaSelected)}>Fifa</FifaFilter>
                    <CSFilter isActive={csSelected} onClick={() => setCsSelected(!csSelected)}>Counter Strike</CSFilter>
                </FilterOptions>
            </Content>
            <EventosContent>
                {listaEventos.map((evento, key) => evento.modalidade === 'Futebol' && futebolSelected &&
                    <Evento key={key}>
                        <DisplayFlex>
                            <NomeEvento>{evento.nome}</NomeEvento>
                            <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                        </DisplayFlex>
                        <LocalEvento>{evento.local}</LocalEvento>
                        <ModalidadeEvento>{evento.modalidade}
                            <GiSoccerBall style={{ marginLeft: '1rem' }} />
                        </ModalidadeEvento>
                        <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                    </Evento>
                )}
                {listaEventos.map((evento, key) => evento.modalidade === 'Volei' && voleiSelected &&
                    <Evento key={key}>
                        <DisplayFlex>
                            <NomeEvento>{evento.nome}</NomeEvento>
                            <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                        </DisplayFlex>
                        <LocalEvento>{evento.local}</LocalEvento>
                        <ModalidadeEvento>{evento.modalidade}
                            <GiVolleyballBall style={{ marginLeft: '1rem' }} />
                        </ModalidadeEvento>
                        <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                    </Evento>
                )}
                {listaEventos.map((evento, key) => evento.modalidade === 'FIFA' && fifaSelected &&
                    <Evento key={key}>
                        <DisplayFlex>
                            <NomeEvento>{evento.nome}</NomeEvento>
                            <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                        </DisplayFlex>
                        <LocalEvento>{evento.local}</LocalEvento>
                        <ModalidadeEvento>{evento.modalidade}
                            <RiComputerLine style={{ marginLeft: '1rem' }} />
                        </ModalidadeEvento>
                        <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                    </Evento>
                )}
                {listaEventos.map((evento, key) => evento.modalidade === 'Counter-Strike' && csSelected &&
                    <Evento key={key}>
                        <DisplayFlex>
                            <NomeEvento>{evento.nome}</NomeEvento>
                            <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                        </DisplayFlex>
                        <LocalEvento>{evento.local}</LocalEvento>
                        <ModalidadeEvento>{evento.modalidade}
                            <RiComputerLine style={{ marginLeft: '1rem' }} />
                        </ModalidadeEvento>
                        <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                    </Evento>
                )}
            </EventosContent>
        </Container>
    )
}