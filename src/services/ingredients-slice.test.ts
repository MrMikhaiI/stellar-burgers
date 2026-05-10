import ingredientsReducer, { fetchIngredients } from './ingredients-slice';
import { TIngredient } from '../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Булка флюоресцентная',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react-developer-burger-ui-components/bun.png',
    image_mobile: 'https://code.s3.yandex.net/react-developer-burger-ui-components/bun-mobile.png',
    image_large: 'https://code.s3.yandex.net/react-developer-burger-ui-components/bun-large.png'
  }
];

describe('ingredientsSlice', () => {
  const initialState = { ingredients: [], isLoading: false, error: null };

  it('должен устанавливать isLoading в true при вызове pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать ингредиенты и сбрасывать isLoading при fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен записывать ошибку и сбрасывать isLoading при rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
