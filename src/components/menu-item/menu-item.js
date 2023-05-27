import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import menuItemStyles from './menu-item.module.css';

function MenuItem(props) {

  const isIconList = props.icon === 'list' ;
  const isIconProfile = props.icon === 'profile';
  const TagName = isIconList ? ListIcon : isIconProfile ? ProfileIcon : BurgerIcon;

  return (
    <NavLink 
      to={props.link}
      className={({ isActive }) => menuItemStyles.item + ' ' + (isActive ? menuItemStyles.active : '')}
    >
      {({ isActive }) => (
        <>
          <TagName type={isActive ? 'primary' : 'secondary'}/>
          <span className={menuItemStyles.text}>{props.title}</span>
          </>
      )}
    </NavLink>
  );
}


MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default MenuItem;
