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
} from "../Constants/UserConstant";

import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

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
    console.log("Called");
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${API_ENDPOINT}/api/v1/users/register`,
      { name, email, password },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error,
    });
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
