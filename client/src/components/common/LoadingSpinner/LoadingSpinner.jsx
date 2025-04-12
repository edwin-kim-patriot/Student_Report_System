// client/src/components/common/LoadingSpinner/LoadingSpinner.jsx

import './LoadingSpinner.css';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div className={`loading-spinner-container ${fullPage ? 'full-page' : ''}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};
LoadingSpinner.propTypes = {
  fullPage: PropTypes.bool,
};

export default LoadingSpinner;
