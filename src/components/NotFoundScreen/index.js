import React from "react";
import { useHistory } from 'react-router-dom';

const NotFoundScreen = (props) => {
    const history = useHistory();
    const navigateHome = () => history.push('/', { from: 'notfound' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>404 SCREEN NOT FOUND</span>
      <button onClick={navigateHome}>Go to Home</button>
    </div>
  );
};

export default NotFoundScreen;
