import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ingredientType } from '../../utils/types';
import BurgerItem from '../burger-item/burger-item';
import burgerSectionStyle from './burger-section.module.css';

function BurgerSection(props) {
 
  return (
    <section className={burgerSectionStyle.section}>
      <h2 className={burgerSectionStyle.subtitle} ref={props.refElem}>{props.title}</h2>

      <ul className={burgerSectionStyle.variats}>
        {useMemo(() => props.data.map((item) => {
          return <BurgerItem 
            item={item} 
            key={item._id} 
            openModal={props.openModal}
          />
        }), [props.data, props.openModal])}
      </ul>
  </section>
  );
}

BurgerSection.propTypes = {
  openModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  refElem: PropTypes.func.isRequired
};

export default BurgerSection;