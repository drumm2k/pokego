import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.white)};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.md)};
  font-weight: ${(p) =>
    p.weight ? p.theme.font.weight[p.weight] : p.theme.font.weight.normal};
  letter-spacing: 0.1rem;
  white-space: nowrap;
  padding: ${(p) => p.theme.sizing.s3} ${(p) => p.theme.sizing.s5};
  border: ${(p) => p.theme.borders.border400};
  border-radius: ${(p) =>
    p.radius ? p.theme.borders[p.radius] : p.theme.borders.radius200};
  background-color: ${(p) => (p.bg ? p.theme.colors[p.bg] : p.theme.colors.black)};
  transition: opacity 0.25s;

  &:focus {
    outline: none;
    box-shadow: ${(p) => p.theme.lighting.focus};
  }

  ${(p) =>
    p.disabled &&
    `
    background-color: ${p.theme.colors.gray400};
    cursor: not-allowed;
  `};

  ${(p) =>
    !p.disabled &&
    `
    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  `};

  ${(p) =>
    p.fullWidth &&
    `
    width: 100%;
  `}
`;
