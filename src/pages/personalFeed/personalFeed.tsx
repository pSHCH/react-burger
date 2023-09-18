
import Template from '../../components/template/template';
import {WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_CLOSED } from '../../services/actions';
import { useSelector, useDispatch } from '../../index';
import { useEffect } from 'react';
import { FeedInfo } from '../../components/feed-info/feed-info';

import feed from './feed.module.css';

export const PersonalFeedPage = () => {
  const dispatch = useDispatch();
  const { wsConnected, error } = useSelector(store => store.personalFeeds);

  useEffect(() => {
    dispatch({ type: WS_ORDERS_CONNECTION_START })
    return () => {dispatch({ type: WS_ORDERS_CONNECTION_CLOSED })}
  }, [])

  if (!wsConnected && !error) {
    return <p className={feed.note}>Загрузка...</p>
  }

  if (!wsConnected && error) {
    return <p className={feed.note}>Ошибка</p>
  }

  return (
    <Template>
      <main className={feed.grid}>
        <FeedInfo />
      </main>
    </Template>
  );
}
