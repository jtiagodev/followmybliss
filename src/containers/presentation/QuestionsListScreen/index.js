import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Flex } from "../../../components/Grid";
import LoadingScreen from "../../../components/LoadingScreen";
import RetryActionWidget from "../../../components/RetryActionWidget";
import ShareScreen from "../../../components/ShareScreen";
import { Title } from "../../../components/Text";
import { BASE_URL } from "../../../config/api";
import QuestionsSearch from "./Widgets/QuestionsSearch";
import QuestionsList from "./Widgets/QuestionsList";
import QuestionsMenu from "./Widgets/QuestionsMenu";

const QuestionsListScreen = (props) => {
  const { filterParam } = props;
  const history = useHistory();

  const searchRef = useRef(null);
  const initialOffset = 0;
  const fixedFetchLimit = 10;

  const [loadQuestions, setLoadQuestions] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionsError, setQuestionsError] = useState(undefined);
  const [filter, setFilter] = useState(filterParam);
  const [offset, setOffset] = useState(initialOffset);
  const [shareableLink, setShareableLink] = useState(undefined); // Required as we keep track of the URL that would generate the results being displayed and not necessarely the current filter values
  const [shareScreen, setShareScreen] = useState(false);

  const getQuestions = async (resetQuestions = false) => {
    // If defined adds filter to params
    const questionsQueryParameters = {
      limit: fixedFetchLimit,
      offset: resetQuestions ? 0 : offset,
    };
    if (filter) {
      questionsQueryParameters.filter = filter;
    }
    if (resetQuestions) {
      setQuestionsList([]);
      setOffset(0);
    }

    setLoadQuestions(true);
    try {
      const result = await axios.get(BASE_URL + "/questions", {
        params: questionsQueryParameters,
      });
      setQuestionsList(result.data);
      setShareableLink(
        window.location.origin + "/questions?questions_filter=" + filter
      );
    } catch (err) {
      setQuestionsError(err);
    }
    setLoadQuestions(false);
  };

  const fetchAdditionalQuestions = () => {
    // Triggers useEffect
    const newOffset = offset + fixedFetchLimit;
    setOffset(newOffset);
  };

  const dismissPress = () => {
    history.push("/questions");
  };

  const filterPress = () => {
    getQuestions(true);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      filterPress();
    }
  };

  useEffect(() => {
    // Fetch additional questions
    if (offset !== initialOffset) {
      getQuestions();
    }
  }, [offset]);

  useEffect(() => {
    // Fetch 10 first results from API without Offset if questions_filter is not present
    if (!filterParam && filterParam !== "") {
      getQuestions();
    }
    if (filterParam && filterParam !== "") {
      getQuestions();
    }

    if (filterParam && filterParam === "") {
      searchRef.current.focus();
    }
  }, []);

  if (questionsError) {
    // UI Error State
    return <RetryActionWidget error={questionsError} onRetry={getQuestions} />;
  }

  const filterInputChange = (evt) => {
    setFilter(evt.target.value);
  };

  if (shareScreen && shareableLink) {
    return <ShareScreen url={shareableLink} />;
  }
  // Renders both variants
  return (
    <>
      {(filterParam || filterParam === "") && (
        <QuestionsSearch
          filter={filter}
          filterParam={filterParam}
          searchRef={searchRef}
          filterInputChange={filterInputChange}
          handleEnterPress={handleEnterPress}
          loadQuestions={loadQuestions}
          filterPress={filterPress}
          dismissPress={dismissPress}
        />
      )}

      <Flex column>
        {!filterParam && filterParam !== "" && <Title>Questions List Variant</Title>}
        {loadQuestions && questionsList.length === 0 ? (
          <LoadingScreen loadText="Loading Questions..." />
        ) : (
          <QuestionsList questionsList={questionsList} />
        )}
        {loadQuestions && questionsList.length > 0 ? (
          <LoadingScreen loadText="Loading Additional Questions..." />
        ) : (
          <span>{`${questionsList.length} Results Available`}</span>
        )}

        <QuestionsMenu
          loadQuestions={loadQuestions}
          fetchAdditionalQuestions={fetchAdditionalQuestions}
          filterParam={filterParam}
          shareableLink={shareableLink}
          setShareScreen={setShareScreen}
          shareScreen={shareScreen}
        />
      </Flex>
    </>
  );
};

QuestionsListScreen.propTypes = {
  filterParam: PropTypes.string,
};

export default QuestionsListScreen;
