import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers';
import { Title } from 'components/Title';
import { Button, FormField, Input, Label } from 'components/UI';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

export const RESET_PASSWORD_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Заполните почту')
    .email('Заполните почту')
    .trim()
    .lowercase(),
});

type FormData = {
  email: string;
};

export default function Reset() {
  const [message, setMessage] = useState('');

  const [resetPasswordRequest, { loading, error }] = useMutation(
    RESET_PASSWORD_REQUEST,
    {
      onCompleted() {
        setMessage(`Письмо отправлено на ваш адрес`);
      },
    }
  );

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((form) => {
    resetPasswordRequest({
      variables: {
        email: form.email,
      },
    });
  });

  return (
    <>
      <Title>Восстановление пароля</Title>
      {!message && (
        <>
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

            {error && <p>{error.message}</p>}

            <Button bg="accent" color="white">
              {loading ? <>Загрузка</> : <>Отправить</>}
            </Button>
          </Form>
        </>
      )}
      {message && <div>{message}</div>}
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
