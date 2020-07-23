import React, { useContext, useState, useEffect } from "react";
import ProyectosContext from "../../context/proyectoContext";
import tareaContext from "../../context/tareas/tereaContext";

const FormTarea = () => {
  // extraer si un proyecto esta activo
  const proyectosContext = useContext(ProyectosContext);
  const { proyecto } = proyectosContext;

  // obtener la funcion del context de tareas
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  // Effect que detecta si hay tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  // state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;
  //si no hay proyectos seleccionados
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handlechange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  // extraer el nombre del proyecto

  const onSubmit = (e) => {
    e.preventDefault();
    // validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    // Si es edicion o si es nueva tarea
    if (tareaseleccionada === null) {
      // tarea Nueva
      // agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);

      // Eliminar tareaseleccionada
      limpiarTarea();
    }
    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    // reiniciar form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="...Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handlechange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
