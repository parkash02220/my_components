import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useAddTaskComment = () => {
    const {dispatch} = useAppContext();
    const [loadingAddCommnet,setLoadingAddComment] = useState(false);
    const [errorAddComment,setErrorAddComment] = useState(false);
    const addCommentToTask = async (taskId,comment,columnId) => {
        setLoadingAddComment(true);
        setErrorAddComment(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/add-task-comment/${taskId}`,
            method:"POST",
            body:{
                text:comment,
            }
        });

        setLoadingAddComment(false);
        if(res.error){
            console.log("::error while adding task to backend",res);
            return;
        }

        const formattedIdResponse = convertIdFields(res?.data?.comments);
        console.log("::formated id repsonse",formattedIdResponse)
        dispatch({type:"ADD_COMMENTS_TO_TASK",payload:{subComments : formattedIdResponse, taskId,columnId}})
        return formattedIdResponse || [];
    }
    return {loadingAddCommnet,errorAddComment,addCommentToTask};
} 

export default useAddTaskComment;