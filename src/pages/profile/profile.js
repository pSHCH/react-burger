import Template from '../../components/template/template';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout } from '../../services/actions';
import { getCookie } from '../../utils/cookie';

import profileStyles from './profile.module.css';

export function ProfilePage() {
  const dispatch = useDispatch(); 
  let user = useSelector(store => store.user);

  const refreshToken = getCookie('refreshToken');
  const data = {
    'token': refreshToken
  } 

  const handleLogout = () => {
    dispatch(logout(data));
  }
  
  return (
    <Template>
      <main className={profileStyles.grid}>
        <div className={profileStyles.col}>
          <ul className={profileStyles.list}>
            <li className={profileStyles.item}>
              <NavLink to='/profile' className={({ isActive }) => profileStyles.link + ' ' + (isActive ? profileStyles.active : '')}>Профиль</NavLink>
            </li>
            <li className={profileStyles.item}>
              <NavLink to='/profile/orders' className={({ isActive }) => profileStyles.link + ' ' + (isActive ? profileStyles.active : '')}>История заказов</NavLink>
            </li>
            <li className={profileStyles.item}>
              <NavLink to='/' className={({ isActive }) => profileStyles.link + ' ' + (isActive ? profileStyles.active : '')} onClick={handleLogout}>Выход</NavLink>
            </li>
          </ul>
          <p className={profileStyles.info}>В этом разделе вы можете изменить свои персональные данные </p>
        </div>

        <div className={profileStyles.col}>
          <Input 
            placeholder='Имя'
            name='name'
            disabled
            icon='EditIcon'
            value={user?.name}
            extraClass={profileStyles.input}
            onIconClick={() => {

            }}
          />
          <Input 
            placeholder='Логин'
            name='email'
            disabled
            icon='EditIcon'
            value={user?.email}
            extraClass={profileStyles.input}
          />
          <Input 
            placeholder='Пароль'
            name='password'
            disabled
            icon='EditIcon'
            value='******'
            extraClass={profileStyles.input}
          />
        </div>
      </main>
    </Template>
  );
}
