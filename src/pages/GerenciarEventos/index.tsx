import { Header } from '../../components/Header';
import { AllEvents, Container, Data, Descricao, DisplayFlex, DisplayFlexInputs, Evento, EventosContent, ExcluirEvento, Hora, HorarioEvento, HorarioModal, Local, LocalEvento, ModalButton, ModalContent, ModalContentInputs, ModalidadeEvento, Nome, NomeEvento, Role, SairEvento, Title, TitleModal, Vagas, VagasEvento, VoltarButton } from './styles';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';



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



export const GerenciarEventos = () => {

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
        role: 'Convidado',
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
        role: 'Convidado',
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
        role: 'Administrador',
        descricao: 'Exemplo de descrição'

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
        role: 'Administrador',
        descricao: 'Exemplo de descrição'
    }
    ];


    return (
        <Container>
            <Header />
            <Title>Gerenciar Eventos</Title>
            <AllEvents>
                <EventosContent>
                    {listaEventos.map((evento, key) => evento.modalidade === 'FIFA' &&
                        <div>
                            <Evento key={key} onClick={handleOpenModalFifa} >
                                <DisplayFlex>
                                    <NomeEvento>{evento.nome}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.local}</LocalEvento>
                                <ModalidadeEvento>{evento.modalidade}
                                    <RiComputerLine style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                                <Role>{evento.role}</Role>
                            </Evento>

                            <ModalContent key={key}>
                                <Modal
                                    isOpen={openModalFifa}
                                    onRequestClose={handleCloseModalFifa}
                                    style={customStylesModal}
                                    contentLabel="Example Modal"
                                >
                                    {evento.role === 'Administrador' ?
                                        <div>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <ModalContentInputs>
                                                <DisplayFlexInputs>
                                                    <Nome placeholder={evento.nome} type="text" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Nome</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Data type="date" />
                                                    <Hora type="time" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Data e Hora</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Local type="text" placeholder={evento.local} />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Local</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Vagas placeholder='Valor' type="number" />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Vagas</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Descricao placeholder={evento.descricao} />
                                                    <button>Alterar Descrição</button>
                                                </DisplayFlexInputs>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <ExcluirEvento>Excluir Evento</ExcluirEvento>
                                                </div>
                                            </ModalContentInputs>
                                        </div>
                                        :
                                        <div style={{ textAlign: 'center' }}>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <SairEvento>Sair do Evento</SairEvento>
                                        </div>
                                    }
                                    <ModalButton onClick={handleCloseModalFifa}>Fechar</ModalButton>
                                </Modal>
                            </ModalContent>
                        </div>
                    )}
                </EventosContent>
                <EventosContent>
                    {listaEventos.map((evento, key) => evento.modalidade === 'Futebol' &&
                        <div>
                            <Evento key={key} onClick={handleOpenModalFutebol} >
                                <DisplayFlex>
                                    <NomeEvento>{evento.nome}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.local}</LocalEvento>
                                <ModalidadeEvento>{evento.modalidade}
                                    <RiComputerLine style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                                <Role>{evento.role}</Role>
                            </Evento>
                            <ModalContent key={key}>
                                <Modal
                                    isOpen={openModalFutebol}
                                    onRequestClose={handleCloseModalFutebol}
                                    style={customStylesModal}
                                    contentLabel="Example Modal"
                                >
                                    {evento.role === 'Administrador' ?
                                        <div>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <ModalContentInputs>
                                                <DisplayFlexInputs>
                                                    <Nome placeholder={evento.nome} type="text" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Nome</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Data type="date" />
                                                    <Hora type="time" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Data e Hora</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Local type="text" placeholder={evento.local} />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Local</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Vagas placeholder='Valor' type="number" />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Vagas</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Descricao placeholder={evento.descricao} />
                                                    <button>Alterar Descrição</button>
                                                </DisplayFlexInputs>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <ExcluirEvento>Excluir Evento</ExcluirEvento>
                                                </div>
                                            </ModalContentInputs>
                                        </div>
                                        :
                                        <div style={{ textAlign: 'center' }}>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <SairEvento>Sair do Evento</SairEvento>
                                        </div>
                                    }
                                    <ModalButton onClick={handleCloseModalFutebol}>Fechar</ModalButton>
                                </Modal>
                            </ModalContent>
                        </div>
                    )}
                </EventosContent>
                <EventosContent>
                    {listaEventos.map((evento, key) => evento.modalidade === 'Counter-Strike' &&
                        <div>
                            <Evento key={key} onClick={handleOpenModalCS} >
                                <DisplayFlex>
                                    <NomeEvento>{evento.nome}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.local}</LocalEvento>
                                <ModalidadeEvento>{evento.modalidade}
                                    <RiComputerLine style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                                <Role>{evento.role}</Role>
                            </Evento>
                            <ModalContent key={key}>
                                <Modal
                                    isOpen={openModalCS}
                                    onRequestClose={handleCloseModalCS}
                                    style={customStylesModal}
                                    contentLabel="Example Modal"
                                >
                                    {evento.role === 'Administrador' ?
                                        <div>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <ModalContentInputs>
                                                <DisplayFlexInputs>
                                                    <Nome placeholder={evento.nome} type="text" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Nome</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Data type="date" />
                                                    <Hora type="time" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Data e Hora</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Local type="text" placeholder={evento.local} />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Local</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Vagas placeholder='Valor' type="number" />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Vagas</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Descricao placeholder={evento.descricao} />
                                                    <button>Alterar Descrição</button>
                                                </DisplayFlexInputs>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <ExcluirEvento>Excluir Evento</ExcluirEvento>
                                                </div>
                                            </ModalContentInputs>
                                        </div>
                                        :
                                        <div style={{ textAlign: 'center' }}>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <SairEvento>Sair do Evento</SairEvento>
                                        </div>
                                    }
                                    <ModalButton onClick={handleCloseModalCS}>Fechar</ModalButton>
                                </Modal>
                            </ModalContent>
                        </div>
                    )}
                </EventosContent>
                <EventosContent>
                    {listaEventos.map((evento, key) => evento.modalidade === 'Volei' &&
                        <div>
                            <Evento key={key} onClick={handleOpenModalVolei} >
                                <DisplayFlex>
                                    <NomeEvento>{evento.nome}</NomeEvento>
                                    <HorarioEvento><AiFillClockCircle /> {evento.horario} - {evento.data}</HorarioEvento>
                                </DisplayFlex>
                                <LocalEvento>{evento.local}</LocalEvento>
                                <ModalidadeEvento>{evento.modalidade}
                                    <RiComputerLine style={{ marginLeft: '1rem' }} />
                                </ModalidadeEvento>
                                <VagasEvento>Vagas: {evento.vagas}</VagasEvento>
                                <Role>{evento.role}</Role>
                            </Evento>
                            <ModalContent key={key}>
                                <Modal
                                    isOpen={openModalVolei}
                                    onRequestClose={handleCloseModalVolei}
                                    style={customStylesModal}
                                    contentLabel="Example Modal"
                                >
                                    {evento.role === 'Administrador' ?
                                        <div>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <ModalContentInputs>
                                                <DisplayFlexInputs>
                                                    <Nome placeholder={evento.nome} type="text" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Nome</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Data type="date" />
                                                    <Hora type="time" />
                                                    <button style={{ marginLeft: '1rem' }} >Alterar Data e Hora</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Local type="text" placeholder={evento.local} />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Local</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Vagas placeholder='Valor' type="number" />
                                                    <button style={{ marginLeft: '1rem' }}>Alterar Vagas</button>
                                                </DisplayFlexInputs>
                                                <DisplayFlexInputs>
                                                    <Descricao placeholder={evento.descricao} />
                                                    <button>Alterar Descrição</button>
                                                </DisplayFlexInputs>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <ExcluirEvento>Excluir Evento</ExcluirEvento>
                                                </div>
                                            </ModalContentInputs>
                                        </div>
                                        :
                                        <div style={{ textAlign: 'center' }}>
                                            <TitleModal>{evento.nome}</TitleModal>
                                            <HorarioModal>{evento.horario}</HorarioModal>
                                            <SairEvento>Sair do Evento</SairEvento>
                                        </div>
                                    }
                                    <ModalButton onClick={handleCloseModalVolei}>Fechar</ModalButton>
                                </Modal>
                            </ModalContent>
                        </div>
                    )}
                </EventosContent>
            </AllEvents>
            <VoltarButton onClick={() => navigate('/perfil')}>Voltar</VoltarButton>
        </Container>
    )
}