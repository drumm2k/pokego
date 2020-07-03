import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../../lib/apolloClient';
import ProfileCard from '../../components/ProfileCard';

export const GET_USER = gql`
  query getUser($userName: String!) {
    getUser(userName: $userName) {
      userName
      id
      trainerCode
      trainerTeam
      trainerLevel
      locLatitude
      locLongtitude
      telegram
      createdAt
      updatedAt
      tradeLists {
        id
        pokemons
        description
        isPrivate
      }
      followers {
        id
        user {
          userName
        }
        follower {
          userName
        }
      }
      following {
        id
        user {
          userName
        }
        follower {
          userName
        }
      }
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

export default function Profile() {
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
      <ProfileCard user={getUser} />
      <Link href="/profile/trade">
        <a>Выбрать покемонов на трейд</a>
      </Link>
      <div>
        <button type="button" onClick={() => Router.back()}>
          ← Назад
        </button>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GET_USER, variables: { userName: params.id } });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({ query: GET_USERS });
  const { getUsers } = res.data;

  const paths = getUsers.map((user) => ({
    params: { id: user.userName },
  }));

  return {
    paths,
    fallback: true,
  };
}
