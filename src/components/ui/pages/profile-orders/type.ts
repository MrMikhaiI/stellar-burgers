import { TOrder } from '@utils-types';

export type ProfileOrdersUIProps = {
  orders: TOrder[];
  handleOrderClick: (order: TOrder) => void;
};
