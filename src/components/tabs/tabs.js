import { useSelector, useDispatch } from 'react-redux';
import { SET_TAB_ACTIVE } from '../../services/actions';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import tabsStyle from './tabs.module.css';

function Tabs() {
  const dispatch = useDispatch(); 
  const { tab } = useSelector(store => store.tab);

  const setActiveTab = type => {
    dispatch({ type: SET_TAB_ACTIVE, tab: type });
  }

  return(
    <ul className={tabsStyle.tabs}>
      <li>
        <Tab active={tab === 'bun'} onClick={() => setActiveTab('bun')}>Булки</Tab>
      </li>
      <li>
        <Tab active={tab === 'main'} onClick={() => setActiveTab('main')}>Начинки</Tab>
      </li>
      <li>
        <Tab active={tab === 'sauce'} onClick={() => setActiveTab('sauce')}>Соусы</Tab>
      </li>
    </ul>
  );
}

export default Tabs;