import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  getUserOrdersData
} from '../../services/user-orders-slice';
import { useNavigate } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders: TOrder[] = useSelector(getUserOrdersData);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const handleOrderClick = (order: TOrder) => {
    navigate(`/profile/orders/${order.number}`, {
      state: { background: location }
    });
  };

  return <ProfileOrdersUI orders={orders} handleOrderClick={handleOrderClick} />;
};
