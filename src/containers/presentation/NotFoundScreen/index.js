import React from "react";
import { useHistory } from 'react-router-dom';

const NotFoundScreen = (props) => {
    const history = useHistory();
    const navigateHome = () => history.push('/', { from: 'notfound' });

  return (
    <>
      <span>NOT FOUND SCREEN</span>
      <button onClick={navigateHome}>Go to Home</button>
    </>
  );
};

export default NotFoundScreen;
