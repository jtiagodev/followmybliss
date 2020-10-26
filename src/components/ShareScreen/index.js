import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { Flex } from "../Grid";
import { Title } from "../Text";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// TODO: Add Formik to better handle forms and Yup for handling Schema Validation
// Note: Functional Requirements do not specify back button or callback for returning to the previous context
const ShareScreen = (props) => {
  const { url } = props;
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  // Validate Email on input change
  useEffect(() => {
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const share = () => {
    axios
      .post(BASE_URL + "/share", null, {
        params: {
          destination_email: email,
          content_url: url,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Shared");
        }
        console.log(response);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Flex column>
      <Title>SHARE CONTENT</Title>

      <Flex>
        <label for="url">Content URL</label>
        <input disabled type="text" name="url" value={url}></input>
      </Flex>

      <Flex>
        <label for="url">Destination Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        ></input>
        {emailValid && <span style={{ color: "green" }}>Valid e-mail!</span>}
        {email !== "" && !emailValid && (
          <span style={{ color: "red" }}>Please enter a valid e-mail</span>
        )}
      </Flex>

      <button
        style={{ width: "100px" }}
        disabled={!emailValid}
        onClick={() => {
          share();
        }}
      >
        Share
      </button>
    </Flex>
  );
};

ShareScreen.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ShareScreen;
