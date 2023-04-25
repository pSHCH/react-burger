import PropTypes from 'prop-types';
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENTS_CART } from '../../services/actions';
import { ingredientType } from '../../utils/types';
import { useDrag, useDrop } from 'react-dnd'
import cn from 'classnames';
import { DragIcon, LockIcon, DeleteIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import burgerIngredientStyle from './burger-ingredient.module.css';

function BurgerIngredients({
  data,
  top,
  bottom,
  index,
  moveCard,
}) {
  const dispatch = useDispatch(); 
  const ref = useRef(null);

  const { name, image_mobile, price } = data;
  const subtitle = top ? '(верх)' : '(низ)';

  const removeItem = item => {
    dispatch({ type: REMOVE_INGREDIENTS_CART, item });
  }

  const [{ handlerId }, drop] = useDrop({
    accept: 'sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type:  'sort',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div className={burgerIngredientStyle.wrap} ref={(!top && !bottom) ? ref : null} draggable data-handler-id={handlerId}>
      {!top && !bottom ? <DragIcon type='primary'/> : null }
      <div className={cn(
        burgerIngredientStyle.item, {
          [burgerIngredientStyle['item--form-top']]: top,
          [burgerIngredientStyle['item--form-bottom']]: bottom
        }
    )}>
        <img className={burgerIngredientStyle.image} alt={name} src={image_mobile} />
        <h4 className={burgerIngredientStyle.title}>{name} {(top || bottom) && subtitle}</h4>
        <div className={burgerIngredientStyle.price}>
          <span className={burgerIngredientStyle.count}>{price}</span>
          <CurrencyIcon type='primary' />
        </div>

        <button className={burgerIngredientStyle.remove} onClick={() => {removeItem(data)}} disabled={top || bottom}>
          {top || bottom ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' />}
        </button>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  data: PropTypes.shape(ingredientType).isRequired,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

export default BurgerIngredients;