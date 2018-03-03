import React from 'react'
import { Field, reduxForm } from 'redux-form'

const opciones = [
  { val: '-1', texto: 'Seleccione una categoria' },
  { val: '1', texto: 'Uno' },
  { val: '2', texto: 'Dos' },
  { val: '3', texto: 'Tres' },
  { val: '4', texto: 'Cuatro' }
];

const options = () => {
  return (
    opciones.map((opt) => {
      return (<option value={opt.val} key={opt.val}>{opt.texto}</option>)
    })
  )
}

const validate = values => {
  const errors = {}
  if (!values.nombre) {
    errors.nombre = 'Requerido'
  } else if (values.nombre.length < 5) {
    errors.nombre = 'Minimo 5 letras'
  } else if (values.nombre.length > 15) {
    errors.nombre = 'No puede ser mayor a 15 letras'
  }
  if (!values.descripcion) {
    errors.descripcion = 'Requerido'
  } else if (values.descripcion.length < 5) {
    errors.descripcion = 'Minimo 5 letras'
  } else if (values.descripcion.length > 15) {
    errors.descripcion = 'No puede ser mayor a 15 letras'
  }
  if (!values.dirigido) {
    errors.dirigido = 'Requerido'
  } else if (values.dirigido.length < 5) {
    errors.dirigido = 'Minimo 5 letras'
  } else if (values.dirigido.length > 15) {
    errors.dirigido = 'No puede ser mayor a 15 letras'
  }
  if (!values.categoria) {
    errors.categoria = 'Requerido'
  } else if (values.categoria === '-1') {
    errors.categoria = 'Se debe seleccionar alguna categoría'
  }
  return errors
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
    <div className="input-group-lg mb-4">
      <label className="d-flex flex-column">{label}
        <small className="c-gris mb-2">{sublabel}</small>
        <select {...input} className="custom-select" name="nombre" placeholder={placeholder} type={type}>
          {options()}
        </select>
      </label>
      {touched &&
        ((error && <span className='c-pink'>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
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

const EnviarIdeaForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-start py-3">
        <div className="col-md-6 d-flex flex-column">
          <h2 className="mt-2 mb-4">Subir tu idea</h2>
          <Field name="nombre" type="text" component={renderField} label="¿Cuál es el nombre de tu idea?" placeholder="Nombre" sublabel="Define un nombre atractivo que resuma el objetivo principal" />
          <Field name="descripcion" type="text" component={renderTextarea} label="¿En qué consiste tu idea?" sublabel="Describe el detalle de tu idea. ¿Cuál es el problema que quieres solucionar?" />
          <Field name="dirigido" type="text" component={renderField} label="¿A quién está dirigido?" placeholder="Usuario objetivo" sublabel="Describe quién será el principal usuario de tu solución" />
          <Field name="categoria" className="custom-select" type="text" component={renderSelect} label="¿En qué categoría clasificarías tu idea?" placeholder="Nombre" sublabel="Define cuál sección es la más adecuada para ubicar tu idea" />
        </div>
        <div className="col-md-12 text-right mb-5">
          <hr className="linea-black" />
          <button className="btn btn-primary py-3 px-5" type="submit" disabled={submitting}>SUBIR IDEA</button>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'EnviarIdeaForm',
  validate,
})(EnviarIdeaForm)