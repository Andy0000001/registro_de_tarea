import {
  TAREAS_PROYECTOS,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTOS:
      return {
        ...state,
        tareasproyectos: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyectos: [action.payload, ...state.tareasproyectos],
        errortarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyectos: state.tareasproyectos.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasproyectos: state.tareasproyectos.map((tarea) =>
          tarea._id === action.payload.__id ? action.payload : tarea
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null,
      };
    default:
      return state;
  }
};
