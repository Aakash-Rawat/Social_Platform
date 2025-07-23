import axios from "axios"
import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAllMessage = () =>{
    const dispatch = useDispatch();
    const selectedUser = useSelector(store => store.auth.selectedUser);
     
           useEffect(()=>{
               const fetchAllMessage = async () =>{
                try {
                      const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser?._id}`, {withCredentials:true})

                      if(res.data.success)
                      {
                        // console.log(res.data);
                        
                        dispatch(set(res.data.message));
                      }
                } catch (error) {
                    console.log(error);
                }
               }
               fetchAllMessage();
           },[selectedUser])
};

export default useGetAllMessage;