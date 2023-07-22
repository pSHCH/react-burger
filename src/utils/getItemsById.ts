import { IIngredient } from './ingredient';

export const getItemsById = (ingredients: IIngredient[], ids: string[]) => {
  let item;
  let resalt = [];

  for (let id of ids) {
    item = ingredients.find((i) => i._id === id)
    if (item) {
      resalt.push(item);
    }
  }
  return resalt
}