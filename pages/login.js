import { useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';

import Title from '../components/Title';
import { Button, Input, Label } from '../components/UI';

const Form = styled.form`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s8};
  max-width: 380px;
  margin: ${(p) => p.theme.spacing.s12} auto;
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow300};
  padding: ${(p) => p.theme.spacing.s16} ${(p) => p.theme.spacing.s20};
`;

const FormField = styled.section`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s2};
  width: 100%;
`;

const PasswordLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(p) => p.theme.font.size.sm};
`;

const Register = styled.div`
  font-size: ${(p) => p.theme.font.size.sm};
  text-align: center;
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
      <Title color="#666">Войти</Title>

      {data && <div>{JSON.stringify(data.login)}</div>}

      <Form onSubmit={loginHandler}>
        <FormField>
          <Label htmlFor="email" size="md" bold>
            Почта
          </Label>
          <Input type="email" id="email" name="email" ref={emailInput} />
        </FormField>
        <FormField>
          <PasswordLabel>
            <Label htmlFor="password" size="md" bold>
              Пароль
            </Label>
            <Link href="/reset">
              <a>Забыли пароль?</a>
            </Link>
          </PasswordLabel>
          <Input type="password" id="password" name="password" ref={passwordInput} />
        </FormField>
        <Button bg="accent">Войти</Button>
      </Form>
      <Register>
        Не зарегистрированы?{' '}
        <Link href="/register">
          <a>Зарегистрироваться</a>
        </Link>
      </Register>
    </>
  );
}

export default Login;
