import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 80px;
    background: #FF7815;
    border-bottom: 2px solid #ffa562;
    border-radius: 0;
`;

export const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-left: 15px;
`;

export const Menu = styled.div`
    display: flex;
    margin-left: 100px;
`;

export const Perfil = styled.div`
    font-size: 1.3rem;
    color: #fff;
    margin-left: 10px;
    padding: 10px 15px;
    font-weight: bold;
   &:hover {
    background: #ddd;
    color: #FF7815;
    cursor: pointer;
    border-radius: 10px;
   }
`;

export const Equipe = styled.div`
    font-size: 1.3rem;
    color: #fff;
    margin-left: 10px;
    padding: 10px;
    font-weight: bold;
    &:hover {
    background: #ddd;
    color: #FF7815;
    cursor: pointer;
    border-radius: 10px;
   }
`;

export const Eventos = styled.div`
    font-size: 1.2rem;
    color: #fff;
    margin-left: 10px;
    padding: 10px;
    font-weight: bold;
    &:hover {
    background: #ddd;
    color: #FF7815;
    cursor: pointer;
    border-radius: 10px;
   }
`;

export const MeusEventos = styled.div`
    font-size: 1.2rem;
    color: #fff;
    margin-left: 10px;
    padding: 10px;
    font-weight: bold;
    &:hover {
    background: #ddd;
    color: #FF7815;
    cursor: pointer;
    border-radius: 10px;
   }
`;

export const MinhasEquipes = styled.div`
    font-size: 1.2rem;
    color: #fff;
    margin-left: 25px;
    padding: 10px;
    font-weight: bold;
    &:hover {
    background: #ddd;
    color: #FF7815;
    cursor: pointer;
    border-radius: 10px;
   }
`;

export const Logout = styled.div`
    font-size: 1rem;
    color: #fff;
    padding: 10px;
    font-weight: bold;
    position: absolute;
    right: 3.5rem;
    display: flex;
    gap: 0.3rem;
    &:hover {
        cursor: pointer;
        opacity: 0.95;
    }
`