import React, { createContext, useReducer, useContext, useState } from "react";
import { initialState } from "./initialState";

const AppContext = createContext();

function projectsReducer(state=initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_PROJECTS": {
      return {
        ...state,
        projects: payload || [],
      };
    }

    case "SET_ACTIVE_PROJECT": {
      return {
        ...state,
        activeProject: payload || {},
      };
    }

    case "UPDATE_PROJECT_NAME": {
      const { newName, projectId } = payload;
      const updatedProjects = state.projects?.map((project) => {
        if (project?.id === projectId) {
          return {
            ...project,
            name: newName,
          };
        }
        return project;
      });
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          name: newName,
        },
        projects: updatedProjects,
      };
    }

    case "DELETE_ACTIVE_PROJECT": {
      const { projectId } = payload;
      const updatedProjects = state?.projects?.filter(
        (project) => project?.id !== projectId
      );
      return {
        ...state,
        activeProject: {},
        projects: updatedProjects,
      };
    }

    case "SWITCH_PROJECT": {
      return {
        ...state,
        activeProjectId: payload,
      };
    }

    case "ADD_COLUMN_TO_SECTION": {
      const { section } = payload;
      const updatedSections = [...(state?.activeProject?.sections || []), section];
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
      };
    }

    case "ADD_TASK_TO_SECTION": {
      const { sectionId, task } = payload;
      const updatedSections = state?.activeProject?.sections?.map((section) => {
        if (section?.id === sectionId) {
          return {
            ...section,
            tasks: [task, ...(section?.tasks || [])],
          };
        }
        return section;
      });
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
      };
    }

    case "CLEAR_SECTION": {
      const { sectionId } = payload;
      const updatedSections = state?.activeProject?.sections?.map((section) => {
        if (section?.id === sectionId) {
          return {
            ...section,
            tasks: [],
          };
        }
        return section;
      });
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
      };
    }

    case "DELETE_SECTION": {
      const { sectionId } = payload;
      const updatedSections = state?.activeProject?.sections?.filter(
        (section) => section?.id !== sectionId
      );
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
      };
    }

    case "UPDATE_SECTION_NAME": {
      const { sectionId, newName } = payload;
      const updatedSections = state?.activeProject?.sections?.map((section) => {
        if (section?.id === sectionId) {
          return {
            ...section,
            name: newName,
          };
        }
        return section;
      });
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
      };
    }

    case "Move_SECTION": {
      const { newPosition, columnId } = payload;
      const updatedSections = [...state.activeProject.sections]?.sort(
        (a, b) => a.position - b.position
      );
      const prePosition = updatedSections?.findIndex(
        (item) => item?.id === columnId
      );
      const [movedSection] = updatedSections?.splice(prePosition, 1);
      updatedSections?.splice(newPosition, 0, movedSection);
      const reOrderedSections = updatedSections?.map((section, index) => ({
        ...section,
        position: index + 1,
      }));
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: reOrderedSections,
        },
      };
    }

    case "MOVE_TASK": {
      const { taskId, toSectionId, newPosition } = payload;

      const sectionsCopy = state.activeProject.sections?.map((section) => ({
        ...section,
        tasks: [...section.tasks],
      }));

      let taskToMove = null;
      let fromSectionIndex = -1;
      let taskIndex = -1;

      sectionsCopy?.forEach((section, sectionIndex) => {
        const taskIndexInSection = section.tasks?.findIndex(
          (task) => task?.id === taskId
        );
        if (taskIndexInSection !== -1) {
          fromSectionIndex = sectionIndex;
          taskIndex = taskIndexInSection;
          taskToMove = section.tasks[taskIndexInSection];
        }
      });

      if (!taskToMove || fromSectionIndex === -1) return state;

      sectionsCopy[fromSectionIndex].tasks.splice(taskIndex, 1);

      const toSection = sectionsCopy.find(
        (section) => section?.id === toSectionId
      );
      if (!toSection) return state;

      const insertAt = Math.max(
        0,
        Math.min(newPosition, toSection.tasks.length)
      );
      toSection.tasks.splice(insertAt, 0, taskToMove);

      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: sectionsCopy,
        },
      };
    }
    case "SET_ACTIVE_TASK": {
      return {
        ...state,
        activeTask: payload || {},
      };
    }

    case "EDIT_TASK": {
      const updatedTask = payload;
      const updatedSections = state.activeProject?.sections?.map((section) => {
        if (section?.id === updatedTask?.section_id) {
          return {
            ...section,
            tasks: section?.tasks?.map((task) =>
              task?.id === updatedTask?.id ? updatedTask : task
            ),
          };
        }
        return section;
      });
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
        activeTask: updatedTask,
        projectVersion: (state.projectVersion || 0) + 1,
      };
    }

    case "DELETE_TASK": {
      const { taskId, columnId } = payload;
      const updatedSections = state.activeProject?.sections?.map((section) => {
        if (section?.id === columnId) {
          return {
            ...section,
            tasks: section?.tasks?.filter((task) => task?.id !== taskId),
          };
        }
        return section;
      });

      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
        projectVersion: state.projectVersion + 1,
      };
    }

    case "ADD_SUBTASK": {
      const newSubTask = payload;
      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          subtasks: [...state.activeTask.subtasks, newSubTask],
        },
      };
    }

    case "UPDATE_ASSIGNED_USERS_IN_TASK": {
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

    case "ADD_IMAGE_TO_TASK": {
      const { images, taskId, columnId } = payload;
      const updatedSections = state.activeProject?.sections?.map((section) => {
        if (section?.id === columnId) {
          return {
            ...section,
            tasks: section?.tasks?.map((task) => {
              if (task?.id === taskId) {
                return {
                  ...task,
                  images: images,
                };
              }
              return task;
            }),
          };
        }
        return section;
      });
      return {
        ...state,
        activeTask: {
          ...state?.activeTask,
          images: images,
        },
        activeProject:{
          ...state.activeProject,
          sections:updatedSections,
        }
      };
    }

    case "ADD_COMMENTS_TO_TASK":{
      const {subComments, taskId,columnId} = payload;
      const updatedSections = state?.activeProject?.sections?.map((section)=> {
        if(section?.id === columnId){
          return {
            ...section,
            tasks: section?.tasks?.map((task)=> {
              if(task?.id === taskId){
                return {
                  ...task,
                  subComments:subComments,
                }
              }
              return task;
            })
          }
        }
        return section;
      })
        return {
          ...state,
          activeProject:{
            ...state.activeProject,
            sections: updatedSections,
          },
         activeTask:{
          ...state.activeTask,
          subComments:subComments || state.activeTask.subComments,
         }
        }
    }

    case "SET_ACTIVE_USER":{
       return {
        ...state,
        activeUser:payload || {}
       }
    }

    default:
      return state;
  }
}

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => useContext(AppContext);
