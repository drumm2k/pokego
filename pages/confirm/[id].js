import { useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import Title from '../../components/Title';
import CheckIcon from '../../assets/check.svg';
import XIcon from '../../assets/x.svg';

export const CONFIRM_ACCOUNT = gql`
  query confirm($id: String!) {
    confirm(token: $id)
  }
`;

export const CONFIRM_RESEND = gql`
  mutation confirmResend($email: String!) {
    confirmResend(email: $email)
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.color.white};
  padding: ${(p) => p.theme.spacing.s8};
  margin-bottom: ${(p) => p.theme.spacing.s6};
  background: ${(p) => (p.success ? p.theme.color.success : p.theme.color.warning)};
  border-radius: ${(p) => p.theme.border.radius300};

  p {
    margin-left: ${(p) => p.theme.spacing.s2};
  }
`;

export default function Confirm() {
  const router = useRouter();
  const { id } = router.query;

  const emailInput = useRef();

  const { data, loading, error } = useQuery(CONFIRM_ACCOUNT, {
    variables: { id },
  });
  const [confirmResend, { data: request, error: mutationError }] = useMutation(
    CONFIRM_RESEND
  );

  function handleClick(event) {
    event.preventDefault();
    confirmResend({ variables: { email: emailInput.current.value } });
  }

  if (loading) return <div>Загрузка</div>;
  if (error)
    return (
      <>
        <Title>Подтверждение учётной записи</Title>
        {error.message && (
          <Message>
            <XIcon stroke="#fff" />
            <p>{error.message}</p>
          </Message>
        )}
      </>
    );
  if (mutationError)
    return (
      <>
        <Title>Подтверждение учётной записи</Title>
        {mutationError.message && (
          <Message>
            <XIcon stroke="#fff" />
            <p>{mutationError.message}</p>
          </Message>
        )}
      </>
    );

  return (
    <>
      <Title>Подтверждение учётной записи</Title>
      {!data.confirm && !request && (
        <>
          <Message>
            <XIcon stroke="#fff" />
            <p>Что-то пошло не так!</p>
          </Message>
          <form>
            <label>
              E-mail:
              <input type="email" name="email" ref={emailInput} />
            </label>
            <input
              type="button"
              value="Отправить ссылку повторно"
              onClick={handleClick}
            />
          </form>
        </>
      )}
      {!data.confirm && request && request.confirmResend && (
        <>
          <Message success>
            <CheckIcon stroke="#fff" />
            <p>Письмо отправлено</p>
          </Message>
        </>
      )}

      {data.confirm && (
        <>
          <Message success>
            <CheckIcon stroke="#fff" />
            <p>Аккаунт успешно подтверждён!</p>
          </Message>
        </>
      )}
    </>
  );
}
