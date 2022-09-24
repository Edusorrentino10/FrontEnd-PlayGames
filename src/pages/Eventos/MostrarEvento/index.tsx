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


export const MostrarEvento = () => {


    const [events, setEvents] = useState([])

    useEffect(() => {
        const getEvents = async () => {
            const response = await api.get('/events');
            setEvents(response.data);
        }
        getEvents();
    }, [])

    console.log(events);
    const navigate = useNavigate();

    const [openModalFifa, setModalFifa] = useState(false);
    const handleCloseModalFifa = () => {
        setModalFifa(false);
    }
    const handleOpenModalFifa = () => {
        setModalFifa(true);
    }


    const [openModalFutebol, setModalFutebol] = useState(false);
    const handleCloseModalFutebol = () => {
        setModalFutebol(false);
    }
    const handleOpenModalFutebol = () => {
        setModalFutebol(true);
    }


    const [openModalCS, setModalCS] = useState(false);
    const handleCloseModalCS = () => {
        setModalCS(false);
    }
    const handleOpenModalCS = () => {
        setModalCS(true);
    }


    const [openModalVolei, setModalVolei] = useState(false);
    const handleCloseModalVolei = () => {
        setModalVolei(false);
    }
    const handleOpenModalVolei = () => {
        setModalVolei(true);
    }



    const listaEventos = [{
        nome: 'PROZAO',
        horario: '18:00',
        data: '18/09',
        local: 'PC',
        modalidade: 'FIFA',
        vagas: 11,
        nomeEquipe: 'Viciados em Vencer',
        jogadores: ['Taffarell', 'Dani Alves', 'Thiago Silva', 'Gum', 'Marcelo', 'Deco', 'Zidane', 'Voice', 'Vini JR', 'Neymar', 'Raphinha'],
        descricao: 'Exemplo de descrição'
    },

    {
        nome: 'FutePorco',
        horario: '21:00',
        data: '18/09',
        local: 'Arena Porco',
        modalidade: 'Futebol',
        vagas: 11,
        nomeEquipe: 'Viciados em Derrota',
        jogadores: ['Neuer', 'Bruno', 'Marcelo Bechler', 'Isa Pagliari', 'Alê', 'Ricardinho', 'Caio Castro', 'Luizinho', 'Beltrão', 'Certezas', 'Cazé'],
        descricao: 'Exemplo de descrição'

    },
    {
        nome: 'CS 5X5',
        horario: '22:00',
        data: '18/09',
        local: 'PC',
        modalidade: 'Counter-Strike',
        vagas: 5,
        nomeEquipe: 'Só morremo',
        jogadores: ['Fallen', 'Gotze', 'Verstappen', 'Heráclito', 'Lebron James'],
        descricao: 'Exemplo de descrição Exemplo de descrição Exemplo de descrição Exemplo de descrição Exemplo de descrição'

    },
    {
        nome: 'Voleizin',
        horario: '16:00',
        data: '03/09',
        local: 'Miami',
        modalidade: 'Volei',
        vagas: 6,
        nomeEquipe: 'Viciados em Derrotas',
        jogadores: ['Giba', 'Lucarelli', 'Bolsonaro', 'Viih Tube', 'Wellington Rato', 'Lula'],
        descricao: 'Exemplo de descrição'
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
                    <div>
                        <Evento key={key} onClick={handleOpenModalFutebol}>
                            <DisplayFlex>
                                <NomeEvento>{evento.nome}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.local}</LocalEvento>
                            <ModalidadeEvento>{evento.modalidade}
                                <GiSoccerBall style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                            <DescricaoEvento>{evento.descricao}</DescricaoEvento>
                        </Evento>
                        <ModalContent key={key}>
                            <Modal
                                isOpen={openModalFutebol}
                                onRequestClose={handleCloseModalFutebol}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >
                                <TitleModal>{evento.nome}</TitleModal>
                                <HorarioModal>{evento.horario}</HorarioModal>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ImgModal src={vslogo} alt="" />
                                </div>
                                <DivEquipes>
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>{evento.nomeEquipe}</legend>
                                        <div>
                                            {evento.jogadores.map((jogador, key) =>
                                                <p key={key}>{jogador}</p>
                                            )}
                                        </div>
                                    </fieldset>
                                    {/** Time Visitante */}
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>Time Visitante</legend>
                                        <button onClick={(e) => e.preventDefault()}>Inscrever Equipe</button>
                                    </fieldset>
                                </DivEquipes>
                                <ModalButton onClick={handleCloseModalFutebol}>Fechar</ModalButton>
                            </Modal>
                        </ModalContent>
                    </div>
                )}
                {listaEventos.map((evento, key) => evento.modalidade === 'Volei' && voleiSelected &&
                    <div>
                        <Evento key={key} onClick={handleOpenModalVolei}>
                            <DisplayFlex>
                                <NomeEvento>{evento.nome}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.local}</LocalEvento>
                            <ModalidadeEvento>{evento.modalidade}
                                <GiVolleyballBall style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                            <DescricaoEvento>{evento.descricao}</DescricaoEvento>
                        </Evento>
                        <ModalContent>
                            <Modal
                                isOpen={openModalVolei}
                                onRequestClose={handleCloseModalVolei}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >
                                <TitleModal>{evento.nome}</TitleModal>
                                <HorarioModal>{evento.horario}</HorarioModal>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ImgModal src={vslogo} alt="" />
                                </div>
                                <DivEquipes>
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>{evento.nomeEquipe}</legend>
                                        <div>
                                            {evento.jogadores.map((jogador, key) =>
                                                <p key={key}>{jogador}</p>
                                            )}
                                        </div>
                                    </fieldset>
                                    {/** Time Visitante */}
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>Time Visitante</legend>
                                        <button onClick={(e) => e.preventDefault()}>Inscrever Equipe</button>
                                    </fieldset>
                                </DivEquipes>
                                <ModalButton onClick={handleCloseModalVolei}>Fechar</ModalButton>
                            </Modal>
                        </ModalContent>
                    </div>
                )}
                {listaEventos.map((evento, key) => evento.modalidade === 'FIFA' && fifaSelected &&
                    <div>
                        <Evento key={key} onClick={handleOpenModalFifa}>
                            <DisplayFlex>
                                <NomeEvento>{evento.nome}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.local}</LocalEvento>
                            <ModalidadeEvento>{evento.modalidade}
                                <RiComputerLine style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                            <DescricaoEvento>{evento.descricao}</DescricaoEvento>
                        </Evento>
                        <ModalContent>
                            <Modal
                                isOpen={openModalFifa}
                                onRequestClose={handleCloseModalFifa}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >
                                <TitleModal>{evento.nome}</TitleModal>
                                <HorarioModal>{evento.horario}</HorarioModal>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ImgModal src={vslogo} alt="" />
                                </div>
                                <DivEquipes>
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>{evento.nomeEquipe}</legend>
                                        <div>
                                            {evento.jogadores.map((jogador, key) =>
                                                <p key={key}>{jogador}</p>
                                            )}
                                        </div>
                                    </fieldset>
                                    {/** Time Visitante */}
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>Time Visitante</legend>
                                        <button onClick={(e) => { e.preventDefault(); }}>Inscrever Equipe</button>
                                    </fieldset>
                                </DivEquipes>
                                <ModalButton onClick={handleCloseModalFifa}>Fechar</ModalButton>
                            </Modal>
                        </ModalContent>
                    </div>
                )}
                {listaEventos.map((evento, key) => evento.modalidade === 'Counter-Strike' && csSelected &&
                    <div>
                        <Evento key={key} onClick={handleOpenModalCS}>
                            <DisplayFlex>
                                <NomeEvento>{evento.nome}</NomeEvento>
                                <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                            </DisplayFlex>
                            <LocalEvento>{evento.local}</LocalEvento>
                            <ModalidadeEvento>{evento.modalidade}
                                <RiComputerLine style={{ marginLeft: '1rem' }} />
                            </ModalidadeEvento>
                            <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                            <DescricaoEvento>{evento.descricao}</DescricaoEvento>
                        </Evento>
                        <ModalContent>
                            <Modal
                                isOpen={openModalCS}
                                onRequestClose={handleCloseModalCS}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >
                                <TitleModal>{evento.nome}</TitleModal>
                                <HorarioModal>{evento.horario}</HorarioModal>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ImgModal src={vslogo} alt="" />
                                </div>
                                <DivEquipes>
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>{evento.nomeEquipe}</legend>
                                        <div>
                                            {evento.jogadores.map((jogador, key) =>
                                                <p key={key}>{jogador}</p>
                                            )}
                                        </div>
                                    </fieldset>
                                    {/** Time Visitante */}
                                    <fieldset style={{ border: '3px solid #ffa562' }}>
                                        <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>Time Visitante</legend>
                                        <button onClick={(e) => e.preventDefault()}>Inscrever Equipe</button>
                                    </fieldset>
                                </DivEquipes>
                                <ModalButton onClick={handleCloseModalCS}>Fechar</ModalButton>
                            </Modal>
                        </ModalContent>
                    </div>
                )}
            </EventosContent>
        </Container>
    )
}

