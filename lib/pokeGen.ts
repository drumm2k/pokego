type PokeGenType = {
  [key: string]: string;
};

const POKEMON_GEN = {
  GEN_1: 'G1',
  GEN_2: 'G2',
  GEN_3: 'G3',
  GEN_4: 'G4',
  GEN_5: 'G5',
  GEN_6: 'G6',
  GEN_7: 'G7',
  GEN_8: 'G8',
} as PokeGenType;

const POKEMON_GEN_FULL = {
  GEN_1: '1 (Kanto)',
  GEN_2: '2 (Johto)',
  GEN_3: '3 (Hoenn)',
  GEN_4: '4 (Sinnoh)',
  GEN_5: '5 (Unova)',
  GEN_6: '6 (Kalos)',
  GEN_7: '7 (Alola)',
  GEN_8: '8 (Galar)',
} as PokeGenType;

export function pokeGen(gen: string) {
  return POKEMON_GEN[gen];
}

export function pokeGenFull(gen: string) {
  return POKEMON_GEN_FULL[gen];
}
