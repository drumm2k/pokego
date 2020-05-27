import { ApolloServer, gql } from 'apollo-server-micro';

const eventsData = [
  {
    id: 1,
    name: 'Rayquaza в рейдах',
    desc: 'Rayquaza возвращается, на этот раз с шайни версией.',
    start: 'Feb 31 2020 05:00:00 GMT-0700',
    end: 'Mar 2 2021 05:00:00 GMT-0700',
    img: '/img/pokemon/384.png',
  },
  {
    id: 2,
    name: 'Week 1: Johto Journey',
    desc: 'Ультра бонус, первая неделя.',
    start: 'Jun 2 2020 13:00:00 GMT-0700',
    end: 'Jul 9 2020 13:00:00 GMT-0700',
    img: '/img/pokemon/201-f.png',
  },
  {
    id: 3,
    name: 'Week 2: Global Challenge, Global Hatches',
    desc: 'Ультра бонус, вторая неделя.',
    start: 'Mar 9 2020 13:00:00 GMT-0700',
    end: 'Mar 16 2020 13:00:00 GMT-0700',
    img: '/img/pokemon/83.png',
  },
  {
    id: 4,
    name: 'Week 3: A Unova Unveiling',
    desc: 'Ультра бонус, третья неделя.',
    start: 'Mar 16 2020 13:00:00 GMT-0700',
    end: 'Mar 23 2020 13:00:00 GMT-0700',
    img: '/img/pokemon/286.png',
  },
];

