import styled from 'styled-components';

export const Container = styled.div`

`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    select {
    margin-top: 1rem;
    padding: 10px;
    border-radius: 2px;
    border: 0;
    width: 7rem;
    }
`;

export const Title = styled.div`
    text-align: center;
    margin-top: 3rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
`;
export const SportModal = styled.div`
    border-bottom: 0.5px solid #ffa562;
    padding: 1rem 10rem 0rem 10rem;
    text-align: center;
    background-color: #ff7815;
    color: #e0e0e0;
    font-size: 2.1rem;
    font-weight: 600;
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

export const DescricaoEvento = styled.div`
    padding: 0.5rem;
    background-color: #ff6d02;
`;

export const MembrosEquipe = styled.div`
    padding: 0.5rem;
    background-color: #ff6d02;
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



export const DivEquipes = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.3rem 2rem;
    gap: 2rem;
    fieldset {
        padding: 0.8rem 5rem;
        legend {
            cursor: context-menu;
            text-align: center;
        }
        
        p {
            text-align: center;
            font-weight: 500;
            color: #3e3e3e;
            cursor: context-menu;
            
        }
        button {
            margin-top: 5rem;
            padding: 7px;
            cursor: pointer;
            font-weight: 500;
            display: block;

        }
        select {
            margin-top: 0.5rem;
            padding: 5px;
        }
    }
`;


export const InscreverCasaButton = styled.button`

`;

export const InscreverVisitanteButton = styled.button`

`;


export const SairEventoVisitanteButton = styled.button`
    margin: auto;
`;

export const SairEventoCasaButton = styled.button`
    margin: auto;
`;

export const SelectCasa = styled.select<{ isActive: boolean }>`
    display: ${props => props.isActive ? 'flex' : 'none'};
`;

export const SelectVisitante = styled.select<{ isActive: boolean }>`
    display: ${props => props.isActive ? 'flex' : 'none'};
`;



export const ConfirmarButtonCasa = styled.div<{ isActive: boolean }>`
  display: ${props => props.isActive ? 'flex' : 'none'};

  margin-top: 0.8rem;
  padding: 10px 18px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #ec9706;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;

  &:hover {background-color: #e28f05}
  &:active {
  background-color: #e28f05;
  box-shadow: 0 5px #909090;
  transform: translateY(4px);
}
`;

export const ConfirmarButtonVisitante = styled.div<{ isActive: boolean }>`
  display: ${props => props.isActive ? 'flex' : 'none'};

margin-top: 0.8rem;
padding: 10px 18px;
font-size: 18px;
cursor: pointer;
text-align: center;
text-decoration: none;
outline: none;
color: #fff;
background-color: #ec9706;
border: none;
border-radius: 15px;
box-shadow: 0 9px #999;

&:hover {background-color: #e28f05}
&:active {
background-color: #e28f05;
box-shadow: 0 5px #909090;
transform: translateY(4px);
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
    float: right;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
        filter: brightness(0.93);
    }
    
`;

