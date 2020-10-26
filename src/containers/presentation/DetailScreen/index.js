import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "../../../utils/navigation";
import { BASE_URL } from "../../../config/api";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import RetryActionWidget from "../../../components/RetryActionWidget";
import * as R from "ramda";
import PropTypes from "prop-types";
import produce from 'immer';

const DetailScreen = (props) => {
  const { idParam, details = undefined } = props;
  const [loadDetail, setLoadDetail] = useState(true);
  const [questionDetails, setQuestionDetails] = useState(details);

  const getQuestionDetails = async (idParam) => {
    setLoadDetail(true);
    try {
      const result = await axios.get(BASE_URL + "/questions/" + idParam);
      setQuestionDetails(result.data);
    } catch (err) {
      console.warr(err);
    }
    setLoadDetail(false);
  };

  const vote = async (choiceIndex) => {
      const updatedQuestionDetails = produce(questionDetails, draft => {
        draft.choices[choiceIndex].votes = questionDetails.choices[choiceIndex].votes + 1;
      });
      try {
         const result = await axios.put(BASE_URL + "/questions/" + idParam, updatedQuestionDetails);
         setQuestionDetails(updatedQuestionDetails);
      } catch (err) {
          console.warr(err);
      }
  };

  // Fetches Details for Question if ID Param is a number and details haven't been passed as props
  useEffect(() => {
    if (!questionDetails) {
      getQuestionDetails(idParam);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>{`Detail Screen for Question ID #${idParam}`}</span>

      {loadDetail ? (
        <LoadingScreen loadText="Loading Question Details..." />
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={questionDetails.thumb_url}
              alt="QuestionDetailThumbnail"
              width="50px"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{questionDetails.question}</span>
              <span>{`Total Votes ${questionDetails.choices.reduce(
                (acc, cur) => acc + cur.votes,
                0
              )}`}</span>
            </div>
          </div>

          <table style={{ maxWidth: '800px'}}>
            {questionDetails.choices.map((choice, i) => (
              <tr key={`question-choice-${i}`}>
                <td>
                  <span>{choice.choice}</span>
                </td>
                <td>
                  <span>{`${choice.votes} Votes`}</span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      vote(i);
                    }}
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  );
};

DetailScreen.propTypes = {
  idParam: PropTypes.number.isRequired,
  details: PropTypes.object,
};

export default DetailScreen;
