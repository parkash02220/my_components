import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react")

const useGetAllTaskComments = (taskId) => {
    const [loadingAllTaskComments,setLoadingAllTaskComments] = useState(false);
    const [errorAllTaskComments,setErrorAllTaskComments] = useState(false);
    const [allComments,setAllComments] = useState([]);
    const getAllTaskComments = async () => {
        setLoadingAllTaskComments(true);
        setErrorAllTaskComments(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-all-comments/${taskId}`,
            method:"GET",
        });

        setLoadingAllTaskComments(false);
        if(res.error){
            setErrorAllTaskComments(true);
            return;
        }

        const formattedIdResponse = convertIdFields(res?.data?.comments);
        setAllComments(formattedIdResponse);
    }

    useEffect(()=> {
     if(!taskId) return ;
     getAllTaskComments(taskId);
    },[taskId])

    return {loadingAllTaskComments,errorAllTaskComments,getAllTaskComments,allComments,setAllComments};
}
export default useGetAllTaskComments;