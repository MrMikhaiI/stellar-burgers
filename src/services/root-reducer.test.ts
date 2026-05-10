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
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: null
      },
      user: {
        isAuthorized: false,
        data: null,
        isLoading: false,
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
