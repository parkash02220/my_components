import { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialState";
import * as actions from '@/context/Projects/action';
const ProjectsContext = createContext();

function projectsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

     case actions.SET_PROJECTS_REQUEST:
      return {
        ...state,
        loadingProjects:true,
        errorProjects:null,
      };

    case actions.SET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload,
         loadingProjects:false,
      };

    case actions.SET_PROJECTS_FAILURE:
      return {
        ...state,
         loadingProjects:false,
        errorProjects:payload,
      };
    case actions.CREATE_PROJECT: {
      return {
        ...state,
        projects: [payload, ...state?.projects],
      };
    }
    case actions.SET_ACTIVE_PROJECT_REQUEST:
      return {
        ...state,
        loadingActiveProject:true,
        errorActiveProject:null,
      };

    case actions.SET_ACTIVE_PROJECT_SUCCESS:
      return {
        ...state,
        activeProject: payload,
           loadingActiveProject:false,
      };

    case actions.SET_ACTIVE_PROJECT_FAILURE:
      return {
        ...state,
          loadingActiveProject:false,
        errorActiveProject:payload,
      };

    case actions.UPDATE_PROJECT_NAME: {
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

    case actions.DELETE_ACTIVE_PROJECT: {
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

    case actions.SWITCH_PROJECT: {
      return {
        ...state,
        activeProjectId: payload,
      };
    }

     case actions.ADD_COLUMN_TO_SECTION : {
          const { section } = payload;
          const updatedSections = [
            ...(state?.activeProject?.sections || []),
            section,
          ];
          return {
            ...state,
            activeProject: {
              ...state.activeProject,
              sections: updatedSections,
            },
          };
        }
    
        case actions.ADD_TASK_TO_SECTION: {
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
    
        case actions.CLEAR_SECTION: {
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
    
        case actions.DELETE_SECTION: {
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
    
        case actions.UPDATE_SECTION_NAME: {
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
    
        case actions.Move_SECTION: {
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
    
        case actions.MOVE_TASK: {
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

        case actions.EDIT_TASK_IN_PROJECT : {
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
        projectVersion: (state.projectVersion || 0) + 1,
      };
        }

        case actions.DELETE_TASK_IN_PROJECT: {
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

            case actions.ADD_IMAGE_TO_TASK_IN_PROJECT: {
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
                    activeProject: {
                      ...state.activeProject,
                      sections: updatedSections,
                    },
                  };
                }

                case actions.ADD_COMMENTS_TO_TASK_IN_PROJECT: {
                      const { subComments, taskId, columnId } = payload;
                      const updatedSections = state?.activeProject?.sections?.map((section) => {
                        if (section?.id === columnId) {
                          return {
                            ...section,
                            tasks: section?.tasks?.map((task) => {
                              if (task?.id === taskId) {
                                return {
                                  ...task,
                                  subComments: subComments,
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
                        activeProject: {
                          ...state.activeProject,
                          sections: updatedSections,
                        },
                      };
                    }

    default:
        return state;
  }
}

export function ProjectsContextProvider({children}){
    const [state,dispatch] = useReducer(projectsReducer,initialState);

    return (
        <ProjectsContext.Provider value={{state,dispatch}}>
            {children}
        </ProjectsContext.Provider>
    )
}
export const useProjectsContext = () => useContext(ProjectsContext);
