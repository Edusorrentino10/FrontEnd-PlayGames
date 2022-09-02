import styled from 'styled-components';

export const Container = styled.div`

`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled.div`
    text-align: center;
    margin-top: 3rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
`;

export const CriarEquipeButton = styled.input`
    cursor: pointer;
    padding: 1rem 7rem;
    background-color: #dbdbdb;
    border-radius: 10px;
    border: 2px solid #535362;
    transition: 0.5s;
    font-size: 1.1rem;
    margin-top: 1rem;
    &:hover {
        filter: brightness(0.93);
    }
`;

export const EquipesContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin: 4rem;
    text-align: center;
`;

export const Equipe = styled.div`
    background: #FF7815;
    border: 2px solid #212127;
    border-radius: 10px;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
`;

export const NomeEquipe = styled.div`
    padding: 0.7rem;
`;


export const DisplayFlex = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    border-bottom: 1px solid #ffa562;
`;

export const DescricaoEquipe = styled.div`
    padding: 0.5rem;
`;