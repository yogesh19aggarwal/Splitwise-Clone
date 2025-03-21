import axios from "axios";
import { API_KEY, BASE_URL } from "@env";

const api_key = API_KEY;
const base_url = BASE_URL;

export const apiConnector = axios.create({
    baseURL: base_url,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_key}`,
    },
});