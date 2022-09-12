import styled from 'styled-components';

export const Container = styled.div`

`;

export const Title = styled.div`
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: #ccc;
`;

export const AllEvents = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
`;

export const EventosContent = styled.div`

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

export const Role = styled.div`
    padding: 0.5rem;
    background-color: #ff6d02;
    border-radius: 0px 0px 10px 10px;
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


export const VoltarButton = styled.div`
    cursor: pointer;
    padding: 1rem 7rem;
    background-color: #dbdbdb;
    border-radius: 10px;
    border: 2px solid #535362;
    transition: 0.5s;
    font-size: 1.1rem;
    max-width: 80px;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 3.5rem;
    &:hover {
        filter: brightness(0.93);
    }
`;

export const ModalContent = styled.div`
    position: relative;
`;

export const TitleModal = styled.div`
    border-bottom: 0.5px solid #ffa562;
    padding: 1rem 10rem 0rem 10rem;
    text-align: center;
    background-color: #ff7815;
    color: #e0e0e0;
    font-size: 3rem;
    font-weight: 600;
`;
export const HorarioModal = styled.div`
    border-bottom: 3px solid #ffa562;
    text-align: center;
    background-color: #ff7815;
    color: #e0e0e0;
    font-size: 2rem;
    font-weight: 450;
`;

export const ImgModal = styled.img`
    text-align: center;
    padding: 1rem;
    width: 55px;

`;

export const ModalButton = styled.button`
    background-color: #ff7815;
    padding: 0.8rem 1.5rem;
    border: 1px solid #ff7815;
    border-radius: 0.3rem;
    color: #fff;
    font-size: 1.1rem;
    margin: 2.5rem;
    margin-top: 0;
    float: right;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
        filter: brightness(0.93);
    }
    
`;

export const SairEvento = styled.button`
    padding: 1rem 3rem;
    margin-top: 5rem;
    margin-bottom: 3rem;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #212127;
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
    flex: 1.8;
    margin-right: 0.3rem;
    width: 50%;
`;

export const Hora = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border-radius: 15px;
    border: 0;

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

export const Modalidade = styled.input`
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

export const DisplayFlexInputs = styled.div`
    

    button {
        padding: 0.4rem;
        cursor: pointer;
        border-radius: 7px;
        border: 1px solid #212127;
    }
        textarea {
        display: flex;
        margin-bottom: 1rem;
    }
`;

export const ModalContentInputs = styled.div`
    padding: 1rem 2.5rem;
    min-width: 600px;
`;

export const ExcluirEvento = styled.button`
    padding: 0.5rem 2.5rem;
    margin-top: 2rem;
`;