import styled from 'styled-components';

export const Container = styled.div`
    color: #e3e3e3;
`;

export const Title = styled.div`
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: #ccc;
`;

export const Content = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    background-color: #fff;
    margin-top: 5rem;
    border-radius: 15px;
    background: #e0e0e0;
    padding: 3.5rem;
    color: #262626;

`;

export const Foto = styled.input`
    width: 12rem;
    height: 12rem;
    border: 4px solid #ccc;
    border-radius: 50%;
    margin: auto;
`;

export const AlterarFoto = styled.input`
    margin-top: 0.8rem;
    color: #262626;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Nome = styled.div`
    font-size: 1.3rem;
    margin-top: 3rem;
`;

export const Email = styled.div`
    font-size: 1.3rem;
`;



export const SegundoContent = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7rem;
    margin-bottom: 7rem;
    gap: 7rem;

`;

export const AlterarInformacoes = styled.div`
    background-color: #FF7815;
    color: #fff;
    border-radius: 5px;
    font-size: 1.1rem;
    padding: 1rem 3rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.95);
    }
`;

export const AlterarSenha = styled.div`
    background-color: #FF7815;
    color: #fff;
    border-radius: 5px;
    font-size: 1.1rem;
    padding: 1rem 3rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.95);
    }
`;

export const ExcluirPerfil = styled.div`
    background-color: #FF7815;
    color: #fff;
    border-radius: 5px;
    font-size: 1.1rem;
    padding: 1rem 3rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.95);
    }
`;

export const GerenciarEventos = styled.div`
    background-color: #FF7815;
    color: #fff;
    border-radius: 5px;
    font-size: 1.1rem;
    padding: 1rem 3rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.95);
    }
`;