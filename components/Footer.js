import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-size: 1.4rem;
  color: rgb(108, 108, 112);
  margin-top: 5rem;
  padding: 1.5rem 1.5rem;
  border-top: 1px solid rgb(216, 216, 220);
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>© 2020 PokéGO. Все права защищены.</p>
      <p>
        Права на торговую марку Pokémon принадлежат компаниям Gamefreak, Nintendo и
        The Pokémon Company. Pokemon GO торговая марка Niantic, Inc. PokéGO никак не
        связан с данными компаниями. Картинки и имена принадлежат их соответсвующим
        владельцам.
      </p>
    </StyledFooter>
  );
}
