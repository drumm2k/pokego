import AuthContext from 'context/auth';
import { useContext } from 'react';

export default function Index() {
  const auth = useContext(AuthContext);

  return (
    <>
      <h3>Cайт находится в разработке‍.</h3>
      {auth.user && <div>{JSON.stringify(auth)}</div>}
    </>
  );
}
