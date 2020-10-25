import React from 'react';
import PropTypes from 'prop-types';

const QuestionPreview = (props) => {
    const { id, question, thumbnail, published, choices } = props;

    return (
        <div style={{ display: 'flex', flex: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={thumbnail} alt="thumbnail" />
        <span>{`ID #${id}`}</span>
        <span>{question}</span>
        <span>{published}</span>
        <span>{`${choices.length} choices`}</span>
        </div>
    );
};

QuestionPreview.propTypes = {
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired
};

export default QuestionPreview;