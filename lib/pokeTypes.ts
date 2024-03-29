type PokeAllType = {
  [key: string]: string;
};

const ALL_TYPE_NAME = {
  POKEMON_TYPE_NORMAL: 'Normal',
  POKEMON_TYPE_FIGHTING: 'Fighting',
  POKEMON_TYPE_FLYING: 'Flying',
  POKEMON_TYPE_POISON: 'Poison',
  POKEMON_TYPE_GROUND: 'Ground',
  POKEMON_TYPE_ROCK: 'Rock',
  POKEMON_TYPE_BUG: 'Bug',
  POKEMON_TYPE_GHOST: 'Ghost',
  POKEMON_TYPE_STEEL: 'Steel',
  POKEMON_TYPE_FIRE: 'Fire',
  POKEMON_TYPE_WATER: 'Water',
  POKEMON_TYPE_GRASS: 'Grass',
  POKEMON_TYPE_ELECTRIC: 'Electric',
  POKEMON_TYPE_PSYCHIC: 'Psychic',
  POKEMON_TYPE_ICE: 'Ice',
  POKEMON_TYPE_DRAGON: 'Dragon',
  POKEMON_TYPE_DARK: 'Dark',
  POKEMON_TYPE_FAIRY: 'Fairy',
} as PokeAllType;

const ALL_TYPE_COLOR = {
  POKEMON_TYPE_NORMAL: '117, 117, 117',
  POKEMON_TYPE_FIGHTING: '148, 16, 16',
  POKEMON_TYPE_FLYING: '6, 153, 194',
  POKEMON_TYPE_POISON: '76, 6, 102',
  POKEMON_TYPE_GROUND: '158, 103, 0',
  POKEMON_TYPE_ROCK: '115, 93, 29',
  POKEMON_TYPE_BUG: '93, 117, 36',
  POKEMON_TYPE_GHOST: '47, 16, 105',
  POKEMON_TYPE_STEEL: '94, 109, 117',
  POKEMON_TYPE_FIRE: '156, 49, 19',
  POKEMON_TYPE_WATER: '22, 108, 184',
  POKEMON_TYPE_GRASS: '21, 138, 63',
  POKEMON_TYPE_ELECTRIC: '186, 154, 19',
  POKEMON_TYPE_PSYCHIC: '150, 29, 75',
  POKEMON_TYPE_ICE: '23, 156, 151',
  POKEMON_TYPE_DRAGON: '81, 13, 133',
  POKEMON_TYPE_DARK: '53, 52, 54',
  POKEMON_TYPE_FAIRY: '145, 25, 133',
} as PokeAllType;

export function pokeTypeName(type: string) {
  if (type === '') return;
  return ALL_TYPE_NAME[type];
}

export function pokeTypeColor(type: string | undefined) {
  if (!type) return;
  const alpha = 0.7;

  return `rgba(${ALL_TYPE_COLOR[type]}, ${alpha})`;
}
