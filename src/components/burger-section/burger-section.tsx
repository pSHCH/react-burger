import { useMemo } from 'react';
import type { IIngredient } from '../../utils/ingredient';
import BurgerItem from '../burger-item/burger-item';
import burgerSectionStyle from './burger-section.module.css';

interface IBurgerSection {
  openModal: (type: string, id?: string) => void;
  title: string;
  data: IIngredient[];
  refElem: () => void;
};

const BurgerSection: React.FC<IBurgerSection> = ({ title, openModal, data, refElem }) => { 
  return (
    <section className={burgerSectionStyle.section}>
      <h2 className={burgerSectionStyle.subtitle} ref={refElem}>{title}</h2>

      <ul className={burgerSectionStyle.variats}>
        {useMemo(() => data.map((item: IIngredient) => {
          return <BurgerItem 
            item={item} 
            key={item._id} 
            openModal={openModal}
          />
        }), [data, openModal])}
      </ul>
  </section>
  );
}

export default BurgerSection;