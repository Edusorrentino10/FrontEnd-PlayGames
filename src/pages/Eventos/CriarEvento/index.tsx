import { Header } from '../../../components/Header';
import { CadastroContainer, Local, Container, Data, Nome, SignupButton, Title, Vagas, Modalidade, DisplayFlex, Hora, Descricao } from './styles';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthContext } from '../../../contexts/AuthContext';



type SportsProps = {
    id: string,
    name: string,
}



export const CriarEvento = () => {


    const [events, setEvents] = useState([])
    const [nome, setNome] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    const [vagas, setVagas] = useState('')
    const [local, setLocal] = useState('')
    const [descricao, setDescricao] = useState('')
    const [sportSelected, setSportSelected] = useState('')
    const [sports, setSports] = useState<SportsProps[]>([]);

    const [perfilUsuario, setPerfilUsuario] = useState([])
    const auth = useContext(AuthContext);

    useEffect(() => {
        const getSports = async () => {
            const response = await api.get('/sports');
            setSports(response.data);
        }
        getSports();

        const getPerfil = async () => {
            const response = await api.get(`/users/me/${auth.user.id}`);
            setPerfilUsuario(response.data);
        }
        getPerfil();

    }, [])





    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(auth.user.id)
        console.log(sportSelected)
        console.log(typeof auth.user.id)
        if (parseInt(vagas) < 1) {
            toast.error('Número de vagas inválido');
            return false;
        }
        if (sportSelected === '') {
            toast.error('Escolha uma modalidade.');
            return false;
        }

        let partesData = data.split("-");
        let dataFormatada = new Date(parseInt(partesData[0]), parseInt(partesData[1]) - 1, parseInt(partesData[2]));
        if(parseInt(partesData[0]) > 2023) {
            toast.error('Insira uma data mais recente.');
            return false;
        }
        if(dataFormatada < new Date()){
            toast.error('Insira uma data possível.');
            return false;
        }
        const response = await api.post('/events', {
            name: nome,
            description: descricao,
            teamsLimit: parseInt(vagas),
            location: local,
            day: data,
            time: hora,
            sportId: sportSelected,
            createdBy: auth.user.id
        });
        setEvents(response.data);
        navigate('/eventos')
    }



    return (
        <Container>
            <Header />
            <CadastroContainer onSubmit={handleSubmit}>
                <Title>Criar Evento</Title>
                <Nome placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <DisplayFlex>
                    <Data type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                    <Hora type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
                </DisplayFlex>
                <select onChange={(e) => setSportSelected(e.target.value)} name="select" required>
                <option disabled selected>Modalidade</option>
                    {sports.map((item) =>
                        <option value={item.id}>{item.name}</option>
                    )}
                </select>
                <Vagas placeholder="Vagas" type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} required />
                <Local placeholder="Local" type="text" value={local} onChange={(e) => setLocal(e.target.value)} required />
                <Descricao placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                <SignupButton value="Criar" type="submit"></SignupButton>
            </CadastroContainer>
            <ToastContainer />
        </Container>
    )
}