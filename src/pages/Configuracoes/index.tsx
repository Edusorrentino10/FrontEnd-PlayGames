import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Header } from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { AlterarEmail, AlterarNome, AlterarSenha, Container, Content, DivArrow, InputEmail, InputNome, InputSenha, Title } from './styles';
import { BiArrowBack } from 'react-icons/bi';




export const Configuracoes = () => {
    const navigate = useNavigate();

    const [userPerfil, setUserPerfil] = useState<any>([]);
    const [allUsers, setAllUsers] = useState<any>([]);

    const [auxPw, setAuxPw] = useState(false);

    const [attInfos, setAttInfos] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')


    const [passConfirmed, setPassConfirmed] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [nameConfirmed, setNameConfirmed] = useState(false);


    const auth = useContext(AuthContext);


    useEffect(() => {
        const getPerfil = async () => {
            const response = await api.get(`/users/me/${auth.user.id}`);
            setUserPerfil(response.data);
        }
        getPerfil();

        const getAllUsers = async () => {
            const response = await api.get(`/users`);
            setAllUsers(response.data);
        }
        getAllUsers();
        console.log(allUsers)
    }, [attInfos])



    const handleOnSubmitEmail = async () => {
        if (userPerfil.email && email !== '') {
            allUsers.map((user: any) => user.id === userPerfil.id ? setPassword(user.password) : '')
            if (userPerfil.email === email) {
                toast.error('Nenhuma alteração foi feita.')
                setAttInfos(!attInfos);
                setEmail('');
                setPassword('');
                setName('');
                setAuxPw(false);
                setPassConfirmed(false);
                return false;
            }
            else {
                if (password && email && userPerfil.name) {
                    const response = await api.put(`/users/${auth.user.id}`, {
                        name: userPerfil.name,
                        email: email,
                        password: password
                    });

                    toast.success('Email alterado com sucesso.');
                    return
                } else {
                    setEmailConfirmed(!emailConfirmed);
                    return
                }
            }
        } else {
            toast.error('Preencha o campo para alterar.')
        }

    }

    const handleOnSubmitPassword = async () => {
        if (password !== '') {
            allUsers.map((user: any) => user.id === userPerfil.id ? setAuxPw(true) : '')
            if (auxPw) {
                if (password && userPerfil.email && userPerfil.name) {
                    const response = await api.put(`/users/${auth.user.id}`, {
                        name: userPerfil.name,
                        email: userPerfil.email,
                        password: password
                    });
                    toast.success('Senha alterada com sucesso.');
                    setAttInfos(!attInfos);
                    setEmail('');
                    setPassword('');
                    setName('');
                    setAuxPw(false);
                    setPassConfirmed(false);
                }
            } else {
                setPassConfirmed(!passConfirmed);
            }
        } else {
            toast.error('Preencha o campo para alterar.')
        }
    }

    const handleOnSubmitName = async () => {
        if (userPerfil && userPerfil.name && name !== '') {
            allUsers.map((user: any) => user.id === userPerfil.id ? setPassword(user.password) : '')
            if (userPerfil.name === name) {
                toast.error('Nenhuma alteração foi feita.');
                setAttInfos(!attInfos);
                setEmail('');
                setPassword('');
                setName('');
                setAuxPw(false);
                setPassConfirmed(false);
                return false;
            }
            else {
                if (password && userPerfil.email && name) {
                    const response = await api.put(`/users/${auth.user.id}`, {
                        name: name,
                        email: userPerfil.email,
                        password: password
                    });
                    toast.success('Nome alterado com sucesso.');
                    setAttInfos(!attInfos);
                    setEmail('');
                    setPassword('');
                    setName('');
                    setNameConfirmed(false);
                }
                else {
                    setNameConfirmed(!nameConfirmed);
                    console.log({ password, email: userPerfil.email, name })
                }
            }
        } else {
            toast.error('Preencha o campo para alterar.')
        }
    }




    return (
        <Container>
            <Header />
            <Title>Configurações da Conta</Title>
            <Content>
                <DivArrow>
                    <BiArrowBack color='black' size={26} />
                </DivArrow>
                <form >
                    <InputNome value={name} onChange={(e) => setName(e.target.value)} placeholder={userPerfil?.name} type="text" required />
                    <AlterarNome onClick={(e) => { e.preventDefault(); handleOnSubmitName() }} >{!nameConfirmed ? 'Alterar Nome' : 'Confirmar'}</AlterarNome>
                </form>
                <form style={{ marginRight: '0.4rem' }} >
                    <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} placeholder={userPerfil?.email} type="email" required />
                    <AlterarEmail onClick={(e) => { e.preventDefault(); handleOnSubmitEmail() }}>{!emailConfirmed ? 'Alterar Email' : 'Confirmar'}</AlterarEmail>
                </form>
                <form >
                    <InputSenha value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********" type="password" minLength={8} required />
                    <AlterarSenha onClick={(e) => { e.preventDefault(); handleOnSubmitPassword() }} >{!passConfirmed ? 'Alterar Senha' : 'Confirmar'}</AlterarSenha>
                </form>
            </Content>
            <ToastContainer />
        </Container>
    )
}
