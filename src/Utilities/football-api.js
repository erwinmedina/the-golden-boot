import sendRequest from "./send-request";
const BASE_URL = "/api/footballs"

export function getAll() {
    return sendRequest(BASE_URL, 'GET');
}