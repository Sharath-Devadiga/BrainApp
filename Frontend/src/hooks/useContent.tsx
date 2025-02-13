import axios  from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export   function useContent() {
    const [contents, setContents] = useState([])

    useEffect(() => {
     axios.get(`${BACKEND_URL}/api/v1/user/content`,{
            headers: { 
                "token": localStorage.getItem('token')              }
        })
        .then((response) => {
            setContents(response.data.content)
        })
        .catch((error) => {
            console.error("Error fetching content:", error);
        });
    }, [])

    return contents;
}