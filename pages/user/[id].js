import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Profile from '../../components/Profile';
import Title from '../../components/Title';

export const GET_USER = gql`
  query getUser($userName: String!) {
    getUser(userName: $userName) {
      userName
      id
      subscription
      trainer {
        team
        level
        code
      }
      location {
        latitude
        longtitude
      }
      social {
        telegram
        discord
      }
      tradeLists {
        id
        pokemons {
          name
          pokedex
          gen
          shiny
          released
          type1
          type2
          pokemonClass
        }
        description
        isPrivate
      }
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query {
    getUsers {
      userName
    }
  }
`;

export default function MyProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userName: id },
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getUser } = data;

  return (
    <>
      <Title>Профиль тренера</Title>
      <Profile user={getUser} />
    </>
  );
}
