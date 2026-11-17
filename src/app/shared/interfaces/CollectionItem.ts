export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary';

/** Valeurs autorisées côté backend (enum CollectionRarity) */
export const RARITIES: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Legendary'];

export interface CollectionItem {
  id: number,
  collection_id: number,
  name: string,
  description: string,
  image: string,
  rarity: Rarity,
  price: number
}

/** Contrat d'envoi (create / update) : sans les champs générés par le backend */
export type CollectionItemPayload = Omit<CollectionItem, 'id' | 'collection_id'>;
