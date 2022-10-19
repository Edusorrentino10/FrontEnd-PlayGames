import styled from 'styled-components';



export const Container = styled.div`
    width: 100%;

`;

export const CadastroContainer = styled.form`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    background-color: #fff;
    margin-top: 4rem;
    border-radius: 15px;
    background: #e0e0e0;
    select {
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 55%;
    }
`;

export const Title = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 2.5rem;
    font-weight: bold;
    color: #FF7815;
`;

export const DisplayFlex = styled.div`
    display: flex;
    max-width: 60%;
`;

export const Nome = styled.input`
    margin-top: 3rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;

export const Data = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;

`;

export const Hora = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    flex: 1;
`;

export const Vagas = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;

export const Local = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;

export const Modalidade = styled.select`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;
export const Descricao = styled.textarea`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;
    width: 50%;
`;

export const SignupButton = styled.input`
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
    margin-bottom: 3rem;
    &:hover {
        filter: brightness(0.93);
    }
`;