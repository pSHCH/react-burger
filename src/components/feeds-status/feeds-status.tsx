import feed from './feeds-status.module.css';
import cn from 'classnames';
import { IFeed } from '../../utils/feed';

interface IFeedStatus {
  orders: IFeed[];
  totalToday: string, 
  total: string
};

export const FeedStatus = ({orders, totalToday, total}: IFeedStatus ) => {
  const done = orders.filter((item) => item.status === 'done').slice(0, 10);
  const pending = orders.filter((item) => item.status === 'pending').slice(0, 10);
  
  return (
    <div>
      <ul className={feed.table}>
        <li className={feed.col}>
          <h4 className={feed.status}>Готовы:</h4>
          <ul className={cn(feed.orders, feed.done)}>
            {done.map(item => <li className={feed.order} key={item.number}>#{item.number}</li>)}
          </ul>
        </li>
        <li className={feed.col}>
          <h4 className={feed.status}>В работе:</h4>
          <ul className={feed.orders}>
            {pending.map(item => <li className={feed.order} key={item.number}>#{item.number}</li>)}
          </ul>
        </li>
      </ul>

      <h2 className={feed.title}>Выполнено за все время:</h2>
      <p className={feed.count}>{total}</p>

      <h2 className={feed.title}>Выполнено за сегодня:</h2>
      <p className={feed.count}>{totalToday}</p>
    </div>
  )
};