import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
} from "../Constants/UserConstant";

import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT_DEV;

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${API_ENDPOINT}/api/v1/users/login`,
      { email, password },
      config
    );

    localStorage.setItem("userData", JSON.stringify(data?.user));
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
  }
};

// Register
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${API_ENDPOINT}/api/v1/users/register`,
      { name, email, password },
      config
    );
    

    localStorage.setItem("userData", JSON.stringify(data?.user));

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error,
    });
  }
};

// RefreshAccess Token
export const refreshAccessToken = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${API_ENDPOINT}/api/v1/users/refresh`,
      config
    );

    localStorage.setItem("userData", JSON.stringify(data?.user));

    dispatch({ type: REFRESH_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REFRESH_FAILURE, payload: error.response.data.error });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  // console.log("load user called");
  try {
    // console.log("load user called 1");
    dispatch({ type: LOAD_USER_REQUEST });
    // console.log("load user called 2");
    const { data } = await axios.get(`/api/v1/users/me`);
    // console.log("load user called 3");
    // console.log(data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/users/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
