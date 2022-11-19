import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, ModalContentInputs, ExcluirEvento, DisplayFlexInputs, Nome, Data, Hora, Local, Vagas, Descricao, ValueFiltro } from './styles';
import { GiSoccerBall, GiBasketballBall, GiVolleyballBall } from 'react-icons/gi';
import { RiComputerLine } from 'react-icons/ri';
import { AiFillClockCircle } from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import vslogo from '../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

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
    teams: any,
}

export const MeusEventos = () => {
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventsProps>();
    const [myEvents, setMyEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);

    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('Administrador')

    // estados pra pegar as alterações
    // const [putName, setPutName] = useState('');
    // const [putDescription, setPutDescription] = useState('');
    // const [putTeamsLimit, setPutTeamsLimit] = useState('');
    // const [putDay, setPutDay] = useState('');
    // const [putTime, setPutTime] = useState('');
    // const [putLocation, setPutLocation] = useState('');
    const [putSportId, setPutSportId] = useState(event?.Sport?.id);

    const changeEvent = {
        putName: '',
        putDescription: '',
        putTeamsLimit: '',
        putDay: '',
        putTime: '',
        putLocation: '',
    }


    const [attInfos, setAttInfos] = useState(false);


    const [alterarModal, setAlterarModal] = useState(false);
    const [eventParticipation, setEventParticipation] = useState<any[]>([]);

    const auth = useContext(AuthContext);


    useEffect(() => {
        const getEvents = async () => {
            const response = await api.get(`/events`);
            setMyEvents(response.data)
        }
        getEvents();

        const getEventsImIn = async () => {
            const response = await api.get(`/events/eventsImIn/${auth.user.id}`);
            setEventParticipation(response.data)
            console.log(eventParticipation);
        };
        getEventsImIn();


    }, [attInfos])

    const handleSubmit = async (e: FormEvent) => {
        console.log(event);
        e.preventDefault();
        if (changeEvent.putLocation === '' && changeEvent.putName === '' && changeEvent.putTime === '' && changeEvent.putDay === '' && changeEvent.putDescription === '' && changeEvent.putTeamsLimit === '') {
            return toast.error('Nenhuma modificação foi feita.');
        }
        if (event !== undefined) {
            if (changeEvent.putTeamsLimit && parseInt(changeEvent.putTeamsLimit) < 1) {
                toast.error('Número de vagas inválido');
                return false;
            }
            if (changeEvent.putLocation === '') {
                changeEvent.putLocation = event?.location;
            }
            if (changeEvent.putTeamsLimit === '') {
                changeEvent.putTeamsLimit = event?.teamsLimit;     
            }
            if (changeEvent.putDescription === '') {
                changeEvent.putDescription = event?.description;
            }
            if (changeEvent.putName === '') {
                changeEvent.putName = event?.name;
            }
            if (changeEvent.putDay !== '') {
                let partesData = changeEvent.putDay.split("-");
                let dataFormatada = new Date(parseInt(partesData[0]), parseInt(partesData[1]) - 1, parseInt(partesData[2]));
                if (parseInt(partesData[0]) > 2023) {
                    toast.error('Insira uma data mais recente.');
                    return false;
                }
                if (dataFormatada < new Date()) {
                    toast.error('Insira uma data possível.');
                    return false;
                }
            }


            const response = await api.put(`/events/${event?.id}`, {
                name: changeEvent.putName,
                day: changeEvent.putDay !== '' ? changeEvent.putDay : event?.day,
                time: changeEvent.putTime !== '' ? changeEvent.putTime : event?.time,
                location: changeEvent.putLocation,
                teamsLimit: changeEvent.putTeamsLimit ? parseInt(changeEvent.putTeamsLimit) : 0,
                description: changeEvent.putDescription,
                sportId: putSportId,
            });
            toast.success('Alterações salvas!');
            setAttInfos(!attInfos);
            setOpenModal(false);
            changeEvent.putDescription = '';
            changeEvent.putLocation = '';
            changeEvent.putName = '';
            changeEvent.putDay = '';
            changeEvent.putTime = '';
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
        ><>
                {filter === 'Administrador' ? !alterarModal ?
                    <div>
                        <TitleModal>{event?.name}</TitleModal>
                        <ModalContentInputs>
                            <p><strong>Data: </strong>{event?.day}</p>
                            <p><strong>Hora: </strong>{event?.time}h</p>
                            <p><strong>Local: </strong>{event?.location}</p>
                            <p><strong>Vagas: </strong>{event?.teamsLimit}</p>
                            <p><strong>Modalidade: </strong>{event?.Sport.name}</p>
                            <p><strong>Descrição: </strong>{event?.description}</p>
                            {/* <p><strong>Equipe A: </strong> {event?.}</p> */}
                            <ModalButton onClick={() => {
                                setOpenModal(false);
                                setAlterarModal(false);
                                changeEvent.putDescription = '';
                                changeEvent.putLocation = '';
                                changeEvent.putName = '';
                                changeEvent.putDay = '';
                                changeEvent.putTime = '';
                            }}>Fechar</ModalButton>
                            <ModalButton onClick={() => setAlterarModal(true)}>Editar informações</ModalButton>
                        </ModalContentInputs>
                    </div>
                    :
                    <div>
                        <TitleModal>{event?.name}</TitleModal>
                        <ModalContentInputs onSubmit={handleSubmit}>
                            <DisplayFlexInputs>
                                <span><strong>Nome: </strong></span>
                                <Nome placeholder={event?.name} type="text"  onChange={(e) => changeEvent.putName = e.target.value} />
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Data/Hora: </strong></span>
                                <Data  onChange={(e) => { changeEvent.putDay = e.target.value }} type="date" />
                                <Hora  onChange={(e) => { changeEvent.putTime = e.target.value }} type="time" />
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Local: </strong></span>
                                <Local  onChange={(e) => changeEvent.putLocation = e.target.value} type="text" placeholder={event?.location} />
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Vagas: </strong></span>
                                <Vagas  onChange={(e) => changeEvent.putTeamsLimit = e.target.value} placeholder='Valor' type="number" />
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <br />
                                <span><strong>Descrição: </strong></span>
                                <Descricao  onChange={(e) => changeEvent.putDescription = e.target.value} placeholder={event?.description} />
                                <button>Salvar Alterações</button>
                            </DisplayFlexInputs>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ExcluirEvento onClick={handleDelete}>Excluir Evento</ExcluirEvento>
                            </div>
                            <ModalButton onClick={() => {
                                setOpenModal(false);
                                setAlterarModal(false);
                                changeEvent.putDescription = '';
                                changeEvent.putLocation = '';
                                changeEvent.putName = '';
                                changeEvent.putDay = '';
                                changeEvent.putTime = '';
                            }}>Fechar</ModalButton>
                            <ModalButton onClick={() => { setAlterarModal(false) }}>Voltar</ModalButton>

                        </ModalContentInputs>
                    </div>
                    :
                    <div>
                        <TitleModal>{event?.name}</TitleModal>
                        <ModalContentInputs onSubmit={handleSubmit}>
                            <DisplayFlexInputs>
                                <span><strong>Nome: </strong>{event?.name}</span>
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Modalidade: </strong>{event?.Sport?.name}</span>
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Data/Hora: </strong>{event?.day} - {event?.time}</span>
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Local: </strong>{event?.location}</span>
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Vagas: </strong>{event?.teamsLimit}</span>
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <span><strong>Descrição: </strong>{event?.description}</span>
                            </DisplayFlexInputs>
                            <ModalButton onClick={() => {
                                setOpenModal(false);
                                setAlterarModal(false);
                                changeEvent.putDescription = '';
                                changeEvent.putLocation = '';
                                changeEvent.putName = '';
                                changeEvent.putDay = '';
                                changeEvent.putTime = '';
                            }}>Fechar</ModalButton>

                        </ModalContentInputs>
                    </div>

                }
            </>
        </Modal>
    )










    return (
        <Container>
            <Header />

            <Content>
                <Title>Meus Eventos</Title>
                <select onChange={(e) => setFilter(e.target.value)} name="select">
                    <option defaultChecked value="Administrador">Administrador</option>
                    {/* <option value="Convidado">Convidado</option> // por enquanto nao vai ter essa aba de convidado aqui */}
                    <option value="Participando">Participando</option>
                </select>
            </Content>

            <EventosContent>
                {filter === 'Administrador' ?
                    myEvents.map((evento, key) => auth.user.id === evento.createdBy &&
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
                                    {
                                        evento.Sport.name === 'Futebol' ? <GiSoccerBall style={{ marginLeft: '1rem' }} /> :
                                            evento.Sport.name === 'Basquete' ? <GiBasketballBall style={{ marginLeft: '1rem' }} /> :
                                                evento.Sport.name === 'Vôlei' ? <GiVolleyballBall style={{ marginLeft: '1rem' }} /> :
                                                    evento.Sport.name === 'eSports' ? <RiComputerLine style={{ marginLeft: '1rem' }} /> : ''
                                    }
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                                <DescricaoEvento>{evento.description}</DescricaoEvento>
                                <ValueFiltro>Administrador</ValueFiltro>
                            </Evento>
                        </div>
                        // pedir pro backend fazer uma rota pra pegar esse participando aqui, tentar pegar outra rota la que pedi pro Joao fazer e fazer o map de um novo state
                    ) : filter === 'Participando' ?
                        // filtrar com o atributo que verifica se o user é participante mas nao é administrador.
                        eventParticipation.map((evento, key) =>
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
                                        {
                                            evento.Sport.name === 'Futebol' ? <GiSoccerBall style={{ marginLeft: '1rem' }} /> :
                                                evento.Sport.name === 'Basquete' ? <GiBasketballBall style={{ marginLeft: 'rem' }} /> :
                                                    evento.Sport.name === 'Vôlei' ? <GiVolleyballBall style={{ marginLeft: 'rem' }} /> :
                                                        evento.Sport.name === 'eSports' ? <RiComputerLine style={{ marginLeft: 'rem' }} /> : ''
                                        }
                                    </ModalidadeEvento>
                                    <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                                    <DescricaoEvento>{evento.description}</DescricaoEvento>
                                    <ValueFiltro>Participando</ValueFiltro>
                                </Evento>
                            </div>
                        ) : filter === 'Convidado' ?
                            // filtrar com o atributo que verifica se o user foi convidado e pegar os convites
                            myEvents.map((evento, key) => auth.user.id !== evento.createdBy &&
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