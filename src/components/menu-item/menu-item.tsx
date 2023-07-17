import React from 'react';
import { NavLink } from 'react-router-dom';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import menuItemStyles from './menu-item.module.css';

interface IHomePageProps {
  title: string;
  link: string;
  icon?: string;
}

const MenuItem: React.FC<IHomePageProps> = ({title, link, icon}) => {

  const isIconList = icon === 'list' ;
  const isIconProfile = icon === 'profile';
  const TagName = isIconList ? ListIcon : isIconProfile ? ProfileIcon : BurgerIcon;

  return (
    <NavLink 
      to={link}
      className={({ isActive }) => menuItemStyles.item + ' ' + (isActive ? menuItemStyles.active : '')}
    >
      {({ isActive }) => (
        <>
          <TagName type={isActive ? 'primary' : 'secondary'}/>
          <span className={menuItemStyles.text}>{title}</span>
          </>
      )}
    </NavLink>
  );
}

export default MenuItem;
