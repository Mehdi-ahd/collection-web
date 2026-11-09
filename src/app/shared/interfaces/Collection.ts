import { CollectionItem } from "./CollectionItem";

export interface Collection {
  id: number,
  user_id: number,
  title: string,
  items: CollectionItem[],
}
