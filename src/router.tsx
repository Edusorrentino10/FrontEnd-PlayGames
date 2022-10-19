import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cadastro } from './pages/Autenticacao/Cadastro';
import { EsqueceuSenha } from './pages/Autenticacao/EsqueceuSenha';
import { CriarEvento } from './pages/Eventos/CriarEvento';
import { MostrarEvento } from './pages/Eventos/MostrarEvento';
import { Login } from './pages/Autenticacao/Login';
import { MostrarConvites } from './pages/Convites/MostrarConvites';
import { Perfil } from './pages/Perfil';
import { Configuracoes } from './pages/Configuracoes';
import { GerenciarEventos } from './pages/GerenciarEventos';
import { RequireAuth } from './contexts/RequireAuth';
import { MeusEventos } from './pages/Eventos/MeusEventos';
import { MostrarEquipes } from './pages/Equipes/MostrarEquipes';
import { MinhasEquipes } from './pages/Equipes/MinhasEquipes';
import { CriarEquipe } from './pages/Equipes/CriarEquipe';



export const Router = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
                <Route path="/equipes" element={<RequireAuth><MostrarEquipes /></RequireAuth>} />
                <Route path="/minhas-equipes" element={<RequireAuth><MinhasEquipes /></RequireAuth>} />
                <Route path="/criar-evento" element={<RequireAuth><CriarEvento /></RequireAuth>} />
                <Route path="/criar-equipe" element={<RequireAuth><CriarEquipe /></RequireAuth>} />
                <Route path="/eventos" element={<RequireAuth><MostrarEvento /></RequireAuth>} />
                <Route path="/meus-eventos" element={<RequireAuth><MeusEventos /></RequireAuth>} />
                <Route path="/convites" element={<RequireAuth><MostrarConvites /></RequireAuth>} />        
                <Route path="/configuracoes" element={<RequireAuth><Configuracoes /></RequireAuth>} />   
                <Route path="/perfil" element={<RequireAuth><Perfil /></RequireAuth>} />
                <Route path="/gerenciar-eventos" element={<RequireAuth><GerenciarEventos /></RequireAuth>} />
                
            </Routes>
        </BrowserRouter>
    )
}
