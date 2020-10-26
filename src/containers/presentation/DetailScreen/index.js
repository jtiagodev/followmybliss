import axios from "axios";
import produce from "immer";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Flex } from "../../../components/Grid";
import LoadingScreen from "../../../components/LoadingScreen";
import ShareScreen from "../../../components/ShareScreen";
import { Title } from "../../../components/Text";
import { BASE_URL } from "../../../config/api";
import QuestionDetails from "./Widgets/QuestionDetails";

const DetailScreen = (props) => {
  const { idParam } = props;
  const history = useHistory();
  const location = useLocation();

  const [loadDetail, setLoadDetail] = useState(true);
  const [questionDetails, setQuestionDetails] = useState(undefined);
  const [shareScreen, setShareScreen] = useState(false);

  
  // Fetches Details for Question if ID Param is a number and details haven't been passed as props
  useEffect(() => {
    if (location && location.state && location.state.details) {
      setQuestionDetails(location.state.details);
      setLoadDetail(false);
    } else {
      getQuestionDetails(idParam);
    }
  }, []);
  
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

  const backAction = () => {
    if (location && location.state && location.state.from) {
      history.push(location.state.from); // Read from location state
    } else {
      history.push("/"); // Home
    }
  };


  return (
    <>
      {shareScreen && <ShareScreen url={window.location.href} />}

      {!shareScreen && (
        <Flex column>
          <Title>{`Detail Screen for Question ID #${idParam}`}</Title>

          {loadDetail ? (
            <LoadingScreen loadText="Loading Question Details..." />
          ) : (
            <QuestionDetails questionDetails={questionDetails} vote={vote} />
          )}

          <Flex>
            {history.length > 1 && <button onClick={backAction}>Back</button>}
            {questionDetails && (
              <button onClick={() => setShareScreen(!shareScreen)}>
                Share
              </button>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};

DetailScreen.propTypes = {
  idParam: PropTypes.number.isRequired,
  details: PropTypes.object,
};

export default DetailScreen;
