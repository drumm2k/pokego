import styled from 'styled-components';
import Link from 'next/link';

const ProfileAvatar = styled.div`
  margin: 0 2rem;
  width: 4rem;
  height: 4rem;
  background: lightgray;
  border-radius: 50%;

  &:hover {
    background: red;
  }
`;

function NavProfile() {
  return (
    <>
      {/* <Link href="/login">
        <ProfileLink>Войти</ProfileLink>
      </Link> */}
      <ProfileAvatar />
    </>
  );
}

export default NavProfile;
