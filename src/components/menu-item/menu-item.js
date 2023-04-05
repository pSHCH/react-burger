import React from 'react';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import menuItemStyles from './menu-item.module.css';

class MenuItem extends React.Component {
  render() {
    const TagName = this.props.icon === 'list' ? ListIcon : this.props.icon === 'profile' ? ProfileIcon : BurgerIcon;

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

export default MenuItem;
