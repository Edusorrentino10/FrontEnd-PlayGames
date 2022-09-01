import styled from 'styled-components';

export const Container = styled.div`

`;

export const Content = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #D9D9D9;
    border-radius: 2%;
    margin: auto;
    margin-top: 7rem;
    width: 30vw;
    height: 100%;
    @media (max-width: 1080px) {
        width: 40vw;
    }
    @media (max-width: 860px) {
        width: 50vw;
    }
    @media (max-width: 620px) {
        width: 70vw;
    }
    @media (max-width: 580px) {
        width: 80vw;
    }
`;


export const Seta = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1.5rem;
    margin-left: 3rem;
    box-sizing: border-box;
    span {
        font-size: 2rem;
        font-weight: bold;
        margin: auto;
        margin-left: 3rem;
        color: #262626;
    }
`;

export const InputEmail = styled.input`
    width: 66%;
    border-radius: 0.7rem;
    padding: 0.6rem;
    border: 1px solid #ccc;
    margin-top: 4rem;
`;


export const ContinueButton = styled.input`
    display: flex;
    justify-content: center;
    width: 70%;
    padding: 0.6rem;
    background-color: #FF7815;
    border-radius: 0.7rem;
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 6rem;
    border: 0;
    &:hover {
        opacity:0.95;
    }
`;
