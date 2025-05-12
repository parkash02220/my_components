import React, { createContext, useReducer, useContext, useState } from "react";
import { initialState } from "./initialState";
import * as actions from "./action";
import { daDK } from "@mui/x-date-pickers/locales";
const AppContext = createContext();

function setLoading(state, key, value) {
  return { ...state.loading, [key]: value };
}

function setError(state, key, value) {
  return { ...state.error, [key]: value };
}

function projectsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_PROJECTS_REQUEST:
      return {
        ...state,
        loading: setLoading(state, "loadingProjects", true),
        error: setError(state, "errorProjects", null),
      };

    case actions.SET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: payload,
        loading: setLoading(state, "loadingProjects", false),
      };

    case actions.SET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: setLoading(state, "loadingProjects", false),
        error: setError(state, "errorProjects", payload),
      };
    case "CREATE_PROJECT": {
      return {
        ...state,
        projects: [payload, ...state?.projects],
      };
    }
    case actions.SET_ACTIVE_PROJECT_REQUEST:
      return {
        ...state,
        loading: setLoading(state, "loadingActiveProject", true),
        error: setError(state, "errorActiveProject", null),
      };

    case actions.SET_ACTIVE_PROJECT_SUCCESS:
      return {
        ...state,
        activeProject: payload,
        loading: setLoading(state, "loadingActiveProject", false),
      };

    case actions.SET_ACTIVE_PROJECT_FAILURE:
      return {
        ...state,
        loading: setLoading(state, "loadingActiveProject", false),
        error: setError(state, "errorActiveProject", payload),
      };

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
    case actions.SET_ACTIVE_TASK_REQUEST:
      return {
        ...state,
        loading: setLoading(state, "loadingActiveTask", true),
        error: setError(state, "errorActiveTask", null),
      };

    case actions.SET_ACTIVE_TASK_SUCCESS:
      return {
        ...state,
        activeTask: payload,
        loading: setLoading(state, "loadingActiveTask", false),
      };

    case actions.SET_ACTIVE_TASK_FAILURE:
      return {
        ...state,
        loading: setLoading(state, "loadingActiveTask", false),
        error: setError(state, "errorActiveTask", payload),
      };

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
        activeProject: {
          ...state.activeProject,
          sections: updatedSections,
        },
      };
    }

    case "ADD_COMMENTS_TO_TASK": {
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
        activeTask: {
          ...state.activeTask,
          subComments: subComments || state.activeTask.subComments,
        },
      };
    }

    case actions.SET_ACTIVE_USER_REQUEST:
      return {
        ...state,
        loading: setLoading(state, "loadingActiveUser", true),
        error: setError(state, "errorActiveUser", null),
      };

    case actions.SET_ACTIVE_USER_SUCCESS:
      let activeUser = payload;
      activeUser.isAdmin = payload?.role === "admin";
      return {
        ...state,
        activeUser,
        loading: setLoading(state, "loadingActiveUser", false),
      };

    case actions.SET_ACTIVE_USER_FAILURE:
      return {
        ...state,
        loading: setLoading(state, "loadingActiveUser", false),
        error: setError(state, "errorActiveUser", payload),
      };

      case actions.SET_NOTIFICATION_TAB: {
        const tab = payload.tab;
        return {
          ...state,
          notifications: {
            ...state.notifications,
            tab,
            [tab]: state.notifications[tab] || {
              data: [],
              page: 1,
              hasMore: true,
            },
          },
        };
      }
    case actions.CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          all: { data: [], page: 0, hasMore: true },
          unread: { data: [], page: 0, hasMore: true },
        },
      };
    }

    case actions.SET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        loading: setLoading(state, "loadingNotifications", true),
        error: setError(state, "errorNotifications", payload),
      };
    }

    case actions.SET_NOTIFICATIONS_SUCCESS: {
      const { notifications, hasMore, page, totalUnread, totalCount } = payload;
      console.log("Reducer SET_NOTIFICATIONS_SUCCESS:", payload);
      const tab = state.notifications.tab;
      const isFirstCall = page === 1;
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [tab]: {
            data: isFirstCall
              ? notifications
              : [...(state.notifications[tab]?.data || []), ...notifications],
            page,
            hasMore,
          },
          unReadCount: totalUnread,
          totalCount,
        },
        loading: setLoading(state, "loadingNotifications", false),
      };
    }

    case actions.SET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: setLoading(state, "loadingNotifications", false),
        error: setError(state, "errorNotifications", payload),
      };

    case actions.NEW_NOTIFICATION_RECEIVED: {
      const { newNotification } = payload;
      const updatedAllNotifications = [
        newNotification,
        ...state.notifications.all.data,
      ];
      const updatedUnreadNotifications = [
        newNotification,
        ...state.notifications.unread.data,
      ];

      return {
        ...state,
        notifications: {
          ...state.notifications,
          all: {
            ...state.notifications.all,
            data: updatedAllNotifications,
          },
          unread: {
            ...state.notifications.unread,
            data: updatedUnreadNotifications,
          },
          unReadCount: (state.notifications.unReadCount || 0) + 1,
          totalCount: (state.notifications.totalCount || 0) + 1,
        },
      };
    }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          all: [payload.notification, ...state.notifications.all],
          unread: [payload.notification, ...state.notifications.unread],
        },
      };

    case actions.MARK_NOTIFICATION_AS_READ: {
      const { notificationId,user} = payload;
      console.log("::MARK_NOTIFICATION_AS_READ",payload)
      const updatedAllNotifications = state?.notifications?.all?.data?.map(
        (notification) => {
          if (notification?.id === notificationId) {
            return {
              ...notification,
              seenBy: [...(notification?.seenBy || []),{id:notification?.id,seen:true,user}],
            }
          }
          return notification;
        }
      );
      const updatedUnreadNotifications = state?.notifications?.unread?.data?.filter(
        (notification) => notification?.id !== notificationId
      );
      return {
        ...state,
        notifications: {
          ...state.notifications,
          all:{
            ...state.notifications?.all,
            data:updatedAllNotifications,
          },
          unread:{
            ...state.notifications?.unread,
            data:updatedUnreadNotifications,
          },
          unReadCount: (state.notifications.unReadCount || 1) - 1,
        },
      };
    }

    case actions.MARK_ALL_NOTIFICATION_AS_READ: {
      const {user} = payload;
      const updatedAllNotifications = state?.notifications?.all?.data?.map(
        (notification) => {
          return {
            ...notification,
            seenBy: [...(notification?.seenBy || []),{id:notification?.id,seen:true,user}],
          };
        }
      );
      return {
        ...state,
        notifications: {
          ...state.notifications,
          all:{
            ...state?.notifications?.all,
            data:updatedAllNotifications,
          },
          unread:{
           ...state?.notifications?.unread,
           data:[],
           page:0,
           hasMore:true,
          },
          unReadCount: 0,
        },
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        loading: setLoading(state, "loadingActiveUser", true),
        error: setError(state, "errorActiveUser", null),
      };

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
