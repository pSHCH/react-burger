import PropTypes from 'prop-types';

export const itemType = {
  image_large: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export const ingredientType = {
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export const ingredientSectionType = {
  _id: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
