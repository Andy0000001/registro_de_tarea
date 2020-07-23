import React, { useContext } from "react";
import ProyectosContext from "../../context/proyectoContext";
import tareaContext from "../../context/tareas/tereaContext";

const Tarea = ({ tarea }) => {
  // extraer si un proyecto esta activo
  const proyectosContext = useContext(ProyectosContext);
  const { proyecto } = proyectosContext;

  // Extraer el proyecto
  const [proyectoActual] = proyecto;

  // obtener la funcion del context de tareas
  const tareasContext = useContext(tareaContext);
  const {
    elimnarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual,
  } = tareasContext;

  //Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
  const tareaEliminada = async (id) => {
    elimnarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  //Funcion que modifica el estado de la tareas
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };
  // Agregar una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminada(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
