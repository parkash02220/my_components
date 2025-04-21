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
      const updatedSections = [
        ...state?.activeProject?.sections,
        section,
      ]
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

    case "Move_SECTION":{
      const {newPosition,columnId} = payload;
      const updatedSections = [...state.activeProject.sections]?.sort((a,b)=> a.position - b.position);
      const prePosition = updatedSections?.findIndex((item)=>item?.id === columnId);
      const [movedSection] = updatedSections?.splice(prePosition,1);
      updatedSections?.splice(newPosition,0,movedSection);
      const reOrderedSections =  updatedSections?.map((section,index)=> ({
        ...section,
        position:index+1,
      }))
      return {
        ...state,
        activeProject:{
          ...state.activeProject,
          sections:reOrderedSections,
        }
      }

    }

    case "MOVE_TASK": {
      const { taskId, toSectionId, newPosition } = payload;
    
      const sectionsCopy = state.activeProject.sections?.map(section => ({
        ...section,
        tasks: [...section.tasks],
      }));

    
      let taskToMove = null;
      let fromSectionIndex = -1;
      let taskIndex = -1;
    
      sectionsCopy?.forEach((section, sectionIndex) => {
        const taskIndexInSection = section.tasks?.findIndex(task => task?.id === taskId);
        if (taskIndexInSection !== -1) {
          fromSectionIndex = sectionIndex;
          taskIndex = taskIndexInSection;
          taskToMove = section.tasks[taskIndexInSection];
        }
      });
    
      if (!taskToMove || fromSectionIndex === -1) return state;
    
      sectionsCopy[fromSectionIndex].tasks.splice(taskIndex, 1);
    
      const toSection = sectionsCopy.find(section => section?.id === toSectionId);
      if (!toSection) return state;
    
      const insertAt = Math.max(0, Math.min(newPosition, toSection.tasks.length));
      toSection.tasks.splice(insertAt, 0, taskToMove);

    
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sections: sectionsCopy,
        },
      };
    }
    case  "SET_ACTIVE_TASK":{
       return {
        ...state,
        activeTask: payload || {},
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
