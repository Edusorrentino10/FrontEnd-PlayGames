
import { Container, Content, CriarEquipeButton, Descricao, DescricaoEquipe, DisplayFlex, DisplayFlexInputs, Equipe, EquipesContent, ExcluirTime, HorarioModal, Local, MembrosEquipe, ModalButton, ModalContent, ModalContentInputs, Nome, NomeEquipe, Role, SairEvento, Title, TitleModal, Vagas } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import { Header } from '../../../components/Header';
import { Evento } from '../../GerenciarEventos/styles';
import Modal from 'react-modal';
import { api } from '../../../services/api';

export const MostrarEquipe = () => {



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



    const [equipes, setEquipes] = useState([])

    useEffect(() => {
        const getEquipes = async () => {
            const response = await api.get('/teams');
            setEquipes(response.data);
        }
        getEquipes();
    }, [])

    console.log(equipes);


    const navigate = useNavigate();

    const listaEquipes = [{
        nome: 'só perneta',
        descricao: 'Sei lá',
        equipe: ['Fallen', 'Gotze', 'Verstappen', 'Heráclito', 'Lebron James'],
        role: 'Administrador',
    },
    {
        nome: 'mds',
        descricao: 'Sei lá',
        equipe: ['Fallen', 'Gotze', 'Verstappen', 'Heráclito', 'Lebron James'],
        role: 'Administrador',
    },
    {
        nome: 'UhelpX',
        descricao: 'Sei lá',
        equipe: ['Fallen', 'Gotze', 'Verstappen', 'Heráclito', 'Lebron James'],
        role: 'Convidado',
    },
    {
        nome: 'subliminar',
        descricao: 'Sei lá',
        equipe: ['Fallen', 'Gotze', 'Verstappen', 'Heráclito', 'Lebron James'],
        role: 'Convidado',
    }
    ];



    const [openModalAdmin, setOpenModalAdmin] = useState(false);
    const handleCloseModalAdmin = () => {
        setOpenModalAdmin(false);
    }
    const handleOpenModalAdmin = () => {
        setOpenModalAdmin(true);
    }

    const [openModalConvidado, setOpenModalConvidado] = useState(false);
    const handleCloseModalConvidado = () => {
        setOpenModalConvidado(false);
    }
    const handleOpenModalConvidado = () => {
        setOpenModalConvidado(true);
    }



    return (
        <Container>
            <Header />
            <Content>
                <Title>Equipes</Title>
                <CriarEquipeButton onClick={() => navigate('/criar-equipe')} type="submit" value="Criar Equipe" />
            </Content>
            <EquipesContent>
                {listaEquipes.map((equipe, key) => equipe.role === 'Administrador' &&
                    <div key={key}>
                        <Equipe onClick={handleOpenModalAdmin}>
                            <DisplayFlex>
                                <NomeEquipe>{equipe.nome}</NomeEquipe>
                            </DisplayFlex>
                            <Role>{equipe.role}</Role>
                            <MembrosEquipe>
                                {equipe.equipe.map((equipe, keya) =>
                                    <div key={keya}>
                                        {equipe}
                                    </div>
                                )}
                            </MembrosEquipe>
                            <DescricaoEquipe>  Descrição: {equipe.descricao}</DescricaoEquipe>
                        </Equipe>
                        <ModalContent >
                            <Modal
                                isOpen={openModalAdmin}
                                onRequestClose={handleCloseModalAdmin}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >

                                <div>
                                    <TitleModal>{equipe.nome}</TitleModal>
                                    <ModalContentInputs>
                                        <DisplayFlexInputs>
                                            <Nome placeholder={equipe.nome} type="text" />
                                            <button style={{ marginLeft: '1rem' }} >Alterar Nome</button>
                                        </DisplayFlexInputs>
                                        <DisplayFlexInputs>
                                            <Descricao placeholder={equipe.descricao} />
                                            <button>Alterar Descrição</button>
                                        </DisplayFlexInputs>
                                        <DisplayFlexInputs>
                                            <Descricao value={equipe.equipe.map(jogadores => jogadores ).join('\n')} />
                                            <button>Alterar Membros</button>
                                        </DisplayFlexInputs>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ExcluirTime>Excluir Equipe</ExcluirTime>
                                        </div>
                                    </ModalContentInputs>
                                </div>
                                <ModalButton onClick={handleCloseModalAdmin}>Fechar</ModalButton>
                            </Modal>
                        </ModalContent>
                    </div>
                )}
                {listaEquipes.map((equipe, keye) => equipe.role === 'Convidado' &&
                    <div >
                        <Equipe key={keye} onClick={handleOpenModalConvidado}>
                            <DisplayFlex>
                                <NomeEquipe>{equipe.nome}</NomeEquipe>
                            </DisplayFlex>
                            <Role>{equipe.role}</Role>
                            <MembrosEquipe>
                                {equipe.equipe.map((equipe, keyb) =>
                                    <div key={keyb}>
                                        {equipe}
                                    </div>
                                )}
                            </MembrosEquipe>
                            <DescricaoEquipe>  Descrição: {equipe.descricao}</DescricaoEquipe>
                        </Equipe>
                        <ModalContent  >
                            <Modal
                                isOpen={openModalConvidado}
                                onRequestClose={handleCloseModalConvidado}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <TitleModal>{equipe.nome}</TitleModal>
                                    <SairEvento>Sair da Equipe</SairEvento>
                                </div>

                                <ModalButton onClick={handleCloseModalConvidado}>Fechar</ModalButton>
                            </Modal>
                        </ModalContent>
                    </div>
                )}
            </EquipesContent>
        </Container>
    )
}