import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 5px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80% 80%;

  &:hover {
    border-color: rgb(50, 50, 50);
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(150, 150, 150, 0.5);
    outline: none;
  }

  &:checked {
    border-color: rgb(50, 50, 50);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' stroke='rgb(50, 50, 50)'%3E%3Cpath d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E");
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

export default function Checkbox({ label, checked, onChange }) {
  return (
    <StyledLabel>
      <StyledCheckbox
        type="checkbox"
        name={label}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </StyledLabel>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
