import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  getEvents: Array<Event>;
  getEvent: Event;
  getPokemons: Array<Pokemon>;
  getPokemonByName: Pokemon;
  getRaids: Array<Tier>;
  getTradeLists: Array<TradeList>;
  getUsers: Array<User>;
  getUser: User;
  confirm: Scalars['Boolean'];
  searchUsers: Array<User>;
};


export type QueryGetEventArgs = {
  id: Scalars['ID'];
};


export type QueryGetPokemonByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetUserArgs = {
  userName: Scalars['String'];
};


export type QueryConfirmArgs = {
  token: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createPokemon?: Maybe<Pokemon>;
  initPokemons?: Maybe<Array<Maybe<Pokemon>>>;
  initRaids?: Maybe<Array<Maybe<Tier>>>;
  createTradeList: TradeList;
  signUp: Scalars['Boolean'];
  confirmResend: Scalars['Boolean'];
  login: Token;
  logout: Scalars['Boolean'];
  resetPasswordRequest: Scalars['Boolean'];
  verifyResetPasswordRequest: Token;
};


export type MutationCreatePokemonArgs = {
  input: PokemonInput;
};


export type MutationCreateTradeListArgs = {
  input: TradeListInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationConfirmResendArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
};


export type MutationVerifyResetPasswordRequestArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
  imgFull?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  descriptionFull?: Maybe<Scalars['String']>;
  starts?: Maybe<Scalars['String']>;
  ends?: Maybe<Scalars['String']>;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  id: Scalars['ID'];
  templateId: Scalars['String'];
  name: Scalars['String'];
  pokedex: Scalars['Int'];
  gen: Scalars['String'];
  shiny: Scalars['Boolean'];
  released: Scalars['Boolean'];
  tradable: Scalars['Boolean'];
  type1: Scalars['String'];
  type2?: Maybe<Scalars['String']>;
  baseStamina: Scalars['Int'];
  baseAttack: Scalars['Int'];
  baseDefense: Scalars['Int'];
  quickMoves: Array<Scalars['String']>;
  cinematicMoves: Array<Scalars['String']>;
  pokemonClass?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  familyId?: Maybe<Scalars['String']>;
  kmBuddyDistance?: Maybe<Scalars['Int']>;
  evolutionBranch: Array<Maybe<EvolutionBranch>>;
  thirdMoveStardust?: Maybe<Scalars['Int']>;
  thirdMoveCandy?: Maybe<Scalars['Int']>;
};

export type EvolutionBranch = {
  __typename?: 'EvolutionBranch';
  evolution?: Maybe<Scalars['String']>;
  evolutionItemRequirement?: Maybe<Scalars['String']>;
  lureItemRequirement?: Maybe<Scalars['String']>;
  candyCost?: Maybe<Scalars['Int']>;
  form?: Maybe<Scalars['String']>;
};

export type PokemonInput = {
  templateId: Scalars['String'];
  name: Scalars['String'];
  pokedex: Scalars['Int'];
  gen: Scalars['String'];
  shiny: Scalars['Boolean'];
  released: Scalars['Boolean'];
  tradable: Scalars['Boolean'];
  type1: Scalars['String'];
  type2?: Maybe<Scalars['String']>;
  baseStamina: Scalars['Int'];
  baseAttack: Scalars['Int'];
  baseDefense: Scalars['Int'];
  quickMoves: Array<Scalars['String']>;
  cinematicMoves: Array<Scalars['String']>;
  pokemonClass?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  familyId?: Maybe<Scalars['String']>;
  kmBuddyDistance?: Maybe<Scalars['Int']>;
  evolutionBranch?: Maybe<Array<Maybe<EvolutionBranchInput>>>;
  thirdMoveStardust?: Maybe<Scalars['Int']>;
  thirdMoveCandy?: Maybe<Scalars['Int']>;
};

