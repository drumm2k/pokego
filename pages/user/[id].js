import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
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

export default function MyProfile({ params }) {
  const { id } = params;

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

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

MyProfile.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};
