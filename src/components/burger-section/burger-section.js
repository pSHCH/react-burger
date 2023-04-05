import React from 'react';

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

export default BurgerSection;