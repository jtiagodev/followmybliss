import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { useHistory, useLocation } from "react-router-dom";
import { QuestionPreviewContainer } from "./styled";

const QuestionPreview = (props) => {

  const { id, question, image_url, thumb_url, published_at, choices } = props;
  const history = useHistory();

  return (
    <QuestionPreviewContainer
      onClick={() => {
        history.push('/questions?question_id=' + id, { from: window.location.pathname + window.location.search, details: { id, question, image_url, thumb_url, published_at, choices } })
      }}
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
    </QuestionPreviewContainer>
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
