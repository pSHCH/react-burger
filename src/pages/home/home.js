import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { INGREDIENTS_MODAL_CLOSE, getIngredients } from '../../services/actions';

import Template from '../../components/template/template'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import OrderDetails from '../../components/order-details/order-details';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';

import homeStyles from './home.module.css';

export function HomePage({ id }) {
  const { ingredientsRequest, ingredientsFailed, ingredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());

    if (!!id) {
      openModal('ingredient', id)
    }
  }, [dispatch, id]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  if(ingredientsFailed && !!ingredients.length) {
    return (
      <p className={homeStyles.notification}>Что-то пошло не так</p>
    );
  }

  if(ingredientsRequest && !!ingredients.length) {
    return (
      <p className={homeStyles.notification}>Загрузка...</p>
    );
  }

  const openModal = (type) => {
    setIsOpen(true);
    setModalType(type);
  }

  const onClose = modalType => {
    setIsOpen(false);
    dispatch({ type: INGREDIENTS_MODAL_CLOSE, ingredient: null });

    if(modalType === 'ingredient') {
      window.history.replaceState(null, '', `/`)
    }
  }
  
  return (
    <Template>
      <>
        <main className={homeStyles.grid}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModal={openModal} />
            <BurgerConstructor openModal={openModal}/>
          </DndProvider>
        </main>
        {isOpen && <Modal 
          onClose={() => onClose(modalType)}
          title={modalType !== 'order' ? 'Детали ингредиента' : ''}
        >
          {
            modalType === 'order' ? <OrderDetails /> : <IngredientDetails id={id}/>
          }
        </Modal>}
      </>
    </Template>
  );
}

HomePage.propTypes = {
  id: PropTypes.string,
};
