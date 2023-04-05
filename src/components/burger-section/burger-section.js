import React from 'react';
import PropTypes from 'prop-types';

import BurgerItem from '../burger-item/burger-item';
import burgerSectionStyle from './burger-section.module.css';

class BurgerSection extends React.Component {
  render() {
    return (
      <section className={burgerSectionStyle.section}>
        <h2 className={burgerSectionStyle.subtitle}>{this.props.title}</h2>

        <ul className={burgerSectionStyle.variats}>
          {this.props.data.map((item) => {
            return <BurgerItem item={item} key={item._id} />
          })}
        </ul>
    </section>
    );
  }
}

BurgerSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default BurgerSection;