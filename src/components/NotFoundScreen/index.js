import React from "react";
import { useHistory } from 'react-router-dom';
import { Flex } from "../Grid";
import { WarningText } from "../Text";

const NotFoundScreen = (props) => {
    const history = useHistory();
    const navigateHome = () => history.push('/', { from: 'notfound' });

  return (
    <Flex column>
      <WarningText>404 SCREEN NOT FOUND</WarningText>
      <button onClick={navigateHome}>Go to Home</button>
    </Flex>
  );
};

export default NotFoundScreen;