const pokemonData = [
  {
    templateId: 'V0004_POKEMON_CHARMANDER',
    pokemon: {
      uniqueId: 'CHARMANDER',
      modelScale: 1.25,
      type1: 'POKEMON_TYPE_FIRE',
      camera: {
        diskRadiusM: 0.4688,
        cylinderRadiusM: 0.3125,
        cylinderHeightM: 0.65,
        shoulderModeScale: 0.5,
      },
      encounter: {
        baseCaptureRate: 0.2,
        baseFleeRate: 0.1,
        collisionRadiusM: 0.15625,
        collisionHeightM: 0.46875,
        collisionHeadRadiusM: 0.15625,
        movementType: 'MOVEMENT_JUMP',
        movementTimerS: 29.0,
        jumpTimeS: 1.25,
        attackTimerS: 10.0,
        attackProbability: 0.1,
        dodgeProbability: 0.15,
        dodgeDurationS: 1.0,
        dodgeDistance: 1.0,
        cameraDistance: 2.8125,
        minPokemonActionFrequencyS: 0.2,
        maxPokemonActionFrequencyS: 1.6,
      },
      stats: {
        baseStamina: 118,
        baseAttack: 116,
        baseDefense: 93,
      },
      quickMoves: ['EMBER_FAST', 'SCRATCH_FAST'],
      cinematicMoves: ['FLAME_CHARGE', 'FLAME_BURST', 'FLAMETHROWER'],
      animTime: [2.1333, 0.6667, 1.6667, 1.8333, 0.0, 2.1333, 1.1667, 1.333333],
      evolution: ['CHARMELEON'],
      evolutionPips: 1,
      pokedexHeightM: 0.6,
      pokedexWeightKg: 8.5,
      heightStdDev: 0.075,
      weightStdDev: 1.0625,
      familyId: 'FAMILY_CHARMANDER',
      candyToEvolve: 25,
      kmBuddyDistance: 1.5,
      modelHeight: 0.6,
      evolutionBranch: [
        {
          evolution: 'CHARMELEON',
          candyCost: 25,
          form: 'CHARMELEON_NORMAL',
        },
      ],
      modelScaleV2: 1.0,
      buddyOffsetMale: [0.0, 0.0, 0.0],
      buddyOffsetFemale: [0.0, 0.0, 0.0],
      buddyScale: 19.0,
      thirdMove: {
        stardustToUnlock: 10000,
        candyToUnlock: 25,
      },
      isTransferable: true,
      isDeployable: true,
      buddyGroupNumber: 2,
    },
  },
  {
    templateId: 'V0005_POKEMON_CHARMELEON',
    pokemon: {
      uniqueId: 'CHARMELEON',
      modelScale: 1.03,
      type1: 'POKEMON_TYPE_FIRE',
      camera: {
        diskRadiusM: 0.6953,
        cylinderRadiusM: 0.4635,
        cylinderHeightM: 1.133,
        shoulderModeScale: 0.5,
      },
      encounter: {
        baseCaptureRate: 0.1,
        baseFleeRate: 0.07,
        collisionRadiusM: 0.2575,
        collisionHeightM: 0.7725,
        collisionHeadRadiusM: 0.23175,
        movementType: 'MOVEMENT_JUMP',
        movementTimerS: 23.0,
        jumpTimeS: 1.0,
        attackTimerS: 8.0,
        bonusCandyCaptureReward: 2,
        bonusStardustCaptureReward: 200,
        attackProbability: 0.1,
        dodgeProbability: 0.15,
        dodgeDurationS: 1.0,
        dodgeDistance: 1.0,
        cameraDistance: 4.24875,
        minPokemonActionFrequencyS: 0.2,
        maxPokemonActionFrequencyS: 1.6,
      },
      stats: {
        baseStamina: 151,
        baseAttack: 158,
        baseDefense: 126,
      },
      quickMoves: ['EMBER_FAST', 'FIRE_FANG_FAST'],
      cinematicMoves: ['FIRE_PUNCH', 'FLAME_BURST', 'FLAMETHROWER'],
      animTime: [1.8667, 0.6667, 1.8333, 1.5, 6.666667, 2.3333, 2.0, 2.533334],
      evolution: ['CHARIZARD'],
      evolutionPips: 1,
      pokedexHeightM: 1.1,
      pokedexWeightKg: 19.0,
      parentId: 'CHARMANDER',
      heightStdDev: 0.1375,
      weightStdDev: 2.375,
      familyId: 'FAMILY_CHARMANDER',
      candyToEvolve: 100,
      kmBuddyDistance: 1.5,
      modelHeight: 1.03,
      evolutionBranch: [
        {
          evolution: 'CHARIZARD',
          candyCost: 100,
          form: 'CHARIZARD_NORMAL',
        },
      ],
      modelScaleV2: 1.07,
      buddyOffsetMale: [8.8, 0.0, 0.3],
      buddyOffsetFemale: [8.8, 0.0, 0.3],
      buddyScale: 19.0,
      thirdMove: {
        stardustToUnlock: 10000,
        candyToUnlock: 25,
      },
      isTransferable: true,
      isDeployable: true,
      buddyGroupNumber: 2,
      eliteQuickMove: ['SCRATCH_FAST'],
    },
  },
  {
    templateId: 'V0006_POKEMON_CHARIZARD',
    pokemon: {
      uniqueId: 'CHARIZARD',
      modelScale: 0.81,
      type1: 'POKEMON_TYPE_FIRE',
      type2: 'POKEMON_TYPE_FLYING',
      camera: {
        diskRadiusM: 1.215,
        cylinderRadiusM: 1.25,
        cylinderHeightM: 1.5,
        cylinderGroundM: 0.5,
        shoulderModeScale: 0.5,
      },
      encounter: {
        baseCaptureRate: 0.05,
        baseFleeRate: 0.05,
        collisionRadiusM: 0.405,
        collisionHeightM: 1.0125,
        collisionHeadRadiusM: 0.2025,
        movementType: 'MOVEMENT_FLYING',
        movementTimerS: 11.0,
        jumpTimeS: 1.0,
        attackTimerS: 4.0,
        bonusCandyCaptureReward: 7,
        bonusStardustCaptureReward: 400,
        attackProbability: 0.2,
        dodgeProbability: 0.15,
        dodgeDurationS: 0.7,
        dodgeDistance: 1.0,
        cameraDistance: 5.0,
        minPokemonActionFrequencyS: 0.2,
        maxPokemonActionFrequencyS: 1.6,
      },
      stats: {
        baseStamina: 186,
        baseAttack: 223,
        baseDefense: 173,
      },
      quickMoves: ['FIRE_SPIN_FAST', 'AIR_SLASH_FAST'],
      cinematicMoves: ['FIRE_BLAST', 'DRAGON_CLAW', 'OVERHEAT'],
      animTime: [2.2, 0.6667, 1.6667, 0.8667, 6.666667, 2.0, 1.6, 2.0],
      evolutionPips: 1,
      pokedexHeightM: 1.7,
      pokedexWeightKg: 90.5,
      parentId: 'CHARMELEON',
      heightStdDev: 0.2125,
      weightStdDev: 11.3125,
      familyId: 'FAMILY_CHARMANDER',
      kmBuddyDistance: 1.5,
      buddySize: 'BUDDY_BIG',
      modelHeight: 1.91,
      modelScaleV2: 1.1,
      buddyOffsetMale: [1.9, -11.4, 36.04],
      buddyOffsetFemale: [1.9, -11.4, 36.04],
      buddyScale: 19.0,
      thirdMove: {
        stardustToUnlock: 10000,
        candyToUnlock: 25,
      },
      isTransferable: true,
      isDeployable: true,
      buddyGroupNumber: 3,
      eliteQuickMove: ['EMBER_FAST', 'WING_ATTACK_FAST'],
      eliteCinematicMove: ['BLAST_BURN', 'FLAMETHROWER'],
    },
  },
];

const userData = [
  {
    id: 1,
    email: 'email@email.com',
    password: '123',
    trainer: {
      name: 'drumm2k',
      level: 40,
    },
    location: {
      city: 'Saint-Petersburg',
      country: 'Russia',
      pin: [59.93863, 30.31413],
    },
  },
];

const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    desc: String!
    start: String!
    end: String!
    img: String!
  }

  type Query {
    getEvents: [Event]!
    getPokemons: [Template]!
    getUsers: [User]!
  }

  type Template {
    templateId: ID!
    pokemon: Pokemon!
  }

  type Pokemon {
    uniqueId: String
    type1: String
    type2: String
    stats: Stats!
  }

  type Stats {
    baseStamina: Int
    baseAttack: Int
    baseDefense: Int
  }

  type User {
    id: ID!
    email: String!
    password: String!
    trainer: Trainer!
    location: Location!
  }

  type Trainer {
    name: String!
    level: Int!
  }

  type Location {
    city: String
    country: String
    pin: Pin
  }

  scalar Pin
`;

const resolvers = {
  Query: {
    getEvents(parent, args, context, info) {
      return eventsData;
    },
    getPokemons(parent, args, context, info) {
      return pokemonData;
    },
    getUsers(parent, args, context, info) {
      return userData;
    },
  },
};

let masterData;

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
