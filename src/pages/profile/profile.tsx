import { useState, useEffect } from 'react';
import Template from '../../components/template/template';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from '../../index';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser } from '../../services/actions';
import { getCookie } from '../../utils/cookie';

import profileStyles from './profile.module.css';

export const ProfilePage = () => {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); 
  let user = useSelector(store => store.user);
  let updateUserData = useSelector(store => store.updateUser);

  const refreshToken = getCookie('refreshToken');
  const data = {
    'token': refreshToken || ''
  }

  const handleLogout = () => {
    dispatch(logout(data));
  }

  const editName = () => {
    setIsEditName(true);
  };

  const editEmail = () => {
    setIsEditEmail(true);
  };

  const editPassword = () => {
    setIsEditPassword(true);
  };

  const resetFields = () => {
    setIsEditName(false);
    setIsEditEmail(false);
    setIsEditPassword(false);

    setEmail('');
    setName('');
    setPassword('');
  }

  const updateUserInfo = () => {
    if(name !== '' || name !== '' || password !== '') {
      const data = {
       ...( email !== '' && {'email': email }), 
       ...( name !== '' && {'name': name }), 
       ...( password !== '' && {'password': password })
      }

      dispatch(updateUser(data));
    }
  }

  useEffect(() => {
    if(updateUserData.loadState === 'succes') {
      setIsEditName(false);
      setIsEditEmail(false);
      setIsEditPassword(false);

      setEmail(updateUserData.email);
      setName(updateUserData.name);
      setPassword('');
    }
  }, [updateUserData]);
  
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
          <form>
            <Input 
              placeholder='Имя'
              name='name'
              disabled={!isEditName}
              icon='EditIcon'
              value={name !== '' || isEditName ? name : user?.name}
              extraClass={profileStyles.input}
              onIconClick={() => editName()}
              onChange={e => setName(e.target.value)}
            />
            <Input 
              placeholder='Логин'
              name='email'
              disabled={!isEditEmail}
              icon='EditIcon'
              value={email !== '' || isEditEmail ? email : user?.email}
              extraClass={profileStyles.input}
              onIconClick={() => editEmail()}
              onChange={e => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Пароль'
              name='password'
              disabled={!isEditPassword}
              icon='EditIcon'
              value={password !== '' || isEditPassword ? password : '******'}
              onIconClick={() => editPassword()}
              onChange={e => setPassword(e.target.value)}
              extraClass={profileStyles.input}
            />
            {(isEditName || isEditEmail || isEditPassword) && <div className={profileStyles.buttons}>
              <Button type='secondary' htmlType='button' onClick={() => resetFields()}>Отмена</Button>
              <Button htmlType='button' onClick={() => updateUserInfo()}>Сохранить</Button>
            </div>}

          </form>
        </div>
      </main>
    </Template>
  );
}
