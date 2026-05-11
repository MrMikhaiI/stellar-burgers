import { rootReducer } from './store';
import constructorReducer from './constructor-slice';
import ingredientsReducer from './ingredients-slice';
import orderReducer from './order-slice';
import orderByNumberReducer from './order-by-number-slice';
import orderHistoryReducer from './order-history-slice';
import userReducer from './user-slice';
import userOrdersReducer from './user-orders-slice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, unknownAction),
      burgerConstructor: constructorReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      orderByNumber: orderByNumberReducer(undefined, unknownAction),
      orderHistory: orderHistoryReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      userOrders: userOrdersReducer(undefined, unknownAction)
    });
  });
});
