import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ReduxState } from '../../utils/ReduxState';
import { getItemsById } from '../../utils/getItemsById'
import { formatDate } from '../../utils/formatDate';
import feed from './feed-info.module.css';

export const FeedInfo = () => {
  let location = useLocation();
  const url = location.pathname.includes('feed') ? '/feed/' : '/profile/orders/';
  const { orders } = useSelector((store: ReduxState) => store.feeds);
  const { ingredients } = useSelector((store: ReduxState) => store.ingredients);

  const id = location.pathname.split(url).pop();
  const order = orders.find(item => item._id === id) || [];

  const ids = order.ingredients || [];
  const items = getItemsById(ingredients, ids);
  const price = items.reduce((item, a) => item + a.price, 0);

  let uniItems = [...new Set(items)];

  return (
    <div className={feed.wrap}>
      <p className={feed.feed}>#{order.number}</p>
      <h1 className={feed.title}>{order.name}</h1>
      <p className={feed.status}>{order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : 'Выполнен'}</p>
      <p className={feed.details}>Состав:</p>

      <ul className={cn(feed.list, 'custom-scroll')}>
        {uniItems.map((item, i) => <li className={feed.item} key={i}>
          <img className={feed.image} alt={item.name} src={item.image_mobile}/>
          <p className={feed.name}>{item.name} </p>

          <span className={feed.price}>
            <span className={feed.count}>{`${items.filter(el => el?._id === item._id).length} x ${item.price}`}</span>
            <CurrencyIcon type='primary' />
          </span>

        </li>)}
      </ul>

      <div className={feed.info}>
        <span className={feed.date}>{formatDate(order.createdAt)}</span>
        <span className={feed.price}>
          <span className={feed.count}>{price}</span>
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  );
}
