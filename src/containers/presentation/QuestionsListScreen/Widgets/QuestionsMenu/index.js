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
      {filterParam && shareableLink && (
        <button onClick={() => setShareScreen(!shareScreen)}>Share</button>
      )}
    </Flex>
  );
};

export default QuestionsMenu;
