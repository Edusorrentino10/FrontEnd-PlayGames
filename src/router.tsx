import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { CriarEvento } from './pages/Eventos/CriarEvento';
import { MostrarEvento } from './pages/Eventos/MostrarEvento';
import { Login } from './pages/Login';
import { Perfil } from './pages/Perfil';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/criar-evento" element={<CriarEvento />} />
                <Route path="/eventos" element={<MostrarEvento />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    )
}
