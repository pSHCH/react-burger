import React, { useState, useEffect } from 'react';

import { DATAURL } from '../../utils/consts';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

import appStyles from './app.module.css';

function App() {
  const [state, setState] = useState({ 
    loading: true,
    error: false,
    data: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [modalType, setModalType] = useState('');
  
  const getData = async (url) => {
    setState({ ...state, error: false, loading: true });
    try {
      const res = await fetch(url);
      const data = res.ok ? await res.json() : await res.json().then((err) => Promise.reject(err));
      setState({ ...state, data, loading: false })
    } catch (err) { 
      setState({ ...state, error: true, loading: false });
    }
  };
  
  useEffect(() => {
    getData(DATAURL);
  }, []);

  const { data, loading, error } = state;

  if(error) {
    return (
      <p className={appStyles.notification}>Что-то пошло не так</p>
    );
  }

  if(loading) {
    return (
      <p className={appStyles.notification}>Загрузка...</p>
    );
  }

  const openModal = (type, item) => {
    setIsOpen(true);
    setItemData(item);
    setModalType(type);
  }

  const onClose = () => {
    setIsOpen(false);
  }
 
  return (  
    <>
      <main className={appStyles.main}>
        <AppHeader />
        <div className={appStyles.grid}>
          <section>
            <BurgerIngredients data={data?.data} openModal={openModal}/>
          </section>
          <section>
            <BurgerConstructor data={data?.data} openModal={openModal}/>
          </section>
        </div>
      </main>
      <div className={appStyles.hidden}>
        {isOpen && <Modal 
          onClose={onClose} 
          itemData={itemData} 
          modalType={modalType}
        />}
      </div>
    </>
  );
}

export default App;
