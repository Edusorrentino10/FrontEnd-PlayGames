import styled from 'styled-components';

export const Container = styled.div`
`;

export const Title = styled.h1`
    text-align: center;
    color: #fff;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #595959;
    border-radius: 10px;
    padding: 3.5rem;
    width: 400px;
    margin: auto;
    form {
        display: flex;
        gap: 2rem;
    }
`;

export const InputEmail = styled.input`
    padding: 0.3rem;
    border: 1px solid #212127;
`;

export const AlterarEmail = styled.button`
    background-color: #fff;
    border: 1px solid #212127;
    padding: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.93);
    }
`;
export const InputSenha = styled.input`
    padding: 0.3rem;
    border: 1px solid #212127;
`;
export const AlterarSenha = styled.button`
    background-color: #fff;
    border: 1px solid #212127;
    padding: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.93);
    }

`;
export const InputNome = styled.input`
    padding: 0.3rem;
    border: 1px solid #212127;
`;

export const AlterarNome = styled.button`
    background-color: #fff;
    border: 1px solid #212127;
    padding: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.93);
    }
`;