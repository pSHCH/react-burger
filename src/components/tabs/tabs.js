import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import tabsStyle from './tabs.module.css';

function Tabs() {

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

export default Tabs;