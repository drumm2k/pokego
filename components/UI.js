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
  transition: box-shadow 0.25s, opacity 0.25s;

  &:focus {
    outline: none;
    box-shadow: ${(p) => p.theme.input.focus};
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

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;

  input[type='checkbox'] {
    margin-right: ${(p) => p.theme.sizing.s3};
  }

  input[type='text'] {
    margin-left: ${(p) => p.theme.sizing.s3};
  }
`;

export const InputText = styled.input`
  appearance: none;
  color: ${(p) => p.theme.colors.gray800};
  width: ${(p) => (p.width ? p.width : '100%')};
  min-height: 3.6rem;
  padding: ${(p) => p.theme.sizing.s3} ${(p) => p.theme.sizing.s5};
  border: none;
  border-radius: ${(p) => p.theme.borders.radius200};
  box-shadow: ${(p) => p.theme.input.border};
  outline: none;
  white-space: nowrap;
  transition: box-shadow 0.25s;

  &:focus {
    box-shadow: ${(p) => p.theme.input.border}, ${(p) => p.theme.input.focus};
  }

  :invalid {
    box-shadow: ${(p) => p.theme.input.border}, ${(p) => p.theme.input.invalid};
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: ${(p) => p.theme.borders.border500};
  border-radius: ${(p) => p.theme.borders.radius200};
  background-repeat: no-repeat;
  background-position: center center;
  outline: none;
  transition: box-shadow 0.25s;

  &:hover {
    border-color: ${(p) => p.theme.borders.border800};
  }

  &:focus {
    box-shadow: ${(p) => p.theme.input.focus};
  }

  &:checked {
    border: ${(p) => p.theme.borders.border800};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' stroke='rgb(50, 50, 50)'%3E%3Cpath d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E");
  }
`;
