import { gql, useQuery } from '@apollo/client';
import { Title } from 'components/Title';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export const CONFIRM_ACCOUNT = gql`
  query confirm($token: String!) {
    confirm(token: $token)
  }
`;

export default function Confirm({ params }: any) {
  const { id } = params;
  const { data, loading, error } = useQuery(CONFIRM_ACCOUNT, {
    variables: { token: id },
  });

  if (loading) return <div>Загрузка</div>;
  if (error)
    return (
      <>
        <Title>Подтверждение учётной записи</Title>
        {error.message && (
          <div>
            <p>Ошибка! {error.message}</p>
          </div>
        )}
      </>
    );

  return (
    <>
      <Title>Подтверждение учётной записи</Title>
      {data.confirm && (
        <>
          <div>
            <p>Аккаунт успешно подтверждён!</p>
          </div>
        </>
      )}
      {!data.confirm && (
        <>
          <div>
            <p>
              Ошибка! Попробуйте запросить{' '}
              <Link href="/confirm">
                <a>новое письмо</a>
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  return {
    props: {
      params,
    },
  };
};
