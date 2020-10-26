import React from 'react';
import { Flex } from '../../../../../components/Grid';
import moment from 'moment';
import PropTypes from 'prop-types';
import QuestionChoices from '../QuestionChoices';

const QuestionDetails = (props) => {
    const { questionDetails, vote } = props;

    return (
        <Flex column>

        <Flex>
        <img
          src={questionDetails.thumb_url}
          alt="QuestionDetailThumbnail"
          width="50px"
        />
        <Flex column>
          <span>{questionDetails.question}</span>
          <span>{`Total Votes ${questionDetails.choices.reduce(
            (acc, cur) => acc + cur.votes,
            0
          )}`}</span>
        </Flex>

        <Flex column>
            <span>{questionDetails.id}</span>
            <span>{`Published ${moment(questionDetails.published_at).format('DD-MM-YYYY HH:mm')}`}</span>
        </Flex>
        </Flex>

      <QuestionChoices choices={questionDetails.choices} vote={vote} />
      </Flex>
    );
};

QuestionDetails.propTypes = {
    questionDetails: PropTypes.object.isRequired,
    vote: PropTypes.func.isRequired
}

export default QuestionDetails;