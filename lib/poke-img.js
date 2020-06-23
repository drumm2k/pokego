export default function pokeImg(name, pokedex) {
  if (name.includes('ALOLA')) {
    return `url(/img/pokemon/${pokedex}a.png)`;
  }
  if (name.includes('GALAR')) {
    return `url(/img/pokemon/${pokedex}g.png)`;
  }
  return `url(/img/pokemon/${pokedex}.png)`;
}
