import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"









export const addCsvAPI = async (reqBody, reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/importCSV`, reqBody, reqHeader)
}

