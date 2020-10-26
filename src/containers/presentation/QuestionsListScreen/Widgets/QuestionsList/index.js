import React from "react";
import QuestionPreview from "../QuestionPreview";

const QuestionsList = (props) => {
  const { questionsList } = props;

  return (
    <ul>
      {questionsList.map((question, i) => (
        <li key={`question-preview-${i}`}>
          <QuestionPreview {...question} />
        </li>
      ))}
    </ul>
  );
};

export default QuestionsList;
