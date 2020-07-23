import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import ProyectosContext from "../../context/proyectoContext";
import TareaContext from "../../context/tareas/tereaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Listadotareas = () => {
  // Obtener el State de proyecto
  const proyectosContext = useContext(ProyectosContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  // obtener las tareas del proyecto
  const tareasContext = useContext(TareaContext);
  const { tareasproyectos } = tareasContext;
  

  //si no hay proyectos seleccionados
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  // Extraer proyectos de state inicial
  const [proyectoActual] = proyecto;

  // Eliminar proyecto
  const onclickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="Listado-tareas">
        {tareasproyectos.length === 0 ? (
          <li className="tarea">
            <p>No hay tarea</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyectos.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={400} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onclickEliminar}
      >
        Eleminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default Listadotareas;
