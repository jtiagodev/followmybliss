import React from "react";
import PropTypes from 'prop-types';

const LoadingScreen = (props) => {
  const { loadText = "Loading Data..." } = props;

  return (
  <div>
  <span>{loadText}</span>
  </div>
  
  );
};

LoadingScreen.propTypes = {
  loadText: PropTypes.string
};

export default LoadingScreen;
