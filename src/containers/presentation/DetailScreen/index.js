import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "../../../utils/navigation";
import { BASE_URL } from "../../../config/api";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import RetryActionWidget from "../../../components/RetryActionWidget";
import * as R from 'ramda';
import PropTypes from 'prop-types';

const DetailScreen = (props) => {
    const { idParam } = props;

    return (
        <span>{`Detail Screen for Question ID #${idParam}`}</span>
    )
};

DetailScreen.propTypes = {
    idParam: PropTypes.string.isRequired
}

export default DetailScreen;