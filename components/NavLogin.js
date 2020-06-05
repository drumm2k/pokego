import styled from 'styled-components';
import Link from 'next/link';

const LoginLink = styled.a`
  font-weight: 700;
  line-height: 1;
  padding: 1rem;
  margin: 0 2rem;
`;

function NavLogin() {
  return (
    <Link href="/login">
      <LoginLink>Войти</LoginLink>
    </Link>
  );
}

export default NavLogin;
