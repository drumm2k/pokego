import { gql, useQuery } from '@apollo/client';
// import cookie from 'cookie';
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

export function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

// Parse cookies from req headers, init apollo client and fetch data
// DON'T NEED THIS FOR NOW
// =================================================================
// export async function getServerSideProps({ params, req, res }) {
//   if (req.headers.cookie) {
//     const cookies = cookie.parse(req.headers.cookie);
//     if (cookies.jid) {
//       const response = await fetch(process.env.NEXT_PUBLIC_REFRESH_TOKEN, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           cookie: `jid=${cookies.jid}`,
//         },
//       });
//       const data = await response.json();
//       console.log(data);
//     }
//   }

//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: GET_USER,
//     variables: { userName: params.id },
//   });

//   return {
//     props: {
//       params,
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }

MyProfile.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};
