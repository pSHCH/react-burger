import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ReduxState } from '../../utils/ReduxState';
import feed from './feed-item.module.css';
import { IFeed } from '../../utils/feed';
import { getItemsById } from '../../utils/getItemsById'
import { formatDate } from '../../utils/formatDate';

interface IFeedItem { 
  item: IFeed;
  url: string;
};

export const FeedItem = ({item, url}: IFeedItem) => {

  let location = useLocation();
  const { ingredients } = useSelector((store: ReduxState) => store.ingredients);
  const ids = item.ingredients;
  const items = getItemsById(ingredients, ids);
  const price = items.reduce((item, a) => item + a.price, 0);
  const images = items.slice(0, 6);

  return (
    <li className={feed.wrap}>
      <Link
        to={`/${url}/${item._id}`}
        className={feed.link}
        state={{ backgroundLocation: location }}
        replace
      >
        <span className={feed.srOnly}>{item.name}</span>
      </Link>
      <div className={feed.info}>
        <span className={feed.number}>#{item.number}</span>
        <span className={feed.date}>{formatDate(item.createdAt)}</span>          
      </div>
      <h3 className={feed.title}>{item.name}</h3>
      <p className={feed.state}>{item.status === 'created' ? 'Создан' : item.status === 'pending' ? 'Готовится' : 'Выполнен'}</p> 
      <div className={feed.details}>
        <ul className={feed.list}>
          {images.map((item, i) => 
            <li className={feed.item} key={i}>
              <img 
                src={item.image_mobile} 
                alt={item.name} 
                className={feed.image}
              />
              {(items.length > 6 && i === 5 )&& <span className={feed.num}>+{items.length - 5}</span>}
            </li>
          )}
        </ul>

        <div className={feed.price}>
          <span className={feed.count}>{price}</span>
          <CurrencyIcon type='primary' />
        </div>

      </div>

    </li>
  )
};