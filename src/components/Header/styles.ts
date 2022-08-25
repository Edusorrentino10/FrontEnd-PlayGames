import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 80px;
    background: #399D76;
    border-bottom: 2px solid #45bc8c;
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
    color: #399d76;
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
    color: #399d76;
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
    color: #399d76;
    cursor: pointer;
    border-radius: 10px;
   }
`;