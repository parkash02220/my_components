import { createContext, useContext, useReducer } from "react";
import * as actions from "./action";
import { initialState } from "./initialState";
const NotificationsContext = createContext();

function notificationsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
          pageSize: 10,
        },
      };
    }

    case actions.SET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        loadingNotifications: true,
        errorNotifications: null,
      };
    }

    case actions.SET_NOTIFICATIONS_SUCCESS: {
      const { notifications, hasMore, page, totalUnread, totalCount } = payload;
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
        loadingNotifications: false,
      };
    }

    case actions.SET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loadingNotifications: false,
        errorNotifications: payload,
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
      const { notificationId, user } = payload;
      const updatedAllNotifications = state?.notifications?.all?.data?.map(
        (notification) => {
          if (notification?.id === notificationId) {
            return {
              ...notification,
              seenBy: [
                ...(notification?.seenBy || []),
                { id: notification?.id, seen: true, user },
              ],
            };
          }
          return notification;
        }
      );
      const updatedUnreadNotifications =
        state?.notifications?.unread?.data?.filter(
          (notification) => notification?.id !== notificationId
        );
      return {
        ...state,
        notifications: {
          ...state.notifications,
          all: {
            ...state.notifications?.all,
            data: updatedAllNotifications,
          },
          unread: {
            ...state.notifications?.unread,
            data: updatedUnreadNotifications,
          },
          unReadCount: (state.notifications.unReadCount || 1) - 1,
        },
      };
    }

    case actions.MARK_ALL_NOTIFICATION_AS_READ: {
      const { user } = payload;
      const updatedAllNotifications = state?.notifications?.all?.data?.map(
        (notification) => {
          return {
            ...notification,
            seenBy: [
              ...(notification?.seenBy || []),
              { id: notification?.id, seen: true, user },
            ],
          };
        }
      );
      return {
        ...state,
        notifications: {
          ...state.notifications,
          all: {
            ...state?.notifications?.all,
            data: updatedAllNotifications,
          },
          unread: {
            ...state?.notifications?.unread,
            data: [],
            page: 0,
            hasMore: true,
          },
          unReadCount: 0,
        },
      };
    }

    case actions.SET_NOTIFICATIONS_COUNT: {
      const { unreadCount = 0, totalCount = 0 } = payload;
      return {
        ...state,
        notifications: {
          ...state?.notifications,
          unReadCount: unreadCount,
          totalCount,
        },
      };
    }

    default:
      return state;
  }
}

export function NotificationsContextProvider({ children }) {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotificationContext = () => useContext(NotificationsContext);
