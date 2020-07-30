import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Title from '../../components/Title';

export const CONFIRM_ACCOUNT = gql`
  query confirm($id: String!) {
    confirm(token: $id)
  }
`;

export default function Confirm() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(CONFIRM_ACCOUNT, {
    variables: { id },
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
