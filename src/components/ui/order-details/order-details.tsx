import { FC } from 'react';
import { TOrderDetailsUIProps } from './type';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@zlden/react-developer-burger-ui-components';

export const OrderDetailsUI: FC<TOrderDetailsUIProps> = ({ orderNumber }) => (
  <div className={styles.wrap}>
    <p
      className={`text text_type_digits-large ${styles.number}`}
      data-cy='order-number'
    >
      {orderNumber}
    </p>
    <p className='text text_type_main-medium mt-8 mb-15'>идентификатор заказа</p>
    <CheckMarkIcon type='primary' />
    <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
    <p className='text text_type_main-default text_color_inactive'>
      Дождитесь готовности на орбитальной станции
    </p>
  </div>
);
