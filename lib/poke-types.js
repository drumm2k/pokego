const ALL_TYPES = {
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
};

export default function pokeTypes(type) {
  if (type === '') return null;
  return ALL_TYPES[type];
}
