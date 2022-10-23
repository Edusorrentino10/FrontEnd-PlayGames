import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import vslogo from '../../../assets/VSlogo.png';
import Modal from 'react-modal';
import { api } from '../../../services/api';
import {AuthContext} from "../../../contexts/AuthContext";
import {toast, ToastContainer} from "react-toastify";

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
    description: string,
    createdAt: string,
    updatedAt: string,
    users: [{
        id: string,
        name: string
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

    useEffect(() => {

        const getTeams = async () => {
            const response = await api.get('/teams');
            console.log(response)
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
        const response = await api.post('/users/teamInvitation', {
            teamId: team?.id,
            userId: auth.user.id,
            invitation: "send"
        });
        console.log(response)
        toast.success("Solicitação enviada!")
        setOpenModal(false)
    }

    // const rejectedInvitation = async () => {
    //     const response = await api.post('/users/teamInvitation', {
    //         teamId: team?.id,
    //         userId: auth.user.id,
    //         invitation: "rejected"
    //     });
    //     console.log(response)
    //     toast.warn("Convite rejeitado!")
    //     setOpenModal(false)
    // }

    const ModalEvents = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <TitleModal>Equipe</TitleModal>
            <DivEquipes>
                <fieldset style={{ border: '3px solid #ffa562' }}>
                    <legend style={{ border: '3px solid #ffa562', padding: '10px', fontWeight: 'bold', color: '#e0e0e0', backgroundColor: '#ff7815' }}>
                        {team?.name}
                    </legend>
                    { <div>
                        {team?.users.map((jogador, key) =>
                            <p key={key}>{jogador.name}</p>
                        )}
                    </div> }
                </fieldset>
            </DivEquipes>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <ModalButton onClick={() => sendInvitation()}>Enviar Convite</ModalButton>
                <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
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
                <input type="text" placeholder="Digite o nome da equipe" onChange={(e) => setFilter(e.target.value)} style={{marginTop:'1.2rem'}}/>
            </Content>
            <EventosContent>
               {filter === '' ?
                    teams.map((team, key) =>
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setTeam(team)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{team.name}</NomeEvento>
                                </DisplayFlex>
                                <DescricaoEvento>{team.description}</DescricaoEvento>
                            </Evento>
                        </div>
                    ) :
                    teams.map((team, key) => team.name.toLowerCase().startsWith(filter.toLowerCase()) &&
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setTeam(team)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{team.name}</NomeEvento>
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

