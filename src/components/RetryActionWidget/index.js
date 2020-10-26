import React from "react";
import PropTypes from "prop-types";
import { Flex } from "../Grid";
import { WarningText } from "../Text";

const RetryActionWidget = (props) => {
  const { error, code, onRetry } = props;
  return (
    <Flex column>
      <WarningText>SERVER HEALTH CHECK ERROR:</WarningText>
      <WarningText>{`${JSON.stringify(error)} (CODE: ${code})`}</WarningText>
      <button onClick={onRetry}>Retry Action</button>
    </Flex>
  );
};

RetryActionWidget.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  code: PropTypes.number,
  onRetry: PropTypes.func.isRequired,
};

export default RetryActionWidget;
