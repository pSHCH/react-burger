
import Template from '../../components/template/template'
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions';
import type { ReduxState } from '../../utils/ReduxState';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FeedList } from '../../components/feeds-list/feeds-list';
import { FeedStatus } from '../../components/feeds-status/feeds-status'
import Modal from '../../components/modal/modal';
import { FeedInfo } from '../../components/feed-info/feed-info';

import feeds from './feeds.module.css';

interface IFeedsPage{
  id?: string;
};

export const FeedsPage = ({ id }: IFeedsPage) => {

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const { totalToday, total, orders, wsConnected, error } = useSelector((store: ReduxState) => store.feeds);

  useEffect(() => {
    if (!!id) {
      openModal('feed')
    }
  }, [id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })
    return () => {dispatch({ type: WS_CONNECTION_CLOSED })}
  }, []);

  const openModal = (type: string) => {
    setIsOpen(true);
    setModalType(type);
  }

  const onClose = (modalType: string) => {
    setIsOpen(false);

    if(modalType === 'feed') {
      window.history.replaceState(null, '', `/feed`)
    }
  }

  if (!wsConnected && !error) {
    return <p className={feeds.note}>Загрузка...</p>
  }

  if (!wsConnected && error) {
    return <p className={feeds.note}>Ошибка</p>
  }

  if (orders.length === 0) {
    return <p className={feeds.note}>Заказов пока нет</p>
  }
  
  return (
    <Template>
      <>
        <h1 className={feeds.title}>Лента заказов</h1>
        <main className={feeds.grid}>
          <FeedList orders={orders} url='feed'/>
          <FeedStatus totalToday={totalToday} total={total} orders={orders}/>
        </main>

        {isOpen && <Modal 
          onClose={() => onClose(modalType)}
        >
          <FeedInfo/>
        </Modal>}
      </>
    </Template>
  )
}