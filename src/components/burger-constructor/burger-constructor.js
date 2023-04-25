import PropTypes from 'prop-types';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENTS_CART, REMOVE_BUN_INGREDIENTS_CART, UPDATE_INGREDIENTS_CART } from '../../services/actions';
import cn from 'classnames';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Total from '../total/total'

import burgerConstructorStyle from './burger-constructor.module.css';

function BurgerConstructor(props) {
  const dispatch = useDispatch(); 
  const ingredientsInCart = useSelector(store => store.cart.ingredientsInCart);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(ingredientsInCart)
  }, [ingredientsInCart]);

  const [, drop] = useDrop({
    accept: 'item',
    drop(item) {
      if(item.type === 'bun' && ingredientsInCart.find(elem => elem.type === 'bun')) {
        dispatch({ type: REMOVE_BUN_INGREDIENTS_CART });
      }
      if(item.type === 'bun' ) {
        dispatch({ type: ADD_INGREDIENTS_CART, item }); // подкладываем вторую булку
      }
      dispatch({ type: ADD_INGREDIENTS_CART, item });
    },
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
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

  const wrapIngredient = useMemo(() => !!ingredientsInCart.length && ingredientsInCart.filter(item => item.type === 'bun'), [ingredientsInCart]);
  const innerIngredients = useMemo(() => !!ingredientsInCart.length && ingredientsInCart.filter(item => item.type !== 'bun'), [ingredientsInCart]);

  const total = !!ingredientsInCart.length ? ingredientsInCart.reduce(function(sum, item) {
    return sum + item?.price;
  }, 0) : 0;
  
  return (
    <section>
      <div className={burgerConstructorStyle.burger} ref={drop}>
        {!!ingredientsInCart.length 
          ? <>
              {!!wrapIngredient.length ? <BurgerIngredient top data={wrapIngredient[0]}/> : <p className={burgerConstructorStyle.subnotification} >Добавьте булочку</p> }
              <div className={cn(burgerConstructorStyle.sectons, 'custom-scroll')}>
                {!!innerIngredients.length 
                  ? innerIngredients.map((item, i) => {  
                    const uuid = uuidv4(); 

                    return <BurgerIngredient 
                      data={item} 
                      key={uuid} 
                      moveCard={moveCard}
                      index={i}
                    />}
                  )
                  : <p className={burgerConstructorStyle.subnotification} >Добавьте что-то ещё</p>
                }
              </div>
              {!!wrapIngredient.length && <BurgerIngredient bottom data={wrapIngredient[0]}/>}
            </>
          : <p className={burgerConstructorStyle.notification} >Добавьте что-нибудь из меню</p> 
        }
      </div>
      {(!!wrapIngredient.length && !!innerIngredients.length) && <Total total={total || 0} openModal={props.openModal}/>  }
    </section>
  );
}


BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;