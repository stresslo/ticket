import { useContext, useEffect, useState } from "react";
import Context from "../../../utils/context";
import HandlePremium from "../../../service/handlePremium"
import axios from "axios";
import "./review.css"

const Review = () => {

    const width = window.innerWidth;
    const context = useContext(Context);
    const endpoint = import.meta.env.VITE_API;
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false)

    const checkStatus = async () => {
        try {
            const response = await axios.get(`${endpoint}/status`);
            response.data.data && setData(response.data.data);
        } catch (error) {
            error.response && setData([]);
            return Promise.reject(error);
        } finally {

        }
    }

    useEffect(() => { checkStatus() }, [])

    return (
        <>
        {(!data.length) ? <HandlePremium/> : ""}
        </>
    )
}

export default Review