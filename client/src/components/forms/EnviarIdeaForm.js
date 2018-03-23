import React from 'react'
import { Field, reduxForm } from 'redux-form'
import SocialButton from '../SocialButton'
import { connect } from 'react-redux'
import axios from 'axios'

const validate = values => {
  const errors = {}
  if (!values.nombre) {
    errors.nombre = 'Requerido'
  } else if (values.nombre.length < 15) {
    errors.nombre = 'Minimo 15 caracteres'
  } else if (values.nombre.length > 200) {
    errors.nombre = 'No puede ser mayor a 200 caracteres'
  }
  if (!values.descripcion) {
    errors.descripcion = 'Requerido'
  } else if (values.descripcion.length < 50) {
    errors.descripcion = 'Minimo 50 caracteres'
  } else if (values.descripcion.length > 500) {
    errors.descripcion = 'No puede ser mayor a 500 caracteres'
  }
  // QUITADO POR QUE AHORA ACEPTA SOLO LA CAT 4
  // if (!values.categoria) {
  //   errors.categoria = 'Requerido'
  // } else if (values.categoria === '-1') {
  //   errors.categoria = 'Se debe seleccionar alguna categoría'
  // }
  // return errors
}

const llenarOptions = (options) => {
  setTimeout(() => {
    let opciones = options.map((opt) => {

      return (
        `<option value=${opt.pk} key=${opt.pk}>${opt.name}</option>`
      )
    })
    document.getElementsByName('categoria')['0'].innerHTML = opciones;
    document.getElementsByName('categoria')['0'].value = '4';
  }, 10);
}

