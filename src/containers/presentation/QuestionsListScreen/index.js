import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "../../../utils/navigation";
import { BASE_URL } from "../../../config/api";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import RetryActionWidget from "../../../components/RetryActionWidget";
import * as R from 'ramda';
import PropTypes from 'prop-types';

const QuestionsListScreen = (props) => {
  const { filterParam } = props;

  const searchRef = useRef(null);

  const [loadQuestions, setLoadQuestions] = useState(undefined);
  const [questionsList, setQuestionsList] = useState(undefined);
  const [questionsError, setQuestionsError] = useState(undefined);
  const [filter, setFilter] = useState(filterParam);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [questionsFilterList, setQuestionsFilterList] = useState(undefined);

  const questionsQueryParameters = {
    limit,
    offset,
    filter: filter || "",
  };

  const getQuestions = async (params) => {
    setLoadQuestions(true);
    try {
      const result = await axios.get(BASE_URL + "/questions", { params });
      setQuestionsList(result);
    } catch (err) {
      setQuestionsError(err);
    }
    setLoadQuestions(false);
  };

  const fetchAdditionalQuestions = (amount) => {
    const newOffset = offset + amount;
    setLimit(amount);
    setOffset(newOffset);
  };

  const filterQuestions = (search) => {
    const isIncluded = question => question.toLowerCase().includes(search);
    const filteredQuestions = R.filter(isIncluded, questionsList);
    setQuestionsFilterList(filteredQuestions);
  };

  useEffect(() => {
    // Fetch additionalresults from API
    getQuestions(questionsQueryParameters);
  }, [offset]);

  useEffect(() => {
    // Fetch 10 first results from API without Offset
    getQuestions(questionsQueryParameters);
  }, []);

  if (loadQuestions) {
    // UI Load State
    return <LoadingScreen loadText="Loading Questions..." />;
  }

  if (questionsError) {
    // UI Error State
    return <RetryActionWidget error={questionsError} onRetry={getQuestions} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>QUESTIONS SEARCH FUNCTIONALITY</span>
      <input type="text" name="search" value={filter} autoFocus={filterParam} ref={searchRef} />
      <button onClick={() => filterQuestions(search)}>Search</button>
      <span>Search List</span>
      <span>----------------</span>
      <span>QUESTIONS LIST SCREEN</span>
      <button onClick={() => fetchAdditionalQuestions(10)}>
        More Questions
      </button>
    </div>
  );
};

QuestionsListScreen.propTypes = {
  filterParam: PropTypes.string
};

export default QuestionsListScreen;