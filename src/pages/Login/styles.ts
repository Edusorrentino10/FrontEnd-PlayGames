import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const LoginContainer = styled.form`

    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    background-color: #fff;
    margin-top: 5rem;
    border-radius: 15px;
    background: #e9e9e9;
`;

export const Title = styled.div`
    margin-top: 16px;
    margin-bottom: 32px;
    font-size: 2.5rem;
    font-weight: bold;
    color: #FF7815;
`;

export const SubTitle = styled.div`

`;

export const Email = styled.input`
    margin-top: 3rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;

export const Senha = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;

export const EsqueceuSenha = styled.div`
    font-size: 0.9rem;
    width: 50%;
    text-align: center;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    &:hover{
        text-decoration: underline;
    }
`;


export const Cadastrar = styled.div`
        font-size: 0.9rem;
        width: 50%;
        text-align: center;
        cursor: pointer;
        &:hover{
        text-decoration: underline;
        }
`;

export const LoginButton = styled.input`
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 3rem;
    width: 47%;
    border: 0;
    background: #FF7815;
    color: #fff;
    font-size: 1.1rem;
    transition: 0.5s;
    margin-bottom: 5rem;
    &:hover {
        filter: brightness(0.93);
    }
`;