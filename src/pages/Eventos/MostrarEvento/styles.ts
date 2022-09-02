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

export const CriarEventoButton = styled.input`
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

export const EventosContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin: 4rem;
    text-align: center;
`;

export const Evento = styled.div`
    background: #FF7815;
    border: 2px solid #212127;
    border-radius: 10px;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
`;

export const NomeEvento = styled.div`
    padding: 0.7rem;
`;

export const HorarioEvento = styled.div`
    padding: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
`;

export const LocalEvento = styled.div`
    padding: 0.5rem;
`;

export const VagasEvento = styled.div`
    padding: 0.5rem;
`;

export const ModalidadeEvento = styled.div`
    padding: 0.5rem;
    transition: 0.5s;
    background: #FF7815;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const DisplayFlex = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    border-bottom: 1px solid #ffa562;
`;

export const FilterEvents = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 1rem;
    border: 1px solid #626273;
    border-radius: ${props => props.isActive ? '0.2rem 0.2rem 0 0' : '0.2rem'};
    padding: 0.5rem 4.7rem 0.5rem 4.5rem;
    max-width: 14rem;
    cursor: pointer;
    background-color: ${props => props.isActive ? '#FF7815' : '#ffa562'};
    transition: 0.5s;
    &:hover {
        filter: brightness(0.96);
    }
    @media (max-width: 620px) {
        justify-content: space-between;
    }
`;

export const FilterOptions = styled.div<{ isActive: boolean }>`
    border: 1px solid #626273;
    border-top: 0;
    cursor: pointer;
    display: ${props => props.isActive ? 'grid' : 'none'};
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: white;
    max-width: 14rem;
    @media (max-width: 620px) {
    }
`;

export const FutebolFilter = styled.div<{ isActive: boolean }>`
    padding: 0.5rem 3.5rem 0.5rem 3.5rem;
    transition: 0.5s;
    background: ${props => props.isActive ? '#9e9e9e' : ''};
    &:hover {
        background-color: ${props => props.isActive ? '' : '#ebebed'};
    }
`;
export const VoleiFilter = styled.div<{ isActive: boolean }>`
    padding: 0.5rem 3.5rem 0.5rem 3.5rem;
    transition: 0.5s;
    background: ${props => props.isActive ? '#9e9e9e' : ''};
    &:hover {
        background-color: ${props => props.isActive ? '' : '#ebebed'};
    }
`;
export const FifaFilter = styled.div<{ isActive: boolean }>`
    padding: 0.5rem 3.5rem 0.5rem 3.5rem;
    transition: 0.5s;
    background: ${props => props.isActive ? '#9e9e9e' : ''};
    &:hover {
        background-color: ${props => props.isActive ? '' : '#ebebed'};
    }
`;
export const CSFilter = styled.div<{ isActive: boolean }>`
    padding: 0.5rem 3.5rem 0.5rem 3.5rem;
    transition: 0.5s;
    background: ${props => props.isActive ? '#9e9e9e' : ''};
    &:hover {
        background-color: ${props => props.isActive ? '' : '#ebebed'};
    }
`;