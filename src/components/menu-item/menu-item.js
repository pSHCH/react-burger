import PropTypes from 'prop-types';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import menuItemStyles from './menu-item.module.css';

function MenuItem(props) {

  const isIconList = props.icon === 'list' ;
  const isIconProfile = props.icon === 'profile';
  const TagName = isIconList ? ListIcon : isIconProfile ? ProfileIcon : BurgerIcon;

  return (
    <a 
      href={props.link}
      className={cn(
        menuItemStyles.item, {
          [menuItemStyles['item--state-active']]: props.active
        })}>
        <TagName type={props.active ? 'primary' : 'secondary'}/>
        <span className={menuItemStyles.text}>{props.title}</span>
    </a>
  );
}


MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string,
  active: PropTypes.bool,
};

export default MenuItem;
