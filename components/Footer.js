import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.gray600};
  margin-top: ${(p) => p.theme.spacing.s16};
  padding: ${(p) => p.theme.spacing.s6};
  border-top: ${(p) => p.theme.border.border300};
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
