export function pokeImg(name, pokedex) {
  if (name.includes('ALOLA')) {
    return `/img/pokemon/${pokedex}a.png`;
  }
  if (name.includes('GALAR')) {
    return `/img/pokemon/${pokedex}g.png`;
  }
  return `/img/pokemon/${pokedex}.png`;
}

export function pokeImgShiny(name, pokedex) {
  if (name.includes('ALOLA')) {
    return `/img/pokemon/shiny/${pokedex}a.png`;
  }
  if (name.includes('GALAR')) {
    return `/img/pokemon/shiny/${pokedex}g.png`;
  }
  return `/img/pokemon/shiny/${pokedex}.png`;
}
