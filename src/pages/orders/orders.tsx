
import Template from '../../components/template/template';
import { useState, useEffect } from 'react';
import {WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_CLOSED } from '../../services/actions';
import { useSelector, useDispatch } from '../../index';
import { logout } from '../../services/actions';
import { getCookie } from '../../utils/cookie';
import { NavLink } from 'react-router-dom';
import { FeedList } from '../../components/feeds-list/feeds-list';
import Modal from '../../components/modal/modal';
import { FeedInfo } from '../../components/feed-info/feed-info';
import ordersStyle from './orders.module.css';

interface IOrdersPage{
  id?: string;
};

export const OrdersPage = ({ id }: IOrdersPage) => {
  const dispatch = useDispatch(); 
  const refreshToken = getCookie('refreshToken');
  const data = {
    'token': refreshToken || ''
  }
  const handleLogout = () => {
    dispatch(logout(data));
  }

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const { orders, wsConnected, error } = useSelector(store => store.personalFeeds);

  useEffect(() => {
    if (!!id) {
      openModal('feed')
    }
  }, [id]);

  useEffect(() => {
    dispatch({ type: WS_ORDERS_CONNECTION_START })
    return () => {dispatch({ type: WS_ORDERS_CONNECTION_CLOSED })}
  }, []);


  const openModal = (type: string) => {
    setIsOpen(true);
    setModalType(type);
  }

  const onClose = (modalType: string) => {
    setIsOpen(false);

    if(modalType === 'feed') {
      window.history.replaceState(null, '', `/profile/orders`)
    }
  }

  const content = () => {
    if (!wsConnected && !error) {
      return <p className={ordersStyle.note}>Загрузка...</p>
    }
  
    if (!wsConnected && error) {
      return <p className={ordersStyle.note}>Ошибка</p>
    }

    if (orders.length === 0) {
      return <p className={ordersStyle.note}>Заказов пока нет</p>
    }

    return <FeedList orders={orders} url='profile/orders' openModal={openModal}/>
  }

  return (
    <Template>
      <>
        <main className={ordersStyle.grid}>
          <div className={ordersStyle.col}>
            <ul className={ordersStyle.list}>
              <li className={ordersStyle.item}>
                <NavLink to='/profile' className={({ isActive }) => ordersStyle.link + ' ' + (isActive ? ordersStyle.active : '')}>Профиль</NavLink>
              </li>
              <li className={ordersStyle.item}>
                <NavLink to='/profile/orders' className={({ isActive }) => ordersStyle.link + ' ' + (isActive ? ordersStyle.active : '')}>История заказов</NavLink>
              </li>
              <li className={ordersStyle.item}>
                <NavLink to='/' className={({ isActive }) => ordersStyle.link + ' ' + (isActive ? ordersStyle.active : '')} onClick={handleLogout}>Выход</NavLink>
              </li>
            </ul>
            <p className={ordersStyle.info}>В этом разделе вы можете изменить свои персональные данные</p>
          </div>

          <div className={ordersStyle.col}>
            { content() }
          </div>
        </main>
        {isOpen && <Modal 
          onClose={() => onClose(modalType)}
        >
          <FeedInfo />
        </Modal>}
      </>
    </Template>
  );
}
