import React from "react";
import { useQuery } from "../../../utils/navigation";
import DetailScreen from "../DetailScreen";
import QuestionsListScreen from "../QuestionsListScreen";

const QuestionsRoute = (props) => {
  // Read Query Parameter and apply to the defaults
  const queryParams = useQuery();
  const questionId = queryParams.get("question_id");
  const questionFilter = queryParams.get("question_filter");

  // Renders DetailScreen if ID Param present
  if (questionId) {
    return <DetailScreen idParam={questionId} />;
  }

  // Defaults to rendering QuestionsListScreen
  return <QuestionsListScreen filterParam={questionFilter} />;
};

export default QuestionsRoute;
