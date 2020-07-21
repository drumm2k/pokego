import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import AuthContext from '../context/auth';

import Title from '../components/Title';
import { Button, Input, Label } from '../components/UI';
import SpinnerButton from '../assets/spinner_button.svg';

const Form = styled.form`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s8};
  max-width: 380px;
  margin: ${(p) => p.theme.spacing.s12} auto;
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow300};
  padding: ${(p) => p.theme.spacing.s16} ${(p) => p.theme.spacing.s20};

  p {
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.warning};
  }
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
      userId
      userName
      token
      tokenExpiration
    }
  }
`;

function Login() {
  const auth = useContext(AuthContext);
  // const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      const { token, userId, userName, tokenExpiration } = data.login;
      auth.login(token, userId, userName, tokenExpiration);
      // router.push(`/user/${userName}`);
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  function loginHandler(event) {
    event.preventDefault();
    if (loading) return;

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

  const renderErrors = (err) => {
    let errorMessage;

    // if (error) {
    //   errorMessage = 'state error';
    // } else
    if (err) {
      errorMessage = err.message;
    }

    if (errorMessage) {
      return <p>{errorMessage}</p>;
    }
    return null;
  };

  return (
    <>
      <Title color="#666">Войти</Title>
      <Form onSubmit={loginHandler}>
        <FormField>
          <Label htmlFor="email" bold>
            Почта
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            onChange={handleInputChange}
            value={email}
          />
        </FormField>
        <FormField>
          <PasswordLabel>
            <Label htmlFor="password" bold>
              Пароль
            </Label>
            <Link href="/reset">
              <a>Забыли пароль?</a>
            </Link>
          </PasswordLabel>
          <Input
            type="password"
            id="password"
            name="password"
            autocomplete="current-password"
            onChange={handleInputChange}
            value={password}
          />
        </FormField>
        {renderErrors(error)}
        <Button bg="accent">{loading ? <SpinnerButton /> : <>Войти</>}</Button>
      </Form>
      <Register>
        Не зарегистрированы?{' '}
        <Link href="/signup">
          <a>Зарегистрироваться</a>
        </Link>
      </Register>
    </>
  );
}

export default Login;
