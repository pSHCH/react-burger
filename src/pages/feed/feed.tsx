
import Template from '../../components/template/template';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions';
import type { ReduxState } from '../../utils/ReduxState';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FeedInfo } from '../../components/feed-info/feed-info';

import feed from './feed.module.css';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { wsConnected, error } = useSelector((store: ReduxState) => store.feeds);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })
    return () => {dispatch({ type: WS_CONNECTION_CLOSED })}
  }, [])

  if (!wsConnected && !error) {
    return <p className={feed.note}>Загрузка...</p>
  }

  if (!wsConnected && error) {
    return <p className={feed.note}>Ошибка</p>
  }

  return (
    <Template>
      <>
        <main className={feed.grid}>
          <FeedInfo />
        </main>
      </>
    </Template>
  );
}
