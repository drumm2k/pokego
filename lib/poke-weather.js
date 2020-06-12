const ALL_TYPE_WEATHER = {
  POKEMON_TYPE_NORMAL: 'Party Cloudy',
  POKEMON_TYPE_FIGHTING: 'Cloudy',
  POKEMON_TYPE_FLYING: 'Windy',
  POKEMON_TYPE_POISON: 'Cloudy',
  POKEMON_TYPE_GROUND: ['Sunny', 'Clear'],
  POKEMON_TYPE_ROCK: 'Party Cloudy',
  POKEMON_TYPE_BUG: 'Rain',
  POKEMON_TYPE_GHOST: 'Fog',
  POKEMON_TYPE_STEEL: 'Snow',
  POKEMON_TYPE_FIRE: ['Sunny', 'Clear'],
  POKEMON_TYPE_WATER: 'Rain',
  POKEMON_TYPE_GRASS: ['Sunny', 'Clear'],
  POKEMON_TYPE_ELECTRIC: 'Rain',
  POKEMON_TYPE_PSYCHIC: 'Windy',
  POKEMON_TYPE_ICE: 'Snow',
  POKEMON_TYPE_DRAGON: 'Windy',
  POKEMON_TYPE_DARK: 'Fog',
  POKEMON_TYPE_FAIRY: 'Cloudy',
};

const ALL_TYPE_WEARTHER_IMG = {
  'Party Cloudy': '/img/weather/partly_cloudy.png',
  Cloudy: '/img/weather/cloudy.png',
  Fog: '/img/weather/fog.png',
  Rain: '/img/weather/rain.png',
  Snow: '/img/weather/snow.png',
  Sunny: '/img/weather/sunny.png',
  Clear: '/img/weather/clear.png',
  Windy: '/img/weather/windy.png',
};

export function pokeTypeWeather(type, type2) {
  if (type === '') return null;

  const first = ALL_TYPE_WEATHER[type];
  let second;
  if (type2) second = ALL_TYPE_WEATHER[type2];

  const res = [];

  // Push first type to response array
  if (Array.isArray(first)) {
    first.map((weather) => res.push(weather));
  } else res.push(first);

  // Push second type to response array (also check if first has the same weather)
  if (
    second &&
    Array.isArray(second) &&
    !res.find((weather) => weather === second)
  ) {
    second.map((weather) => res.push(weather));
  } else if (second && !res.find((weather) => weather === second)) res.push(second);

  return res;
}

export function pokeTypeWeatherImg(weather) {
  if (weather === '') return null;

  const res = [];

  if (Array.isArray(weather)) {
    weather.map((item) => res.push(ALL_TYPE_WEARTHER_IMG[item]));
  } else res.push(ALL_TYPE_WEARTHER_IMG[weather]);

  return res;
}
