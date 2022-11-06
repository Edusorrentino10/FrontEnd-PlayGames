/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, InscreverCasaButton, SelectCasa, SelectVisitante, InscreverVisitanteButton, ConfirmarButtonVisitante, ConfirmarButtonCasa } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const customStylesModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#e0e0e0',
        borderRadius: '0.3rem',
        padding: 0,
        border: '2px solid #ff7815'
    },
    overlay: {
        background: 'rgba(28, 28, 28, 0.75)',
    }
};


type SportsProps = {
    id: string,
    name: string,
}

type EventsProps = {
    id: string,
    name: string,
    description: string,
    day: string,
    teamsLimit: string,
    location: string,
    sportId: string,
    time: string,
    Sport: {
        id: string,
        name: string,
    },
    teams: any,
    users: any
}

export const MostrarEvento = () => {
    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [teamsAdm, setTeamsAdm] = useState<EventsProps[]>([]);
    const [event, setEvent] = useState<EventsProps>();
    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterEvento, setFilterEvento] = useState('');
    const [attInfos, setAttInfos] = useState(false);


    const [casaActive, setCasaActive] = useState(false);
    const [visitanteActive, setVisitanteActive] = useState(false);

    const [teamCasa, setTeamCasa] = useState('');
    const [teamVisitante, setTeamVisitante] = useState('');

    const [jogadoresDoTimeA, setJogadoresDoTimeA] = useState<any>();
    const [jogadoresDoTimeB, setJogadoresDoTimeB] = useState<any>();


    useEffect(() => {

        const getEvents = async () => {
            const response = await api.get(`/events`);
            setEvents(response.data);
        }
        getEvents();

        const getTeamsAdm = async () => {
            const response = await api.get(`/teams/findMyTeams/${auth.user.id}`);
            setTeamsAdm(response.data);
        }
        getTeamsAdm();

        const getSports = async () => {
            const response = await api.get('/sports');
            setSports(response.data);
        }
        getSports();


    }, [attInfos])

    const inscreverEquipeCasa = async () => {

        if (event) {
            if (event.teams[0] && event.teams[1]) {
                return toast.error('Evento lotado!')
            }
        }
        console.log(event)

        console.log(teamCasa)
        console.log('aaaaa')
        if (teamCasa === '') {
            setTeamCasa(teamsAdm[0].id)
        }
        if (event && teamCasa) {
            const response = await api.post(`/events/addTeam?eventId=${event.id}&teamId=${teamCasa}`);
            setAttInfos(!attInfos)
            toast.success("Time adicionado!")
            setOpenModal(false);
        };
    };

    const inscreverEquipeVisitante = async () => {
        if (event) {
            if (event.teams[0] && event.teams[1]) {
                return toast.error('Evento lotado!')
            }
        }

        if (teamVisitante === '') {
            setTeamVisitante(teamsAdm[0].id)
        }
        console.log(event)

        console.log(teamVisitante)
        console.log('aaaaa')
        if (event && teamVisitante) {
            const response = await api.post(`/events/addTeam?eventId=${event.id}&teamId=${teamVisitante}`);
            setAttInfos(!attInfos)
            toast.success("Time adicionado!")
            setOpenModal(false);
        }; 
    };


    useEffect(() => {

        playersTeamA();
        playersTeamB();

    }, [event])


    const playersTeamA = () => {
        let playersA: any[] = [];
        event?.teams[0]?.users ?
            event?.teams[0]?.users?.forEach((user: any) => (
                playersA.push(' 👤 ' + user.name + ' 📩 ' + user.email)
            )) : []
        if (playersA.length > 0) {
            setJogadoresDoTimeA(playersA)
        } else {
            setJogadoresDoTimeA('');
        }
    }

    const playersTeamB = () => {
        let playersB: any[] = [];
        event?.teams[1]?.users ?
            event?.teams[1]?.users?.forEach((user: any) => (
                playersB.push(' 👤 ' + user.name + ' ' + ' 📩 ' + ' ' + user.email)
            )) : []
        if (playersB.length > 0) {
            setJogadoresDoTimeB(playersB)
        } else {
            setJogadoresDoTimeB('');
        }
    }


    const ModalEvents = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <TitleModal>{event?.name}</TitleModal>
            <HorarioModal>{event?.day} - {event?.time}</HorarioModal>
            <HorarioModal>Vagas: {event?.teamsLimit}</HorarioModal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ImgModal src={vslogo} alt="" />
            </div>
            <DivEquipes>
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    {   // Tentar pegar dentro do Get do Events o atributo Teams, se tiver Teams[0], bota dentro do TimeA e bota o display de todos esses botões de inscrição que ta em baixo = 'none'. 
                    }
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>
                        {
                            event?.teams[0]?.name ||
                            'Time A'
                        }
                    </legend>

                    {
                        jogadoresDoTimeA ?
                            jogadoresDoTimeA.map((player: any, key: any) => (
                                <p>{player}</p>
                            )) : ''
                    }
                    {
                        !event?.teams[0] ?
                            <>
                                <InscreverCasaButton onClick={(e) => { e.preventDefault(); setCasaActive(!casaActive) }}>{casaActive ? 'Cancelar Inscrição' : 'Inscrever Equipe'}</InscreverCasaButton>
                                <SelectCasa onChange={(e) => setTeamCasa(e.target.value)} isActive={casaActive} name="select">
                                    {teamsAdm.map((team, key) => (
                                        <option key={key} value={team.id}>{team.name}</option>
                                    ))}
                                </SelectCasa>
                                <ConfirmarButtonCasa onClick={inscreverEquipeCasa} isActive={casaActive}>Confirmar</ConfirmarButtonCasa>
                            </> : ''
                    }

                </fieldset>
                {/** Time Visitante */}
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    {   // Aqui verifica se tem o Teams[1], se tiver bota dentro do TimeB e bota o display de todos esses botões de inscrição que ta em baixo = 'none'.
                    }
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>
                        {
                            event?.teams[1]?.name ||
                            'Time B'
                        }
                    </legend>

                    {
                        jogadoresDoTimeB ?
                            jogadoresDoTimeB.map((player: any, key: any) => (
                                <div>{player}</div>
                            )) : ''
                    }
                    {
                        !event?.teams[1] ?
                            <>
                                <InscreverVisitanteButton onClick={(e) => { e.preventDefault(); setVisitanteActive(!visitanteActive) }}>{visitanteActive ? 'Cancelar Inscrição' : 'Inscrever Equipe'}</InscreverVisitanteButton>
                                <SelectVisitante onChange={(e) => setTeamVisitante(e.target.value)} isActive={visitanteActive} name="select">
                                    {teamsAdm.map((team, key) => (
                                        <option key={key} value={team.id}>{team.name}</option>
                                    ))}
                                </SelectVisitante>
                                <ConfirmarButtonVisitante onClick={inscreverEquipeVisitante} isActive={visitanteActive}>Confirmar</ConfirmarButtonVisitante>
                            </> : ''
                    }
                </fieldset>
            </DivEquipes>
            <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
        </Modal>
    )

    return (
        <Container>
            <Header />
            <Content>
                <Title>Eventos</Title>
                <CriarEventoButton onClick={() => navigate('/criar-evento')} type="submit" value="Criar Evento" />
                <DisplayFlex style={{ borderBottom: 'none' }}>
                    <select onChange={(e) => setFilterCategoria(e.target.value)} name="select">
                        <option defaultChecked value={''}>Todos</option>

                        {sports.map((item) =>
                            <option value={item.name}>{item.name}</option>
                        )}
                    </select>
                    {/*<input type="text" placeholder="Digite o nome do evento" onChange={(e) => setFilterEvento(e.target.value)} style={{marginTop:'1.2rem', padding:'10px'}}/>*/}
                </DisplayFlex>

            </Content>
            <EventosContent>
                {filterCategoria === '' ?
                    events.map((evento, key) =>
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setEvent(evento)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{evento?.name}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.location}</LocalEvento>
                                <ModalidadeEvento>{evento.Sport?.name}
                                    <GiSoccerBall style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                                <DescricaoEvento>{evento.description}</DescricaoEvento>
                            </Evento>
                        </div>
                    ) :
                    events.map((evento, key) => evento.Sport?.name === filterCategoria &&
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setEvent(evento)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{evento?.name}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.location}</LocalEvento>
                                <ModalidadeEvento>{evento.Sport?.name}
                                    <GiSoccerBall style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                                <DescricaoEvento>{evento.description}</DescricaoEvento>
                            </Evento>
                        </div>
                    )
                }
            </EventosContent>
            <ModalContent>
                <ModalEvents />
            </ModalContent>
            <ToastContainer autoClose={3500} />
        </Container>
    )
}

