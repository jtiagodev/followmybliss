import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../components/LoadingScreen";
import QuestionsListScreen from "./../QuestionsListScreen";
import { BASE_URL } from "./../../../config/api";
import RetryActionWidget from "../../../components/RetryActionWidget";
import axios from 'axios';

const Home = (props) => {
  const [serverError, setServerError] = useState(undefined);
  const [serverStatus, setServerStatus] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const serverHealthOk = () => {
    setServerStatus(200);
    setServerError(undefined);
  };

  const serverHealthNok = (status, error) => {
    setServerStatus(status);
    setServerError(error);
  };

  const serverHealthCheck = async () => {
    try {
      const result = await axios.get(BASE_URL + "/health");
      switch (result.status) {
        case 200:
          serverHealthOk();
          break;
        case 404:
          serverHealthNok(404, "Unable to access Server Health Check service");
          break;
        default:
          serverHealthNok(result.status, result.statusText);
      }
    } catch (err) {
      serverHealthNok(0, err);
    }
    setLoading(false);
  };

  useEffect(() => {
    serverHealthCheck();
  }, []);

  if (loading) {
    return <LoadingScreen loadText="Checking Server Health Status..." />;
  }

  if (serverError) {
    return (
      <RetryActionWidget
        error={serverError}
        code={serverStatus}
        onRetry={serverHealthCheck}
      />
    );
  }

  return <QuestionsListScreen />;
};

export default Home;
