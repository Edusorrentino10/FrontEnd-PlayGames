import styled from 'styled-components';

export const Container = styled.div`
`;

export const Title = styled.h1`
    text-align: center;
    color: #fff;
    font-size: 2.2rem;
    margin-top: 4rem;
    margin-bottom: 3rem;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #e0e0e0;
    border-radius: 10px;
    padding: 3.5rem;
    width: 400px;
    margin: auto;
    position: relative;
    border: 2px solid #454552;
    form {
        display: flex;
        gap: 2rem;
    }
`;

export const InputEmail = styled.input`
    padding: 0.6rem;
    border: 2px solid #454552;
`;

export const AlterarEmail = styled.button`
    background-color: #fff;
    border: 2px solid #454552;
    padding: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.5s;
    padding-right: 11px;
    &:hover {
        filter: brightness(0.93);
    }
`;
export const InputSenha = styled.input`
    padding: 0.6rem;
    border: 2px solid #454552;
`;
export const AlterarSenha = styled.button`
    background-color: #fff;
    border: 2px solid #454552;
    padding: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.93);
    }

`;
export const InputNome = styled.input`
    padding: 0.6rem;
    border: 2px solid #454552;
`;

export const AlterarNome = styled.button`
    background-color: #fff;
    border: 2px solid #454552;
    padding: 0.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        filter: brightness(0.93);
    }
`;


export const DivArrow = styled.div `
    position: absolute;
    top: 25px;
    left: 25px;
    cursor: pointer;
    &:hover {
        font-size: 1.4rem;
    }
`