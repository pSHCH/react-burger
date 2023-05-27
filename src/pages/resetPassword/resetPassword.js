import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../services/actions';
import Template from '../../components/template/template';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import resetPasswordStyles from './resetPassword.module.css';

export function ResetPasswordPage() {  
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const resetState = useSelector(store => store.reset.state);

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');;

  const handleChangeField = e => {
    const {name, value} = e.target;
    if (name === 'code') {
      setCode(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleRegister = e => {
    e.preventDefault();

    const data = {
      'token': code, 
      'password': password
    } 

    dispatch(reset(data));
  }

  useEffect(() => {
    if (resetState === 'success') {
      navigate('/');
    }
  }, [dispatch, resetState])
  
  return (
    <Template>
      <main className={resetPasswordStyles.grid}>
        <form className={resetPasswordStyles.form} onSubmit={handleRegister}>
          <h1 className={resetPasswordStyles.title}>Восстановление пароля</h1>
          <PasswordInput 
            placeholder='Password' 
            name='password' 
            extraClass={resetPasswordStyles.input}
            required  
            value={password}
            onChange={handleChangeField}
          />
          <Input 
            placeholder='Введите код из письма' 
            name='code' 
            extraClass={resetPasswordStyles.input}
            required  
            value={code}
            onChange={handleChangeField}
          />
          <Button type='primary' size='medium' extraClass={resetPasswordStyles.button} htmlType='submit'>
            Сохранить
          </Button>
          <p className={resetPasswordStyles.text}>Вспомнили пароль? <Link className={resetPasswordStyles.link} to='/login'>Войти</Link></p>
        </form>
      </main>
    </Template>
  );
}
