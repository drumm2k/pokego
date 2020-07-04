const POKEMON_GEN = {
  GEN_1: 'G1',
  GEN_2: 'G2',
  GEN_3: 'G3',
  GEN_4: 'G4',
  GEN_5: 'G5',
  GEN_6: 'G6',
  GEN_7: 'G7',
  GEN_8: 'G8',
};

export default function pokeGen(gen) {
  return POKEMON_GEN[gen];
}
