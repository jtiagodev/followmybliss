import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

const QuestionPreview = (props) => {
  const { id, question, thumb_url, published_at, choices } = props;

  return (
    <div
      style={{
        display: "flex",
        flex: 5,
        maxWidth: "800px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img src={thumb_url} alt="thumbnail" width="50px" />
      <span>{`ID #${id}`}</span>
      <span>{question}</span>
      <span>{`Published ${moment(published_at).format('DD-MM-YYYY HH:mm')}`}</span>
      <span>{`${choices.length} choices`}</span>
    </div>
  );
};

QuestionPreview.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
};

export default QuestionPreview;
