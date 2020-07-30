import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import Title from '../../components/Title';
import { Button, Input, Label } from '../../components/UI';

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

export const CONFIRM_RESEND = gql`
  mutation confirmResend($email: String!) {
    confirmResend(email: $email)
  }
`;

const schema = yup.object().shape({
  email: yup.string().required('Заполните почту').email('Заполните почту').trim(),
});

export default function Confirm() {
  const [message, setMessage] = useState('');

  const [confirmResend, { loading, error }] = useMutation(CONFIRM_RESEND, {
    onCompleted() {
      setMessage(`Письмо отправлено на ваш адрес`);
    },
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (form) => {
    confirmResend({
      variables: {
        email: form.email,
      },
    });
  };

  return (
    <>
      <Title>Подтверждение аккаунта</Title>
      {!message && (
        <>
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
