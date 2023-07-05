import React from 'react';
import type { ReduxState } from '../../utils/ReduxState';
import { useSelector, useDispatch } from 'react-redux';
import { SET_TAB_ACTIVE } from '../../services/actions';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import tabsStyle from './tabs.module.css';

const Tabs: React.FC = () => {
  const dispatch = useDispatch(); 
  const { tab } = useSelector((store: ReduxState) => store.tab);

  const setActiveTab = (type: string) => {
    dispatch({ type: SET_TAB_ACTIVE, tab: type });
  }

  return(
    <ul className={tabsStyle.tabs}>
      <li>
        <Tab active={tab === 'bun'} onClick={() => setActiveTab('bun')} value='Булки'>Булки</Tab>
      </li>
      <li>
        <Tab active={tab === 'main'} onClick={() => setActiveTab('main')} value='Начинки'>Начинки</Tab>
      </li>
      <li>
        <Tab active={tab === 'sauce'} onClick={() => setActiveTab('sauce')} value='Соусы'>Соусы</Tab>
      </li>
    </ul>
  );
}

export default Tabs;