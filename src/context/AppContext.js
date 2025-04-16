import React, { createContext, useReducer, useContext, useState } from "react";
import { initialState } from "./initialState";

const AppContext = createContext();

function projectsReducer(state, action) {
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

    case "SWITCH_PROJECT": {
      return {
        ...state,
        activeProjectId: payload,
      };
    }

    case "ADD_COLUMN_TO_SECTION":{
      const {section} = payload;
      console.log("::section in context",section);
      const updatedSections = [
        ...state?.activeProject?.sections,
        section,
      ]
      console.log("::updated sections",updatedSections);
      return {
        ...state,
        activeProject:{
          ...state.activeProject,
          sections:updatedSections,
        }
      }
    }

    case "ADD_TASK_TO_SECTION":{
      const {sectionId,task} = payload;
      const updatedSections = state?.activeProject?.sections?.map((section)=>{
         if(section?.id === sectionId){
           return {
            ...section,
            tasks:[task,...(section?.tasks || [])]
           }
         }
         return section;
      });
      return {
            ...state,
            activeProject:{
              ...state.activeProject,
              sections:updatedSections,
            }
      };
    }
    
    case "CLEAR_SECTION":{
      const {sectionId} = payload;
      const updatedSections = state?.activeProject?.sections?.map((section)=>{
        if(section?.id === sectionId){
          return {
            ...section,
            tasks:[],
          }
        }
        return section;
      });
      return {
        ...state,
        activeProject:{
          ...state.activeProject,
          sections:updatedSections,
        }
      }
    }

    case "DELETE_SECTION":{
      const {sectionId} = payload;
      const updatedSections = state?.activeProject?.sections?.filter((section)=>section?.id !== sectionId);
      return {
        ...state,
        activeProject:{
          ...state.activeProject,
          sections:updatedSections,
        }
      }
    }

    case "UPDATE_SECTION_NAME":{
      const {sectionId,newName} = payload;
      const updatedSections = state?.activeProject?.sections?.map((section)=>{
        if(section?.id === sectionId){
          return {
            ...section,
            name:newName,
          }
        }
        return section;
      });
      return {
        ...state,
        activeProject:{
          ...state.activeProject,
          sections:updatedSections,
        }
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
