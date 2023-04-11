import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuItem from '../menu-item/menu-item';

import headerStyles from './app-header.module.css';

function AppHeader() {

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <ul className={headerStyles.grid}>

          <li className={headerStyles.col}>
            <ul className={headerStyles.menu}>
              <li className={headerStyles.item}>
                <MenuItem link='/' title='Конструктор' icon ='list' active/>
              </li>
              <li className={headerStyles.item}>
                <MenuItem link='/' title='Лента заказов' />
              </li>
            </ul>
          </li>

          <li className={headerStyles.col}>
            <Logo />
          </li>

          <li className={headerStyles.col}>
            <MenuItem link='/' title='Личный кабинет' icon ='profile' />
          </li>
        </ul>
      </nav>
      
    </header>
  );
}

export default AppHeader;