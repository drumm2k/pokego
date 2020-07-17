import { useState, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

import { Button, InputText, Checkbox, Label } from '../components/UI';

const Form = styled.form`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s8};
  max-width: 300px;
  margin: 0 auto;
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow300};
  padding: ${(p) => p.theme.spacing.s12};
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
    background: ${(p) => p.theme.color.black};
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
  padding: ${(p) => p.theme.spacing.s1} 0;

  &:invalid {
    color: red;
  }
`;

const FormLabel = styled.label`
  color: ${(p) => p.theme.color.black};
  font-weight: ${(p) => p.theme.font.weight.bold};
  display: flex;
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      token
      tokenExpiration
    }
  }
`;

function Login() {
  const emailInput = useRef();
  const passwordInput = useRef();

  function completed() {
    console.log('completed');
  }

  const [login, { data, loading, error: apiError }] = useMutation(LOGIN, {
    onCompleted: completed,
  });

  function loginHandler(event) {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (!email || !password) {
      return;
    }
    // Add validation later ============================
    login({
      variables: {
        email,
        password,
      },
    });
  }

  return (
    <>
      {data && <div>{JSON.stringify(data.login)}</div>}
      <Form onSubmit={loginHandler}>
        <FormField>
          <FormLabel htmlFor="email" className="label">
            Почта
          </FormLabel>
          <FormInput type="email" name="email" placeholder="" ref={emailInput} />
        </FormField>

        <FormField>
          <FormLabel htmlFor="password" className="label">
            Пароль
          </FormLabel>
          <FormInput
            type="password"
            name="password"
            placeholder=""
            ref={passwordInput}
          />

          <span className="toggle-password" />
        </FormField>
        <Button bg="accent">Войти</Button>
        <div>Не зарегистрированы?</div>
      </Form>
    </>
  );
}

export default Login;
