import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useAddTaskComment = () => {
    const [loadingAddCommnet,setLoadingAddComment] = useState(false);
    const [errorAddComment,setErrorAddComment] = useState(false);
    const addCommentToTask = async (taskId,comment) => {
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
        return formattedIdResponse || [];
    }
    return {loadingAddCommnet,errorAddComment,addCommentToTask};
} 

export default useAddTaskComment;