import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from '../../index';
import feed from './feed-item.module.css';
import { IFeed } from '../../utils/feed';
import { getItemsById } from '../../utils/getItemsById'
import { formatDate } from '../../utils/formatDate';

interface IFeedItem { 
  item: IFeed;
  url: string;
  openModal: (type: string) => void,
};

export const FeedItem = ({item, url, openModal}: IFeedItem) => {

  const location = useLocation();
  const { ingredients } = useSelector(store => store.ingredients);
  const ids = item.ingredients;
  const items = getItemsById(ingredients, ids);
  const price = items.reduce((item, a) => item + a.price, 0);
  const images = items.slice(0, 6);

  const setModalData = () => {

    // dispatch({ type: INGREDIENTS_MODAL_OPEN, ingredient: item })
    openModal('feed');
  }

  return (
    <li className={feed.wrap} onClick={() => setModalData()}>
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