const renderField = ({
  input,
  label,
  type,
  sublabel,
  placeholder,
  meta: { touched, error, warning }
}) => (
    <div className="input-group-lg mb-4">
      <label className="d-flex flex-column">{label}
        <small className="c-gris mb-2">{sublabel}</small>
        <input {...input} className="form-control" name="nombre" placeholder={placeholder} type={type} />
      </label>
      {touched &&
        ((error && <span className='c-pink'>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )

const renderSelect = ({
  input,
  label,
  type,
  sublabel,
  placeholder,
  meta: { touched, error, warning }
}) => (
    <div>

      <select {...input} className="d-none" name="categoria" placeholder={placeholder}>
      </select>
      {
        touched &&
        ((error && <span className='c-pink'>{error}</span>) ||
          (warning && <span>{warning}</span>))
      }
    </div>
    // <div className="input-group-lg mb-4">
    //   <label className="d-flex flex-column">{label}
    //     <small className="c-gris mb-2">{sublabel}</small>
    //     <select {...input} className="custom-select" name="categoria" placeholder={placeholder} type={type}>
    //     </select>
    //   </label>
    //   {touched &&
    //     ((error && <span className='c-pink'>{error}</span>) ||
    //       (warning && <span>{warning}</span>))}
    // </div>
  )

const renderTextarea = ({
  input,
  label,
  type,
  sublabel,
  placeholder,
  meta: { touched, error, warning }
}) => (

    <div className="input-group-lg mb-4">
      <label className="d-flex flex-column">{label}
        <small className="c-gris mb-2">{sublabel}</small>
        <textarea {...input} className="w-100 form-control" cols="30" rows="10"></textarea>
      </label>
      {touched &&
        ((error && <span className='c-pink'>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )



const EnviarIdeaForm = (props) => {

  const { handleSubmit, submitting } = props

  //LOGIN
  const handleSocialLogin = (user) => {
    let config = {
      headers:
        {
          'Authorization': 'Token e5cec21fd7fdf6e5970bfb41b9e6a0cc6ca96693',
          'Content-Type': 'application/json'
        }
    }
    props.onSpinner()
    //ENVIAR USUARIO A DJANGO
    axios.post('https://ideas.chilecompra.cl:8000/users/',
      {
        user: {
          username: user._profile.email,
          first_name: user._profile.firstName,
          last_name: user._profile.lastName,
          email: user._profile.email,
          password: user._profile.id
        },
        thumbnail: user._profile.profilePicURL
      },
      config
    )
      .then(res => {
        props.obtenerToken(user._profile);
      })
      .catch(err => {
        if (err.response.data.user.username["0"] === 'Ya existe un usuario con este nombre.') {
          props.obtenerToken(user._profile);
          props.categorias.props.getCategorias()
        } else {
          console.log(err);
        }
      });
  }

  const handleSocialLoginFailure = (err) => {
    console.error(err)
  }
  //FIN LOGIN

  if (props.login === null) {
    return (
      <div className="row justify-content-start py-3">
        <form onSubmit={handleSubmit} className='col-md-6 d-flex flex-column'>
          <h2 className="mt-2 mb-4">Compártenos tu idea</h2>
          <Field name="nombre" type="text" component={renderField} label="¿Cuál es el nombre de tu idea?" placeholder="Título de la idea" sublabel="Define un nombre atractivo que resuma el objetivo principal" />
          <Field name="descripcion" type="text" component={renderTextarea} label="¿En qué consiste tu idea?" sublabel="Describe el detalle de tu idea. ¿Cuál es el problema que quieres solucionar?" />
          {/* <Field name="dirigido" type="text" component={renderField} label="¿A quién está dirigido?" placeholder="Usuario objetivo" sublabel="Describe quién será el principal usuario de tu solución" /> */}
          <Field name="categoria" className="d-none" type="text" component={renderSelect} categorias={this.categorias} label="¿En qué categoría clasificarías tu idea?" placeholder="Nombre" sublabel="Define cuál sección es la más adecuada para ubicar tu idea" />
          <div className='mb-5'>
            <hr className="linea-black" />
            <button className="btn btn-primary py-3 px-5 float-right" type="submit" disabled={submitting}>SUBIR IDEA</button>
          </div>
        </form>
        <div className='col-md-6 mb-5'>
          <div className='py-5 px-4 back-gris-claro d-flex flex-column justify-content-center align-content-center'>
            <h3>Para poder compartir una idea, debes ingresar tu cuenta de Google</h3>
            <p>Ingrese su usuario en este link</p>
            <div className='mt-4 mb-3 d-flex justify-content-center'>
              <SocialButton
                provider='google'
                appId='178848131764-l6f61h1flr9rkqsilspj2ipc0bp00f1t.apps.googleusercontent.com'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                autoLogin={props.autolog}
                className='f-w-500 d-flex align-items-center py-3 px-5 btn btn-secondary'
              >
                INGRESAR
              </SocialButton>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-start py-3">
          <div className="col-md-6 d-flex flex-column">
            <h2 className="mt-2 mb-4">Compártenos tu idea</h2>
            <Field name="nombre" type="text" component={renderField} label="¿Cuál es el nombre de tu idea?" placeholder="Nombre" sublabel="Define un nombre atractivo que resuma el objetivo principal" />
            <Field name="descripcion" type="text" component={renderTextarea} label="¿En qué consiste tu idea?" sublabel="Describe el detalle de tu idea. ¿Cuál es el problema que quieres solucionar?" />
            {/* <Field name="dirigido" type="text" component={renderField} label="¿A quién está dirigido?" placeholder="Usuario objetivo" sublabel="Describe quién será el principal usuario de tu solución" /> */}
            <Field name="categoria" categorias={llenarOptions(props.categorias.props.categorias)} className="custom-select" component={renderSelect} label="¿En qué categoría clasificarías tu idea?" placeholder="Nombre" sublabel="Define cuál sección es la más adecuada para ubicar tu idea" />
          </div>
          <div className="col-md-12 text-right mb-5">
            <hr className="linea-black" />
            <button className="btn btn-primary py-3 px-5" type="submit" disabled={submitting}>SUBIR IDEA</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  autolog: state.autolog
});

const mapDispatchToProps = (dispatch) => ({

  obtenerToken: (datos) => {
    let config = {
      headers:
        {
          'Authorization': 'Token e5cec21fd7fdf6e5970bfb41b9e6a0cc6ca96693',
          'Content-Type': 'application/json'
        }
    }
    axios.post('https://ideas.chilecompra.cl:8000/obtain-auth-token/',
      {
        username: datos.email,
        password: datos.id
      },
      config
    )
      .then(res => {
        datos.token = res.data.token;
        dispatch({ type: 'LOGIN', data: datos })
        dispatch({type:'OFF_SPINNER'})
      })
      .catch(err => {
        console.log(err);
      })
  },
  errorLogin: (err) => {
    dispatch({ type: 'LOGIN_ERROR', data: err })
  },
  onSpinner: () => {
    dispatch({type:'ON_SPINNER'})
  }
});

const EnviarIdeaFormRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnviarIdeaForm);

export default reduxForm({
  form: 'EnviarIdeaForm',
  validate,
})(EnviarIdeaFormRedux)
