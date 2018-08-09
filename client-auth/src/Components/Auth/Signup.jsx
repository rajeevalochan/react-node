import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {reduxForm, Field} from 'redux-form';

class Signup extends React.Component {
  onSubmit = (formProps) => {
    this.props.signup(formProps)
  }

  render() {
    const {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <button>Sign Up</button>
      </form>
    );
  }
}
export default compose(
  connect(null, actions),
  reduxForm({ form:"signup" })
)(Signup);
