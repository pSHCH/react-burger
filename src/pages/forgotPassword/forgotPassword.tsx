import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../index';
import { forgot } from '../../services/actions';
import Template from '../../components/template/template';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import forgotPasswordStyles from './forgotPassword.module.css';

export function ForgotPasswordPage() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotState = useSelector(store => store.forgot.state);

  const [email, setEmail] = useState('');

  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value);
    }
  }

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      'email': email
    } 

    dispatch(forgot(data));  
  }

  useEffect(() => {
    if (forgotState === 'success') {
      navigate('/reset-password');
    }
  }, [dispatch, forgotState, navigate])

  return (
    <Template>
      <main className={forgotPasswordStyles.grid}>
        <form className={forgotPasswordStyles.form} onSubmit={handleRegister}>
          <h1 className={forgotPasswordStyles.title}>Восстановление пароля</h1>
          <Input 
            placeholder='Укажите e-mail' 
            name='email' 
            extraClass={forgotPasswordStyles.input}
            required  
            value={email}
            onChange={handleChangeField}
          />
          <Button type='primary' size='medium' extraClass={forgotPasswordStyles.button} htmlType='submit'>
            Восстановить
          </Button>
          <p className={forgotPasswordStyles.text}>Вспомнили пароль? <Link className={forgotPasswordStyles.link} to='/login'>Войти</Link></p>
        </form>
      </main>
    </Template>
  );
}
