import { useContext } from 'react';
import AuthContext from '../context/auth';

function Index() {
  const auth = useContext(AuthContext);

  return (
    <>
      <h3>Cайт находится в разработке‍.</h3>
      {auth.user && <div>{JSON.stringify(auth)}</div>}
    </>
  );
}

export default Index;
