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



export const CriarEquipe = () => {

    const [events, setEvents] = useState<any>([])
    const [nome, setNome] = useState('')
    const [vagas, setVagas] = useState('')
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
        // if (parseInt(vagas) < 1) {
        //     toast.error('Número de vagas inválido');
        //     return false;
        // }
        if (sportSelected === '') {
            toast.error('Escolha uma modalidade.');
            return false;
        }
        
        const response = await api.post('/teams', {
            name: nome,
            description: descricao,
            sportId: sportSelected,
            createdBy: auth.user.id
        });
        setEvents(response.data);
        navigate('/equipes')
    }



    return (
        <Container>
            <Header />
            <CadastroContainer onSubmit={handleSubmit}>
                <Title>Criar Equipe</Title>
                <Nome placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />        
                <select onChange={(e) => setSportSelected(e.target.value)} name="select" required>
                <option disabled selected>Modalidade</option>
                    {sports.map((item) =>
                        <option value={item.id}>{item.name}</option>
                    )}
                </select>
                {/*<Vagas placeholder="Vagas" type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} required />*/}
                <Descricao placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                <SignupButton value="Criar" type="submit"></SignupButton>
            </CadastroContainer>
            <ToastContainer />
        </Container>
    )
}