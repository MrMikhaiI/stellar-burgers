import { rootReducer } from './store';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      orderByNumber: {
        order: null,
        isLoading: false,
        error: null
      },
      orderHistory: {
        orders: [],
        total: null,
        totalToday: null,
        isLoading: false,
        error: null
      },
      user: {
        isAuthChecked: false,
        user: null,
        error: null
      },
      userOrders: {
        orders: [],
        isLoading: false,
        error: null
      }
    });
  });
});
