export function trainerTeam(team: string) {
  return `/images/team/${team}.png`;
}

type TrainerColorType = {
  [key: string]: string;
};

const TRAINER_COLOR = {
  valor: '#d62828',
  mystic: '#0b608c',
  instinct: '#deae4b',
} as TrainerColorType;

export function trainerColor(team: string) {
  if (team === '') return null;
  return TRAINER_COLOR[team];
}
