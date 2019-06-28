import {Card} from "./Card";

export type Column = {
  title: string,
  cards: Card[],
  order: number,
  id?: string
}