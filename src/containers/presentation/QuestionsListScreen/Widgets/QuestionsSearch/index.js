import React from "react";
import { Flex } from "../../../../../components/Grid";
import { Title } from "../../../../../components/Text";

const QuestionsSearch = (props) => {
  const {
    filter,
    filterParam,
    searchRef,
    filterInputChange,
    handleEnterPress,
    loadQuestions,
    filterPress,
    dismissPress,
  } = props;

  return (
    <Flex column>
      <Title>Questions Search Variant</Title>

      <Flex>
        <input
          type="text"
          name="filter"
          value={filter}
          autoFocus={filterParam === ""}
          ref={searchRef}
          onChange={filterInputChange}
          onKeyDown={handleEnterPress}
        />
        <button disabled={loadQuestions} onClick={filterPress}>
          FILTER
        </button>
        <button onClick={dismissPress}>Dismiss</button>
      </Flex>
    </Flex>
  );
};

export default QuestionsSearch;
