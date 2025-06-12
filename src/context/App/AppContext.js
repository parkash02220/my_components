"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { initialState } from "./initialState";
import * as actions from "./action";
import { getFullName } from "@/utils";
const AppContext = createContext();

function projectsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_ACTIVE_USER_REQUEST:
      return {
        ...state,
        loadingActiveUser: true,
        errorActiveUser: null,
      };

    case actions.SET_ACTIVE_USER_SUCCESS:
      let activeUser = payload;
      activeUser.isAdmin = payload?.role === "admin";
      activeUser.fullName = getFullName(payload?.firstName, payload?.lastName);
      return {
        ...state,
        activeUser,
        loadingActiveUser: false,
      };

    case actions.SET_ACTIVE_USER_FAILURE:
      return {
        ...state,
        loadingActiveUser: false,
        errorActiveUser: payload,
      };

    case actions.REMOVE_ACTIVE_USER: {
      return {
        ...state,
        activeUser: {},
      };
    }

    case actions.EDIT_ACTIVE_USER: {
      return {
        ...state,
        activeUser: {
          ...state?.activeUser,
          ...payload,
        },
      };
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
