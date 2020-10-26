import axios from "axios";
import produce from "immer";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen";
import ShareScreen from "../../../components/ShareScreen";
import { BASE_URL } from "../../../config/api";
import moment from 'moment';

const DetailScreen = (props) => {
  const { idParam } = props;
  const history = useHistory();
  const location = useLocation();

  const [loadDetail, setLoadDetail] = useState(true);
  const [questionDetails, setQuestionDetails] = useState(undefined);
  const [shareScreen, setShareScreen] = useState(false);

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
    const updatedQuestionDetails = produce(questionDetails, (draft) => {
      draft.choices[choiceIndex].votes =
        questionDetails.choices[choiceIndex].votes + 1;
    });
    try {
      await axios.put(
        BASE_URL + "/questions/" + idParam,
        updatedQuestionDetails
      );
      setQuestionDetails(updatedQuestionDetails);
    } catch (err) {
      console.warr(err);
    }
  };

  // Fetches Details for Question if ID Param is a number and details haven't been passed as props
  useEffect(() => {
    if (location && location.state && location.state.details) {
      setQuestionDetails(location.state.details);
      setLoadDetail(false);
    } else {
      getQuestionDetails(idParam);
    }
  }, []);

  return (
    <>
      {shareScreen && <ShareScreen url={window.location.href} />}
      {!shareScreen && (
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

                <div style={{ display: 'flex', flexDirection: 'column'}} >
                    <span>{questionDetails.id}</span>
                    <span>{`Published ${moment(questionDetails.published_at).format('DD-MM-YYYY HH:mm')}`}</span>

                </div>
              </div>

              <table style={{ maxWidth: "800px" }}>
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

          <div style={{ display: "flex" }}>
            {history.length > 1 && (
              <button
                onClick={() => {
                  if (location && location.state && location.state.from) {
                      history.push(location.state.from); // Read from location state
                  } else {
                      history.push('/'); // Home
                  }
                }}
              >
                Back
              </button>
            )}
            {questionDetails && (
              <button onClick={() => setShareScreen(!shareScreen)}>
                Share
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

DetailScreen.propTypes = {
  idParam: PropTypes.number.isRequired,
  details: PropTypes.object,
};

export default DetailScreen;
