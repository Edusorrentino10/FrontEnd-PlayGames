import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cadastro } from './pages/Autenticacao/Cadastro';
import { EsqueceuSenha } from './pages/Autenticacao/EsqueceuSenha';
import { CriarEvento } from './pages/Eventos/CriarEvento';
import { MostrarEvento } from './pages/Eventos/MostrarEvento';
import { Login } from './pages/Autenticacao/Login';
import { MostrarEquipe } from './pages/Equipes/MostrarEquipes';
import { Perfil } from './pages/Perfil';
import { CriarEquipe } from './pages/Equipes/CriarEquipe';
import { Configuracoes } from './pages/Configuracoes';
import { GerenciarEventos } from './pages/GerenciarEventos';


export const Router = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
                <Route path="/criar-evento" element={<CriarEvento />} />
                <Route path="/eventos" element={<MostrarEvento />} />
                <Route path="/equipes" element={<MostrarEquipe />} />
                <Route path="/criar-equipe" element={<CriarEquipe />} />          
                <Route path="/configuracoes" element={<Configuracoes />} />   
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/gerenciar-eventos" element={<GerenciarEventos />} />
            </Routes>
        </BrowserRouter>
    )
}
