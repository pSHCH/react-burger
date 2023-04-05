import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import tabsStyle from './tabs.module.css';

class Tabs extends React.Component {
  render() {
    return(
      <ul className={tabsStyle.tabs}>
        <li>
          <Tab active>Булки</Tab>
        </li>
        <li>
          <Tab>Соусы</Tab>
        </li>
        <li>
          <Tab>Начинки</Tab>
        </li>
      </ul>
    );
  }
}

export default Tabs;