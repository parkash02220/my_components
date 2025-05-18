"use client";
import React, { createContext, useReducer, useContext, useState, useEffect } from "react";
import { initialState } from "./initialState";
import * as actions from "./action";
const AppContext = createContext();



function projectsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_ACTIVE_USER_REQUEST:
      return {
        ...state,
        loadingActiveUser:true,
        errorActiveUser:null,
      };

    case actions.SET_ACTIVE_USER_SUCCESS:
      let activeUser = payload;
      activeUser.isAdmin = payload?.role === "admin";
      return {
        ...state,
        activeUser,
         loadingActiveUser:false,
      };

    case actions.SET_ACTIVE_USER_FAILURE:
      return {
        ...state,
       loadingActiveUser:false,
        errorActiveUser:payload,
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
