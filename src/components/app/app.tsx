import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from './utils/data';

import appStyles from './app.module.css';


class App extends React.Component {
  render() {
    return (  
      <main className={appStyles.main}>
        <AppHeader />
        <div className={appStyles.grid}>
          <section>
            <BurgerIngredients data={data}/>
          </section>
          <section>
            <BurgerConstructor data={data}/>
          </section>

        </div>
      </main>
    );
  }
}


export default App;
