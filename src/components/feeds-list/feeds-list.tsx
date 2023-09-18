import feed from './feeds-list.module.css';
import cn from 'classnames';
import { FeedItem } from '../feed-item/feed-item';
import { IFeed } from '../../utils/feed';

interface IFeedList{
  orders: IFeed[];
  url: string;
  openModal: (type: string) => void;
};

export const FeedList = ({orders, url, openModal}: IFeedList) => {
  
  return (
    <ul className={cn(feed.wrap, 'custom-scroll')}>
      {orders.map(item => <FeedItem item={item} key={item.number} url={url} openModal={openModal}/>)}
    </ul>
  )
};