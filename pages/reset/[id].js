import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import Title from '../../components/Title';
import { Button, FormField, Input, Label } from '../../components/UI';
import AuthContext from '../../context/auth';

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

export const VERIFY_RESET_PASSWORD_REQUEST = gql`
  mutation verifyResetPasswordRequest($token: String!, $password: String!) {
    verifyResetPasswordRequest(token: $token, password: $password) {
      userId
      userName
      token
      tokenExpiration
    }
  }
`;

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Заполните пароль')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[a-z]/, 'Минимум один символ в нижнем регистре (a-z)')
    .matches(/[A-Z]/, 'Минимум один символ в верхнем регистре (A-Z)')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])/,
      'Минимум одна цифра или спец символ (0-9, !@#$%^&*)'
    ),
});

export default function ConfirmReset() {
  const router = useRouter();
  const { id } = router.query;
  const auth = useContext(AuthContext);

  const [resetPasswordRequest, { loading, error }] = useMutation(
    VERIFY_RESET_PASSWORD_REQUEST,
    {
      onCompleted(data) {
        const {
          token,
          userId,
          userName,
          tokenExpiration,
        } = data.verifyResetPasswordRequest;
        auth.login(token, userId, userName, tokenExpiration);
        router.push('/user/[id]', `/user/${userName}`);
      },
    }
  );

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (form) => {
    resetPasswordRequest({
      variables: {
        token: id,
        password: form.password,
      },
    });
  };

  return (
    <>
      <Title>Введите новый пароль</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="password" bold>
            Пароль
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            autocomplete="new-password"
            ref={register({ required: true })}
          />
          <p>{errors.password?.message}</p>
        </FormField>
        {error && <p>{error.message}</p>}

        <Button bg="accent" color="white">
          {loading ? <>Загрузка</> : <>Отправить</>}
        </Button>
      </Form>
    </>
  );
}
