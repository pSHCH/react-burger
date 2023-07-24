import { useMemo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../index';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import type { IIngredient } from '../../utils/ingredient';
import { REMOVE_BUN_INGREDIENTS_CART, UPDATE_INGREDIENTS_CART, addToCart } from '../../services/actions';
import cn from 'classnames';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Total from '../total/total';
import { getCookie } from '../../utils/cookie';

import burgerConstructorStyle from './burger-constructor.module.css';

interface IBurgerConstructor {
  openModal: (type: string, id?: string) => void;
};

const BurgerConstructor: React.FC<IBurgerConstructor> = ({ openModal }: IBurgerConstructor) => {
  const dispatch = useDispatch(); 
  const ingredientsInCart = useSelector(store => store.cart.ingredientsInCart);
  const { ingredients } = useSelector(store => store.ingredients);
  const [cards, setCards] = useState<IIngredient[]>([]);

  useEffect(() => {
    if(getCookie('order') && ingredients.length > 0) {
      const order = JSON.parse(getCookie('order') || '');

      setCards(order)

    } else {
      setCards(ingredientsInCart) 
    }
    
  }, [ingredients.length]);

  const [, drop] = useDrop({
    accept: 'item',
    drop(item: IIngredient) {
      if(item.type === 'bun' && ingredientsInCart.find(elem => elem.type === 'bun')) {
        dispatch({ type: REMOVE_BUN_INGREDIENTS_CART });
      }
      if(item.type === 'bun' ) {
        dispatch(addToCart(item)); // подкладываем вторую булку
      }
      dispatch(addToCart(item));  
    },
  });

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, []);

  useEffect(() => {
    dispatch({ type: UPDATE_INGREDIENTS_CART, cards });
  }, [cards]);

  const wrapIngredient = useMemo(() => !!ingredientsInCart.length && ingredientsInCart.filter(item => item?.type === 'bun'), [ingredientsInCart]) || [];
  const innerIngredients = useMemo(() => !!ingredientsInCart.length && ingredientsInCart.filter(item => item?.type !== 'bun'), [ingredientsInCart]) || [];

  const total = !!ingredientsInCart.length ? ingredientsInCart.reduce(function(sum, item) {
    return sum + item?.price;
  }, 0) : 0;
  
  return (
    <section>
      <div className={burgerConstructorStyle.burger} ref={drop}>
        {!!ingredientsInCart.length 
          ? <>
              {!!wrapIngredient.length ? <BurgerIngredient top data={wrapIngredient[0]} index={-100} moveCard={moveCard}/> : <p className={burgerConstructorStyle.subnotification} >Добавьте булочку</p> }
              <div className={cn(burgerConstructorStyle.sectons, 'custom-scroll')}>
                {!!innerIngredients.length 
                  ? innerIngredients.map((item, i) => {

                    return <BurgerIngredient 
                      data={item} 
                      key={item.id} 
                      moveCard={moveCard}
                      index={i}
                    />}
                  )
                  : <p className={burgerConstructorStyle.subnotification} >Добавьте что-то ещё</p>
                }
              </div>
              {!!wrapIngredient.length && <BurgerIngredient bottom data={wrapIngredient[0]} index={-100} moveCard={moveCard}/>}
            </>
          : <p className={burgerConstructorStyle.notification} >Добавьте что-нибудь из меню</p> 
        }
      </div>
      {(!!wrapIngredient.length && !!innerIngredients.length) && <Total total={total || 0} openModal={openModal} ingredientsInCart={ingredientsInCart} />  }
    </section>
  );
}

export default BurgerConstructor;