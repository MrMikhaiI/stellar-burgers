import orderReducer, { clearOrderModal, sendOrder } from './order-slice';
import { TOrder } from '../utils/types';

const mockOrder: TOrder = {
  _id: 'order-1',
  number: 12345,
  name: 'Тестовый бургер',
  status: 'done',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ingredients: ['bun-1', 'ing-1', 'bun-1']
};

describe('orderSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  describe('sendOrder', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const action = { type: sendOrder.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные заказа и сбрасывать orderRequest при fulfilled', () => {
      const action = {
        type: sendOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('должен записывать ошибку и сбрасывать orderRequest при rejected', () => {
      const action = {
        type: sendOrder.rejected.type,
        payload: 'Ошибка оформления заказа'
      };
      const state = orderReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Ошибка оформления заказа');
      expect(state.orderModalData).toBeNull();
    });
  });

  describe('clearOrderModal', () => {
    it('должен очищать данные модального окна заказа', () => {
      const filledState = {
        orderRequest: false,
        orderModalData: mockOrder,
        error: 'какая-то ошибка'
      };
      const state = orderReducer(filledState, clearOrderModal());
      expect(state.orderModalData).toBeNull();
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBe(false);
    });
  });
});
