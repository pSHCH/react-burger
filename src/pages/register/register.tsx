import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions';
import Template from '../../components/template/template';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import registerStyles from './register.module.css';

export const RegisterPage = () => {
  const dispatch: any = useDispatch(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleChangeField = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'name') {
      setName(value);
    }
  }

  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      'email': email, 
      'password': password, 
      'name': name 
    } 

    dispatch(register(data));
    navigate('/login')
  }

  return (
    <Template>
      <main className={registerStyles.grid}>
        <form className={registerStyles.form} onSubmit={handleRegister}>
          <h1 className={registerStyles.title}>Регистрация</h1>

          <Input 
            placeholder='Имя' 
            name='name' 
            extraClass={registerStyles.input}
            required  
            value={name}
            onChange={handleChangeField}
          />
          <Input 
            placeholder='E-mail' 
            name='email' 
            extraClass={registerStyles.input}
            required
            value={email}
            onChange={handleChangeField}
          />
          <PasswordInput 
            placeholder='Password' 
            name='password' 
            extraClass={registerStyles.input}
            required
            value={password}
            onChange={handleChangeField}
          />

          <Button 
            type='primary' 
            size='medium' 
            extraClass={registerStyles.button}
            htmlType='submit'
          >
            Зарегистрироваться
          </Button>
          
          <p className={registerStyles.text}>Уже зарегистрированы? <Link className={registerStyles.link} to='/login'>Войти</Link></p>
        </form>
      </main>
    </Template>
  );
}
