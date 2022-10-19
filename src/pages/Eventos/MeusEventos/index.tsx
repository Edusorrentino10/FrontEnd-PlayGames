import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, ModalContentInputs, ExcluirEvento, DisplayFlexInputs, Nome, Data, Hora, Local, Vagas, Descricao, ValueFiltro } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../assets/VSlogo.png';
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

export const MeusEventos = () => {
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventsProps>();
    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);

    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('Administrador')

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
        if (event !== undefined) {
            if (putTeamsLimit && parseInt(putTeamsLimit) < 1) {
                toast.error('Número de vagas inválido');
                return false;
            }
            if (putTime === '') {
                toast.error('Escolha um horário.');
                return false;
            }
            if (putLocation === '') {
                toast.error('Escolha um local.');
                return false;
            }
            if (putDescription === '') {
                toast.error('Insira uma descrição.');
                return false;
            }
            if (putDay !== undefined) {
                let partesData = putDay.split("-");
                let dataFormatada = new Date(parseInt(partesData[0]), parseInt(partesData[1]) - 1, parseInt(partesData[2]));
                if (parseInt(partesData[0]) > 2023) {
                    toast.error('Insira uma data mais recente.');
                    return false;
                }
                if (dataFormatada < new Date()) {
                    toast.error('Insira uma data possível.');
                    return false;
                }
                console.log([{ putName, putDay, putTime, putLocation, putTeamsLimit, putDescription, putSportId }])
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
            else {
                toast.error('Escolha um data.')
                return false;
            }
        }
    }

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.delete(`/events/${event?.id}`);
        setAttInfos(!attInfos);
        setOpenModal(false);
    };

    const ModalEvents = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div>
                <TitleModal>{event?.name}</TitleModal>
                <ModalContentInputs onSubmit={handleSubmit}>
                    <DisplayFlexInputs>
                        <span><strong>Nome: </strong></span>
                        <Nome placeholder="Nome" type="text" value={putName} onChange={(e) => setPutName(e.target.value)} required />
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <span><strong>Data/Hora: </strong></span>
                        <Data value={putDay} onChange={(e) => setPutDay(e.target.value)} type="date" required />
                        <Hora value={putTime} onChange={(e) => setPutTime(e.target.value)} type="time" required />
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <span><strong>Local: </strong></span>
                        <Local value={putLocation} onChange={(e) => setPutLocation(e.target.value)} type="text" placeholder={event?.location} required />
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <span><strong>Vagas: </strong></span>
                        <Vagas value={putTeamsLimit} onChange={(e) => setPutTeamsLimit(e.target.value)} placeholder='Valor' type="number" required />
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <br />
                        <span><strong>Descrição: </strong></span>
                        <Descricao value={putDescription} onChange={(e) => setPutDescription(e.target.value)} placeholder={event?.description} required />
                        <button>Salvar Alterações</button>
                    </DisplayFlexInputs>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ExcluirEvento onClick={handleDelete}>Excluir Evento</ExcluirEvento>
                    </div>
                    <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
                </ModalContentInputs>
            </div>
        </Modal>
    )










    return (
        <Container>
            <Header />

            <Content>
                <Title>Meus Eventos</Title>
                <select onChange={(e) => setFilter(e.target.value)} name="select">
                    <option defaultChecked value="Administrador">Administrador</option>
                    <option value="Convidado">Convidado</option>
                    <option value="Participando">Participando</option>
                </select>
            </Content>

            <EventosContent>
                {filter === 'Administrador' ?
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
                                <DescricaoEvento>{evento.description}</DescricaoEvento>
                                <ValueFiltro>Administrador</ValueFiltro>    
                            </Evento>
                        </div>
                    ) : filter === 'Participando' ?
                        // filtrar com o atributo que verifica se o user é participante mas nao é administrador.
                        events.map((evento, key) => auth.user.id !== evento.createdBy &&
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
                                    <DescricaoEvento>{evento.description}</DescricaoEvento>
                                    <ValueFiltro>Participando</ValueFiltro> 
                                </Evento>
                            </div>
                        ) : filter === 'Convidado' ?
                            // filtrar com o atributo que verifica se o user foi convidado e pegar os convites
                            events.map((evento, key) => auth.user.id !== evento.createdBy &&
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
                                        <DescricaoEvento>{evento.description}</DescricaoEvento>
                                        <ValueFiltro>Convidado</ValueFiltro>    
                                    </Evento>
                                </div>
                            ) : ''
                }
            </EventosContent>
            <ModalContent>
                <ModalEvents />
            </ModalContent>
            <ToastContainer />
        </Container>
    )
}