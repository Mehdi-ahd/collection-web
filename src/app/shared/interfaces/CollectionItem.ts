export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary';

export interface CollectionItem {
  id: number,
  collection_id: number,
  name: string,
  description: string,
  image: string,
  rarity: Rarity,
  price: number
}
