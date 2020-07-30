import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import Title from '../components/Title';
import { Button, Input, Label } from '../components/UI';
import AuthContext from '../context/auth';

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
      roles
      token
      tokenExpiration
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().required('Заполните почту').email('Заполните почту').trim(),
  password: yup.string().required('Заполните пароль'),
});

function Login() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      const { token, userId, userName, roles, tokenExpiration } = data.login;
      auth.login(token, userId, userName, roles, tokenExpiration);
      localStorage.setItem('token', token);
      router.push('/user/[id]', `/user/${userName}`);
    },
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (form) => {
    login({
      variables: {
        email: form.email,
        password: form.password,
      },
    });
  };

  return (
    <>
      <Title>Войти</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="email" bold>
            Почта
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            ref={register({ required: true })}
          />
          <p>{errors.email?.message}</p>
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
            ref={register({ required: true })}
          />
          <p>{errors.password?.message}</p>
        </FormField>
        {error && <p>{error.message}</p>}
        <Button bg="accent" color="white">
          {loading ? <>Загрузка</> : <>Войти</>}
        </Button>
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
