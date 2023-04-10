import PropTypes from 'prop-types';
import { useMemo } from 'react';
import BurgerItem from '../burger-item/burger-item';
import burgerSectionStyle from './burger-section.module.css';

function BurgerSection(props) {
 
  return (
    <section className={burgerSectionStyle.section}>
      <h2 className={burgerSectionStyle.subtitle}>{props.title}</h2>

      <ul className={burgerSectionStyle.variats}>
        {useMemo(() => props.data.map((item) => {
          return <BurgerItem item={item} key={item._id} openModal={props.openModal}/>
        }), [props.data, props.openModal])}
      </ul>
  </section>
  );
}

BurgerSection.propTypes = {
  openModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default BurgerSection;