import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const ChoicesTable = styled.table`
  max-width: 800px;
`;

const QuestionChoices = (props) => {
  const { choices, vote } = props;

  return (
    <ChoicesTable>
      {choices.map((choice, i) => (
        <tr key={`question-choice-${i}`}>
          <td>
            <span>{choice.choice}</span>
          </td>
          <td>
            <span>{`${choice.votes} Votes`}</span>
          </td>
          <td>
            <button
              onClick={() => {
                vote(i);
              }}
            >
              Vote
            </button>
          </td>
        </tr>
      ))}
    </ChoicesTable>
  );
};

QuestionChoices.propTypes = {
    choices: PropTypes.array.isRequired,
    vote: PropTypes.func.isRequired
};

export default QuestionChoices;