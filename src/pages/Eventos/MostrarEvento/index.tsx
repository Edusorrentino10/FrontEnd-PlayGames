import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../../services/api';

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

    const [event, setEvent] = useState<EventsProps>();
    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('')

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

    }, [])

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
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>{event?.name}</legend>
                    {/* <div>
                                            {evento.jogadores.map((jogador, key) =>
                                                <p key={key}>{jogador}</p>
                                            )}
                                        </div> */}
                </fieldset>
                {/** Time Visitante */}
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>Time Visitante</legend>
                    <button onClick={(e) => e.preventDefault()}>Inscrever Equipe</button>
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
        </Container>
    )
}

