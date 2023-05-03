import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { INGREDIENTS_MODAL_CLOSE } from '../../services/actions';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import appStyles from './app.module.css';

function App() {
  const { ingredientsRequest, ingredientsFailed, ingredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  if(ingredientsFailed && !!ingredients.length) {
    return (
      <p className={appStyles.notification}>Что-то пошло не так</p>
    );
  }

  if(ingredientsRequest && !!ingredients.length) {
    return (
      <p className={appStyles.notification}>Загрузка...</p>
    );
  }

  const openModal = (type) => {
    setIsOpen(true);
    setModalType(type);
  }

  const onClose = () => {
    setIsOpen(false);
    dispatch({ type: INGREDIENTS_MODAL_CLOSE, ingredient: null })
  }
 
  return (  
    <>
      <div className={appStyles.main}>
        <AppHeader />
        <main className={appStyles.grid}>
          <DndProvider backend={HTML5Backend}>
              <BurgerIngredients openModal={openModal} />
              <BurgerConstructor openModal={openModal}/>
          </DndProvider>
        </main>
      </div>
      {isOpen && <Modal 
        onClose={onClose}
        title={modalType !== 'order' ? 'Детали ингредиента' : ''}
      >
        {
          modalType === 'order' ? <OrderDetails /> : <IngredientDetails />
        }
      </Modal>}
    </>
  );
}

export default App;
