import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import Title from '../../components/Title';
import CheckIcon from '../../assets/check.svg';
import XIcon from '../../assets/x.svg';

export const CONFIRM_ACCOUNT = gql`
  query confirm($id: String!) {
    confirm(token: $id) {
      status
    }
  }
`;

export const CONFIRM_RESEND = gql`
  mutation confirmResend($email: String!) {
    confirmResend(email: $email) {
      status
    }
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.color.white};
  padding: ${(p) => p.theme.spacing.s8};
  margin-bottom: ${(p) => p.theme.spacing.s6};
  background: ${(p) => p.bgColor};
  border-radius: ${(p) => p.theme.border.radius300};

  p {
    margin-left: ${(p) => p.theme.spacing.s2};
  }
`;

export default function Confirm() {
  const router = useRouter();
  const { id } = router.query;

  const [success, setSuccess] = useState(false);

  const emailInput = useRef();
  const messageContainer = useRef();
  const message = useRef();

  function completed() {
    setSuccess(!success);
  }

  const { data, loading, error } = useQuery(CONFIRM_ACCOUNT, {
    variables: { id },
  });
  const [confirmResend, { error: mutationError }] = useMutation(CONFIRM_RESEND, {
    onCompleted: completed,
  });

  function handleClick(event) {
    event.preventDefault();
    confirmResend({ variables: { email: emailInput.current.value } });
  }

  if (loading) return <div>Загрузка</div>;
  if (error)
    return (
      <>
        <Title color="#666">Подтверждение учётной записи</Title>
        {(JSON.stringify(error.message).includes('invalid') ||
          JSON.stringify(error.message).includes('malformed')) && (
          <Message bgColor="#a33737">
            <XIcon stroke="#fff" />
            <p>Неверная ссылка!</p>
          </Message>
        )}
        {JSON.stringify(error.message).includes('expired') && (
          <>
            {success && (
              <Message bgColor="#37a36a" ref={messageContainer}>
                <CheckIcon stroke="#fff" />
                <p>Письмо отправлено</p>
              </Message>
            )}
            {!success && (
              <>
                <Message bgColor="#a33737" ref={messageContainer}>
                  <XIcon stroke="#fff" />
                  <p ref={message}>Время подтверждения истекло!</p>
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

            {mutationError && mutationError.message}
          </>
        )}
      </>
    );

  return (
    <>
      <Title color="#666">Подтверждение учётной записи</Title>

      {data.confirm.status && (
        <>
          <Message bgColor="#37a36a">
            <CheckIcon stroke="#fff" />
            <p>Аккаунт успешно подтверждён!</p>
          </Message>
        </>
      )}
    </>
  );
}
