import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import menuItemStyles from './menu-item.module.css';

class MenuItem extends React.Component {
  render() {
    const isIconList = this.props.icon === 'list' ;
    const isIconProfile = this.props.icon === 'profile';
    const TagName = isIconList ? ListIcon : isIconProfile ? ProfileIcon : BurgerIcon;

    return (
      <a 
        href={this.props.link}
        className={cn(
          menuItemStyles.item, {
            [menuItemStyles['item--state-active']]: this.props.active
          })}>
          <TagName type={this.props.active ? 'primary' : 'secondary'}/>
          <span className={menuItemStyles.text}>{this.props.title}</span>
      </a>
    );
  }
} 

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string,
  active: PropTypes.bool,
};

export default MenuItem;
