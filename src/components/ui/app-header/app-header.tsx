import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.link_active : ''}`
          }
          to={PATHS.HOME}
        >
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.link_active : ''}`
          }
          to={PATHS.FEED}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <NavLink className={styles.logo} to={PATHS.HOME}>
        <Logo className='' />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.link} ${styles.link_position_last} ${isActive ? styles.link_active : ''}`
        }
        to={PATHS.PROFILE}
      >
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </NavLink>
    </nav>
  </header>
);
