import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, SportModal } from './styles';
import { GiBasketballBall, GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../../services/api';
import { AuthContext } from "../../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

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

type TeamsProps = {
    id: string,
    name: string,
    sportId: string,
    description: string,
    createdAt: string,
    createdBy: string,
    updatedAt: string,
    users: [{
        id: string,
        name: string,
        email: string,
    }]
}

export const MostrarEquipes = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [team, setTeam] = useState<TeamsProps>();
    const [teams, setTeams] = useState<TeamsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('')

    const [adminCurrent, setAdminCurrent] = useState<any>()

    useEffect(() => {

        const getTeams = async () => {
            const response = await api.get('/teams');
            setTeams(response.data);
        }
        getTeams();

        const getSports = async () => {
            const response = await api.get('/sports');
            setSports(response.data);
        }
        getSports();

    }, [])

    const sendInvitation = async () => {
        if (auth.user.id === team?.createdBy) {
            return toast.error('Já está na equipe!');
        }
        let auxBoolean = false;
        team?.users.map((user) => user.id === auth.user.id ? auxBoolean = true : '')
        if (auxBoolean) {
            return toast.error('Já está na equipe!');
        }
        auxBoolean = false;
        const response = await api.post('/users/teamInvitation', {
            teamId: team?.id,
            userId: auth.user.id,
            invitation: "send"
        });
        toast.success("Solicitação enviada!")
        setAdminCurrent(undefined)
        setOpenModal(false)
    }


    const ModalEvents = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <TitleModal>{team?.name}</TitleModal>

            <SportModal>{sports.map((sport) => sport.id === team?.sportId ? sport.name : '')}</SportModal>
            <DivEquipes>
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>
                        {team?.name}
                    </legend>
                    <>
                        <span><strong>Administrador:</strong></span>


                        {team?.users?.map((jogador: any) => setAdminCurrent(jogador))}
                        {adminCurrent !== undefined &&
                            <p>{' 👤 ' + adminCurrent?.name + ' 📩 ' + adminCurrent?.email}</p>
                        }
                        <br />
                        <span><strong>Equipe:</strong></span>
                        {team?.users?.map((jogador, key) =>
                            <p key={key}>{' 👤 ' + jogador.name + ' 📩 ' + jogador.email}</p>
                        )}
                    </>
                </fieldset>
            </DivEquipes>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ModalButton onClick={() => sendInvitation()}>Enviar Solicitação</ModalButton>
                <ModalButton onClick={() => { setOpenModal(false); setAdminCurrent(undefined) }}>Fechar</ModalButton>
            </div>
        </Modal>
    )

    return (
        <Container>
            <Header />
            <Content>
                <Title>Equipes</Title>
                <CriarEventoButton onClick={() => navigate('/criar-equipe')} type="submit" value="Criar Equipe" />
                {/*<select onChange={(e) => setFilter(e.target.value)} name="select">*/}
                {/*    <option defaultChecked value={''}>Todos</option>*/}

                {/*    {sports.map((item) =>*/}
                {/*        <option value={item.name}>{item.name}</option>*/}
                {/*    )}*/}
                {/*</select>*/}
                <input type="text" placeholder="Digite o nome da equipe" onChange={(e) => setFilter(e.target.value)} style={{ marginTop: '1.2rem', padding: '10px' }} />
            </Content>
            <EventosContent>
                {filter === '' ?
                    teams.map((team, key) =>
                        <div key={key}>
                            <Evento onClick={() => {
                                setAdminCurrent(undefined)
                                setOpenModal(true)
                                setTeam(team)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{team.name}</NomeEvento>
                                </DisplayFlex>
                                <DisplayFlex>
                                    <NomeEvento>{sports.map((sport) => sport.id === team.sportId ? sport.name : '')}
                                        {
                                            team.sportId === 'a9e0dad8-b935-4cd2-9fd9-930d6700e73a' ? <GiSoccerBall style={{ marginLeft: '1rem' }} /> :
                                                team.sportId === 'a0c01f5b-9241-4057-9e2a-8e448bae87e5' ? <GiBasketballBall style={{ marginLeft: '1rem' }} /> :
                                                    team.sportId === '73eb6b3f-9c81-44ee-8f8c-ab5483c805ea' ? <GiVolleyballBall style={{ marginLeft: '1rem' }} /> :
                                                        team.sportId === 'aefcbfd3-484a-4d1f-8534-f60b57e125a6' ? <RiComputerLine style={{ marginLeft: '1rem' }} /> : ''
                                        }</NomeEvento>
                                </DisplayFlex>
                                <DescricaoEvento>{team.description}</DescricaoEvento>
                            </Evento>
                        </div>
                    ) :
                    teams.map((team, key) => team.name.toLowerCase().startsWith(filter.toLowerCase()) &&
                        <div key={key}>
                            <Evento onClick={() => {
                                setAdminCurrent(undefined)
                                setOpenModal(true)
                                setTeam(team)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{team.name}</NomeEvento>
                                </DisplayFlex>
                                <DisplayFlex>
                                    <NomeEvento>{sports.map((sport) => sport.id === team.sportId ? sport.name : '')}</NomeEvento>
                                </DisplayFlex>
                                <DescricaoEvento>{team.description}</DescricaoEvento>
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

