import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers';
import { Title } from 'components/Title';
import { Button, FormField, Input, Label } from 'components/UI';
import AuthContext from 'context/auth';
import { setAccessToken } from 'lib/accessToken';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

const siteTitle = 'PokéGo - Авторизация';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
      user {
        id
        userName
        email
        roles
        trainer {
          team
          level
          code
        }
      }
    }
  }
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Заполните почту')
    .email('Заполните почту')
    .trim()
    .lowercase(),
  password: yup.string().required('Заполните пароль'),
});

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      const { accessToken, user } = data.login;
      console.log(user);
      auth.login(user);
      setAccessToken(accessToken);
      router.push('/user/[id]', `/user/${user.userName}`);
    },
  });

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((form) => {
    login({
      variables: {
        email: form.email,
        password: form.password,
      },
    });
  });

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Title>Войти</Title>
      <Form onSubmit={onSubmit}>
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
