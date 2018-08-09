import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import auth from './Auth';

export default combineReducers({
  auth,
  form: formReducer
});