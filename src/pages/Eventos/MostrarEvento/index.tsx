import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, FilterEvents, FilterOptions, FutebolFilter, VoleiFilter, FifaFilter, CSFilter, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento } from './styles';
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

type ModalProps = {
    name: string,
    day: string,
    time: string,
    openModalState: boolean,
    closeModal: () => void,
}

export const MostrarEvento = () => {


    const [events, setEvents] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);

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


    console.log(sports);
    const navigate = useNavigate();

    const [openModalBasquete, setModalBasquete] = useState(false);
    const handleCloseModalBasquete = () => {
        setModalBasquete(false);
    }
    const handleOpenModalBasquete = () => {
        setModalBasquete(true);
    }


    const [openModalFutebol, setModalFutebol] = useState(false);
    const handleCloseModalFutebol = () => {
        setModalFutebol(false);
    }
    const handleOpenModalFutebol = () => {

        setModalFutebol(true);
    }


    const [openModalEsports, setModalEsports] = useState(false);
    const handleCloseModalEsports = () => {
        setModalEsports(false);
    }
    const handleOpenModalEsports = () => {
        setModalEsports(true);
    }


    const [openModalVolei, setModalVolei] = useState(false);
    const handleCloseModalVolei = () => {
        setModalVolei(false);
    }
    const handleOpenModalVolei = () => {
        setModalVolei(true);
    }





    const [openFilter, setOpenFilter] = useState(false);
    const [futebolSelected, setFutebolSelected] = useState(true);
    const [voleiSelected, setVoleiSelected] = useState(true);
    const [basqueteSelected, setBasqueteSelected] = useState(true);
    const [esportsSelected, setEsportsSelected] = useState(true);
    const handleFilter = () => {
        setOpenFilter(!openFilter);
    }

    function handleSelect(e: any) {
        if (e === 'Futebol') {
            setFutebolSelected(!futebolSelected)
            if (voleiSelected) {
                setVoleiSelected(!voleiSelected)
            }
            if (basqueteSelected) {
                setBasqueteSelected(!basqueteSelected)
            }
            if (esportsSelected) {
                setEsportsSelected(!esportsSelected);
            }
        } else if (e === 'Basquete') {
            setBasqueteSelected(!basqueteSelected)
            if (voleiSelected) {
                setVoleiSelected(!voleiSelected)
            }
            if (futebolSelected) {
                setFutebolSelected(!futebolSelected)
            }
            if (esportsSelected) {
                setEsportsSelected(!esportsSelected);
            }
        }
        else if (e === 'Vôlei') {
            setVoleiSelected(!voleiSelected)
            if (futebolSelected) {
                setFutebolSelected(!futebolSelected)
            }
            if (basqueteSelected) {
                setBasqueteSelected(!basqueteSelected)
            }
            if (esportsSelected) {
                setEsportsSelected(!esportsSelected);
            }
        }
        else if (e === 'eSports') {
            setEsportsSelected(!esportsSelected);
            if (futebolSelected) {
                setFutebolSelected(!futebolSelected)
            }
            if (basqueteSelected) {
                setBasqueteSelected(!basqueteSelected)
            }
            if (voleiSelected) {
                setVoleiSelected(!voleiSelected);
            }
        }
    };


    const ModalEvents = ({ name, day, time, openModalState, closeModal }: ModalProps) => (
        <Modal
            isOpen={openModalState}
            onRequestClose={closeModal}
            style={customStylesModal}
            contentLabel="Example Modal"
        >
            <TitleModal>{name}</TitleModal>
            <HorarioModal>{day} - {time}</HorarioModal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ImgModal src={vslogo} alt="" />
            </div>
            <DivEquipes>
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>{name}</legend>
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
            <ModalButton onClick={closeModal}>Fechar</ModalButton>
        </Modal>
    )

    return (
        <Container>
            <Header />
            <Content>
                <Title>Eventos</Title>
                <CriarEventoButton onClick={() => navigate('/criar-evento')} type="submit" value="Criar Evento" />
                <select onChange={(e) => handleSelect(e.target.value)} name="select">
                    {sports.map((item) =>
                        <option value={item.name}>{item.name}</option>
                    )}
                </select>
            </Content>
            <EventosContent>
                {events.map((evento, key) => evento.Sport.name === 'Futebol' && futebolSelected &&
                    <div key={key}>
                        <Evento onClick={handleOpenModalFutebol}>
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
                        <ModalContent>
                            <ModalEvents name={evento.name} day={evento.day} time={evento.time} openModalState={openModalFutebol} closeModal={handleCloseModalFutebol} />
                        </ModalContent>
                    </div>
                )}
                {events.map((evento, key) => evento.Sport.name === 'Vôlei' && voleiSelected &&
                    <div key={key}>
                        <Evento onClick={handleOpenModalVolei}>
                            <DisplayFlex>
                                <NomeEvento>{evento.name}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.location}</LocalEvento>
                            <ModalidadeEvento>{evento.Sport.name}
                                <GiVolleyballBall style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                            <DescricaoEvento>{evento.description}</DescricaoEvento>
                        </Evento>
                        <ModalContent>
                            <ModalEvents name={evento.name} day={evento.day} time={evento.time} openModalState={openModalVolei} closeModal={handleCloseModalVolei} />
                        </ModalContent>
                    </div>
                )}
                {events.map((evento, key) => evento.Sport.name === 'Basquete' && basqueteSelected &&
                    <div key={key}>
                        <Evento onClick={handleOpenModalBasquete}>
                            <DisplayFlex>
                                <NomeEvento>{evento.name}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.location}</LocalEvento>
                            <ModalidadeEvento>{evento.Sport.name}
                                <RiComputerLine style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                            <DescricaoEvento>{evento.description}</DescricaoEvento>
                        </Evento>
                        <ModalContent>
                            <ModalEvents name={evento.name} day={evento.day} time={evento.time} openModalState={openModalBasquete} closeModal={handleCloseModalBasquete} />
                        </ModalContent>
                    </div>
                )}
                {events.map((evento, key) => evento.Sport.name === 'eSports' && esportsSelected &&
                    <div key={key}>
                        <Evento onClick={handleOpenModalEsports}>
                            <DisplayFlex>
                                <NomeEvento>{evento.name}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.day} - {evento.time}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.location}</LocalEvento>
                            <ModalidadeEvento>{evento.Sport.name}
                                <RiComputerLine style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento>
                            <DescricaoEvento>{evento.description}</DescricaoEvento>
                        </Evento>
                        <ModalContent>
                            <ModalEvents name={evento.name} day={evento.day} time={evento.time} openModalState={openModalEsports} closeModal={handleCloseModalEsports} />
                        </ModalContent>
                    </div>
                )}
            </EventosContent>
        </Container>
    )
}

