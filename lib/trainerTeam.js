export default function trainerTeam(team) {
  return `/images/team/${team}.png`;
}

const TRAINER_COLOR = {
  valor: '#d62828',
  mystic: '#0b608c',
  instinct: '#deae4b',
};

export function trainerColor(team) {
  if (team === '') return null;
  return TRAINER_COLOR[team];
}
