import { useEffect, useRef, useState } from "react";
import useDebounce from "../common/useDebounce";
import { ApiCall } from "@/utils/ApiCall";
import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";

const useSearchProject = () => {
    const [loadingSearchProject,setLoadingSearchProject] = useState(false);
    const [errorSearchProject,setErrorSearchProject] = useState(false);
    const [helperTextSearchProject,setHelperTextSearchProject] = useState("");
    const [searchInputValue,setSearchInputValue] = useState("");
    const debouncedSearchInputValue = useDebounce(searchInputValue,500);
    const {dispatch} = useAppContext();
    const hasInteracted = useRef(false);
    const handleSearchInputChange = (e) => {
        hasInteracted.current = true;
        setSearchInputValue(e.target.value);
    }

    useEffect(() => {
        if(!hasInteracted.current) return
        const controller = new AbortController();
        const {signal} = controller;
        const getSearchBoards = async () => {
        
            setLoadingSearchProject(true);
            setErrorSearchProject(false);
            setHelperTextSearchProject("");
    
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-board?search=${debouncedSearchInputValue}`,
                method:"GET",
                signal,
            });

            setLoadingSearchProject(false);

            if(res.error){
                setErrorSearchProject(true);
                console.log("::error while getting boards",res);
                return;
            }
            const formattedIdResponse = convertIdFields(res?.data?.boards || []);
            dispatch({type:"SET_PROJECTS",payload:formattedIdResponse});

        }

        getSearchBoards();

        return () => {
            controller.abort();
        }
    
      }, [debouncedSearchInputValue]);
    return {loadingSearchProject,errorSearchProject,helperTextSearchProject,searchInputValue,handleSearchInputChange,setSearchInputValue};
}
export default useSearchProject;