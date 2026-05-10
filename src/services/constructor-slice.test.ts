import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructor-slice';
import { TIngredient } from '../utils/types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Булка флюоресцентная',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/bun.png',
  image_mobile:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/bun-mobile.png',
  image_large:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/bun-large.png'
};

const mockIngredient: TIngredient = {
  _id: 'ing-1',
  name: 'Мясо бессмертных моллюсков',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/main.png',
  image_mobile:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/main-mobile.png',
  image_large:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/main-large.png'
};

const mockIngredient2: TIngredient = {
  _id: 'ing-2',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/sauce.png',
  image_mobile:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/sauce-mobile.png',
  image_large:
    'https://code.s3.yandex.net/react-developer-burger-ui-components/sauce-large.png'
};

describe('constructorSlice', () => {
  const initialState = { bun: null, ingredients: [] };

  describe('addIngredient', () => {
    it('должен добавлять булку в конструктор', () => {
      const state = constructorReducer(initialState, addIngredient(mockBun));
      expect(state.bun).not.toBeNull();
      expect(state.bun?._id).toBe('bun-1');
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен добавлять начинку в конструктор', () => {
      const state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('ing-1');
      expect(state.ingredients[0]).toHaveProperty('id');
    });

    it('должен добавлять несколько начинок в конструктор', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));
      expect(state.ingredients).toHaveLength(2);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент по id', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      const addedId = state.ingredients[0].id;
      state = constructorReducer(state, removeIngredient(addedId));
      expect(state.ingredients).toHaveLength(0);
    });

    it('не должен удалять другие ингредиенты при удалении одного', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));
      const firstId = state.ingredients[0].id;
      state = constructorReducer(state, removeIngredient(firstId));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('ing-2');
    });
  });

  describe('moveIngredient', () => {
    it('должен перемещать ингредиент вверх', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));
      const secondId = state.ingredients[1].id;
      state = constructorReducer(
        state,
        moveIngredient({ index: 1, direction: 'up' })
      );
      expect(state.ingredients[0].id).toBe(secondId);
    });

    it('должен перемещать ингредиент вниз', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));
      const firstId = state.ingredients[0].id;
      state = constructorReducer(
        state,
        moveIngredient({ index: 0, direction: 'down' })
      );
      expect(state.ingredients[1].id).toBe(firstId);
    });

    it('не должен перемещать первый ингредиент вверх', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(mockIngredient2));
      const originalOrder = state.ingredients.map((i) => i.id);
      state = constructorReducer(
        state,
        moveIngredient({ index: 0, direction: 'up' })
      );
      expect(state.ingredients.map((i) => i.id)).toEqual(originalOrder);
    });
  });
});
