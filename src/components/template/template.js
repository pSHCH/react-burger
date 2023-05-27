import PropTypes from 'prop-types';
import AppHeader from '../app-header/app-header';
import templateStyles from './template.module.css';

function Template(props) {
  return (  
    <>
      <div className={templateStyles.main}>
        <AppHeader />
        { props.children }
      </div>
    </>
  );
}

export default Template;

Template.propTypes = { 
  children: PropTypes.object.isRequired,
};