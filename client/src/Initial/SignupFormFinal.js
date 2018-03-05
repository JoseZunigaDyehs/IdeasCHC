import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Requerido'
  } else if (values.username.length < 5) {
    errors.username = 'Minimo 5 letras'
  } else if (values.username.length > 15) {
    errors.username = 'No puede ser mayor a 15 letras'
  }
  if (!values.email) {
    errors.email = 'Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email incorrecto'
  }
  if (!values.password) {
    errors.password = 'Requerido'
  } else if (values.password.length < 6) {
    errors.password = 'Minimo 6 letras'
  } else if (values.password.length > 10) {
    errors.password = 'No puede ser mayor a 10 letras'
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Requerido'
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Los password son distintos'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SignupFormFinal = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <Field name="password_confirmation" type="password" component={renderField} label="Password Confirmation" />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SignupFormFinal', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  //warn // <--- warning function given to redux-form
})(SignupFormFinal)