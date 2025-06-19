import { createContext, useContext, useReducer } from "react";
import * as actions from './action';
import { initialState } from "./initialState";
const OrganizationContext = createContext();

function organizationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case actions.GET_ALL_DEPARTMENTS_REQUEST:{
        return {
            ...state,
            loading:true,
            error:null,
        }
    }

    case actions.GET_ALL_DEPARTMENTS_SUCCESS:{
        return {
            ...state,
            loading:false,
            allDepartments:payload,
        }
    }

    case actions.GET_ALL_DEPARTMENTS_FAILURE:{
        return {
            ...state,
            loading:false,
            error:payload,
        }
    }

    case actions.SET_DESIGNATION_BY_DEPARTMENT:{
        const {departmentId,designation} = payload;
        return {
            ...state,
            designationsByDepartment:{
                ...state.designationsByDepartment,
                [departmentId]:designation,
            }
        }
    }

    default:
        return state;
  }
}

export function OrganizationContextProvider({children}){
    const [state,dispatch] = useReducer(organizationReducer,initialState);

    return (
        <OrganizationContext.Provider value={{state,dispatch}}>
            {children}
        </OrganizationContext.Provider>
    )
}

export const useOrganizationContext = () => useContext(OrganizationContext);