export type EvolutionBranchInput = {
  evolution?: Maybe<Scalars['String']>;
  evolutionItemRequirement?: Maybe<Scalars['String']>;
  lureItemRequirement?: Maybe<Scalars['String']>;
  candyCost?: Maybe<Scalars['Int']>;
  form?: Maybe<Scalars['String']>;
};

export type Tier = {
  __typename?: 'Tier';
  id: Scalars['ID'];
  tier: Scalars['String'];
  raids: Array<Raid>;
};

export type Raid = {
  __typename?: 'Raid';
  id: Scalars['ID'];
  pokemon: Pokemon;
  cp: Scalars['Int'];
  shiny: Scalars['Boolean'];
  verified: Scalars['Boolean'];
};

export type TradeList = {
  __typename?: 'TradeList';
  id: Scalars['ID'];
  pokemons: Array<Maybe<Pokemon>>;
  description: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  createdBy: User;
};

export type TradeListInput = {
  pokemons: Array<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  userName: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  confirmed: Scalars['Boolean'];
  subscription: Scalars['Boolean'];
  roles: Array<Maybe<Scalars['String']>>;
  banned?: Maybe<Scalars['Boolean']>;
  trainer?: Maybe<Trainer>;
  location?: Maybe<Location>;
  social?: Maybe<Social>;
  tradeLists: Array<Maybe<TradeList>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Social = {
  __typename?: 'Social';
  telegram?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
};

export type Trainer = {
  __typename?: 'Trainer';
  team?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  latitude?: Maybe<Scalars['Float']>;
  longtitude?: Maybe<Scalars['Float']>;
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  user?: Maybe<User>;
};

export type SignUpInput = {
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  subscription: Scalars['Boolean'];
  social?: Maybe<SocialInput>;
  trainer: TrainerInput;
  location?: Maybe<LocationInput>;
};

export type SocialInput = {
  telegram?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TrainerInput = {
  team: Scalars['String'];
  level: Scalars['Int'];
  code?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  latitude?: Maybe<Scalars['Float']>;
  longtitude?: Maybe<Scalars['Float']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetPokemonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPokemonsQuery = (
  { __typename?: 'Query' }
  & { getPokemons: Array<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'name' | 'pokedex' | 'gen' | 'shiny' | 'released' | 'type1' | 'type2' | 'baseStamina' | 'baseAttack' | 'baseDefense' | 'pokemonClass'>
    & { evolutionBranch: Array<Maybe<(
      { __typename?: 'EvolutionBranch' }
      & Pick<EvolutionBranch, 'evolution' | 'evolutionItemRequirement' | 'lureItemRequirement' | 'candyCost'>
    )>> }
  )> }
);


export const GetPokemonsDocument = gql`
    query GetPokemons {
  getPokemons {
    name
    pokedex
    gen
    shiny
    released
    type1
    type2
    baseStamina
    baseAttack
    baseDefense
    pokemonClass
    evolutionBranch {
      evolution
      evolutionItemRequirement
      lureItemRequirement
      candyCost
    }
  }
}
    `;

/**
 * __useGetPokemonsQuery__
 *
 * To run a query within a React component, call `useGetPokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPokemonsQuery(baseOptions?: Apollo.QueryHookOptions<GetPokemonsQuery, GetPokemonsQueryVariables>) {
        return Apollo.useQuery<GetPokemonsQuery, GetPokemonsQueryVariables>(GetPokemonsDocument, baseOptions);
      }
export function useGetPokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonsQuery, GetPokemonsQueryVariables>) {
          return Apollo.useLazyQuery<GetPokemonsQuery, GetPokemonsQueryVariables>(GetPokemonsDocument, baseOptions);
        }
export type GetPokemonsQueryHookResult = ReturnType<typeof useGetPokemonsQuery>;
export type GetPokemonsLazyQueryHookResult = ReturnType<typeof useGetPokemonsLazyQuery>;
export type GetPokemonsQueryResult = Apollo.QueryResult<GetPokemonsQuery, GetPokemonsQueryVariables>;