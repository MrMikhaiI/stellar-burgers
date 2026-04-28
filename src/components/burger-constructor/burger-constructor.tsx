import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBun, getSelectedIngredients } from '../../services/constructor-slice';
import { getOrderModalData, getOrderRequest, clearOrderModal } from '../../services/order-slice';
import { sendOrder } from '../../services/order-slice';
import { getIsAuthorized } from '../../services/user-slice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(getBun);
  const ingredients = useSelector(getSelectedIngredients);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuthorized = useSelector(getIsAuthorized);

  const constructorItems = { bun, ingredients };

  const onOrderClick = () => {
    if (!isAuthorized) {
      navigate(PATHS.LOGIN);
      return;
    }
    if (!bun || orderRequest) return;
    const ingredientIds = [
      bun._id,
      ...ingredients.map((i: TConstructorIngredient) => i._id),
      bun._id
    ];
    dispatch(sendOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
