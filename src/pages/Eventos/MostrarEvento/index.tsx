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
    }
}

export const MostrarEvento = () => {
    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [teamsAdm, setTeamsAdm] = useState<EventsProps[]>([]);
    const [event, setEvent] = useState<EventsProps>();
    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('')

    const [casaActive, setCasaActive] = useState(false);
    const [visitanteActive, setVisitanteActive] = useState(false);

    const [teamCasa, setTeamCasa] = useState('');
    const [teamVisitante, setTeamVisitante] = useState('');

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

    }, [])

    const inscreverEquipeCasa = async () => {

        //Isso é só uma ideia
        // if(evento.teams[0] && evento.teams[1]){
        //     return toast.error('Evento lotado!')
        // }

        if (teamCasa === '') {
            return toast.error('Time não escolhido!');
        }

        const response = await api.post(`/events/addTeam`,
            // botar os dados para enviar pra rota de addTeam.
        );
    };

    const inscreverEquipeVisitante = async () => {

        //Isso é só uma ideia
        // if(evento.teams[0] && evento.teams[1]){
        //     return toast.error('Evento lotado!')
        // }

        if (teamVisitante === '') {
            return toast.error('Time não escolhido!');
        }

        const response = await api.post(`/events/addTeam`,
            // botar os dados para enviar pra rota de addTeam.
        );
    };

    const ModalEvents = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
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
                            //'teams[0].name' ||     SE CONSEGUIR PEGAR O TEAM DO EVENTO, TIRA ESSE COMMENT E TIRA AS ASPAS ALI.
                            'Time A'
                        }
                    </legend>
                    <InscreverCasaButton onClick={(e) => { e.preventDefault(); setCasaActive(!casaActive) }}>{casaActive ? 'Cancelar Inscrição' : 'Inscrever Equipe'}</InscreverCasaButton>
                    <SelectCasa onChange={(e) => setTeamCasa(e.target.value)} isActive={casaActive} name="select">
                        {teamsAdm.map((team, key) => (
                            <option key={key} value={team.id}>{team.name}</option>
                        ))}
                    </SelectCasa>
                    <ConfirmarButtonCasa onClick={inscreverEquipeCasa} isActive={casaActive}>Confirmar</ConfirmarButtonCasa>

                </fieldset>
                {/** Time Visitante */}
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    {   // Aqui verifica se tem o Teams[1], se tiver bota dentro do TimeB e bota o display de todos esses botões de inscrição que ta em baixo = 'none'.
                    }
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>
                        {
                            //'teams[1].name' ||     Aqui tenta pegar pela posição 1.
                            'Time B'
                        }
                    </legend>
                    <InscreverVisitanteButton onClick={(e) => { e.preventDefault(); setVisitanteActive(!visitanteActive) }}>{visitanteActive ? 'Cancelar Inscrição' : 'Inscrever Equipe'}</InscreverVisitanteButton>
                    <SelectVisitante onChange={(e) => setTeamVisitante(e.target.value)} isActive={visitanteActive} name="select">
                        {teamsAdm.map((team, key) => (
                            <option key={key} value={team.id}>{team.name}</option>
                        ))}
                    </SelectVisitante>
                    <ConfirmarButtonVisitante onClick={inscreverEquipeVisitante} isActive={visitanteActive}>Confirmar</ConfirmarButtonVisitante>

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
                <select onChange={(e) => setFilter(e.target.value)} name="select">
                    <option defaultChecked value={''}>Todos</option>

                    {sports.map((item) =>
                        <option value={item.name}>{item.name}</option>
                    )}
                </select>
            </Content>
            <EventosContent>
                {filter === '' ?
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
                    events.map((evento, key) => evento.Sport?.name === filter &&
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

