import React from 'react';
import AppHeader from '../app-header/app-header';
import templateStyles from './template.module.css';

interface ITemplate {
  children: JSX.Element;
};

const Template: React.FC<ITemplate> = ({children}) => {
  return (  
    <>
      <div className={templateStyles.main}>
        <AppHeader />
        { children }
      </div>
    </>
  );
}

export default Template;