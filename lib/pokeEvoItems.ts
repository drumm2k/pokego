type PokeEvoItemsType = {
  [key: string]: string;
};

const POKEMON_EVOLUTION_ITEMS = {
  ITEM_SUN_STONE: 'Sun Stone',
  ITEM_KINGS_ROCK: `King's Rock`,
  ITEM_METAL_COAT: 'Metal Coat',
  ITEM_DRAGON_SCALE: 'Dragon Scale',
  ITEM_UP_GRADE: 'Upgrade',
  ITEM_GEN4_EVOLUTION_STONE: 'Sinnoh Stone',
  ITEM_GEN5_EVOLUTION_STONE: 'Unova Stone',
  ITEM_TROY_DISK_MAGNETIC: 'Magnetic Lure',
  ITEM_TROY_DISK_GLACIAL: 'Glacial Lure',
  ITEM_TROY_DISK_MOSSY: 'Mossy Lure',
} as PokeEvoItemsType;

const POKEMON_EVOLUTION_ITEM_IMAGES = {
  ITEM_SUN_STONE: '/images/items/sun_stone.png',
  ITEM_KINGS_ROCK: '/images/items/kings_rock.png',
  ITEM_METAL_COAT: '/images/items/metal_coat.png',
  ITEM_DRAGON_SCALE: '/images/items/dragon_scale.png',
  ITEM_UP_GRADE: '/images/items/upgrade.png',
  ITEM_GEN4_EVOLUTION_STONE: '/images/items/sinnoh_stone.png',
  ITEM_GEN5_EVOLUTION_STONE: '/images/items/unova_stone.png',
  ITEM_TROY_DISK_MAGNETIC: '/images/items/lure_module_magnetic.png',
  ITEM_TROY_DISK_GLACIAL: '/images/items/lure_module_glacial.png',
  ITEM_TROY_DISK_MOSSY: '/images/items/lure_module_mossy.png',
} as PokeEvoItemsType;

export function pokeEvoItems(item: string) {
  return POKEMON_EVOLUTION_ITEMS[item];
}

export function pokeEvoItemImages(item: string) {
  return POKEMON_EVOLUTION_ITEM_IMAGES[item];
}
