import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen";
import RetryActionWidget from "../../../components/RetryActionWidget";
import ShareScreen from "../../../components/ShareScreen";
import { BASE_URL } from "../../../config/api";
import QuestionPreview from "./Widgets/QuestionPreview";

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

  // -- DEPRECATED: Not considered within Functional Req.
  // const filterQuestions = (search) => {
  //   const isIncluded = (question) => question.toLowerCase().includes(search);
  //   const filteredQuestions = R.filter(isIncluded, questionsList);
  //   setQuestionsFilterList(filteredQuestions);
  // };

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

  // Renders both variants
  return (
    <>
      {shareScreen && shareableLink && <ShareScreen url={shareableLink} />}

      {!shareScreen && (
        <>
          {(filterParam || filterParam === "") && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Questions Search Variant</span>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type="text"
                  name="filter"
                  value={filter}
                  autoFocus={filterParam === ""}
                  ref={searchRef}
                  onChange={(evt) => setFilter(evt.target.value)}
                  onKeyDown={handleEnterPress}
                />
                <button disabled={loadQuestions} onClick={filterPress}>
                  FILTER
                </button>
                <button onClick={dismissPress}>Dismiss</button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            {!filterParam && <span>Questions List Variant</span>}
            {loadQuestions && questionsList.length === 0 ? (
              <LoadingScreen loadText="Loading Questions..." />
            ) : (
              <ul>
                {questionsList.map((question, i) => (
                  <li key={`question-preview-${i}`}>
                    <QuestionPreview {...question} />
                  </li>
                ))}
              </ul>
            )}
            {loadQuestions && questionsList.length > 0 ? (
              <LoadingScreen loadText="Loading Additional Questions..." />
            ) : (
              <span>{`${questionsList.length} Results`}</span>
            )}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                disabled={loadQuestions}
                onClick={() => fetchAdditionalQuestions()}
              >
                More Questions
              </button>
              {filterParam && shareableLink && (
                <button onClick={() => setShareScreen(!shareScreen)}>
                  Share
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

QuestionsListScreen.propTypes = {
  filterParam: PropTypes.string,
};

export default QuestionsListScreen;
