import axios from "axios";
import authHeader from './authHeader';

// ESM
import {stringify} from 'flatted';

const API_URL = "http://localhost:8080/api/v1";

const getAllMindMaps =  async () => {
    return await axios.get(API_URL + "/mindmappings", {headers: authHeader()})
        .then((response) => {
            console.log("GETALLMM RESPONSE",response)
            return response;
        }, (error) => {
            return error
        });
};

const getMindMapByDBId = async (id) => {
    return await axios.get(API_URL + "/mindmappings/" + id, {headers: authHeader()})
        .then((response) => {
            console.log("GETBYID RESPONSE",response)
            return response;
        }, (error) => {
            return error;
        });
};

const createMindMap = async (data) => {
    return await axios.post(API_URL + "/mindmapping/", {
        "title": data.nodeData.topic,
        "mappingJSON": stringify(data)
    }, {headers: authHeader()})
        .then((response) => {
            console.log("CREATE RESPONSE",response)
            return response;
        }, (error) => {
            return error;
        });
};

const updateMindMap = async (id, data) => {
    return await axios.put(API_URL + "/mindmappings/" + id, {
        "title": data.nodeData.topic,
        "mappingJSON": stringify(data)
    }, {headers: authHeader()})
        .then((response) => {
            console.log("UPDATE RESPONSE",response)
            return response;
        }, (error) => {
            return error;
        });
};

const deleteMindMap = async (id) => {
    return await axios.delete(API_URL + "/mindmappings/" + id, {headers: authHeader()})
        .then((response) => {
            console.log("DELETE RESPONSE",response)
            return response;
        }, (error) => {
            return error;
        });
};


const UserService = {
    getAllMindMaps,
    getMindMapByDBId,
    createMindMap,
    updateMindMap,
    deleteMindMap
}
export default UserService;