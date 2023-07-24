import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../index';
import { login, checkUserToken } from '../../services/actions';
import Template from '../../components/template/template';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

import loginStyles from './login.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loginState = useSelector(store => store.login.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(getCookie('refreshToken') && !getCookie('token')) {
      const token = {
        'token': getCookie('refreshToken') || ''
      };

      dispatch(checkUserToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if(loginState) {

      if(location.state?.from) {
        navigate(location.state?.from);
      }
      else {
        navigate('/');
      }
    }
  }, [dispatch, location.state?.from, loginState, navigate])

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...{'email': email || ''}, 
      ...{'password': password || ''}
    } 

    dispatch(login(data));
  }

  return (
    <Template>
      <main className={loginStyles.grid}>
        <form className={loginStyles.form} onSubmit={handleLogin}>
          <h1 className={loginStyles.title}>Вход</h1>

          <Input 
            placeholder='E-mail' 
            name='email' 
            extraClass={loginStyles.input}
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <PasswordInput 
            placeholder='Password' 
            name='password' 
            extraClass={loginStyles.input}
            required  
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button 
            type='primary' 
            size='medium' 
            extraClass={loginStyles.button} 
            htmlType='submit'
          >
            Войти
          </Button>

          <p className={loginStyles.text}>Вы&nbsp;&mdash; новый пользователь? <Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link></p>
          <p className={loginStyles.text}>Забыли пароль? <Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link></p>
        </form>
      </main>
    </Template>
  );
}
