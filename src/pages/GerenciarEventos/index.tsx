import { Header } from '../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, ModalContentInputs, ExcluirEvento, DisplayFlexInputs, Nome, Data, Hora, Local, Vagas, Descricao } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

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

export const GerenciarEventos = () => {
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventsProps>();
    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);

    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('')

    // estados pra pegar as alterações
    const [putName, setPutName] = useState(event?.name);
    const [putDescription, setPutDescription] = useState(event?.description);
    const [putTeamsLimit, setPutTeamsLimit] = useState(event?.teamsLimit);
    const [putDay, setPutDay] = useState(event?.day);
    const [putTime, setPutTime] = useState(event?.time);
    const [putLocation, setPutLocation] = useState(event?.location);
    const [putSportId, setPutSportId] = useState(event?.Sport.id);




    const auth = useContext(AuthContext);


    useEffect(() => {
        console.log(auth.user.id)
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
    }, [])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();



        const putEvent = async () => {
            const response = await api.put(`/events/${auth.user.id}`, {
                name: putName,
                day: putDay,
                time: putTime,
                location: putLocation,
                teamsLimit: putTeamsLimit,
                description: putDescription,
                sportId: putSportId,
            });

        }
        putEvent();
    }



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
                        <Nome placeholder={event?.name} type="text" />
                        <button style={{ marginLeft: '1rem' }} >Alterar Nome</button>
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <Data type="date" />
                        <Hora type="time" />
                        <button style={{ marginLeft: '1rem' }} >Alterar Data e Hora</button>
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <Local type="text" placeholder={event?.location} />
                        <button style={{ marginLeft: '1rem' }}>Alterar Local</button>
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <Vagas placeholder='Valor' type="number" />
                        <button style={{ marginLeft: '1rem' }}>Alterar Vagas</button>
                    </DisplayFlexInputs>
                    <DisplayFlexInputs>
                        <Descricao placeholder={event?.description} />
                        <button>Alterar Descrição</button>
                    </DisplayFlexInputs>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ExcluirEvento>Excluir Evento</ExcluirEvento>
                    </div>
                    <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
                </ModalContentInputs>
            </div>

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
                                <DescricaoEvento>{evento.description}</DescricaoEvento>

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
        </Container>
    )
}

