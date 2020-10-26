import React from "react";
import { Flex } from "../../../../../components/Grid";

const QuestionsMenu = (props) => {
  const {
    loadQuestions,
    fetchAdditionalQuestions,
    filterParam,
    shareableLink,
    setShareScreen,
    shareScreen,
  } = props;

  return (
    <Flex>
      <button
        disabled={loadQuestions}
        onClick={() => fetchAdditionalQuestions()}
      >
        More Questions
      </button>
      {((filterParam === '' || filterParam) && shareableLink) ? (
        <button onClick={() => setShareScreen(!shareScreen)}>Share</button>
      ) : (null)}
    </Flex>
  );
};

export default QuestionsMenu;
