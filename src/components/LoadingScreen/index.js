import React from "react";
import PropTypes from 'prop-types';

const LoadingScreen = (props) => {
  const { loadText = "Loading Data..." } = props;

  return (
  <span>{loadText}</span>
  
  );
};

LoadingScreen.propTypes = {
  loadText: PropTypes.string
};

export default LoadingScreen;
