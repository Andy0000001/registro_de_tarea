import React, {useContext} from "react";
import ProyectosContext from "../../context/proyectoContext";
import tareaContext from "../../context/tareas/tereaContext"
const Proyecto = ({ proyecto }) => {
  // Obtener el State de proyecto
  const proyectosContext = useContext(ProyectosContext);
  const { proyectoActual } = proyectosContext;
  // obtener la funcion del context de tareas
  const tareasContext = useContext(tareaContext)
  const { obtenerTareas } = tareasContext;

  // Funcion para agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id) //Fijar un proyecto actual
    obtenerTareas(id) // Filtrar las tareas cuando se de click
    
  }


  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={()=>seleccionarProyecto(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
