import { useState, useEffect } from 'react';
import Template from '../../components/template/template';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser, getUser } from '../../services/actions';
import { getCookie } from '../../utils/cookie';

import profileStyles from './profile.module.css';

export function ProfilePage() {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch(); 
  let user = useSelector(store => store.user);
  let updateUserData = useSelector(store => store.updateUser);

  const refreshToken = getCookie('refreshToken');
  const data = {
    'token': refreshToken
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

  const handleChangeField = e => {
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    }
  }

  const resetFields = () => {
    setIsEditName(false);
    setIsEditEmail(false);

    setEmail('');
    setName('');
  }

  const updateUserInfo = () => {
    if(name !== '' || name !== '') {
      const data = {
        'email': email || user?.email, 
        'name': name || user?.name,
      } 

      dispatch(updateUser(data));
    }
  }

  useEffect(() => {
    if(updateUserData.loadState === 'succes') {
      setIsEditName(false);
      setIsEditEmail(false);

      setEmail(updateUserData.email);
      setName(updateUserData.name);

      // dispatch(getUser());
    }

    // dispatch(getUser());
  }, [updateUserData])
  
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
              value={name !== '' ? name : user?.name}
              extraClass={profileStyles.input}
              onIconClick={() => editName()}
              onChange={handleChangeField}
            />
            <Input 
              placeholder='Логин'
              name='email'
              disabled={!isEditEmail}
              icon='EditIcon'
              value={email !== '' ? email : user?.email}
              extraClass={profileStyles.input}
              onIconClick={() => editEmail()}
              onChange={handleChangeField}
            />
            <Input 
              placeholder='Пароль'
              name='password'
              disabled
              icon='EditIcon'
              value={'******'}
              extraClass={profileStyles.input}
            />
            {(isEditName || isEditEmail) && <div className={profileStyles.buttons}>
              <Button type='secondary' htmlType='button' onClick={() => resetFields()}>Отмена</Button>
              <Button htmlType='button' onClick={() => updateUserInfo()}>Сохранить</Button>
            </div>}

          </form>
        </div>
      </main>
    </Template>
  );
}
