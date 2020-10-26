import React from 'react';
import PropTypes from 'prop-types';


const RetryActionWidget = (props) => {
    const {  error, code, onRetry } = props;
    return (   <>
        <span>SERVER HEALTH CHECK ERROR:</span>
        <span>{`${JSON.stringify(error)} (CODE: ${code})`}</span>
        <button onClick={onRetry}>Retry Action</button>
      </>
      );
};

RetryActionWidget.propTypes = {
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    code: PropTypes.number,
    onRetry: PropTypes.func.isRequired
}


export default RetryActionWidget;