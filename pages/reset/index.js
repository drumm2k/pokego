import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

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

export const RESET_PASSWORD_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email)
  }
`;

export default function Reset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [resetPasswordRequest, { loading, error }] = useMutation(
    RESET_PASSWORD_REQUEST,
    {
      onCompleted() {
        setMessage(`Письмо отправлено на ваш адрес: ${email}`);
      },
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmail(value);
  };

  function resetHandler(event) {
    event.preventDefault();
    if (loading) return;

    if (!email) {
      return;
    }

    resetPasswordRequest({
      variables: {
        email,
      },
    });
  }

  const renderErrors = (err) => {
    let errorMessage;

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
      <Title color="#666">Восстановление пароля</Title>
      {!message && (
        <>
          <Form onSubmit={resetHandler}>
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
            {renderErrors(error)}

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
