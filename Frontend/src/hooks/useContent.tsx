import api from "../api";
import { useEffect, useState } from "react";

export function useContent() {
    const [contents, setContents] = useState([])

    useEffect(() => {
     api.get(`/user/content`)
        .then((response) => {
            setContents(response.data)
        })
        .catch(() => {
        });
    }, [])

    return contents;
}