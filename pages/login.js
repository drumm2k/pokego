import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-gap: 2rem;
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid #edf2f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 3rem;
`;

const FormField = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 2px solid #a3a9a9;

  &::after {
    content: '';
    position: relative;
    display: block;
    height: 3px;
    width: 100%;
    background: #000;
    transform: scaleX(0);
    transform-origin: 0%;
    transition: transform 400ms ease;
    top: 2px;
  }

  &:focus-within {
    border-color: transparent;
  }

  &:focus-within:after {
    transform: scaleX(1);
  }
`;

const FormInput = styled.input`
  outline: none;
  border: none;
  overflow: hidden;
  margin: 0;
  width: 100%;
  padding: 0.25rem 0;

  &:invalid {
    color: red;
  }
`;

const FormLabel = styled.label`
  color: #5e5e5e;
  font-weight: 700;
  display: flex;
`;

const SignInButton = styled.button`
  padding: 1rem;
  border: 1px solid #a3a9a9;
  border-radius: 5px;
`;

const Icon = styled.span`
  display: block;
  width: 23px;
  height: 23px;
  margin-right: 5px;
`;

function login() {
  return (
    <>
      <Form>
        <FormField>
          <FormLabel htmlFor="email" className="label">
            Почта
          </FormLabel>
          <FormInput type="email" name="email" placeholder="" />
        </FormField>

        <FormField>
          <FormLabel htmlFor="password" className="label">
            Пароль
          </FormLabel>
          <FormInput type="password" name="password" placeholder="" />

          <span className="toggle-password" />
        </FormField>

        <SignInButton disabled>Войти</SignInButton>
        <div>Не зарегистрированы?</div>
      </Form>
    </>
  );
}

export default login;
