export default function pokeCheckName(name: string) {
  if (name.includes('_') && name.includes('MIME')) {
    return name.replace(/_/g, ' ');
  }

  if (name.includes('_') && (name.includes('_OH') || name.includes('PORYGON'))) {
    return name.replace(/_/g, '-');
  }

  if (name.includes('_') && name.includes('NIDORAN')) {
    return name.split('_')[0];
  }

  if (name.includes('ALOLA')) {
    return name.split('_')[0].replace(/^/, 'ALOLAN ');
  }

  if (name.includes('GALARIAN')) {
    return name.split('_')[0].replace(/^/, 'GALARIAN ');
  }

  return name;
}
