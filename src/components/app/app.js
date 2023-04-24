import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { INGREDIENTS_MODAL_CLOSE } from '../../services/actions';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
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
      <main className={appStyles.main}>
        <AppHeader />
        <div className={appStyles.grid}>
          <DndProvider backend={HTML5Backend}>
            <section>
              <BurgerIngredients openModal={openModal} />
            </section>
            <section>
              <BurgerConstructor openModal={openModal}/>
            </section>
          </DndProvider>
        </div>
      </main>
      <div className={appStyles.hidden}>
        {isOpen && <Modal 
          onClose={onClose}
          modalType={modalType}
        />}
      </div>
    </>
  );
}

export default App;
