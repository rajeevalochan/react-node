import axios from 'axios';
import {AUTH_USER, AUTH_ERROR} from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post("http://localhost:4000/signup", formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Email already in use"});
  }

}