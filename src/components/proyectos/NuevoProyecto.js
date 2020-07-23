import React, { Fragment, useState, useContext } from "react";
import ProyectosContext from '../../context/proyectoContext'

const NuevoProyecto = () => {

    // Obtener el State del formulario
    const proyectosContext = useContext(ProyectosContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext


    // State para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto

    const onchangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    // Cuuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        // validar el proyecto
      if(nombre === ''){
        mostrarError()
        return;
      }
        // agregar al state
        agregarProyecto(proyecto)

        // Reiniciar el form
        guardarProyecto({
          nombre: ''
        })
    }


  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario" onClick={() => mostrarFormulario()}>
        Nuevo Proyecto
      </button>
      {formulario ? ( <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
        <input
          type="text"
          className="input-text"
          placeholder="Nombre Proyecto"
          name="nombre"
          value={nombre}
          onChange={onchangeProyecto}
        />
        <input 
        type="submit"
        className="btn btn-primario btn-block"
        value="Agregar Proyectos"
        />
      </form>) : null

      }
      {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> :null}
    </Fragment>
  );
};

export default NuevoProyecto;
