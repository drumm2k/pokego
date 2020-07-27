import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import AuthContext from '../../context/auth';

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

export default function ConfirmReset() {
  const router = useRouter();
  const { id } = router.query;
  const auth = useContext(AuthContext);

  const [password, setPassword] = useState('');

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

  const handleInputChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  function resetHandler(event) {
    event.preventDefault();
    if (loading) return;

    if (!password) {
      return;
    }

    resetPasswordRequest({
      variables: {
        token: id,
        password,
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
      <Title>Введите новый пароль</Title>

      <Form onSubmit={resetHandler}>
        <FormField>
          <Label htmlFor="password" bold>
            Пароль
          </Label>
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

        <Button bg="accent" color="white">
          {loading ? <>Загрузка</> : <>Отправить</>}
        </Button>
      </Form>
    </>
  );
}
