
import { Container, Content, CriarEquipeButton, DescricaoEquipe, DisplayFlex, Equipe, EquipesContent, NomeEquipe, Title } from './styles';
import { GiSoccerBall } from 'react-icons/gi';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { GiVolleyballBall } from 'react-icons/gi';
import { Header } from '../../../components/Header';

export const MostrarEquipe = () => {

    const navigate = useNavigate();

    const listaEquipes = [{
        nome: 'só perneta',
        descricao:'Sei lá',
    },
    {
        nome: 'mds',
        descricao:'Sei lá',
    },
    {
        nome: 'UhelpX',
        descricao:'Sei lá',
    },
    {
        nome: 'subliminar',
        descricao:'Sei lá',
    }
    ];



    return (
        <Container>
            <Header />
            <Content>
                <Title>Equipes</Title>
                <CriarEquipeButton onClick={() => navigate('/criar-equipe')} type="submit" value="Criar Equipe" />
            </Content>
            <EquipesContent>
                {listaEquipes.map((equipe, key) =>
                    <Equipe key={key}>
                        <DisplayFlex>
                            <NomeEquipe>{equipe.nome}</NomeEquipe>
                        </DisplayFlex>
                        <DescricaoEquipe>  Descrição: {equipe.descricao}</DescricaoEquipe>
                    </Equipe>
                )}
            </EquipesContent>
        </Container>
    )
}