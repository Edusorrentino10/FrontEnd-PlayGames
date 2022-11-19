/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Header } from '../../../components/Header';
import { Container, Content, CriarEventoButton, DisplayFlex, Evento, EventosContent, HorarioEvento, LocalEvento, ModalidadeEvento, VagasEvento, NomeEvento, Title, ModalContent, TitleModal, ModalButton, HorarioModal, ImgModal, DivEquipes, DescricaoEvento, ModalContentInputs, ExcluirEvento, DisplayFlexInputs, Nome, Data, Hora, Local, Vagas, Descricao, ValueFiltro, DivFrase, SubTitleModal } from './styles';
import { GiBasketballBall, GiSoccerBall } from 'react-icons/gi';
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
    },
    teams: any,
    users: any

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

    // const [putName, setPutName] = useState('');
    // const [putDescription, setPutDescription] = useState('');

    const changeTeam = {
        putName: '',
        putDescription: '',
    }

    // const [putTeamsLimit, setPutTeamsLimit] = useState('');
    // const [putDay, setPutDay] = useState('');
    // const [putTime, setPutTime] = useState('');
    // const [putLocation, setPutLocation] = useState('');
    // const [putSportId, setPutSportId] = useState(event?.Sport?.id);

    const [attInfos, setAttInfos] = useState(false);


    const [jogadoresDoTimeA, setJogadoresDoTimeA] = useState<any>([]);
    const [allUsers, setAllUsers] = useState<any>([]);

    const [alterarModal, setAlterarModal] = useState(false);

    const [adminCurrent, setAdminCurrent] = useState<any>()



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


        const getAllUsers = async () => {
            const response = await api.get(`/users`);
            console.log(response.data);
            setAllUsers(response.data);
        }
        getAllUsers();
    }, [attInfos])


    // const handleDelete = async (e: FormEvent) => {
    //     e.preventDefault();
    //     const response = await api.delete(`/rotadeexcluir/${event?.id}`);
    //     setAttInfos(!attInfos);
    //     setOpenModal(false);
    // };

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
            setAttInfos(!attInfos);
            setOpenModal(false)
            setInvitations(invitations.filter(x => x.id !== cvt?.id))
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
            setAttInfos(!attInfos);
            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (event !== undefined) {

            if (changeTeam.putName === '' && changeTeam.putDescription === '') {
                return toast.error('Nenhuma alteração foi feita.')
            }

            const response = await api.put(`/teams/${event?.id}`, {
                name: changeTeam.putName !== '' ? changeTeam.putName : event?.name,
                description: changeTeam.putDescription !== '' ? changeTeam.putDescription : event?.description
            })
            toast.success('Alterações salvas!');
            setAttInfos(!attInfos);
            setOpenModal(false);
            setAlterarModal(false)
            changeTeam.putName = '';
            changeTeam.putDescription = ''

        }
    }



    useEffect(() => {

        playersTeamA();

    }, [event])


    const playersTeamA = () => {
        let playersA: any[] = [];
        event ?
            event?.users?.forEach((user: any) => (
                playersA.push(' 👤 ' + user.name + ' 📩 ' + user.email)
            )) : []
        if (playersA.length > 0) {
            setJogadoresDoTimeA(playersA)
        } else {
            setJogadoresDoTimeA('');
        }
        console.log(event)
    }

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.delete(`/teams/${event?.id}`);
        toast.success('Equipe excluída!');
        setAttInfos(!attInfos);
        setOpenModal(false);
    };






    const ModalTeams = () => (
        <Modal
            isOpen={openModal}
            style={customStylesModal}
            contentLabel="Example Modal"
            ariaHideApp={false}

        >
            <>
                {filter === 'Administrador' ? !alterarModal ?
                    <div>
                        <TitleModal>{event?.name}</TitleModal>
                        <SubTitleModal>{event?.Sport.name}</SubTitleModal>
                        <ModalContentInputs>
                            <DisplayFlexInputs>
                                <br />
                                <span><strong>Administrador: </strong></span>

                                {event?.users?.map((jogador: any) => setAdminCurrent(jogador))}
                                <p>{' 👤 ' + adminCurrent?.name + ' 📩 ' + adminCurrent?.email}</p>

                                <br />
                                <span><strong>Equipe: </strong></span>
                                {
                                    jogadoresDoTimeA ?
                                        jogadoresDoTimeA.map((player: any, key: any) => (
                                            <p key={key}>{player}</p>
                                        )) : ''
                                }
                                <br />
                                <span><strong>Descrição: </strong>{event?.description}</span>


                            </DisplayFlexInputs>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ExcluirEvento onClick={handleDelete}>Sair da Equipe</ExcluirEvento>
                            </div> */}

                            <ModalButton onClick={() => {
                                setOpenModal(false);
                                setAlterarModal(false);
                                changeTeam.putName = ''
                                changeTeam.putDescription = ''
                            }}>Fechar</ModalButton>
                            <ModalButton onClick={() => setAlterarModal(true)}>Editar informações</ModalButton>
                        </ModalContentInputs>
                    </div> :
                    <div>
                        <TitleModal>Editar equipe</TitleModal>
                        <ModalContentInputs onSubmit={handleSubmit}>
                            <DisplayFlexInputs>
                                <span><strong>Nome: </strong></span>
                                <Nome placeholder={event?.name} type="text" onChange={(e) => changeTeam.putName = e.target.value} />
                            </DisplayFlexInputs>
                            <DisplayFlexInputs>
                                <br />
                                <span><strong>Descrição: </strong></span>
                                <Descricao onChange={(e) => changeTeam.putDescription} placeholder={event?.description} />
                                <button>Salvar Alterações</button>
                            </DisplayFlexInputs>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ExcluirEvento onClick={handleDelete}>Excluir Equipe</ExcluirEvento>
                            </div>

                            <ModalButton onClick={() => {
                                setOpenModal(false);
                                setAlterarModal(false);
                                changeTeam.putName = ''
                                changeTeam.putDescription = ''
                            }}>Fechar</ModalButton>
                            <ModalButton onClick={() => { setAlterarModal(false) }}>Voltar</ModalButton>
                        </ModalContentInputs>
                    </div> :
                    filter === 'Participando' ?
                        <div>
                            <TitleModal>{event?.name}</TitleModal>
                            <SubTitleModal>{event?.Sport.name}</SubTitleModal>
                            <ModalContentInputs>
                                <DisplayFlexInputs>
                                    <br />
                                    <span><strong>Administrador: </strong></span>

                                    {event?.users?.map((jogador: any) => setAdminCurrent(jogador))}
                                    <p>{' 👤 ' + adminCurrent?.name + ' 📩 ' + adminCurrent?.email}</p>
                                    
                                    <br />
                                    <span><strong>Equipe: </strong></span>
                                    {
                                        jogadoresDoTimeA ?
                                            jogadoresDoTimeA.map((player: any, key: any) => (
                                                <p key={key}>{event?.createdBy !== player.id ? player : ''}</p>
                                            )) : ''
                                    }
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
                                <ModalidadeEvento>{evento.Sport?.name}
                                    {
                                        evento.Sport.name === 'Futebol' ? <GiSoccerBall style={{ marginLeft: '1rem' }} /> :
                                            evento.Sport.name === 'Basquete' ? <GiBasketballBall style={{ marginLeft: '1rem' }} /> :
                                                evento.Sport.name === 'Vôlei' ? <GiVolleyballBall style={{ marginLeft: '1rem' }} /> :
                                                    evento.Sport.name === 'eSports' ? <RiComputerLine style={{ marginLeft: '1rem' }} /> : ''
                                    }
                                </ModalidadeEvento>
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
                                    <ModalidadeEvento>{evento.Sport?.name}
                                        {
                                            evento.Sport.name === 'Futebol' ? <GiSoccerBall style={{ marginLeft: '1rem' }} /> :
                                                evento.Sport.name === 'Basquete' ? <GiBasketballBall style={{ marginLeft: '1rem' }} /> :
                                                    evento.Sport.name === 'Vôlei' ? <GiVolleyballBall style={{ marginLeft: '1rem' }} /> :
                                                        evento.Sport.name === 'eSports' ? <RiComputerLine style={{ marginLeft: '1rem' }} /> : ''
                                        }
                                    </ModalidadeEvento>
                                    {/* <VagasEvento>Vagas: {evento.teamsLimit}</VagasEvento> */}
                                    <DescricaoEvento>{evento.description}</DescricaoEvento>
                                    <ValueFiltro>Participando</ValueFiltro>
                                </Evento>
                            </div>
                        ) : filter === 'Convidado' && invitations ?
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