import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 4rem;
  color: ${(p) => (p.color ? p.theme.color[p.color] : p.theme.color.gray600)};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.md)};
  font-weight: ${(p) =>
    p.weight ? p.theme.font.weight[p.weight] : p.theme.font.weight.normal};
  letter-spacing: 0.1rem;
  white-space: nowrap;
  padding: ${(p) => p.theme.spacing.s3} ${(p) => p.theme.spacing.s5};
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) =>
    p.radius ? p.theme.border[p.radius] : p.theme.border.radius200};
  background-color: ${(p) => (p.bg ? p.theme.color[p.bg] : p.theme.color.white)};
  transition: all 0.25s ease 0s;

  &:focus {
    outline: none;
    box-shadow: ${(p) => p.theme.input.focus};
  }

  ${(p) =>
    p.disabled &&
    `
    background-color: ${p.theme.color.gray400};
    cursor: not-allowed;
  `};

  ${(p) =>
    !p.disabled &&
    `
    &:hover {
      border-color: ${p.theme.color.black};
      background-color: transparent;
      color: ${p.theme.color.black};
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
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.md)};
  font-weight: ${(p) =>
    p.bold ? p.theme.font.weight.bold : p.theme.font.weight.normal};

  input[type='checkbox'] {
    margin-right: ${(p) => p.theme.spacing.s3};
  }

  input[type='radio'] {
    margin-right: ${(p) => p.theme.spacing.s3};
  }

  input[type='text'] {
    margin-left: ${(p) => p.theme.spacing.s3};
  }

  select {
    margin-left: ${(p) => p.theme.spacing.s3};
  }
`;

export const Input = styled.input`
  appearance: none;
  color: ${(p) => p.theme.color.gray800};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.md)};
  width: ${(p) => (p.width ? p.width : '100%')};
  min-height: 4rem;
  padding: ${(p) => p.theme.spacing.s3} ${(p) => p.theme.spacing.s5};
  border: none;
  border-radius: ${(p) => p.theme.border.radius200};
  box-shadow: ${(p) => p.theme.input.border};
  outline: none;
  white-space: nowrap;
  transition: box-shadow 0.25s;

  &:focus {
    box-shadow: ${(p) => p.theme.input.border}, ${(p) => p.theme.input.focus};
  }

  :not(:focus):invalid {
    box-shadow: ${(p) => p.theme.input.border}, ${(p) => p.theme.input.invalid};
  }

  ${(p) =>
    p.disabled &&
    `
    background-color: ${p.theme.color.gray50};
    cursor: not-allowed;
  `};

  ::placeholder {
    line-height: normal;
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
  border: ${(p) => p.theme.border.border500};
  border-radius: ${(p) => p.theme.border.radius200};
  background-color: ${(p) => p.theme.color.white};
  background-repeat: no-repeat;
  background-position: center center;
  outline: none;
  transition: box-shadow 0.25s;

  &:hover {
    border: ${(p) => p.theme.border.border800};
  }

  &:focus {
    box-shadow: ${(p) => p.theme.input.focus};
  }

  &:checked {
    border: ${(p) => p.theme.border.border800};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' stroke='rgb(102, 102, 102)'%3E%3Cpath d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E");
  }
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border: ${(p) => p.theme.border.border500};
  border-radius: 50%;
  background-color: ${(p) => p.theme.color.white};
  background-repeat: no-repeat;
  background-position: center center;
  outline: none;
  transition: box-shadow 0.25s;

  &:hover {
    border: ${(p) => p.theme.border.border800};
  }

  &:focus {
    box-shadow: ${(p) => p.theme.input.focus};
  }

  &:checked {
    border: ${(p) => p.theme.border.border800};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='20' width='20'%3E%3Ccircle cx='10' cy='10' r='5' fill='rgb(102, 102, 102)' /%3E%3C/svg%3E ");
  }
`;

export const Select = styled.select`
  appearance: none;
  color: ${(p) => p.theme.color.gray800};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.md)};
  line-height: 4rem;
  padding: 0 ${(p) => p.theme.spacing.s5};
  border: none;
  border-radius: ${(p) => p.theme.border.radius200};
  box-shadow: ${(p) => p.theme.input.border};
  background-color: ${(p) => p.theme.color.white};
  outline: none;
  white-space: nowrap;
  transition: box-shadow 0.25s;

  &:focus {
    box-shadow: ${(p) => p.theme.input.border}, ${(p) => p.theme.input.focus};
  }

  ${(p) =>
    p.disabled &&
    `
    background-color: ${p.theme.color.gray50};
    cursor: not-allowed;
  `};
`;

export const TextArea = styled.textarea`
  appearance: none;
  color: ${(p) => p.theme.color.gray800};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.md)};
  width: ${(p) => (p.width ? p.width : '100%')};
  min-height: 8rem;
  resize: vertical;
  padding: ${(p) => p.theme.spacing.s5};
  border: none;
  border-radius: ${(p) => p.theme.border.radius200};
  box-shadow: ${(p) => p.theme.input.border};
  outline: none;
  transition: box-shadow 0.25s;

  &:focus {
    box-shadow: ${(p) => p.theme.input.border}, ${(p) => p.theme.input.focus};
  }

  ${(p) =>
    p.disabled &&
    `
    background-color: ${p.theme.color.gray50};
  `};

  ::placeholder {
    line-height: normal;
  }
`;
