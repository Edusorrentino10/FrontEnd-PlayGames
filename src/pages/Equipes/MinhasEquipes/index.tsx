import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, ModalContentInputs, ExcluirEvento, DisplayFlexInputs, Nome, Data, Hora, Local, Vagas, Descricao, ValueFiltro, DivFrase } from './styles';
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

type ConviteProps = {
    id: string,
    avatar: string,
    createdAt: string,
    email: string,
    name: string,
    password: string,
    updatedAt: string,
}

export const MinhasEquipes = () => {
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventsProps>();
    const [cvt, setCvt] = useState<ConviteProps>();
    const [teamsAdm, setTeamsAdm] = useState<EventsProps[]>([]);
    const [teamsParticipante, setTeamsParticipante] = useState<EventsProps[]>([]);
    const [sports, setSports] = useState<SportsProps[]>([]);
    const [invitations, setInvitations] = useState<ConviteProps[]>([]); // bota os convites num estado
    const [inviteWithTeamId, setInviteWithTeamId] = useState<any>();

    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState('Administrador')

    // estados pra pegar as alterações
    const [putName, setPutName] = useState('');
    const [putDescription, setPutDescription] = useState('');
    const [putTeamsLimit, setPutTeamsLimit] = useState('');
    const [putDay, setPutDay] = useState('');
    const [putTime, setPutTime] = useState('');
    const [putLocation, setPutLocation] = useState('');
    const [putSportId, setPutSportId] = useState(event?.Sport?.id);
    const [attInfos, setAttInfos] = useState(false);


    const auth = useContext(AuthContext);


    useEffect(() => {
        const getTeamsAdm = async () => {
            const response = await api.get(`/teams/findMyTeams/${auth.user.id}`);
            setTeamsAdm(response.data);

            const pegarConvites = async () => {
                let convites: any = [];
                for (let i = 0; i < response.data.length; i++) {
                    convites = response.data[i];
                }
                console.log(convites.invitations)
                setInvitations(convites.invitations)
                setInviteWithTeamId(convites);
                console.log('aa')
            }
            pegarConvites()
        }
        getTeamsAdm();



        const getTeamsParticipante = async () => {
            const response = await api.get(`/teams/findTeamsImIn/${auth.user.id}`);
            setTeamsParticipante(response.data);
        }
        getTeamsParticipante();

        const getSports = async () => {
            const response = await api.get('/sports');
            setSports(response.data);
        }
        getSports();
    }, [attInfos])


    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.delete(`/rotadeexcluir/${event?.id}`);
        setAttInfos(!attInfos);
        setOpenModal(false);
    };

    const sendInvitation = async (event: any, e: any) => {
        e.preventDefault();
        console.log(cvt)
        try {
            if (cvt) {
                const response = await api.post('/users/teamInvitation', {
                    teamId: inviteWithTeamId.id,
                    userId: cvt.id,
                    invitation: "accepted"
                });
            }
            toast.success("Convite aceito!")
            setOpenModal(false)
            setInvitations(invitations.filter(x => x.id != cvt?.id))
            window.open(`mailto:${cvt?.email}
            ?subject=Play Games - Solicitação aceita
            &body=A equipe ${inviteWithTeamId.name} aceitou sua solicitação!\n`)
        } catch (error) {
            console.log(error)
        }
    }
    const rejectedInvitation = async (event: any, e: any) => {
        e.preventDefault();
        try {
            if (cvt) {
                const response = await api.post('/users/teamInvitation', {
                    teamId: inviteWithTeamId.id,
                    userId: cvt.id,
                    invitation: "rejected"
                });
            }
            toast.warn("Convite rejeitado!")
            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const ModalTeams = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
            ariaHideApp={false}

        >
            <>
                {filter === 'Administrador' ?
                    <div>
                        <TitleModal>Editar equipe</TitleModal>
                        <ModalContentInputs>
                            <DisplayFlexInputs>
                                <span><strong>Nome: </strong></span>
                                <Nome placeholder="Nome" type="text" value={event?.name} onChange={(e) => setPutName(e.target.value)} required/>
                            </DisplayFlexInputs>

                            <DisplayFlexInputs>
                                <br />
                                <span><strong>Descrição: </strong></span>
                                <Descricao value={event?.description} onChange={(e) => setPutDescription(e.target.value)} placeholder={event?.description} required />
                                <button>Salvar Alterações</button>
                            </DisplayFlexInputs>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ExcluirEvento onClick={handleDelete}>Excluir Equipe</ExcluirEvento>
                            </div>
                            <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
                        </ModalContentInputs>
                    </div> :
                    filter === 'Participando' ?
                    <div>
                        <TitleModal>{event?.name}</TitleModal>
                        <ModalContentInputs>
                            <DisplayFlexInputs>
                                <br />
                                <span><strong>Descrição: </strong>{event?.description}</span>

                            </DisplayFlexInputs>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ExcluirEvento onClick={handleDelete}>Sair da Equipe</ExcluirEvento>
                            </div> */}
                            <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
                        </ModalContentInputs>
                    </div> :
                    filter === 'Convidado' ?
                        <div>
                            <TitleModal>{event?.name}</TitleModal>
                            <ModalContentInputs >
                                <DisplayFlexInputs>
                                    <DivFrase>
                                        <span><strong>{cvt?.name}</strong> deseja entrar na equipe <strong>{inviteWithTeamId.name}</strong>. Aceitar?</span>
                                    </DivFrase>
                                </DisplayFlexInputs>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <ModalButton onClick={(e) => sendInvitation(cvt, e)}>Aceitar Solicitação</ModalButton>
                                    <ModalButton onClick={(e) => rejectedInvitation(cvt, e)}>Recusar</ModalButton>
                                </div>
                                <ModalButton onClick={() => setOpenModal(false)}>Fechar</ModalButton>
                            </ModalContentInputs>
                        </div> : <></>}
            </>
        </Modal>
    )










    return (
        <Container>
            <Header />

            <Content>
                <Title>Minhas Equipes</Title>
                <select onChange={(e) => setFilter(e.target.value)} name="select">
                    <option defaultChecked value="Administrador">Administrador</option>
                    <option value="Convidado">Solicitações</option>
                    <option value="Participando">Participando</option>
                </select>
            </Content>

            <EventosContent>
                {filter === 'Administrador' ?
                    teamsAdm.map((evento, key) =>
                        <div key={key}>
                            <Evento onClick={() => {
                                setOpenModal(true)
                                setEvent(evento)
                            }
                            }>
                                <DisplayFlex>
                                    <NomeEvento>{evento.name}</NomeEvento>
                                </DisplayFlex>
                                {/* <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento> */}
                                <DescricaoEvento>{evento.description}</DescricaoEvento>
                                <ValueFiltro>Administrador</ValueFiltro>
                            </Evento>
                        </div>
                    ) : filter === 'Participando' ?
                        // filtrar com o atributo que verifica se o user é participante mas nao é administrador.
                        teamsParticipante.map((evento, key) =>
                            <div key={key}>
                                <Evento onClick={() => {
                                    setOpenModal(true)
                                    setEvent(evento)
                                }
                                }>
                                    <DisplayFlex>
                                        <NomeEvento>{evento.name}</NomeEvento>
                                    </DisplayFlex>
                                    {/* <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento> */}
                                    <DescricaoEvento>{evento.description}</DescricaoEvento>
                                    <ValueFiltro>Participando</ValueFiltro>
                                </Evento>
                            </div>
                        ) : filter === 'Convidado' ?
                            // filtrar com o atributo que verifica se o user foi convidado e pegar os convites
                            invitations.map((convite, key) =>
                                <div key={key}>
                                    <Evento onClick={() => {
                                        setOpenModal(true)
                                        setCvt(convite)
                                    }
                                    }>
                                        <DisplayFlex>
                                            <NomeEvento>{inviteWithTeamId.name}</NomeEvento>
                                            <NomeEvento><strong>{convite.name}</strong></NomeEvento>

                                        </DisplayFlex>
                                        {/* <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento> */}
                                        <DescricaoEvento>{convite.email}</DescricaoEvento>
                                        <ValueFiltro>Convidado</ValueFiltro>
                                    </Evento>
                                </div>
                            ) : ''
                }
            </EventosContent>
            <ModalContent>
                <ModalTeams />
            </ModalContent>
            <ToastContainer />
        </Container>
    )
}