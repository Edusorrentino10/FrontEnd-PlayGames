import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, ModalContentInputs, ExcluirEvento, DisplayFlexInputs, Nome, Data, Hora, Local, Vagas, Descricao, Cancelar, Aceitar, SportModal } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

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
    createdBy: string,
    Sport: {
        id: string,
        name: string,
    }
}

export const MostrarConvites = () => {
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventsProps>();
    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);

    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('')

    // estados pra pegar as alterações
    const [putName, setPutName] = useState('');
    const [putDescription, setPutDescription] = useState('');
    const [putTeamsLimit, setPutTeamsLimit] = useState('');
    const [putDay, setPutDay] = useState('');
    const [putTime, setPutTime] = useState('');
    const [putLocation, setPutLocation] = useState('');
    const [putSportId, setPutSportId] = useState(event?.Sport.id);
    const [attInfos, setAttInfos] = useState(false);


    const auth = useContext(AuthContext);


    useEffect(() => {
        const getEvents = async () => {
            const response = await api.get('/events');
            setEvents(response.data);
        }
        getEvents();

        const getSports = async () => {
            const response = await api.get('/sports');
            setSports(response.data);
        }
        getSports();
    }, [attInfos])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
                const response = await api.put(`/events/${event?.id}`, {
                    name: putName,
                    day: putDay,
                    time: putTime,
                    location: putLocation,
                    teamsLimit: putTeamsLimit ? parseInt(putTeamsLimit) : 0,
                    description: putDescription,
                    sportId: putSportId,
                });
                setAttInfos(!attInfos);
                setOpenModal(false);
    }


    // Só exemplo
    const handleCancelar = async (idEvent: any) => {
        const response = await api.post(`/users/rejectInvitation`, {
            eventId: idEvent,
            userId: auth.user.id
        });
        removeEvent(idEvent)
        toast.error("Convite recusado!")
        setOpenModal(false);
    };

    const handleAceitar = async (idEvent: any) => {
        const response = await api.post(`/users/acceptInvitation`, {
            eventId: idEvent,
            userId: auth.user.id
        });
        removeEvent(idEvent)
        toast.success("Convite aceito!")
        setOpenModal(false);
    };

    const removeEvent = (idEvent: string) => {
        setEvents((current) =>
            current.filter((event) => event.id !== idEvent)
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
            <DivEquipes>
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>
                        Participantes
                    </legend>
                    {/* <div>
                                            {evento.jogadores.map((jogador, key) =>
                                                <p key={key}>{jogador}</p>
                                            )}
                                        </div> */}
                </fieldset>
                {/** Time Visitante */}
            </DivEquipes>
            <div style={{marginTop:"1rem", display:'flex', justifyContent:'center', gap:'2rem'}}>
                <Aceitar onClick={() => handleAceitar(event?.id)}>Aceitar</Aceitar>
                <Cancelar onClick={() => handleCancelar(event?.id)}>Recusar</Cancelar>
            </div>
            <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
        </Modal>
    )









    return (
        <Container>
            <Header />

            <EventosContent>
                {filter === '' ?
                    events.map((evento, key) => auth.user.id === evento.createdBy &&
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setEvent(evento)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{evento.name}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.location}</LocalEvento>
                                <ModalidadeEvento>{evento.Sport?.name}
                                    <GiSoccerBall style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                                <DescricaoEvento>Convidado</DescricaoEvento>

                            </Evento>
                        </div>
                    ) :
                    events.map((evento, key) => evento.Sport?.name === filter && auth.user.id === evento.createdBy &&
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setEvent(evento)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{evento.name}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.location}</LocalEvento>
                                <ModalidadeEvento>{evento.Sport.name}
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
            <ToastContainer />
        </Container>
    )
}