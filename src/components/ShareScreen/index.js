import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// TODO: Add Formik to better handle forms and Yup for handling Schema Validation
// Note: Functional Requirements do not specify back button or callback for returning to the previous context
const ShareScreen = (props) => {
    const { url } = props;
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const share = () => {
      // TODO: Add Toast
      axios.post(BASE_URL + '/share', null, { params: {
        destination_email: email,
        content_url: url
      }})
      .then(response => console.log(response))
      .catch(err => console.warn(err));
    };

    // Valdiate Email
    useEffect(() => {
        if (emailRegex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }, [email]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>SHARE CONTENT</span>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label for="url">Content URL</label>
                <input disabled 
                 type="text"
                 name="url"
                 value={url}
                 ></input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label for="url">Destination Email</label>
                <input 
                 type="text"
                 name="email"
                 value={email}
                 onChange={(evt) => { setEmail(evt.target.value)}}
                 ></input>
                             {emailValid && (<span style={{ color: 'green' }}>Valid e-mail!</span>)}
            {email !== '' && !emailValid && (<span style={{ color: 'red' }}>Please enter a valid e-mail</span>)}
            </div>


            <button style={{ width: '100px' }} disabled={!emailValid} onClick={() => { share() }}>Share</button>
        </div>
    );
};

ShareScreen.propTypes = {
    url: PropTypes.string.isRequired
};

export default ShareScreen;