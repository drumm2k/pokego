import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';
import AuthContext from '../context/auth';

export const HELLO = gql`
  query {
    hello
  }
`;

function Index() {
  const auth = useContext(AuthContext);

  const { data, loading, error } = useQuery(HELLO);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { hello } = data;

  return (
    <>
      <h3>Cайт находится в разработке‍.</h3>
      <div>{hello}</div>
      <div>{JSON.stringify(auth)}</div>
    </>
  );
}

export default Index;
