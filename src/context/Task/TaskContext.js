import { createContext, useContext, useReducer } from "react";
import * as actions from "./action";
import { initialState } from "./initialState";
const TaskContext = createContext();

function taskReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_ACTIVE_TASK_REQUEST:
      return {
        ...state,
        loadingActiveTask: true,
        errorActiveTask: null,
      };

    case actions.SET_ACTIVE_TASK_SUCCESS:
      return {
        ...state,
        activeTask: payload,
        loadingActiveTask: false,
      };

    case actions.SET_ACTIVE_TASK_FAILURE:
      return {
        ...state,
        loadingActiveTask: false,
        errorActiveTask: payload,
      };

    case actions.EDIT_TASK: {
      return {
        ...state,
        activeTask: payload,
      };
    }

    case actions.DELETE_ACTIVE_TASK: {
      return {
        ...state,
        activeTask: {},
      };
    }

    case actions.ADD_SUBTASK: {
      const newSubTask = payload;
      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          subtasks: [...state.activeTask.subtasks, newSubTask],
        },
      };
    }

    case actions.DELETE_SUBTASK: {
      const updatedSubtasks = state?.activeTask?.subtasks?.filter(
        (subtask) => subtask?.id !== payload
      );
      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          subtasks: updatedSubtasks,
        },
      };
    }

    case actions.UPDATE_ASSIGNED_USERS_IN_TASK: {
      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          assigned_to: payload
            ? [...payload]
            : [...state?.activeTask?.assigned_to],
        },
      };
    }

    case actions.ADD_IMAGE_TO_TASK: {
      const { images } = payload;
      return {
        ...state,
        activeTask: {
          ...state?.activeTask,
          images: images,
        },
      };
    }

    case actions.ADD_COMMENTS_TO_TASK: {
      const { subComments } = payload;
      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          subComments: subComments || state.activeTask.subComments,
        },
      };
    }

    default:
      return state;
  }
}

export function TaskContextProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
